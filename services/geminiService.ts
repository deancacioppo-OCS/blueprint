import { GoogleGenAI } from "@google/genai";
import type { Blueprint } from '../types';

/**
 * Generates a plain-English explanation of a Make.com blueprint using the Gemini API.
 * @param blueprint The parsed blueprint.json object.
 * @returns A string containing the explanation.
 */
export const explainBlueprint = async (blueprint: Blueprint): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API key is not configured. Please set the API_KEY environment variable.");
    }
    
    const ai = new GoogleGenAI(process.env.API_KEY);
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Sanitize blueprint for the prompt by removing some verbose metadata
    const simplifiedFlow = blueprint.flow.map(module => ({
        id: module.id,
        label: module.label,
        module: module.module,
        mapper: module.mapper,
    }));

    const prompt = `
        You are an expert backend developer specializing in API integrations and automation workflows.
        Analyze the following Make.com blueprint JSON and provide a concise, step-by-step explanation of the business logic it implements.
        
        Focus on the data flow: what triggers the workflow, what actions are taken, how is data passed between modules (referencing the 'mapper' objects), and what is the final outcome.
        Explain it in a way that another developer could use your summary to re-implement the logic in code.

        Blueprint Name: ${blueprint.name}
        
        Workflow Steps (simplified):
        ${JSON.stringify(simplifiedFlow, null, 2)}

        Provide your explanation below:
    `;

    try {
        const response = await model.generateContent(prompt);
        return response.response.text();
    } catch (error) {
        console.error("Gemini API call failed:", error);
        if (error instanceof Error && error.message.includes('API key not valid')) {
             throw new Error("The configured API key is invalid.");
        }
        throw new Error("Failed to get explanation from AI service. Check network connection and API key configuration.");
    }
};
