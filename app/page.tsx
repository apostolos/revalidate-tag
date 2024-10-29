import { Suspense } from 'react';
import { unstable_cacheTag as cacheTag, revalidateTag } from 'next/cache';

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
      <form action={invalidate}>
        <button>Revalidate</button>
      </form>
    </>
  );
}

async function invalidate() {
  'use server';
  revalidateTag('mytag');
}

async function CompA() {
  'use cache';
  cacheTag('mytag');
  const data = await fetch('https://next-data-api-endpoint.vercel.app/api/random');
  const result = await data.text();
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
