
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message } from '../types';

// IMPORTANT: This check is for the browser environment where this code will run.
// process.env.API_KEY is a placeholder for an environment variable that should
// be provided by the hosting environment. For example, in a Vite or Create React App,
// you would use import.meta.env.VITE_API_KEY or process.env.REACT_APP_API_KEY.
// The build tool would replace this with the actual value at build time.
// Do not hardcode the API key here.
const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;
if (!apiKey) {
    console.warn("API_KEY environment variable not set. Using a mock service.");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const systemInstruction = `You are an expert advisor AI for a multi-tenant SaaS platform. This platform helps agencies and their customers manage complex retail operations across multiple workspaces, entities, and locations.
Your capabilities include:
- CRM and customer data management within a workspace.
- Project and task management for new location openings, permits, and operations.
- Financial tracking, including invoices, bills, and reporting.
- HR and employee management, scoped to entities and locations.
- Real-time communication logging (calls, emails, SMS).
- Document management with versioning and e-signatures.
When users ask for help, provide concise, actionable advice. You can generate project plans, draft communications, summarize data, and answer questions based on the platform's features. Reference objects with a "#" prefix and their type (e.g., #Entity:Alpha-LLC, #Location:Main-Street, #Permit:Health-2025, #Task:1234). Be professional, helpful, proactive, and slightly formal.
`;

let chat: Chat | null = null;

if (ai) {
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction,
        },
    });
}

// Mock service for when API key is not available
const mockStream = async function* (): AsyncGenerator<GenerateContentResponse> {
    const mockMessage = "Hello! I am your AI Advisor. Since an API key is not configured, I'm running in mock mode. I can help you draft project plans for #Location:Market-Street, manage permits, and much more. How can I assist you today?";
    const words = mockMessage.split(' ');
    for (const word of words) {
        yield { text: `${word} ` } as GenerateContentResponse;
        await new Promise(resolve => setTimeout(resolve, 50));
    }
};

export const streamChat = async function* (
    history: Message[],
    newMessage: string
): AsyncGenerator<GenerateContentResponse> {
    if (!chat || !apiKey) {
        yield* mockStream();
        return;
    }
    try {
        const result = await chat.sendMessageStream({ message: newMessage });
        for await (const chunk of result) {
            yield chunk;
        }
    } catch (error) {
        console.error("Error streaming chat:", error);
        yield { text: "Sorry, I encountered an error. Please try again." } as GenerateContentResponse;
    }
};