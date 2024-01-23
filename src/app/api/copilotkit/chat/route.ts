import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "Your ChatGPT API Key",
});

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  try {
    const forwardedProps = await req.json();

    const stream = openai.beta.chat.completions
      .stream({
        model: "gpt-3.5-turbo",
        ...forwardedProps,
        stream: true,
      })
      .toReadableStream();

    return new Response(stream);
  } catch (error: any) {
    return new Response("", { status: 500, statusText: error.error.message });
  }
}
