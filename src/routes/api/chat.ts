import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, type UIMessage } from "ai";
import { createResponsesCall } from "@/lib/ai/responses";
import { about, career, collaboration, education, profile, projects, skills } from "@/data/portfolio";

function buildInstructions() {
  return `You are the portfolio assistant for ${profile.name}, a ${profile.role} based in ${profile.location}.
Answer visitors' questions about ${profile.name}'s projects, skills, career background and how to collaborate, using ONLY the portfolio data below.
For career questions (experience, education, jobs, timeline) use the CAREER section. For hiring, freelancing or working together use the COLLABORATION section: describe what he builds, who he works best with, his process, and that budget is discussed individually — never quote specific rates or prices.
If something isn't covered, say you don't know and suggest contacting ${profile.name} (email: ${profile.email}, Telegram: ${profile.telegram}).
Be concise, friendly, and speak about ${profile.name} in the third person. Politely decline unrelated requests.

PROFILE: ${JSON.stringify(profile)}
ABOUT: ${JSON.stringify(about)}
CAREER: ${JSON.stringify(career)}
EDUCATION: ${JSON.stringify(education)}
PROJECTS: ${JSON.stringify(projects)}
SKILLS: ${skills.map((s) => s.name).join(", ")}
COLLABORATION: ${JSON.stringify(collaboration)}`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "AI is not configured." }, { status: 500 });
        let messages: UIMessage[];
        try {
          const body = (await request.json()) as { messages?: UIMessage[] };
          if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 40)
            throw new Error();
          messages = body.messages;
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }
        const call = createResponsesCall(
          request,
          { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" },
          await convertToModelMessages(messages),
          buildInstructions(),
        );
        return call.response();
      },
    },
  },
});
