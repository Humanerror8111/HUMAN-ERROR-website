import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-crimson">ERROR 404</p>
      <h1 className="metal mt-4 font-display text-4xl font-extrabold sm:text-6xl">PAGE NOT FOUND</h1>
      <Button href="/" className="mt-8">BACK TO HOME</Button>
    </main>
  );
}
