
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from '@/components/ui/use-toast';
import ScrollReveal from '@/components/ui/scroll-reveal';

const AdminTwoFactor: React.FC = () => {
  const { verifyTwoFactor, isLoading, needsTwoFactor } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if we're in the 2FA flow when component mounts
  useEffect(() => {
    if (!needsTwoFactor && !isLoading) {
      navigate('/admin/login');
    }
  }, [needsTwoFactor, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (code.length !== 6) {
        toast({
          variant: "destructive",
          title: "Invalid Code",
          description: "Please enter a 6-digit verification code",
        });
        return;
      }
      
      const success = await verifyTwoFactor(code);
      if (success) {
        navigate('/admin');
      } else {
        toast({
          variant: "destructive",
          title: "Invalid Code",
          description: "The verification code is incorrect. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Loading authentication state...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
      <ScrollReveal>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Two-Factor Authentication</CardTitle>
            <CardDescription className="text-center">
              Enter the 6-digit code from your authenticator app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center py-4">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(value) => setCode(value)}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} index={index} />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || isSubmitting || code.length !== 6}
              >
                {(isLoading || isSubmitting) ? 
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Verify
              </Button>
              
              <p className="text-sm text-muted-foreground text-center mt-4">
                For demo purposes: enter any 6 digits to continue
              </p>
            </form>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
};

export default AdminTwoFactor;
