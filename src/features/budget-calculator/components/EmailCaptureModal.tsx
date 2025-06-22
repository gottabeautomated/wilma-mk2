import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Lock } from "lucide-react";
import { supabase, handleSupabaseError } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type { EmailCaptureModalProps, BudgetFormData } from "../types/budget.types";

export function EmailCaptureModal({ 
  isOpen, 
  onSubmit, 
  onSkip,
  formData 
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };
  
  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Save email to Supabase
      const { error: supabaseError } = await supabase
        .from('email_captures')
        .insert({
          email,
          source: 'budget_calculator',
          metadata: {
            wedding_date: formData.weddingDate,
            guest_count: formData.guestCount,
            location: formData.location,
            style: formData.style,
            budget_range: formData.budgetRange
          }
        });
      
      if (supabaseError) {
        const errorMessage = handleSupabaseError(supabaseError);
        console.error('Error saving email:', errorMessage);
        // Continue anyway to show results
      } else {
        // Log success but don't show to user
        console.log('Email saved successfully to Supabase');
      }
      
      // Continue with normal flow
      onSubmit(email);
    } catch (error) {
      console.error('Error in email capture process:', error);
      // Continue anyway to show results
    } finally {
      setSubmitting(false);
    }
  };
  
  if (!isOpen) return null;
  
  // Get wedding names if available
  const coupleNames = formData.partnerNames.filter(Boolean).join(" & ");
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-[hsla(var(--wedding-rose)/0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-[hsl(var(--wedding-rose))]" />
        </div>
        
        <h3 className="text-xl font-wedding-serif text-[hsl(var(--wedding-navy))] mb-2">
          Your Budget is Ready!
        </h3>
        
        <p className="text-gray-600 mb-2">
          {coupleNames ? 
            `We've created a personalized budget for ${coupleNames}'s wedding.` : 
            "We've created your personalized wedding budget."
          }
        </p>
        
        <p className="text-sm text-gray-500">
          Enter your email to see your results and get a copy delivered to your inbox.
        </p>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Your email address"
            className={`pl-10 ${error ? 'border-red-500' : ''}`}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <Lock className="w-3 h-3 mr-1" />
          <span>We respect your privacy and will never spam you</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-[hsl(var(--wedding-rose))] hover:bg-[hsl(var(--wedding-rose-dark))] text-white"
        >
          {submitting ? "Submitting..." : "View My Budget Results"}
        </Button>
        
        <Button
          onClick={onSkip}
          variant="outline"
          className="w-full text-gray-500"
        >
          Skip for now
        </Button>
      </div>
      
      <div className="text-xs text-gray-400 text-center mt-4">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </div>
    </motion.div>
  );
}
