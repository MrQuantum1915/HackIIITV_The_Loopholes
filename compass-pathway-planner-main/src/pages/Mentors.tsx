
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, Award, Users, BookOpen, Calendar, MessageSquare, ExternalLink, Mail } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

// Mock data for mentors
const mockMentors = [
  {
    id: 1,
    name: "Naveen Kumar",
    role: "Professor",
    department: "Computer Science",
    expertise: ["Information security and privacy", " Cloud computing"],
    experience: "15+ years",
    availability: "Moderate",
    bio: "Dr. Chen is an expert in AI and machine learning with extensive industry experience at Google Research. She has published over 50 papers in top conferences and journals.",
    education: "Ph.D. in Computer Science, Stanford University",
    match: "High",
    image: "https://iiitvadodara.ac.in/assets/images/naveenkumar-500x333.jpg"
  },
  {
    id: 2,
    name: "Dhirendra Sinha",
    role: "Assistant Professorr",
    department: "Electrical Engineering",
    expertise: ["condensed matter physicist","optoelectronic devices"],
    experience: "10+ years",
    availability: "High",
    bio: "Prof. Rodriguez specializes in embedded systems and robotics. Prior to academia, he worked at NASA's Jet Propulsion Laboratory developing systems for Mars rovers.",
    education: "Ph.D. in Electrical Engineering, MIT",
    match: "Medium",
    image: "https://iiitvadodara.ac.in/assets/images/dhirendrasinha-500x333.jpg"
  },
  {
    id: 3,
    name: "Ravi Nahta",
    role: "Assistant Professor",
    department: "Computer Science",
    expertise: ["Recommender Systems", "Machine Learning"," Deep Learning", "Generative Modeling"],
    experience: "3+ years",
    availability: "High",
    bio: "James is a senior computer science student with experience in full-stack development. He has interned at Microsoft and currently serves as a teaching assistant for Algorithm Design courses.",
    education: "B.S. Computer Science (Senior Year)",
    match: "High",
    image: "https://iiitvadodara.ac.in/assets/images/ravi_nahta.jpeg"
  },
  {
    id: 4,
    name: "Darshan Patel",
    role: "Alumni",
    department: "Software Engineering",
    expertise: ["Cloud Computing", "System Design", "DevOps"],
    experience: "5+ years",
    availability: "Low",
    bio: "Darshan is a software engineer at Google in Google Deepmind. He graduated 5 years ago and has since built expertise in ML, Deep Learning.",
    education: "B.Tech, IIIT Vadodara",
    match: "Medium",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_3BNZw4G45qsnyRTopol8ESLnkfejmN_WcA&s"
  },
  {
    id: 5,
    name: "Abhishek Pandey",
    role: "3rd Year Student",
    department: "Computer Science",
    expertise: ["Big Data Analytics", "Statistical Modeling", "Data Visualization"],
    experience: "1+ years",
    availability: "Moderate",
    bio: "Abhishek specializes in big data analytics and statistical modeling. He leads the university's Data Science Research Group and collaborates with major tech companies on data-driven projects.",
    education: "B.Tech, IIIT Vadodara",
    match: "Medium",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_3BNZw4G45qsnyRTopol8ESLnkfejmN_WcA&s"
  },
  {
    id: 6,
    name: "Person",
    role: "Industry Expert",
    department: "UX Design",
    expertise: ["User Research", "Product Design", "Interaction Design"],
    experience: "8+ years",
    availability: "Low",
    bio: "He is a lead UX designer at Adobe with extensive experience in product design and user research. He guest lectures occasionally and provides portfolio reviews for graduating students.",
    education: "M.F.A. in Interaction Design, RISD",
    match: "Low",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_3BNZw4G45qsnyRTopol8ESLnkfejmN_WcA&s"
  }
];

// Mock mentorship requests
const mockMentorshipRequests = [
  {
    id: 1,
    mentorName: "Dr. Sarah Chen",
    status: "Pending",
    topic: "Machine Learning Project Guidance",
    message: "I'm working on a neural network project and would appreciate your insights on model optimization.",
    requestDate: "2025-04-01",
    profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_3BNZw4G45qsnyRTopol8ESLnkfejmN_WcA&s"
  },
  {
    id: 2,
    mentorName: "James Wilson",
    status: "Accepted",
    topic: "Web Development Career Advice",
    message: "I'd like to discuss career paths in web development and get feedback on my portfolio.",
    requestDate: "2025-03-28",
    meetingDate: "2025-04-10, 3:00 PM",
    profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_3BNZw4G45qsnyRTopol8ESLnkfejmN_WcA&s"
  }
];

