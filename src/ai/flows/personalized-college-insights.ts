'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized college insights.
 *
 * The flow takes a student's academic profile as input and returns personalized insights on how well it aligns with each college.
 * It exports:
 * - `getPersonalizedCollegeInsights`: A function to trigger the flow.
 * - `PersonalizedCollegeInsightsInput`: The input type for the flow.
 * - `PersonalizedCollegeInsightsOutput`: The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the personalized college insights flow
const PersonalizedCollegeInsightsInputSchema = z.object({
  gpa: z.number().describe('The student’s GPA.'),
  testScores: z.number().describe('The student’s standardized test scores (e.g., SAT, ACT).'),
  interests: z.string().describe('The student’s academic and extracurricular interests.'),
  collegeDescription: z.string().describe('A description of the college.'),
});
export type PersonalizedCollegeInsightsInput = z.infer<typeof PersonalizedCollegeInsightsInputSchema>;

// Define the output schema for the personalized college insights flow
const PersonalizedCollegeInsightsOutputSchema = z.object({
  insights: z.string().describe('Personalized insights on how well the student’s profile aligns with the college.'),
});
export type PersonalizedCollegeInsightsOutput = z.infer<typeof PersonalizedCollegeInsightsOutputSchema>;

// Define the Genkit prompt
const personalizedCollegeInsightsPrompt = ai.definePrompt({
  name: 'personalizedCollegeInsightsPrompt',
  input: {schema: PersonalizedCollegeInsightsInputSchema},
  output: {schema: PersonalizedCollegeInsightsOutputSchema},
  prompt: `You are an expert college advisor providing personalized insights to students.

  Based on the student's GPA, test scores, and interests, assess how well their profile aligns with the following college:

  College Description: {{{collegeDescription}}}

  Student GPA: {{{gpa}}}
  Student Test Scores: {{{testScores}}}
  Student Interests: {{{interests}}}

  Provide specific insights on the student's fit, highlighting strengths and areas for improvement.
  Focus on academic alignment, extracurricular opportunities, and overall campus culture.
`,
});

// Define the Genkit flow
const personalizedCollegeInsightsFlow = ai.defineFlow(
  {
    name: 'personalizedCollegeInsightsFlow',
    inputSchema: PersonalizedCollegeInsightsInputSchema,
    outputSchema: PersonalizedCollegeInsightsOutputSchema,
  },
  async input => {
    const {output} = await personalizedCollegeInsightsPrompt(input);
    return output!;
  }
);

/**
 * Retrieves personalized college insights based on a student's academic profile.
 *
 * @param input - The input containing the student's GPA, test scores, interests, and college description.
 * @returns A promise that resolves to the personalized college insights.
 */
export async function getPersonalizedCollegeInsights(
  input: PersonalizedCollegeInsightsInput
): Promise<PersonalizedCollegeInsightsOutput> {
  return personalizedCollegeInsightsFlow(input);
}
