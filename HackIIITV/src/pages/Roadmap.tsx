import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Clock, Calendar, BookOpen, Award, Users, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

// Mock data for the roadmap (will be replaced with actual data from Gemini)
const mockRoadmapData = {
  name: "Alex Johnson",
  major: "Computer Science",
  progress: 68,
  currentSemester: "Fall 2025",
  shortTermGoals: [
    "Complete Data Structures project with A grade",
    "Join the AI Club and attend at least 3 meetings",
    "Begin research for senior thesis"
  ],
  longTermGoals: [
    "Graduate with honors",
    "Secure internship at a tech company",
    "Develop portfolio of 3 full-stack applications"
  ],
  recommendedCourses: [
    {
      id: 1,
      name: "Advanced Algorithms",
      description: "Deep dive into complex algorithm design and analysis",
      relevance: "High",
      semester: "Spring 2026"
    },
    {
      id: 2,
      name: "Machine Learning Fundamentals",
      description: "Introduction to ML concepts and applications",
      relevance: "High",
      semester: "Spring 2026"
    },
    {
      id: 3,
      name: "UI/UX Design Principles",
      description: "Learn to create intuitive and engaging user interfaces",
      relevance: "Medium",
      semester: "Fall 2026"
    }
  ],
  recommendedActivities: [
    {
      id: 1,
      name: "Hackathon",
      description: "Annual coding competition hosted by the CS department",
      date: "October 15-17, 2025",
      relevance: "High"
    },
    {
      id: 2,
      name: "AI Club Weekly Meeting",
      description: "Discussion on recent advances in natural language processing",
      date: "Every Wednesday, 5PM",
      relevance: "High"
    },
    {
      id: 3,
      name: "Industry Speaker Series",
      description: "Talk by Senior Engineer from Google Cloud",
      date: "November 5, 2025",
      relevance: "Medium"
    }
  ],
  mentors: [
    {
      id: 1,
      name: "Prof X",
      role: "Professor, AI Research",
      expertise: "Machine Learning, Neural Networks",
      availability: "Office hours: Tuesdays 2-4PM"
    },
    {
      id: 2,
      name: "Person X",
      role: "Senior Student, Teaching Assistant",
      expertise: "Web Development, Algorithms",
      availability: "Available for peer mentoring M/W/F"
    },
    {
      id: 3,
      name: "Person Y",
      role: "Alumni, Software Engineer at Microsoft",
      expertise: "Cloud Computing, System Design",
      availability: "Virtual meetings by appointment"
    }
  ],
  resources: [
    {
      id: 1,
      title: "Advanced Python Programming",
      type: "Online Course",
      provider: "Codecademy",
      relevance: "High"
    },
    {
      id: 2,
      title: "Introduction to Machine Learning with Python",
      type: "Book",
      provider: "O'Reilly Media",
      relevance: "High"
    },
    {
      id: 3,
      title: "System Design Interview Preparation",
      type: "Video Series",
      provider: "YouTube - Tech Learning",
      relevance: "Medium"
    }
  ]
};

