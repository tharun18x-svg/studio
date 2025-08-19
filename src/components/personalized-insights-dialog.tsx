"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Bot } from "lucide-react";
import type { College } from "@/lib/types";
import { generateInsights } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";

interface PersonalizedInsightsDialogProps {
  college: College;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  gpa: z.coerce.number().min(0).max(10.0, "GPA must be between 0 and 10.0"),
  testScores: z.coerce.number().min(0).max(1600, "Score must be between 0 and 1600"),
  interests: z.string().min(10, "Please describe your interests.").max(500),
});

export function PersonalizedInsightsDialog({ college, open, onOpenChange }: PersonalizedInsightsDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [insights, setInsights] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gpa: 8.5,
      testScores: 1200,
      interests: "I'm interested in AI, web development, and competitive programming.",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setInsights(null);
    startTransition(async () => {
      const result = await generateInsights({
        ...values,
        collegeDescription: college.description,
      });

      if (result.success) {
        setInsights(result.insights);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
    });
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      // Reset state when dialog closes
      setInsights(null);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Personalized Insights for {college.name}</DialogTitle>
          <DialogDescription>
            Enter your details to get AI-powered insights on your fit with this college.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!insights && !isPending && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gpa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your GPA (out of 10)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="e.g., 8.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="testScores"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Test Score (SAT/Equivalent)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 1400" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic & Extracurricular Interests</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your passions..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isPending}>
                    Generate Insights
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
          {isPending && (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Our AI is analyzing your profile...</p>
            </div>
          )}
          {insights && (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
                </div>
              <ScrollArea className="h-64 w-full rounded-md border p-4">
                <p className="whitespace-pre-wrap text-sm">{insights}</p>
              </ScrollArea>
              <DialogFooter>
                <Button variant="outline" onClick={() => setInsights(null)}>
                  Back to Form
                </Button>
              </DialogFooter>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
