
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, BookOpen, Video, File, Link as LinkIcon, Clock, Calendar, Star, Bookmark, ExternalLink } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

// Mock data for resources
const mockResources = [
  {
    id: 1,
    title: "Advanced Python Programming",
    description: "Learn advanced Python concepts including decorators, generators, and metaprogramming",
    type: "Online Course",
    provider: "Codecademy",
    relevance: "High",
    duration: "10 hours",
    tags: ["Python", "Programming", "Advanced"],
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Introduction to Machine Learning with Python",
    description: "A practical introduction to machine learning with scikit-learn and TensorFlow",
    type: "Book",
    provider: "O'Reilly Media",
    relevance: "High",
    duration: "Read time: ~15 hours",
    tags: ["Machine Learning", "Python", "AI"],
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "System Design Interview Preparation",
    description: "Comprehensive guide to preparing for system design interviews at tech companies",
    type: "Video Series",
    provider: "YouTube - Tech Learning",
    relevance: "Medium",
    duration: "8 videos, ~4 hours total",
    tags: ["System Design", "Interviews", "Career"],
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Web Application Security Fundamentals",
    description: "Learn how to secure web applications against common vulnerabilities and attacks",
    type: "Workshop Recording",
    provider: "Security+ Conference",
    relevance: "Medium",
    duration: "90 minutes",
    tags: ["Security", "Web Development", "OWASP"],
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Effective Resume Writing for Tech Jobs",
    description: "Tips and templates for creating a standout resume for tech industry positions",
    type: "Guide",
    provider: "Career Center",
    relevance: "High",
    duration: "Read time: 30 minutes",
    tags: ["Career", "Job Search", "Resume"],
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "React and Redux: Building Modern Web Applications",
    description: "Comprehensive course on building scalable web applications with React and Redux",
    type: "Online Course",
    provider: "Frontend Masters",
    relevance: "Medium",
    duration: "12 hours",
    tags: ["React", "Redux", "Web Development"],
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  }
];

// Mock saved resources
const mockSavedResources = [1, 3, 5]; // IDs of saved resources

