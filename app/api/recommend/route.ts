import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { readFile } from 'fs/promises';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { question } = await req.json();
  const guidelines = await readFile(process.cwd() + '/supplement_guidelines.txt', 'utf8');

  const messages = [
    { role: 'system', content: `당신은 건강기능식품 상담 전문가입니다. 다음 가이드라인을 참고하여 상담하세요:\n${guidelines}` },
    { role: 'user', content: question }
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });
    const answer = completion.choices[0].message?.content ?? '';
    return NextResponse.json({ answer });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to get response from OpenAI' }, { status: 500 });
  }
}
