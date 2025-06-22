import * as React from "react"
import { Share2, Printer, Download } from "lucide-react"
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

interface ResultsCardProps extends React.ComponentProps<typeof WeddingCard> {
  title: string
  subtitle?: string
  onShare?: () => void
  onPrint?: () => void
  onDownload?: () => void
  variant?: "default" | "gradient" | "elegant" | "soft"
  hideActions?: boolean
}

const ResultsCard = React.forwardRef<HTMLDivElement, ResultsCardProps>(
  ({
    className,
    title,
    subtitle,
    onShare,
    onPrint,
    onDownload,
    variant = "elegant",
    hideActions = false,
    children,
    ...props
  }, ref) => {
    return (
      <WeddingCard
        ref={ref}
        variant={variant}
        decorative={true}
        className={cn("w-full max-w-3xl mx-auto", className)}
        {...props}
      >
        <WeddingCardHeader className="relative">
          <div className="absolute -top-1 right-0 font-script text-lg text-[hsl(var(--wedding-gold))]">
            Results
          </div>
          
          <WeddingCardTitle className={cn(
            "text-2xl",
            variant === "gradient" && "text-white"
          )}>
            {title}
          </WeddingCardTitle>
          
          {subtitle && (
            <WeddingCardDescription className={cn(
              variant === "gradient" && "text-white/80"
            )}>
              {subtitle}
            </WeddingCardDescription>
          )}
        </WeddingCardHeader>
        
        <WeddingCardContent className="py-4">
          {children}
        </WeddingCardContent>
        
        {!hideActions && (
          <WeddingCardFooter className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-end gap-2 w-full">
              {onShare && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onShare}
                  className={cn(
                    variant === "gradient" && "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  )}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              )}
              
              {onPrint && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onPrint}
                  className={cn(
                    variant === "gradient" && "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  )}
                >
                  <Printer className="h-4 w-4 mr-1" />
                  Print
                </Button>
              )}
              
              {onDownload && (
                <Button 
                  variant={variant === "gradient" ? "soft" : "wedding"} 
                  size="sm" 
                  onClick={onDownload}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              )}
            </div>
          </WeddingCardFooter>
        )}
      </WeddingCard>
    )
  }
)
ResultsCard.displayName = "ResultsCard"

export { ResultsCard }