// Mock reading list
const mockReadingList = [
  {
    id: 1,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    description: "A guide to writing clean, maintainable code",
    relevance: "High",
    type: "Book",
    completed: false,
    imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Gang of Four",
    description: "Classic text on design patterns in software development",
    relevance: "Medium",
    type: "Book",
    completed: false,
    imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Neural Networks and Deep Learning",
    author: "Michael Nielsen",
    description: "Online book on neural networks and deep learning concepts",
    relevance: "High",
    type: "Online Book",
    completed: true,
    imageUrl: "https://images.unsplash.com/photo-1501159599894-155982264a55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  }
];

const Resources = () => {
  const [resources, setResources] = useState(mockResources);
  const [savedResources, setSavedResources] = useState(mockSavedResources);
  const [readingList, setReadingList] = useState(mockReadingList);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterRelevance, setFilterRelevance] = useState("");

  // Helper function to get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Book":
      case "Online Book":
        return <BookOpen className="h-5 w-5" />;
      case "Video Series":
      case "Workshop Recording":
        return <Video className="h-5 w-5" />;
      case "Guide":
        return <File className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };

  // Toggle save resource
  const toggleSaveResource = (id: number) => {
    if (savedResources.includes(id)) {
      setSavedResources(savedResources.filter(resourceId => resourceId !== id));
    } else {
      setSavedResources([...savedResources, id]);
    }
  };

  // Toggle reading list item completion
  const toggleReadingCompletion = (id: number) => {
    setReadingList(readingList.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Filter resources based on search and filters
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === "" || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesType = filterType === "" || resource.type === filterType;
    const matchesRelevance = filterRelevance === "" || resource.relevance === filterRelevance;
      
    return matchesSearch && matchesType && matchesRelevance;
  });

  return (
    <PageLayout
      title="Learning Resources"
      subtitle="Discover curated materials to enhance your academic journey"
    >
      <Tabs defaultValue="discover" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="saved">Saved Resources</TabsTrigger>
          <TabsTrigger value="reading">Reading List</TabsTrigger>
        </TabsList>
        
        {/* Discover Tab */}
        <TabsContent value="discover" className="space-y-6">
          {/* Search and Filter Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search resources, topics, or tags..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Resource Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="Online Course">Online Course</SelectItem>
                      <SelectItem value="Book">Book</SelectItem>
                      <SelectItem value="Video Series">Video Series</SelectItem>
                      <SelectItem value="Workshop Recording">Workshop Recording</SelectItem>
                      <SelectItem value="Guide">Guide</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterRelevance} onValueChange={setFilterRelevance}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Relevance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Relevance</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" className="md:w-auto" onClick={() => {
                    setSearchTerm("");
                    setFilterType("");
                    setFilterRelevance("");
                  }}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map(resource => (
                <Card key={resource.id} className="overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={resource.imageUrl} 
                      alt={resource.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardContent className="flex-grow p-5">
                    <div className="flex items-start justify-between">
                      <div className="bg-compass-100 p-2 rounded">
                        {getTypeIcon(resource.type)}
                      </div>
                      <Badge
                        className={
                          resource.relevance === 'High' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : resource.relevance === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                        }
                      >
                        {resource.relevance} Relevance
                      </Badge>
                    </div>
                    
                    <div className="mt-3">
                      <h3 className="font-medium text-lg line-clamp-2">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{resource.description}</p>
                    </div>
                    
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{resource.duration}</span>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1">
                      {resource.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="text-sm text-gray-500 mt-2">
                      {resource.provider}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-gray-50 px-5 py-3 flex justify-between">
                    <Button size="sm" variant="outline" className="flex items-center">
                      <ExternalLink className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button
                      size="sm"
                      variant={savedResources.includes(resource.id) ? "default" : "outline"}
                      className={savedResources.includes(resource.id) ? "bg-compass-600 hover:bg-compass-700" : ""}
                      onClick={() => toggleSaveResource(resource.id)}
                    >
                      {savedResources.includes(resource.id) ? (
                        <>
                          <Bookmark className="h-4 w-4 mr-1 fill-current" /> Saved
                        </>
                      ) : (
                        <>
                          <Bookmark className="h-4 w-4 mr-1" /> Save
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 p-4 rounded-full">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No resources found</h3>
                <p className="text-gray-500 mt-1 max-w-md mx-auto">
                  Try adjusting your search criteria or filters to find more resources.
                </p>
                <Button 
                  className="mt-4"
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("");
                    setFilterRelevance("");
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Resource Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Categories</CardTitle>
              <CardDescription>Browse resources by topic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                  <div className="bg-compass-100 p-3 rounded-full mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-compass-600">
                      <path d="M9.5 9.5 21 21" />
                      <path d="M20 12v9H3V6c0-1.1.9-2 2-2h5" />
                      <path d="M15 2h4v4" />
                      <path d="M13.1 7.1C13.7 5.8 14.8 5 16 5c2.2 0 4 2.5 4 5.5 0 .3 0 .6-.1.9" />
                    </svg>
                  </div>
                  <span className="text-center">Programming</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                  <div className="bg-compass-100 p-3 rounded-full mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-compass-600">
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                  </div>
                  <span className="text-center">AI & Machine Learning</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                  <div className="bg-compass-100 p-3 rounded-full mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-compass-600">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <span className="text-center">Cybersecurity</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                  <div className="bg-compass-100 p-3 rounded-full mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-compass-600">
                      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm4 13a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H6z" />
                    </svg>
                  </div>
                  <span className="text-center">Career Development</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Saved Resources Tab */}
        <TabsContent value="saved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Saved Resources</CardTitle>
              <CardDescription>
                Access your bookmarked learning materials anytime
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedResources.length > 0 ? (
                <div className="space-y-4">
                  {resources
                    .filter(resource => savedResources.includes(resource.id))
                    .map(resource => (
                      <Card key={resource.id} className="bg-white border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="h-24 w-24 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={resource.imageUrl} 
                                alt={resource.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{resource.title}</h3>
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                                    {resource.description}
                                  </p>
                                </div>
                                <Badge
                                  className={
                                    resource.relevance === 'High' 
                                      ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                      : resource.relevance === 'Medium'
                                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                      : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                                  }
                                >
                                  {resource.relevance}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center mt-2 text-sm text-gray-500">
                                <div className="bg-compass-100 p-1 rounded mr-2">
                                  {getTypeIcon(resource.type)}
                                </div>
                                <span className="mr-3">{resource.type}</span>
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{resource.duration}</span>
                              </div>
                              
                              <div className="mt-3 flex gap-2">
                                <Button size="sm" variant="outline" className="flex items-center">
                                  <ExternalLink className="h-4 w-4 mr-1" /> Open
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:bg-red-50"
                                  onClick={() => toggleSaveResource(resource.id)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                    <Bookmark className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No saved resources</h3>
                  <p className="text-gray-500 mt-1">
                    You haven't saved any resources yet. Browse the Discover section to find resources.
                  </p>
                  <Button 
                    className="mt-4 bg-compass-600 hover:bg-compass-700"
                    onClick={() => {
                      document.querySelector('[value="discover"]')?.dispatchEvent(
                        new MouseEvent('click', { bubbles: true })
                      );
                    }}
                  >
                    Discover Resources
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Recently Viewed */}
          <Card>
            <CardHeader>
              <CardTitle>Recently Viewed</CardTitle>
              <CardDescription>Your recently accessed materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.slice(0, 3).map(resource => (
                  <Card key={resource.id} className="bg-white border-gray-200">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded">
                          {getTypeIcon(resource.type)}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm line-clamp-1">{resource.title}</h4>
                          <p className="text-xs text-gray-500">
                            Viewed 3 days ago
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Reading List Tab */}
        <TabsContent value="reading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Reading List</CardTitle>
              <CardDescription>Track your reading progress</CardDescription>
            </CardHeader>
            <CardContent>
              {readingList.length > 0 ? (
                <div className="space-y-4">
                  {readingList.map(book => (
                    <Card key={book.id} className={`bg-white border-gray-200 ${book.completed ? 'bg-gray-50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="h-32 w-24 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={book.imageUrl} 
                              alt={book.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className={`font-medium ${book.completed ? 'text-gray-500' : ''}`}>
                                  {book.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  by {book.author}
                                </p>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                  {book.description}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <Badge
                                  className={
                                    book.relevance === 'High' 
                                      ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                      : book.relevance === 'Medium'
                                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                      : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                                  }
                                >
                                  {book.relevance}
                                </Badge>
                                {book.completed && (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Completed
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <BookOpen className="h-4 w-4 mr-1" />
                              <span>{book.type}</span>
                            </div>
                            
                            <div className="mt-3 flex gap-2">
                              <Button size="sm" variant="outline" className="flex items-center">
                                <ExternalLink className="h-4 w-4 mr-1" /> View
                              </Button>
                              <Button
                                size="sm"
                                variant={book.completed ? "outline" : "default"}
                                className={!book.completed ? "bg-compass-600 hover:bg-compass-700" : ""}
                                onClick={() => toggleReadingCompletion(book.id)}
                              >
                                {book.completed ? "Mark Unread" : "Mark as Read"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                    <BookOpen className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Your reading list is empty</h3>
                  <p className="text-gray-500 mt-1">
                    Add books and articles to your reading list to track your progress.
                  </p>
                  <Button 
                    className="mt-4 bg-compass-600 hover:bg-compass-700"
                    onClick={() => {
                      document.querySelector('[value="discover"]')?.dispatchEvent(
                        new MouseEvent('click', { bubbles: true })
                      );
                    }}
                  >
                    Find Reading Materials
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Reading Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Reading Stats</CardTitle>
              <CardDescription>Track your learning progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-compass-50 rounded-lg p-4 text-center">
                  <h4 className="font-medium text-compass-700">Total Materials</h4>
                  <p className="text-2xl font-bold text-compass-800 mt-1">{readingList.length}</p>
                  <p className="text-xs text-compass-600 mt-1">In your reading list</p>
                </div>
                
                <div className="bg-compass-50 rounded-lg p-4 text-center">
                  <h4 className="font-medium text-compass-700">Completed</h4>
                  <p className="text-2xl font-bold text-compass-800 mt-1">
                    {readingList.filter(item => item.completed).length}
                  </p>
                  <p className="text-xs text-compass-600 mt-1">Materials read</p>
                </div>
                
                <div className="bg-compass-50 rounded-lg p-4 text-center">
                  <h4 className="font-medium text-compass-700">Completion Rate</h4>
                  <p className="text-2xl font-bold text-compass-800 mt-1">
                    {readingList.length > 0 
                      ? Math.round((readingList.filter(item => item.completed).length / readingList.length) * 100) 
                      : 0}%
                  </p>
                  <p className="text-xs text-compass-600 mt-1">Of your reading list</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Resources;
