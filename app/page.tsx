import { Suspense } from "react";
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";

async function revalidate() {
  "use server";
  revalidateTag("mytag");
}

async function Comp() {
  "use cache";
  cacheTag("mytag");
  const data = await fetch(
    "https://next-data-api-endpoint.vercel.app/api/random"
  );
  const result = await data.text();
  return <span>{result}</span>;
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <p>
          Not Revalidating: <Comp />
        </p>
      </Suspense>
      <form action={revalidate}>
        <button>Revalidate</button>
      </form>
    </>
  );
}
