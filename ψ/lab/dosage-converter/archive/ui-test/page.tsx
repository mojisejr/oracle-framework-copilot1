import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";

export default function UITestPage() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
        Liquid Glass UI Test
      </h1>

      <GlassCard className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Glass Card</h2>
          <p className="text-muted-foreground text-sm">
            This is a glass card with backdrop blur and subtle border.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Liquid Input</label>
            <Input placeholder="Type something..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Another Input</label>
            <Input type="number" placeholder="0.00" />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button variant="liquid">Liquid Button</Button>
          <Button variant="default">Default Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </GlassCard>
    </div>
  );
}
