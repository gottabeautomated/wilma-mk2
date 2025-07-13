import * as React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WeddingCard } from "@/components/ui/WeddingCard"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState<"sign_up" | "third_party">("sign_up")
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
      })
      return
    }
    
    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "Terms and Conditions",
        description: "You must accept the Terms and Conditions to continue",
      })
      return
    }
    
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            marketing_consent: marketingConsent,
          },
        },
      })

      if (error) {
        throw error
      }

      // If in development environment with email confirmation disabled, we can login directly
      if (data.session) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to Wilma MK2",
        })
        navigate("/dashboard")
      } else {
        toast({
          title: "Verification email sent",
          description: "Please check your email to verify your account",
        })
        navigate("/auth/verification-sent", { state: { email } })
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup error",
        description: error.message || "Failed to create account",
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

        <h1 className="text-2xl font-wedding-serif text-center mb-6">Create Your Account</h1>

        <div className="flex space-x-2 mb-6">
          <Button 
            variant={view === "sign_up" ? "wedding" : "outline"} 
            className="flex-1"
            onClick={() => setView("sign_up")}
          >
            Email & Password
          </Button>
          <Button 
            variant={view === "third_party" ? "wedding" : "outline"} 
            className="flex-1"
            onClick={() => setView("third_party")}
          >
            Social
          </Button>
        </div>

        {view === "sign_up" && (
          <form onSubmit={handleSignup} className="space-y-4">
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
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Password must be at least 8 characters
              </p>
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked: boolean) => setAcceptTerms(checked)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the{" "}
                  <Link to="/terms" className="text-[hsl(var(--wedding-rose))]">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="marketing" 
                  checked={marketingConsent}
                  onCheckedChange={(checked: boolean) => setMarketingConsent(checked)}
                />
                <label
                  htmlFor="marketing"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to receive marketing emails
                </label>
              </div>
            </div>
            
            <Button type="submit" variant="wedding" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
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
              view="sign_up"
            />
          </div>
        )}

        <div className="mt-6 text-center text-sm">
          <p>
            Already have an account?{" "}
            <Link to="/auth/login" className="text-[hsl(var(--wedding-rose))] font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </WeddingCard>
    </div>
  )
}
