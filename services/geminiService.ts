
import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getMarketInsights = async (query: string): Promise<NewsItem[]> => {
  if (!API_KEY) return [];

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Act as a senior financial analyst. Based on the query "${query}", generate 3 relevant, realistic financial news headlines and snippets in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            category: { type: Type.STRING },
            title: { type: Type.STRING },
            snippet: { type: Type.STRING },
            source: { type: Type.STRING },
            time: { type: Type.STRING },
          },
          required: ["id", "category", "title", "snippet", "source", "time"],
        },
      },
    },
  });

  try {
    const data = JSON.parse(response.text);
    return data;
  } catch (err) {
    console.error("Failed to parse Gemini response", err);
    return [];
  }
};
