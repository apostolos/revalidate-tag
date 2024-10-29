'use client';

export default function Form({ action }: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form action={action}>
      <button>Revalidate</button>
    </form>
  );
}
