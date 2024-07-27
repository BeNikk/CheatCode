import axios from 'axios';
import * as dotenv from 'dotenv';
import { NextResponse } from 'next/server';

const judge0ApiKey = process.env.REACT_APP_RAPID_API_KEY;

dotenv.config();
const checkStatus = async (submissionToken: string) => {
    try {
      const response = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': judge0ApiKey,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          },
        }
      );

      const statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(submissionToken);
        }, 2000);
        return; // Don't need to return NextResponse here
      } else {
        // Handle different status codes (success, error)
        if (statusId === 3) { // Assuming success code here
          const outputData = response.data; // Access output details
          return NextResponse.json(outputData); // Return structured JSON response
        } else {
          const errorMessage = response.data.message || 'Compilation failed'; // Provide specific error message
          return  NextResponse.json({ error: errorMessage }, { status: 400 }); // Structured error response with status code
        }
      }
    } catch (error) {
      console.error('Error checking status:', error);
      return  NextResponse.json({ error: 'An error occurred' }, { status: 500 }); // Generic error response
    }
  };

export async function POST(req: Request) {
  try {
    const { codeSent, languageSent } = await req.json();

    const response = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions/',
      {
        language_id: languageSent,
        source_code: codeSent,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': judge0ApiKey,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );

    const submissionToken = response.data.token;  
    checkStatus(submissionToken);

    console.log('Submission submitted:', submissionToken);
    return new NextResponse("Done1");
  } catch (error) {
    console.error('Error in execution:', error);
    return new NextResponse('Error in executing', { status: 500 }); // Generic error response
  }
}
