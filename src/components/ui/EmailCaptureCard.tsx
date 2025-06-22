import * as React from "react"
import { Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  WeddingCard,
  WeddingCardContent,
  WeddingCardDescription,
  WeddingCardFooter,
  WeddingCardHeader,
  WeddingCardTitle,
} from "@/components/ui/WeddingCard"
import { Button } from "@/components/ui/button"

interface EmailCaptureCardProps extends Omit<React.ComponentProps<typeof WeddingCard>, 'onSubmit'> {
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  successMessage?: string
  variant?: "default" | "gradient" | "elegant" | "soft"
  onSubmit?: (email: string) => Promise<void> | void
}

const EmailCaptureCard = React.forwardRef<HTMLDivElement, EmailCaptureCardProps>(
  ({
    className,
    title = "Stay Updated",
    description = "Join our mailing list for exclusive wedding planning tips and offers.",
    placeholder = "Enter your email",
    buttonText = "Subscribe",
    successMessage = "Thank you! You've been subscribed.",
    variant = "gradient",
    onSubmit,
    ...props
  }, ref) => {
    const [email, setEmail] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      
      if (!email || !email.includes('@')) {
        setError("Please enter a valid email address")
        return
      }
      
      try {
        setIsSubmitting(true)
        setError(null)
        
        if (onSubmit) {
          await onSubmit(email)
        }
        
        setIsSuccess(true)
        setEmail("")
      } catch (err) {
        setError("Something went wrong. Please try again.")
        console.error(err)
      } finally {
        setIsSubmitting(false)
      }
    }

    return (
      <WeddingCard
        ref={ref}
        variant={variant}
        decorative={true}
        className={cn("max-w-md mx-auto", className)}
        {...props}
      >
        <WeddingCardHeader>
          <WeddingCardTitle className={cn(
            variant === "gradient" && "text-white"
          )}>
            {title}
          </WeddingCardTitle>
          
          <WeddingCardDescription className={cn(
            variant === "gradient" && "text-white/80"
          )}>
            {description}
          </WeddingCardDescription>
        </WeddingCardHeader>
        
        <WeddingCardContent>
          {isSuccess ? (
            <div className="flex items-center justify-center py-4">
              <p className={cn(
                "text-center font-medium",
                variant === "gradient" ? "text-white" : "text-[hsl(var(--wedding-rose))]"
              )}>
                {successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5",
                  variant === "gradient" ? "text-white/70" : "text-muted-foreground"
                )} />
                
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className={cn(
                    "w-full py-2 px-10 rounded-md focus:outline-none focus:ring-2",
                    variant === "gradient" 
                      ? "bg-white/20 text-white placeholder:text-white/70 focus:ring-white/50 border-white/10" 
                      : "bg-background border border-input focus:ring-[hsl(var(--wedding-rose))/30]"
                  )}
                  disabled={isSubmitting}
                />
              </div>
              
              {error && (
                <p className={cn(
                  "text-sm",
                  variant === "gradient" ? "text-white/90" : "text-destructive"
                )}>
                  {error}
                </p>
              )}
              
              <Button
                type="submit"
                variant={variant === "gradient" ? "soft" : "wedding"}
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : buttonText}
              </Button>
            </form>
          )}
        </WeddingCardContent>
        
        <WeddingCardFooter>
          <p className={cn(
            "text-xs w-full text-center",
            variant === "gradient" ? "text-white/70" : "text-muted-foreground"
          )}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </WeddingCardFooter>
      </WeddingCard>
    )
  }
)
EmailCaptureCard.displayName = "EmailCaptureCard"

export { EmailCaptureCard }
