'use server';

import { getPersonalizedCollegeInsights, type PersonalizedCollegeInsightsInput } from '@/ai/flows/personalized-college-insights';

export async function generateInsights(input: PersonalizedCollegeInsightsInput) {
  try {
    const result = await getPersonalizedCollegeInsights(input);
    return { success: true, insights: result.insights, eligibility: result.eligibility };
  } catch (error) {
    console.error('Error generating insights:', error);
    return { success: false, error: 'Failed to generate insights. Please try again later.' };
  }
}
