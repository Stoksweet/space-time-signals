import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Megaphone, Building, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SignupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupForm = ({ isOpen, onClose }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    type: "advertiser" as "advertiser" | "venue_owner",
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to our data protection policy.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('waiting_list')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            type: formData.type,
            consent: formData.consent
          }
        ]);

      if (error) {
        throw error;
      }
      
      toast({
        title: "Welcome to the waiting list! 🎉",
        description: `Thanks ${formData.name}! We'll be in touch soon with early access.`,
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        type: "advertiser",
        consent: false
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving to waiting list:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Join the Revolution</h2>
          <p className="text-muted-foreground">
            Be first to transform how local advertising works
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Toggle */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: "advertiser" }))}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                formData.type === "advertiser" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Megaphone className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="font-medium">I want to advertise</div>
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: "venue_owner" }))}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                formData.type === "venue_owner" 
                  ? "border-accent bg-accent/5" 
                  : "border-border hover:border-accent/50"
              }`}
            >
              <Building className="h-6 w-6 mx-auto mb-2 text-accent" />
              <div className="font-medium">I own a venue</div>
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          {/* Consent */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, consent: checked as boolean }))
              }
            />
            <Label htmlFor="consent" className="text-sm leading-5">
              I agree to receive communications about Space Time Advertising and 
              consent to the processing of my personal data for marketing purposes.
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join the Waiting List"
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Early access members get exclusive pricing and priority venue selection.
        </p>
      </Card>
    </div>
  );
};