const CONTENT_TYPE_JSON = { 'Content-Type': 'application/json' };

export function createResponse(status: number, body: object) {
  return new Response(JSON.stringify(body), {
      status,
      headers: CONTENT_TYPE_JSON,
  });
};