import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/Card";

export default function DevUIPage() {
  return (
    <div className="min-h-screen p-8 md:p-12 max-w-5xl mx-auto space-y-16 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Component Library</h1>
        <p className="text-neutral-400">Review core design system elements.</p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-neutral-800 pb-2">Buttons</h2>

        <div className="flex flex-wrap gap-4 items-end bg-neutral-900/30 p-6 rounded-xl border border-neutral-800/50">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>

        <div className="flex flex-wrap gap-4 items-end bg-neutral-900/30 p-6 rounded-xl border border-neutral-800/50">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" isLoading>Loading...</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-neutral-800 pb-2">Inputs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-900/30 p-6 rounded-xl border border-neutral-800/50">
          <Input
            label="Email Address"
            placeholder="kaelen@premium.com"
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
          />
          <Input
            label="Discord Handle"
            placeholder="@shopinsane"
            disabled
          />
           <Input
            label="Credit Card"
            placeholder="0000 0000 0000 0000"
            error="Card number is invalid."
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-neutral-800 pb-2">Cards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Simple Product Card */}
          <Card>
            <div className="aspect-video w-full bg-neutral-800 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 to-neutral-900/10"></div>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-mono text-primary-300 border border-primary-500/30">
                PRO_ASSET_1
              </div>
            </div>
            <CardHeader>
              <CardTitle>Neon Cyberpack 2077</CardTitle>
              <CardDescription>
                A premium collection of high-resolution 3D assets ready for game engines.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
              <span className="font-mono font-medium text-lg text-white">$49.99</span>
              <Button size="sm">Add to Cart</Button>
            </CardFooter>
          </Card>
          
          {/* Auth Card Example */}
          <Card className="flex flex-col justify-center">
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>
                Sign in to your account to access your digital assets.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Email" placeholder="name@example.com" />
              <Input label="Password" type="password" placeholder="••••••••" />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign In</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

    </div>
  );
}