const Roadmap = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [roadmapHtml, setRoadmapHtml] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Retrieve the generated roadmap from localStorage
    const storedRoadmap = localStorage.getItem('generatedRoadmap');
    const storedUserData = localStorage.getItem('userData');

    if (storedRoadmap) {
      setRoadmapHtml(storedRoadmap);
    }

    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);

        const explorationPreference = parsedData.explorationPreference;
        console.log("Exploration Preference:", explorationPreference);

      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
  }, []);

  return (
    <PageLayout
      title="Your Academic Roadmap"
      subtitle="Your personalized pathway to academic and career success"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar with student info and progress */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Tracking your academic journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {userData?.name || mockRoadmapData.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {userData?.major || mockRoadmapData.major}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span className="font-medium">{mockRoadmapData.progress}%</span>
                  </div>
                  <Progress value={mockRoadmapData.progress} className="h-2" />
                </div>

                <div className="pt-2 space-y-3">
                  <h4 className="text-sm font-medium">Short-term Goals</h4>
                  <ul className="space-y-2">
                    {(userData?.shortTermGoals
                      ? [userData.shortTermGoals]
                      : mockRoadmapData.shortTermGoals).map((goal: string, index: number) => (
                        <li key={index} className="flex items-start text-sm">
                          <ChevronRight className="h-4 w-4 mr-2 text-compass-500 shrink-0 mt-0.5" />
                          <span>{goal}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="pt-2 space-y-3">
                  <h4 className="text-sm font-medium">Long-term Goals</h4>
                  <ul className="space-y-2">
                    {(userData?.longTermGoals
                      ? [userData.longTermGoals]
                      : mockRoadmapData.longTermGoals).map((goal: string, index: number) => (
                        <li key={index} className="flex items-start text-sm">
                          <ChevronRight className="h-4 w-4 mr-2 text-compass-500 shrink-0 mt-0.5" />
                          <span>{goal}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    <Link to="/planner" className="flex items-center justify-center w-full">
                      Go to Daily Planner <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area with tabs */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Academic Pathway</CardTitle>
                  <CardDescription>
                    Current semester: {mockRoadmapData.currentSemester}
                  </CardDescription>
                </div>
                <Button className="bg-compass-600 hover:bg-compass-700">Update Progress</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="mentors">Mentors</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                {/* Overview Tab - Now with Gemini-generated content */}
                <TabsContent value="overview" className="space-y-6">
                  {roadmapHtml ? (
                    <div className="roadmap-content prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: roadmapHtml }}>
                    </div>
                  ) : (
                    // Fallback to the existing overview UI if no generated content
                    <>
                      <div>
                        <h3 className="text-lg font-medium mb-3">Upcoming Activities</h3>
                        <div className="space-y-3">
                          {mockRoadmapData.recommendedActivities.slice(0, 2).map(activity => (
                            <Card key={activity.id} className="bg-white border border-gray-100">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium">{activity.name}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                  </div>
                                  <div className="bg-compass-100 px-2 py-1 rounded text-xs text-compass-700">
                                    {activity.relevance} Relevance
                                  </div>
                                </div>
                                <div className="flex items-center mt-3 text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{activity.date}</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          <Button variant="ghost" size="sm" className="text-compass-600">
                            View All Activities
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">Recommended Courses</h3>
                        <div className="space-y-3">
                          {mockRoadmapData.recommendedCourses.slice(0, 2).map(course => (
                            <Card key={course.id} className="bg-white border border-gray-100">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium">{course.name}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                                  </div>
                                  <div className="bg-compass-100 px-2 py-1 rounded text-xs text-compass-700">
                                    {course.relevance} Relevance
                                  </div>
                                </div>
                                <div className="flex items-center mt-3 text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{course.semester}</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          <Button variant="ghost" size="sm" className="text-compass-600">
                            View All Courses
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">Featured Resources</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {mockRoadmapData.resources.slice(0, 2).map(resource => (
                            <Card key={resource.id} className="bg-white border border-gray-100">
                              <CardContent className="p-4">
                                <div className="flex items-start">
                                  <div className="bg-compass-100 p-2 rounded mr-3">
                                    <BookOpen className="h-4 w-4 text-compass-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm">{resource.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {resource.type} • {resource.provider}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="text-compass-600 mt-3">
                          View All Resources
                        </Button>
                      </div>
                    </>
                  )}
                </TabsContent>

                {/* Courses Tab */}
                <TabsContent value="courses" className="space-y-4">
                  <h3 className="text-lg font-medium mb-2">Recommended Courses</h3>
                  <div className="space-y-4">
                    {mockRoadmapData.recommendedCourses.map(course => (
                      <Card key={course.id} className="bg-white border border-gray-100">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{course.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                              <div className="flex items-center mt-3 text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>Recommended for: {course.semester}</span>
                              </div>
                            </div>
                            <div className="bg-compass-100 px-2 py-1 rounded text-xs text-compass-700">
                              {course.relevance} Relevance
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-3">
                            <Button size="sm" className="bg-compass-600 hover:bg-compass-700">
                              Add to Plan
                            </Button>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-compass-50 rounded-lg p-4 mt-6">
                    <div className="flex items-start space-x-3">
                      <div className="bg-compass-100 p-2 rounded-full">
                        <Award className="h-5 w-5 text-compass-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-compass-800">Course Suggestion</h4>
                        <p className="text-sm text-compass-700 mt-1">
                          Based on your interests in AI and machine learning, consider adding "Deep Learning Applications" to your future courses.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Mentors Tab */}
                <TabsContent value="mentors" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Recommended Mentors</h3>
                    <Button size="sm" className="bg-compass-600 hover:bg-compass-700">
                      Find More Mentors
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {mockRoadmapData.mentors.map(mentor => (
                      <Card key={mentor.id} className="bg-white border border-gray-100">
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <div className="bg-compass-100 p-3 rounded-full mr-4">
                              <Users className="h-5 w-5 text-compass-600" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{mentor.name}</h4>
                                  <p className="text-sm text-gray-500">{mentor.role}</p>
                                </div>
                              </div>
                              <p className="text-sm mt-2">
                                <span className="font-medium">Expertise:</span> {mentor.expertise}
                              </p>
                              <p className="text-sm mt-1">
                                <span className="font-medium">Availability:</span> {mentor.availability}
                              </p>
                              <div className="mt-4 flex space-x-3">
                                <Button size="sm" className="bg-compass-600 hover:bg-compass-700">
                                  Request Mentoring
                                </Button>
                                <Button size="sm" variant="outline">
                                  View Profile
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-500 mb-2">Don't see a mentor that matches your needs?</p>
                    <Button variant="outline" size="sm">
                      Request a Specific Mentor
                    </Button>
                  </div>
                </TabsContent>

                {/* Resources Tab */}
                <TabsContent value="resources" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Learning Resources</h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Filter
                      </Button>
                      <Button size="sm" className="bg-compass-600 hover:bg-compass-700">
                        Add to Library
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mockRoadmapData.resources.map(resource => (
                      <Card key={resource.id} className="bg-white border border-gray-100">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <div className="bg-compass-100 p-2 rounded mr-3">
                                <BookOpen className="h-4 w-4 text-compass-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">{resource.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">
                                  {resource.type} • {resource.provider}
                                </p>
                              </div>
                            </div>
                            <div className="bg-compass-100 px-2 py-1 rounded text-xs text-compass-700">
                              {resource.relevance} Relevance
                            </div>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                              Save
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                              Access
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-compass-50 rounded-lg p-4 mt-2">
                    <div className="flex items-start space-x-3">
                      <div className="bg-compass-100 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-compass-600">
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-compass-800">Resource Suggestion</h4>
                        <p className="text-sm text-compass-700 mt-1">
                          Based on your search history, we recommend exploring "Advanced Data Structures in Python" on the university library's digital collection.
                        </p>
                        <Button size="sm" variant="link" className="px-0 text-compass-600 mt-1">
                          View Suggestion
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Roadmap;
