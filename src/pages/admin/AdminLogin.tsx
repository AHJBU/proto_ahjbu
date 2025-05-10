
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email or username" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

const AdminLogin: React.FC = () => {
  const { login, isLoading, isAuthenticated, needsTwoFactor } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    console.log("Login page auth state:", { isAuthenticated, needsTwoFactor, isLoading });
    
    // If user is already authenticated, redirect to admin dashboard
    if (isAuthenticated && !isLoading && !needsTwoFactor) {
      console.log("Already authenticated, redirecting to admin dashboard");
      const from = location.state?.from || '/admin';
      navigate(from, { replace: true });
    } else if (needsTwoFactor && !isLoading) {
      console.log("2FA required, redirecting to verification page");
      navigate('/admin/two-factor', { replace: true });
    }
  }, [isAuthenticated, isLoading, needsTwoFactor, navigate, location]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Login attempt with", values);
    setIsSubmitting(true);
    try {
      const success = await login(values.email, values.password);
      if (success) {
        if (needsTwoFactor) {
          console.log("Redirecting to 2FA");
          navigate('/admin/two-factor', { replace: true });
        } else {
          const from = location.state?.from || '/admin';
          console.log("Redirecting to:", from);
          navigate(from, { replace: true });
        }
      } else {
        console.log("Authentication failed");
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Invalid username/email or password.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
      <ScrollReveal>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Username</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@example.com or admin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || isSubmitting}
                >
                  {(isLoading || isSubmitting) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign in
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-sm text-muted-foreground text-center mt-2">
              For demo purposes: use admin / ASDqwe123#
            </p>
          </CardFooter>
        </Card>
      </ScrollReveal>
    </div>
  );
};

export default AdminLogin;
