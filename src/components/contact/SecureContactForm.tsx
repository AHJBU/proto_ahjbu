
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertOctagon, CheckCircle, Send } from "lucide-react";

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  // Hidden honeypot field to catch bots
  website: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface SecureContactFormProps {
  recipientEmail?: string;
}

export function SecureContactForm({ recipientEmail = "admin@example.com" }: SecureContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  useEffect(() => {
    return () => {
      // Clean up timeout on unmount
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  async function onSubmit(data: ContactFormValues) {
    // Check if the honeypot field is filled (likely a bot)
    if (data.website) {
      // Fake success without actually submitting
      setIsSubmitting(true);
      const id = setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        form.reset();
      }, 1500);
      setTimeoutId(id);
      return;
    }

    try {
      setIsSubmitting(true);
      
      // In a real app, this would be an API call
      // await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...data, recipientEmail }),
      // });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success handling
      setIsSubmitting(false);
      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });
      
      // Reset success status after 5 seconds
      const id = setTimeout(() => setIsSuccess(false), 5000);
      setTimeoutId(id);
    } catch (error) {
      setIsSubmitting(false);
      
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "Your message could not be sent. Please try again later.",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get in Touch</CardTitle>
        <CardDescription>
          Fill out the form below and I'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot field - hidden from users, but bots might fill it */}
            <div className="hidden">
              <Label htmlFor="website">Website (Leave this empty)</Label>
              <Input
                id="website"
                {...form.register("website")}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Message subject" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your message"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-sm text-muted-foreground">
              Messages will be sent to: {recipientEmail}
            </div>

            <Separator />

            {isSuccess ? (
              <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-md p-4 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <div>
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm">I'll get back to you as soon as possible.</p>
                </div>
              </div>
            ) : (
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            )}

            <div className="text-sm text-muted-foreground mt-4">
              <div className="flex items-center space-x-2 mb-1">
                <AlertOctagon className="h-4 w-4 text-amber-500" />
                <span>Your data is securely processed and never shared with third parties.</span>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
