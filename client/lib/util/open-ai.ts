'use server';

import { Task } from '@/types';

const OpenAI = require('openai');

export type PromptTask = Pick<
  Task,
  'name' | 'description' | 'dueDate' | 'priority'
> & { dueDate: string | null };

export async function sendPrompt(userInput: string) {
  if (!userInput) throw new Error('prompt cannot be empty');
  const prompt = `
  Create a task object based on given input "${userInput}". Rephrase the user's to enhance the task's name and description. Given a date expression, if it represents a relative time, calculate the distance from the current date using ${new Date().toISOString()}. Otherwise, set the due date to null. ONLY reply with the JSON Object
  {
"name": string,
"description": string,
"dueDate": isostring, (nullable)
"priority": "LOW" | "MEDIUM" | "HIGH" (nullable)
}
`;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt }],
    model: 'gpt-3.5-turbo',
  });

  const jsonString = completion.choices[0].message.content;

  let responseObject;

  try {
    responseObject = JSON.parse(jsonString);
  } catch (error) {
    responseObject = jsonString;
  }

  return responseObject as PromptTask;
}
