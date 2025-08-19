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
  percentage: z.number().describe("The student's percentage in 12th grade."),
  generalRank: z.number().describe("The student's general rank."),
  cutoff: z.number().describe("The student's cutoff score."),
  interests: z.string().describe('The student’s academic and extracurricular interests.'),
  collegeDescription: z.string().describe('A description of the college.'),
  collegeRank: z.number().describe('The ranking of the college.'),
  courseName: z.string().describe('The name of the course.'),
  courseCutoff: z.number().describe('The cutoff score for the selected category in the course.'),
});
export type PersonalizedCollegeInsightsInput = z.infer<typeof PersonalizedCollegeInsightsInputSchema>;

// Define the output schema for the personalized college insights flow
const PersonalizedCollegeInsightsOutputSchema = z.object({
  eligibility: z.string().describe("A statement on whether the student is eligible for the course based on their cutoff score. It should be either 'Eligible' or 'Not Eligible'."),
  insights: z.string().describe('Personalized insights on how well the student’s profile aligns with the college and course.'),
});
export type PersonalizedCollegeInsightsOutput = z.infer<typeof PersonalizedCollegeInsightsOutputSchema>;

// Define the Genkit prompt
const personalizedCollegeInsightsPrompt = ai.definePrompt({
  name: 'personalizedCollegeInsightsPrompt',
  input: {schema: PersonalizedCollegeInsightsInputSchema},
  output: {schema: PersonalizedCollegeInsightsOutputSchema},
  prompt: `You are an expert college advisor providing personalized insights to students.

  First, determine if the student is eligible for the course. A student is eligible if their cutoff score is greater than or equal to the course's cutoff for the selected category.
  Based on this, set the 'eligibility' field to 'Eligible' or 'Not Eligible'.

  Next, based on the student's percentage in 12th grade and interests, assess how well their profile aligns with the following college and course, regardless of their eligibility.

  College Description: {{{collegeDescription}}}
  College Rank: {{{collegeRank}}}
  Course Name: {{{courseName}}}
  Course Cutoff for Category: {{{courseCutoff}}}

  Student 12th Percentage: {{{percentage}}}
  Student General Rank: {{{generalRank}}}
  Student Cutoff: {{{cutoff}}}
  Student Interests: {{{interests}}}

  Provide specific insights on the student's fit, highlighting strengths and areas for improvement.
  Focus on academic alignment for the specific course, extracurricular opportunities in the college, and overall campus culture.
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
 * @param input - The input containing the student's profile and college/course data.
 * @returns A promise that resolves to the personalized college insights.
 */
export async function getPersonalizedCollegeInsights(
  input: PersonalizedCollegeInsightsInput
): Promise<PersonalizedCollegeInsightsOutput> {
  return personalizedCollegeInsightsFlow(input);
}
