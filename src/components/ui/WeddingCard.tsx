import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface WeddingCardProps extends React.ComponentProps<typeof Card> {
  variant?: "default" | "gradient" | "elegant" | "soft"
  decorative?: boolean
}

const WeddingCard = React.forwardRef<HTMLDivElement, WeddingCardProps>(
  ({ className, variant = "default", decorative = false, ...props }, ref) => {
    const variantStyles = {
      default: "border-[hsl(var(--wedding-rose))/20] bg-white",
      gradient: "wedding-gradient text-white border-none",
      elegant: "bg-[hsl(var(--wedding-cream))] border-[hsl(var(--wedding-gold))] border-2",
      soft: "bg-white border-[hsl(var(--wedding-blush))]",
    }

    return (
      <Card
        ref={ref}
        className={cn(
          "rounded-xl shadow-md transition-all hover:shadow-lg",
          variantStyles[variant],
          decorative && "relative overflow-hidden",
          className
        )}
        {...props}
      >
        {decorative && variant !== "gradient" && (
          <div className="absolute top-0 left-0 w-full h-1 wedding-gradient" />
        )}
        {props.children}
      </Card>
    )
  }
)
WeddingCard.displayName = "WeddingCard"

const WeddingCardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CardHeader>
>(({ className, ...props }, ref) => (
  <CardHeader
    ref={ref}
    className={cn("font-wedding-serif", className)}
    {...props}
  />
))
WeddingCardHeader.displayName = "WeddingCardHeader"

const WeddingCardTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CardTitle>
>(({ className, ...props }, ref) => (
  <CardTitle
    ref={ref}
    className={cn("text-xl font-wedding-serif text-[hsl(var(--wedding-rose))]", className)}
    {...props}
  />
))
WeddingCardTitle.displayName = "WeddingCardTitle"

const WeddingCardDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CardDescription>
>(({ className, ...props }, ref) => (
  <CardDescription
    ref={ref}
    className={cn("text-sm text-muted-foreground font-wedding-sans", className)}
    {...props}
  />
))
WeddingCardDescription.displayName = "WeddingCardDescription"

const WeddingCardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CardContent>
>(({ className, ...props }, ref) => (
  <CardContent ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
WeddingCardContent.displayName = "WeddingCardContent"

const WeddingCardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CardFooter>
>(({ className, ...props }, ref) => (
  <CardFooter
    ref={ref}
    className={cn("flex items-center justify-end gap-2 p-6 pt-0", className)}
    {...props}
  />
))
WeddingCardFooter.displayName = "WeddingCardFooter"

export {
  WeddingCard,
  WeddingCardHeader,
  WeddingCardTitle,
  WeddingCardDescription,
  WeddingCardContent,
  WeddingCardFooter,
}
