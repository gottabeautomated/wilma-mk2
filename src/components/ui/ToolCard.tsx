import * as React from "react"
import { Link } from "react-router-dom"
import type { LucideProps } from "lucide-react"
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

interface ToolCardProps extends React.ComponentProps<typeof WeddingCard> {
  title: string
  description: string
  icon: React.ComponentType<LucideProps>
  path: string
  completionPercentage?: number
  variant?: "default" | "gradient" | "elegant" | "soft"
}

const ToolCard = React.forwardRef<HTMLDivElement, ToolCardProps>(
  ({ 
    className, 
    title, 
    description, 
    icon: Icon, 
    path, 
    completionPercentage = 0,
    variant = "default",
    ...props 
  }, ref) => {
    return (
      <WeddingCard
        ref={ref}
        variant={variant}
        decorative={true}
        className={cn("max-w-sm transition-transform hover:translate-y-[-5px]", className)}
        {...props}
      >
        <WeddingCardHeader>
          <div className="flex items-center gap-4">
            <div className={cn(
              "rounded-full p-3 bg-[hsl(var(--wedding-blush))]",
              variant === "gradient" && "bg-white/20"
            )}>
              <Icon className={cn(
                "h-6 w-6 text-[hsl(var(--wedding-rose))]",
                variant === "gradient" && "text-white"
              )} />
            </div>
            <WeddingCardTitle className={cn(
              variant === "gradient" && "text-white"
            )}>
              {title}
            </WeddingCardTitle>
          </div>
          {completionPercentage > 0 && (
            <div className="mt-2">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[hsl(var(--wedding-rose))] rounded-full" 
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1 text-muted-foreground">
                {completionPercentage}% Complete
              </p>
            </div>
          )}
        </WeddingCardHeader>
        <WeddingCardContent>
          <WeddingCardDescription className={cn(
            variant === "gradient" && "text-white/80"
          )}>
            {description}
          </WeddingCardDescription>
        </WeddingCardContent>
        <WeddingCardFooter>
          <Button
            variant={variant === "gradient" ? "soft" : "wedding"}
            asChild
            className="w-full"
          >
            <Link to={path}>Open Tool</Link>
          </Button>
        </WeddingCardFooter>
      </WeddingCard>
    )
  }
)
ToolCard.displayName = "ToolCard"

export { ToolCard }
