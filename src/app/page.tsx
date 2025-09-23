import { Button } from "@/components/atoms";
import { ThemeSwitcher } from "@/components/molecules";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      {/* Theme Switcher in top-right corner */}
      <div className="fixed top-4 right-4">
        <ThemeSwitcher />
      </div>

      <h1 className="text-4xl font-bold">Hello World</h1>
      <p className="text-muted-foreground">
        Toggle between light and dark themes!
      </p>

      {/* Atomic Design Pattern - Using Button Atom */}
      <div className="flex flex-wrap gap-4">
        <Button>Default Button</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">🚀</Button>
      </div>
    </div>
  );
}
