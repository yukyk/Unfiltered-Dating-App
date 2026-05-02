const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const ddb = DynamoDBDocumentClient.from(client);
const TABLE = process.env.TABLE_NAME || 'unfiltered-waitlist';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod;
  const path = event.rawPath || event.path || '';

  // CORS preflight
  if (method === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // GET /api/waitlist/count
    if (method === 'GET' && path.includes('/count')) {
      const result = await ddb.send(new ScanCommand({
        TableName: TABLE,
        Select: 'COUNT',
      }));
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ count: result.Count || 0 }),
      };
    }

    // POST /api/waitlist/join
    if (method === 'POST' && path.includes('/join')) {
      const body = JSON.parse(event.body || '{}');
      const { name, email } = body;

      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'invalid_email' }),
        };
      }

      // Check if already exists
      const existing = await ddb.send(new GetCommand({
        TableName: TABLE,
        Key: { email: email.toLowerCase().trim() },
      }));

      if (existing.Item) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({ error: 'already_exists' }),
        };
      }

      // Get current count for position
      const countResult = await ddb.send(new ScanCommand({
        TableName: TABLE,
        Select: 'COUNT',
      }));
      const position = (countResult.Count || 0) + 1;

      // Save to DynamoDB
      await ddb.send(new PutCommand({
        TableName: TABLE,
        Item: {
          email: email.toLowerCase().trim(),
          name: (name || '').trim(),
          position,
          joined_at: new Date().toISOString(),
          source: 'website',
        },
      }));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, position }),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'not_found' }),
    };
  } catch (err) {
    console.error('Lambda error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'internal_error' }),
    };
  }
};
