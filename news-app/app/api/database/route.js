import {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    UpdateCommand,
  } from "@aws-sdk/lib-dynamodb";

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Check if a user or preference exists based on user ID
export async function GET(req) {
  console.log(req)
  const { url } = req;
  const queryParams = new URL(url, `http://localhost`).searchParams;
  const { table, email, id } = Object.fromEntries(queryParams);
    const command = new GetCommand({
        TableName: table,
        Key: {
          email: email,
          user_id: id,
        }
      });

    //   try {
    //     const res = await docClient.send(command);
    //     console.log(res);
    //     return new Response(await res.text(), { status: 200 });
    //   } catch (error) {
    //     console.error("Error putting item into DynamoDB:", error);
    //     throw error;
    //   }
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