const Mentors = () => {
  const { toast } = useToast();
  const [mentors, setMentors] = useState(mockMentors);
  const [mentorshipRequests, setMentorshipRequests] = useState(mockMentorshipRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [filterExpertise, setFilterExpertise] = useState("");
  const [mentorRequesting, setMentorRequesting] = useState<any>(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestTopic, setRequestTopic] = useState("");
  
  const handleMentorRequest = () => {
    if (!requestTopic.trim()) {
      toast({
        title: "Topic required",
        description: "Please provide a topic for your mentorship request",
        variant: "destructive",
      });
      return;
    }
    
    const newRequest = {
      id: mentorshipRequests.length + 1,
      mentorName: mentorRequesting.name,
      status: "Pending",
      topic: requestTopic,
      message: requestMessage,
      requestDate: new Date().toISOString().split('T')[0],
      profileImage: mentorRequesting.image
    };
    
    setMentorshipRequests([...mentorshipRequests, newRequest]);
    setMentorRequesting(null);
    setRequestMessage("");
    setRequestTopic("");
    
    toast({
      title: "Request submitted",
      description: `Your mentorship request has been sent to ${mentorRequesting.name}`,
    });
  };
  
  // Filter mentors based on search and filters
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = searchTerm === "" || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesDepartment = filterDepartment === "all" || 
      mentor.department === filterDepartment;
      
    const matchesAvailability = filterAvailability === "all" || 
      mentor.availability === filterAvailability;
      
    const matchesExpertise = filterExpertise === "" || 
      mentor.expertise.some(skill => skill.toLowerCase().includes(filterExpertise.toLowerCase()));
      
    return matchesSearch && matchesDepartment && matchesAvailability && matchesExpertise;
  });
  
  return (
    <PageLayout
      title="Find Mentors"
      subtitle="Connect with professors, alumni, and senior students for guidance"
    >
      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Mentors</TabsTrigger>
          <TabsTrigger value="requests">My Requests</TabsTrigger>
        </TabsList>
        
        {/* Browse Mentors Tab */}
        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filter Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by name, expertise, or keywords..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                      <SelectItem value="UX Design">UX Design</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Availability</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" className="md:w-auto" onClick={() => {
                    setSearchTerm("");
                    setFilterDepartment("all");
                    setFilterAvailability("all");
                    setFilterExpertise("");
                  }}>
                    <Filter className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Mentors List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.length > 0 ? (
              filteredMentors.map(mentor => (
                <Card key={mentor.id} className="overflow-hidden">
                  <div className="bg-compass-50 h-12"></div>
                  <div className="px-6 pt-0 pb-6">
                    <div className="flex justify-center -mt-10">
                      <div className="rounded-full ring-4 ring-white overflow-hidden h-20 w-20">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="text-center mt-3">
                      <h3 className="font-semibold text-lg">{mentor.name}</h3>
                      <p className="text-gray-600 text-sm">{mentor.role}, {mentor.department}</p>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-1 justify-center">
                      {mentor.expertise.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-compass-50 text-compass-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4 text-center text-sm">
                      <div>
                        <p className="text-gray-500">Experience</p>
                        <p className="font-medium">{mentor.experience}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Availability</p>
                        <p className="font-medium">{mentor.availability}</p>
                      </div>
                    </div>
                    
                    <div className="mt-5 flex justify-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="bg-compass-600 hover:bg-compass-700"
                            onClick={() => setMentorRequesting(mentor)}
                          >
                            Request Mentorship
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Request Mentorship</DialogTitle>
                            <DialogDescription>
                              Send a mentorship request to {mentorRequesting?.name}. Please provide details about what you're looking for.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="flex items-center space-x-3 py-4">
                            <div className="h-12 w-12 rounded-full overflow-hidden">
                              <img 
                                src={mentorRequesting?.image} 
                                alt={mentorRequesting?.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{mentorRequesting?.name}</h4>
                              <p className="text-sm text-gray-500">
                                {mentorRequesting?.role}, {mentorRequesting?.department}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="topic">Mentorship Topic</Label>
                              <Input
                                id="topic"
                                placeholder="e.g. Career guidance, Project help, etc."
                                value={requestTopic}
                                onChange={(e) => setRequestTopic(e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="message">Message</Label>
                              <Textarea
                                id="message"
                                placeholder="Introduce yourself and explain what you're looking for help with..."
                                rows={4}
                                value={requestMessage}
                                onChange={(e) => setRequestMessage(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setMentorRequesting(null)}>
                              Cancel
                            </Button>
                            <Button 
                              className="bg-compass-600 hover:bg-compass-700"
                              onClick={handleMentorRequest}
                            >
                              Send Request
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 p-4 rounded-full">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No mentors found</h3>
                <p className="text-gray-500 mt-1 max-w-md mx-auto">
                  Try adjusting your search criteria or filters to find more mentors.
                </p>
                <Button 
                  className="mt-4"
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterDepartment("");
                    setFilterAvailability("");
                    setFilterExpertise("");
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Mentor Match Explanation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-compass-600" />
                How Mentor Matching Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p>
                  Our mentor matching system connects you with faculty, alumni, and senior students who can help guide your academic and career journey.
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <span className="bg-compass-100 text-compass-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
                    <span>We analyze your academic profile, interests, and goals to identify potential mentors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-compass-100 text-compass-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
                    <span>Mentors with high availability and relevant expertise are prioritized</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-compass-100 text-compass-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</span>
                    <span>You can request mentorship through the platform and schedule meetings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-compass-100 text-compass-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">4</span>
                    <span>Regular check-ins help ensure the mentorship is beneficial for both parties</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="p-0 text-compass-600">
                Learn more about our mentorship program <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* My Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Mentorship Requests</CardTitle>
              <CardDescription>Track and manage your mentorship connections</CardDescription>
            </CardHeader>
            <CardContent>
              {mentorshipRequests.length > 0 ? (
                <div className="space-y-4">
                  {mentorshipRequests.map(request => (
                    <Card key={request.id} className="bg-white border">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-4">
                            <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                              <img 
                                src={request.profileImage} 
                                alt={request.mentorName}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{request.mentorName}</h4>
                              <p className="text-sm text-compass-700 mt-0.5">{request.topic}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Requested on {request.requestDate}
                              </p>
                            </div>
                          </div>
                          
                          <Badge
                            className={
                              request.status === 'Accepted' 
                                ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                : request.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                : 'bg-red-100 text-red-800 hover:bg-red-100'
                            }
                          >
                            {request.status}
                          </Badge>
                        </div>
                        
                        <div className="mt-3 text-sm text-gray-600">
                          <p>{request.message}</p>
                        </div>
                        
                        {request.status === 'Accepted' && request.meetingDate && (
                          <div className="mt-3 bg-green-50 text-green-700 p-2 rounded text-sm flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Meeting scheduled for {request.meetingDate}</span>
                          </div>
                        )}
                        
                        <div className="mt-4 flex space-x-2">
                          {request.status === 'Accepted' ? (
                            <>
                              <Button variant="outline" size="sm" className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1" /> Message
                              </Button>
                              <Button size="sm" className="bg-compass-600 hover:bg-compass-700">
                                <Calendar className="h-4 w-4 mr-1" /> Schedule
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="outline" size="sm">Cancel Request</Button>
                              <Button variant="outline" size="sm" className="flex items-center">
                                <Mail className="h-4 w-4 mr-1" /> Follow Up
                              </Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No mentorship requests</h3>
                  <p className="text-gray-500 mt-1">
                    You haven't requested any mentorships yet. Browse mentors to get started.
                  </p>
                  <Button 
                    className="mt-4 bg-compass-600 hover:bg-compass-700"
                    onClick={() => {
                      document.querySelector('[value="browse"]')?.dispatchEvent(
                        new MouseEvent('click', { bubbles: true })
                      );
                    }}
                  >
                    Find Mentors
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Mentorship Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Making the Most of Mentorship</CardTitle>
              <CardDescription>Tips for successful mentor-mentee relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-compass-50 p-4 rounded-lg">
                  <div className="bg-compass-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <BookOpen className="h-5 w-5 text-compass-700" />
                  </div>
                  <h4 className="font-medium mb-2">Come Prepared</h4>
                  <p className="text-sm text-gray-600">
                    Prepare specific questions and topics to discuss. This shows respect for your mentor's time.
                  </p>
                </div>
                
                <div className="bg-compass-50 p-4 rounded-lg">
                  <div className="bg-compass-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <Calendar className="h-5 w-5 text-compass-700" />
                  </div>
                  <h4 className="font-medium mb-2">Be Consistent</h4>
                  <p className="text-sm text-gray-600">
                    Regular meetings help build rapport. Stick to scheduled times and follow through on commitments.
                  </p>
                </div>
                
                <div className="bg-compass-50 p-4 rounded-lg">
                  <div className="bg-compass-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <MessageSquare className="h-5 w-5 text-compass-700" />
                  </div>
                  <h4 className="font-medium mb-2">Be Receptive</h4>
                  <p className="text-sm text-gray-600">
                    Be open to feedback, even when it's challenging. Growth often comes from constructive criticism.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Mentors;
