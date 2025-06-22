import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string | number
  label: string
  description?: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  className?: string
  orientation?: "horizontal" | "vertical"
  variant?: "default" | "elegant" | "minimal"
}

export function StepIndicator({
  steps,
  currentStep,
  className,
  orientation = "horizontal",
  variant = "default",
}: StepIndicatorProps) {
  const isVertical = orientation === "vertical"
  
  const variantStyles = {
    default: {
      active: "bg-[hsl(var(--wedding-rose))] text-white",
      completed: "bg-[hsl(var(--wedding-rose))] text-white",
      pending: "bg-gray-200 text-gray-500",
      line: "bg-gray-200",
      lineCompleted: "bg-[hsl(var(--wedding-rose))]"
    },
    elegant: {
      active: "bg-[hsl(var(--wedding-gold))] text-white",
      completed: "bg-[hsl(var(--wedding-gold))] text-white",
      pending: "bg-[hsl(var(--wedding-cream))] text-gray-500",
      line: "bg-[hsl(var(--wedding-cream))]",
      lineCompleted: "bg-[hsl(var(--wedding-gold))]"
    },
    minimal: {
      active: "border-2 border-[hsl(var(--wedding-rose))] bg-white text-[hsl(var(--wedding-rose))]",
      completed: "bg-[hsl(var(--wedding-rose))] text-white",
      pending: "border-2 border-gray-200 bg-white text-gray-400",
      line: "bg-gray-200",
      lineCompleted: "bg-[hsl(var(--wedding-rose))]"
    }
  }

  const styles = variantStyles[variant]

  return (
    <div 
      className={cn(
        "w-full",
        isVertical ? "flex" : "space-y-4",
        className
      )}
    >
      <div 
        className={cn(
          "flex items-center",
          isVertical ? "flex-col space-y-4" : "justify-between space-x-4"
        )}
      >
        {steps.map((step, index) => {
          const isActive = currentStep === index
          const isCompleted = currentStep > index
          const isLastStep = index === steps.length - 1
          const stepStatus = isActive ? "active" : isCompleted ? "completed" : "pending"

          return (
            <React.Fragment key={step.id}>
              <div className="flex items-center relative">
                {/* Step number/icon */}
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                    styles[stepStatus]
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Step label & description - shows on the right in vertical mode */}
                <div 
                  className={cn(
                    "ml-3",
                    isVertical ? "absolute left-10" : "hidden"
                  )}
                >
                  <p 
                    className={cn(
                      "text-sm font-medium",
                      isActive && "text-[hsl(var(--wedding-rose))]",
                      isCompleted && "text-[hsl(var(--wedding-rose))]"
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector line between steps */}
              {!isLastStep && (
                <div 
                  className={cn(
                    "transition-colors",
                    isVertical 
                      ? "h-8 w-0.5 ml-4" 
                      : "flex-1 h-0.5",
                    isCompleted ? styles.lineCompleted : styles.line
                  )} 
                />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Step labels - only show in horizontal mode */}
      {!isVertical && (
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const isActive = currentStep === index
            const isCompleted = currentStep > index

            return (
              <div 
                key={`${step.id}-label`}
                className={cn(
                  "text-center text-sm font-medium",
                  isActive && "text-[hsl(var(--wedding-rose))]",
                  isCompleted && "text-[hsl(var(--wedding-rose))]",
                  !isActive && !isCompleted && "text-muted-foreground"
                )}
                style={{ width: `${100 / steps.length}%` }}
              >
                {step.label}
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                    {step.description}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
