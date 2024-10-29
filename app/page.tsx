import { Suspense } from "react";
import {
  unstable_cacheTag as cacheTag,
  revalidateTag,
  revalidatePath,
} from "next/cache";

export default function Home() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Comp />
      </Suspense>
      <form action={revalidate_tag}>
        <button>Revalidate Tag</button>{" "}
        <button formAction={revalidate_path}>Revalidate Path</button>
      </form>
    </>
  );
}

async function Comp() {
  "use cache";
  cacheTag("mytag");
  const data = await fetch(
    "https://next-data-api-endpoint.vercel.app/api/random",
    { cache: "no-store" }
  );
  const result = await data.text();
  return <p>{result}</p>;
}

async function revalidate_tag() {
  "use server";
  revalidateTag("mytag");
}

async function revalidate_path() {
  "use server";
  revalidatePath("/", "page");
}
