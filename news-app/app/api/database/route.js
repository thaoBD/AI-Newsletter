import {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    UpdateCommand,
  } from "@aws-sdk/lib-dynamodb";

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export async function GET(req) {
    // replace temp_id with session ID
    const temp_id = "001"
    // replace tableName with Users or UserPreferences accordingly
    const tableName = "Users"
    
    const command = new GetCommand({
        TableName: tableName,
        Key: {
          user_id: temp_id,
        },
      });
      const res = await docClient.send(command);
      console.log(res);
      return res
}

export async function POST(req) {
    // replace temp_id with session ID
    const temp_id = "001"
    // replace tableName with Users or UserPreferences accordingly
    const tableName = "Users"
    // replace data with user preference
    const data = "temporary"

    let user_exists

    if ((!await GET([temp_id, "Users"]))) { user_exists = await POST([temp_id]) }

    if (tableName == "Users") { return user_exists }

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
    
    const res = await docClient.send(command);
    console.log(res);
    return res;
}

export async function PUT(req) {
    // replace temp_id with session ID
    const temp_id = "001"
    // replace tableName with Users or UserPreferences accordingly
    const tableName = "Users"
    // replace data with user preference
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
    
      const res = await docClient.send(command);
      console.log(res);
      return res;
}