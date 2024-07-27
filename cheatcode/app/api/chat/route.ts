import { generateObject } from 'ai';
import { generateText } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';




export async function POST(req:Request){
    try {
        const prompt=await req.text();
        const groq = createGroq({
            baseURL: 'https://api.groq.com/openai/v1',
            apiKey: process.env.GROQ_API_KEY,
          });
          const { object } = await generateObject({
            model: groq('llama-3.1-70b-versatile'),
            schema: z.object({
              codeEvaluation: z.object({
                presentCodeCorrectorNotBoolean: z.string(),
                edgeCaseCheck:z.string(),
                reasonWhyCurrentCodeIsIncorrectOrCorrectDescriptive:z.string(),
                hintsAndTheirReason:z.string(), 
                topicsToLearnDescriptive:z.string(),
                betterSolutionIfany:z.string(),
              }),
            }),
            prompt: prompt,
          });
          console.log(object);

          return  NextResponse.json(object);
        
    } catch (error) {
        console.log('error occured',error);
        return new NextResponse('server error',{status:500});
        
    }
}


