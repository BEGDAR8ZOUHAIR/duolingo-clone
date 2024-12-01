import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Button</Button>
      <Button variant="secondary" size={"lg"}>Secondary</Button>
      <Button variant="danger">Ghost</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="superOutline">Ghost</Button>
      <Button variant="super">Ghost</Button>
    </main>
  );
}
