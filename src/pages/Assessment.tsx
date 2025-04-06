import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import PageLayout from '@/components/PageLayout';
import { generateRoadmap } from '@/services/geminiService';

const Assessment = () => {
  const navigate = useNavigate();

  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    major: '',
    year: '',
    interests: [] as string[],
    longTermGoals: '',
    shortTermGoals: '',
    currentCourses: [] as string[],
    strengths: [] as string[],
    challenges: [] as string[],
    programmingLanguages: [] as string[],
    techDomainsExplored: [] as string[], 
    explorationPreference: '',

  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle multi-select changes (interests, current courses, etc.)
  const handleMultiInputChange = (name: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (!formData[name as keyof typeof formData].includes(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: [...(prev[name as keyof typeof formData] as string[]), value]
        }));
      }
      e.currentTarget.value = '';
    }
  };

  // Remove item from multi-select array
  const removeItem = (name: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [name]: (prev[name as keyof typeof formData] as string[]).filter((_, i) => i !== index)
    }));
  };

  // Navigate between steps
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the form
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit the form
  const handleSubmit = async () => {
    // Show loading state
    setIsSubmitting(true);
    toast.loading("Generating your personalized roadmap...");

    try {
      // Generate the roadmap using Gemini API
      const roadmapContent = await generateRoadmap(formData);

      // Store the generated roadmap in localStorage to use in the Roadmap page
      localStorage.setItem('generatedRoadmap', roadmapContent);
      localStorage.setItem('userData', JSON.stringify(formData));

      // Show success message
      toast.dismiss();
      toast.success("Assessment completed! Your personalized roadmap is ready.");

      // Navigate to the roadmap page
      navigate('/roadmap');
    } catch (error) {
      console.error('Error in form submission:', error);
      toast.dismiss();
      toast.error("Failed to generate roadmap. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout
      title="Personalized Assessment"
      subtitle="Help us understand your goals and interests to create your custom academic roadmap"
    >
      <div className="max-w-3xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[...Array(totalSteps)].map((_, index) => (
              <div
                key={index}
                className={`w-full ${index > 0 ? 'ml-2' : ''}`}
              >
                <div
                  className={`h-2 rounded-full ${index + 1 <= currentStep ? 'bg-compass-600' : 'bg-gray-200'}`}
                ></div>
              </div>
            ))}
          </div>
          <div className="text-right text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">
              {currentStep === 1 && "Basic Information"}
              {currentStep === 2 && "Technical Skills Background"}
              {currentStep === 3 && "Goals & Aspirations"}
              {currentStep === 4 && "Learning Preferences"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Let's start with some basic information about you."}
              {currentStep === 2 && "Tell us about your current academic situation."}
              {currentStep === 3 && "What are you hoping to achieve?"}
              {currentStep === 4 && "Help us understand how you learn best."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                    Major/Field of Study
                  </label>
                  <Input
                    id="major"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science, Business, etc."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Year
                  </label>
                  <Select
                    value={formData.year}
                    onValueChange={(value) => handleSelectChange('year', value)}
                  >
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select your current year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freshman">Freshman</SelectItem>
                      <SelectItem value="sophomore">Sophomore</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Academic Background */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Programming Languages (Press Enter after each language)
                  </label>
                  <Input
                    onKeyDown={(e) => handleMultiInputChange('programmingLanguages', e)}
                    placeholder="Add a programming language you know"
                  />

                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.programmingLanguages.map((language, index) => (
                      <div
                        key={index}
                        className="bg-compass-100 text-compass-800 px-3 py-1 rounded-full flex items-center"
                      >
                        <span className="mr-1">{language}</span>
                        <button
                          onClick={() => removeItem('programmingLanguages', index)}
                          className="text-compass-600 hover:text-compass-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tech Domains Explored (Press Enter after each domain)
                  </label>
                  <Input
                    onKeyDown={(e) => handleMultiInputChange('techDomainsExplored', e)}
                    placeholder="Add a tech domain you've explored"
                  />

                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.techDomainsExplored.map((domain, index) => (
                      <div
                        key={index}
                        className="bg-compass-100 text-compass-800 px-3 py-1 rounded-full flex items-center"
                      >
                        <span className="mr-1">{domain}</span>
                        <button
                          onClick={() => removeItem('techDomainsExplored', index)}
                          className="text-compass-600 hover:text-compass-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Areas of Interest (Press Enter after each interest)
                  </label>
                  <Input
                    onKeyDown={(e) => handleMultiInputChange('interests', e)}
                    placeholder="Add an area of interest"
                  />

                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.interests.map((interest, index) => (
                      <div
                        key={index}
                        className="bg-compass-100 text-compass-800 px-3 py-1 rounded-full flex items-center"
                      >
                        <span className="mr-1">{interest}</span>
                        <button
                          onClick={() => removeItem('interests', index)}
                          className="text-compass-600 hover:text-compass-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Strengths (Press Enter after each strength)
                  </label>
                  <Input
                    onKeyDown={(e) => handleMultiInputChange('strengths', e)}
                    placeholder="Add an academic strength"
                  />

                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.strengths.map((strength, index) => (
                      <div
                        key={index}
                        className="bg-compass-100 text-compass-800 px-3 py-1 rounded-full flex items-center"
                      >
                        <span className="mr-1">{strength}</span>
                        <button
                          onClick={() => removeItem('strengths', index)}
                          className="text-compass-600 hover:text-compass-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Challenges (Press Enter after each challenge)
                  </label>
                  <Input
                    onKeyDown={(e) => handleMultiInputChange('challenges', e)}
                    placeholder="Add an academic challenge"
                  />

                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.challenges.map((challenge, index) => (
                      <div
                        key={index}
                        className="bg-compass-100 text-compass-800 px-3 py-1 rounded-full flex items-center"
                      >
                        <span className="mr-1">{challenge}</span>
                        <button
                          onClick={() => removeItem('challenges', index)}
                          className="text-compass-600 hover:text-compass-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Goals & Aspirations */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="longTermGoals" className="block text-sm font-medium text-gray-700 mb-1">
                    Long-term Career Goals
                  </label>
                  <Textarea
                    id="longTermGoals"
                    name="longTermGoals"
                    value={formData.longTermGoals}
                    onChange={handleChange}
                    placeholder="Describe your career aspirations after graduation"
                    rows={4}
                  />
                </div>

                <div>
                  <label htmlFor="shortTermGoals" className="block text-sm font-medium text-gray-700 mb-1">
                    Short-term Academic Goals
                  </label>
                  <Textarea
                    id="shortTermGoals"
                    name="shortTermGoals"
                    value={formData.shortTermGoals}
                    onChange={handleChange}
                    placeholder="What do you want to achieve this semester or year?"
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Learning Preferences */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Exploration Style
                  </label>
                  <Select
                    value={formData.explorationPreference}
                    onValueChange={(value) => handleSelectChange('explorationPreference', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project-based">Project-Based Exploration</SelectItem>
                      <SelectItem value="traditional-roadmap">Traditional Roadmap</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <p className="text-center text-gray-600 mb-4">
                    Thank you for completing the assessment! Click "Submit" to generate your personalized roadmap.
                  </p>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || isSubmitting}
            >
              Back
            </Button>

            <Button
              onClick={nextStep}
              className="bg-compass-600 hover:bg-compass-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : currentStep < totalSteps ? 'Next' : 'Submit'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Assessment;

