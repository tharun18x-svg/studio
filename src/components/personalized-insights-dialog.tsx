"use client";

import { useState, useTransition, useEffect } from "react";
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
import { Loader2, Bot, CheckCircle, XCircle } from "lucide-react";
import type { College, Course, FilterCategory } from "@/lib/types";
import { generateInsights } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";

interface PersonalizedInsightsDialogProps {
  college: College;
  course: Course;
  filterCategory: FilterCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  percentage: z.coerce.number().min(0).max(100, "Percentage must be between 0 and 100."),
  generalRank: z.coerce.number().min(1, "Please enter a valid rank."),
  cutoff: z.coerce.number().min(0, "Please enter a valid cutoff score."),
  interests: z.string().min(10, "Please describe your interests.").max(500),
});

export function PersonalizedInsightsDialog({ college, course, filterCategory, open, onOpenChange }: PersonalizedInsightsDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [insights, setInsights] = useState<string | null>(null);
  const [eligibility, setEligibility] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      percentage: 85,
      generalRank: 5,
      cutoff: 195,
      interests: "I'm interested in AI, web development, and competitive programming.",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (filterCategory === 'ALL') {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please select a category from the filter on the main page before getting insights.",
        });
        return;
    }

    setInsights(null);
    setEligibility(null);

    startTransition(async () => {
      const result = await generateInsights({
        ...values,
        collegeDescription: college.description,
        collegeRank: college.ranking,
        courseName: course.name,
        courseCutoff: course.cutoffs[filterCategory],
      });

      if (result.success) {
        setInsights(result.insights);
        setEligibility(result.eligibility);
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
      setEligibility(null);
      form.reset();
    }
  };
  
  useEffect(() => {
    if (!open) {
      // Also reset on open prop change
      setInsights(null);
      setEligibility(null);
      form.reset();
    }
  }, [open, form]);


  const handleBackToForm = () => {
    setInsights(null);
    setEligibility(null);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Personalized Insights for {course.name}</DialogTitle>
          <DialogDescription>
            At <span className="font-semibold text-foreground">{college.name}</span>. Enter your details to get AI-powered insights.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!insights && !isPending && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="percentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your 12th Percentage</FormLabel>
                        <FormControl>
                          <Input type="number" step="1" placeholder="e.g., 85" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <FormField
                      control={form.control}
                      name="cutoff"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Cutoff Score</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.5" placeholder="e.g., 195.5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="generalRank"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your General Rank</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
          {insights && eligibility && (
            <div className="space-y-4">
                <Alert variant={eligibility === 'Eligible' ? 'default' : 'destructive'} className={eligibility === 'Eligible' ? 'bg-green-50 border-green-200' : ''}>
                    {eligibility === 'Eligible' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    <AlertTitle className="font-bold">
                        You are {eligibility === 'Eligible' ? 'Eligible' : 'Not Eligible'} for {course.name}
                    </AlertTitle>
                     <AlertDescription>
                        Based on your cutoff for the '{filterCategory}' category.
                    </AlertDescription>
                </Alert>

                <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
                </div>
              <ScrollArea className="h-64 w-full rounded-md border p-4">
                <p className="whitespace-pre-wrap text-sm">{insights}</p>
              </ScrollArea>
              <DialogFooter>
                <Button variant="outline" onClick={handleBackToForm}>
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
