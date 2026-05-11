import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function chat(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const body = (await request.json()) as { messages: unknown[] };

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 1000,
      system: body.messages,
      ...body,
    }),
  });

  const data = await response.json();
  return { jsonBody: data };
}

app.http("chat", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: chat,
});
