import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { readFile } from 'fs/promises';

const apiKey = process.env.OPENAI_API_KEY;

// Initialize the client only when an API key is provided. This prevents runtime
// errors during local development when no key is set.
const openai = apiKey ? new OpenAI({ apiKey }) : null;

export async function POST(req: Request) {
  const { messages = [], question } = await req.json();
  const guidelines = await readFile(process.cwd() + '/supplement_guidelines.txt', 'utf8');

  const chatMessages = [
    {
      role: 'system',
      content: `당신은 건강기능식품 상담 전문가입니다. 다음 가이드라인을 참고하여 상담하세요:\n${guidelines}`,
    },
    ...(question ? [{ role: 'user', content: question }] : []),
    ...messages,
  ];

  if (!openai) {
    return NextResponse.json(
      {
        error:
          'OpenAI API key is not configured. Set OPENAI_API_KEY in your environment.',
      },
      { status: 500 },
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: chatMessages,
    });
    const answer = completion.choices[0].message?.content ?? '';
    return NextResponse.json({ answer });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to get response from OpenAI' },
      { status: 500 },
    );
  }
}
