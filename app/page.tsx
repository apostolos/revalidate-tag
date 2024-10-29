import { unstable_cacheTag as cacheTag } from 'next/cache';
import { Suspense } from 'react';
import Form from './Form';
import invalidate from './action';

export default function Home() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <p>
          Not Revalidating: <CompA />
        </p>
        <p>
          Revalidating: <CompB />
        </p>
      </Suspense>
      <Form action={invalidate} />
    </>
  );
}

async function CompA() {
  'use cache';
  cacheTag('mytag');
  console.log('fetching');
  const data = await fetch('https://next-data-api-endpoint.vercel.app/api/random');
  console.log('got response');
  const result = await data.text();
  console.log(result);
  return <span>{result}</span>;
}

async function CompB() {
  'use cache';
  cacheTag('mytag');
  const data = await fetch('https://next-data-api-endpoint.vercel.app/api/random', {
    headers: {
      'x-bust': Math.random().toString(),
    },
  });

  const result = await data.text();

  return <span>{result}</span>;
}
