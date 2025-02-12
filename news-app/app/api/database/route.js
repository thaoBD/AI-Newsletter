import {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    UpdateCommand,
  } from "@aws-sdk/lib-dynamodb";

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({
  region: 'us-east-2',
});
const docClient = DynamoDBDocumentClient.from(client);

// Check if a user or preference exists based on user ID
export async function GET(req) {
  const { url } = req;
  const queryParams = new URL(url, `http://localhost`).searchParams;
  const { table, id } = Object.fromEntries(queryParams);
  const command = new GetCommand({
      TableName: table,
      Key: {
        user_id: id,
      }
  });

  try {
    const res = await docClient.send(command);
    
    if (res.Item) {
      return new Response(JSON.stringify(res.Item), { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response('Item not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error querying DynamoDB:', error);
    return new Response('Error querying DynamoDB', { status: 500 });
  }
}

// Create a new user or Create a new user Preference
// If a user preference already exists, edit user preference instead
export async function POST(req) {
    // replace temp_id with user ID, replace tableName with Users or UserPreferences, replace data with filters (based off params)
    const temp_id = "001"
    const tableName = "Users"
    const data = "temporary"

    let user_exists

    // If user doesn't exist, make new user
    if ((!await GET([temp_id, "Users"]))) { user_exists = await POST([temp_id, "Users"]) }

    // Return user, if looking for User Table
    if (tableName == "Users") { return user_exists }

    // If user preference exists, edit existing preference
    if (await GET([temp_id, "UserPreferences"])) {
        const res = await PUT([temp_id, tableName, data])
        return res
    } 

    const command = new PutCommand({
        TableName: tableName,
        Item: {
            user_id: temp_id,
            query: data,
        },
    });
    
    try {
      const res = await docClient.send(command);
      console.log(res);
      return res;
    } catch (error) {
      console.error("Error putting item into DynamoDB:", error);
      throw error;
    } 
}

// Edit User Preference
export async function PUT(req) {
    // replace temp_id with user ID, replace tableName with Users or UserPreferences, replace data with filters (based off params)
    const temp_id = "001"
    const tableName = "Users"
    const data = "temporary"

    const command = new UpdateCommand({
        TableName: tableName,
        Key: { user_id: temp_id },      
        UpdateExpression: "set #query = :query",
        ExpressionAttributeValues: {
            ":query": data,
          },
        ReturnValues: "ALL_NEW",      
    });
    
    try {
      const res = await docClient.send(command);
      console.log(res);
      return res;
    } catch (error) {
      console.error("Error putting item into DynamoDB:", error);
      throw error;
    } 
}