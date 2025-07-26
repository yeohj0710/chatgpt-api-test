This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Using the GPT supplement recommender

1. Sign up for an account at [OpenAI](https://platform.openai.com/) and create an API key in [Account > API Keys](https://platform.openai.com/account/api-keys).
2. Add the key to a `.env.local` file:

   ```
   OPENAI_API_KEY=your-key-here
   ```

3. If needed, add a payment method in [Billing](https://platform.openai.com/account/billing) to enable usage.
4. Start the dev server with `npm run dev` and POST a JSON body like `{ "question": "어떤 영양제를 먹어야 할까요?" }` to `/api/recommend`.
   The response will contain the assistant's answer based on `supplement_guidelines.txt`.
   If `OPENAI_API_KEY` is not set, the API will return an error message instead of contacting OpenAI.

The assistant is not a medical professional, so always consult qualified experts for critical health issues.
