import * as React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WeddingCard } from "@/components/ui/WeddingCard"
import { Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState<"magic_link" | "sign_in" | "third_party">("sign_in")
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      toast({
        title: "Successfully signed in!",
        description: "Welcome back to Wilma MK2",
      })
      
      // Redirect to dashboard after successful login
      navigate("/dashboard")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication error",
        description: error.message || "Failed to sign in",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      toast({
        title: "Magic link sent!",
        description: "Check your email for the login link",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication error",
        description: error.message || "Failed to send magic link",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto py-12">
      <WeddingCard className="p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="wedding-gradient p-2 rounded-full">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div className="ml-2">
            <span className="font-script text-2xl text-[hsl(var(--wedding-rose))]">Wilma</span>
            <span className="ml-1 text-xs font-bold align-super text-[hsl(var(--wedding-gold))]">MK2</span>
          </div>
        </div>

        <h1 className="text-2xl font-wedding-serif text-center mb-6">Welcome Back</h1>

        <div className="flex space-x-2 mb-6">
          <Button 
            variant={view === "sign_in" ? "wedding" : "outline"} 
            className="flex-1"
            onClick={() => setView("sign_in")}
          >
            Email & Password
          </Button>
          <Button 
            variant={view === "magic_link" ? "wedding" : "outline"} 
            className="flex-1"
            onClick={() => setView("magic_link")}
          >
            Magic Link
          </Button>
          <Button 
            variant={view === "third_party" ? "wedding" : "outline"} 
            className="flex-1"
            onClick={() => setView("third_party")}
          >
            Social
          </Button>
        </div>

        {view === "sign_in" && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Link to="/auth/reset-password" className="text-xs text-[hsl(var(--wedding-rose))]">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" variant="wedding" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        )}

        {view === "magic_link" && (
          <form onSubmit={handleMagicLinkLogin} className="space-y-4">
            <div>
              <label htmlFor="magic-email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="magic-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <Button type="submit" variant="wedding" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Magic Link"}
            </Button>
          </form>
        )}

        {view === "third_party" && (
          <div className="border rounded-md p-4">
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'hsl(var(--wedding-rose))',
                      brandAccent: 'hsl(var(--wedding-gold))',
                    },
                  },
                },
              }}
              providers={["google", "apple"]}
              redirectTo={`${window.location.origin}/auth/callback`}
              view="sign_in"
            />
          </div>
        )}

        <div className="mt-6 text-center text-sm">
          <p>
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-[hsl(var(--wedding-rose))] font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </WeddingCard>
    </div>
  )
}
