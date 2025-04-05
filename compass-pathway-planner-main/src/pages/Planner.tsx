
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CalendarPlus, Clock, CheckCircle, Circle, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import PageLayout from '@/components/PageLayout';

// Mock data for the planner
const mockTasks = [
  {
    id: 1,
    title: "Data Structures Assignment",
    description: "Complete questions 1-5 for Chapter 7",
    dueDate: "2025-04-10T23:59:00",
    priority: "high",
    category: "academic",
    completed: false
  },
  {
    id: 2,
    title: "Study Session - Algorithms",
    description: "Review dynamic programming concepts",
    dueDate: "2025-04-07T14:30:00",
    priority: "medium",
    category: "academic",
    completed: false
  },
  {
    id: 3,
    title: "AI Club Meeting",
    description: "Introduction to reinforcement learning",
    dueDate: "2025-04-08T17:00:00",
    priority: "medium",
    category: "extracurricular",
    completed: false
  },
  {
    id: 4,
    title: "Career Center Appointment",
    description: "Resume review with career counselor",
    dueDate: "2025-04-09T10:00:00",
    priority: "high",
    category: "career",
    completed: false
  },
  {
    id: 5,
    title: "JavaScript Tutorial",
    description: "Complete sections on async/await",
    dueDate: "2025-04-07T23:59:00",
    priority: "low",
    category: "skill-building",
    completed: true
  }
];

// Mock event recommendations
const mockEvents = [
  {
    id: 1,
    title: "Tech Industry Panel",
    description: "Representatives from Google, Microsoft and Amazon discussing career paths",
    date: "2025-04-12T15:00:00",
    location: "Engineering Building, Room 302",
    relevance: "High"
  },
  {
    id: 2,
    title: "Hackathon Information Session",
    description: "Learn about the upcoming campus hackathon and how to participate",
    date: "2025-04-15T17:30:00",
    location: "Computer Science Building, Auditorium",
    relevance: "High"
  },
  {
    id: 3,
    title: "Research Symposium",
    description: "Undergraduate student research presentations",
    date: "2025-04-20T13:00:00",
    location: "Student Center, Grand Hall",
    relevance: "Medium"
  }
];

const Planner = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState(mockTasks);
  const [events, setEvents] = useState(mockEvents);
  const [date, setDate] = useState<Date>(new Date());
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium',
    category: 'academic'
  });

  const categoriesMap = {
    academic: { label: "Academic", color: "bg-blue-100 text-blue-800" },
    extracurricular: { label: "Extracurricular", color: "bg-purple-100 text-purple-800" },
    career: { label: "Career", color: "bg-green-100 text-green-800" },
    "skill-building": { label: "Skill Building", color: "bg-orange-100 text-orange-800" },
    personal: { label: "Personal", color: "bg-pink-100 text-pink-800" }
  };

  const priorityMap = {
    high: { label: "High", color: "bg-red-100 text-red-800" },
    medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
    low: { label: "Low", color: "bg-green-100 text-green-800" }
  };

  const handleAddTask = () => {
    if (!newTask.title) {
      toast({
        title: "Task title required",
        description: "Please provide a title for your task",
        variant: "destructive",
      });
      return;
    }

    const task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate.toISOString(),
      priority: newTask.priority,
      category: newTask.category,
      completed: false
    };

    setTasks([...tasks, task]);
    setIsAddingTask(false);
    setNewTask({
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium',
      category: 'academic'
    });

    toast({
      title: "Task added",
      description: "Your task has been added to the planner",
    });
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filterTasksByDate = (tasks: any[]) => {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate >= selectedDate && taskDate < nextDay;
    });
  };

  const filteredTasks = filterTasksByDate(tasks);

  const sortTasks = (tasks: any[]) => {
    return [...tasks].sort((a, b) => {
      // First sort by completion status
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      
      // Then by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    });
  };

  const sortedTasks = sortTasks(filteredTasks);

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoWeeksFromNow = new Date(today);
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
    
    return eventDate >= today && eventDate <= twoWeeksFromNow;
  });

  return (
    <PageLayout
      title="Daily Planner"
      subtitle="Organize your tasks and stay on track with your goals"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar and Task Management */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Schedule</CardTitle>
                <CardDescription>
                  Viewing tasks for {format(date, "MMMM d, yyyy")}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center justify-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(date, "MMMM d")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
                  <DialogTrigger asChild>
                    <Button className="bg-compass-600 hover:bg-compass-700">
                      <CalendarPlus className="mr-2 h-4 w-4" />
                      Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                      <DialogDescription>
                        Create a new task for your planner.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="task-title">Title</Label>
                        <Input 
                          id="task-title"
                          value={newTask.title}
                          onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                          placeholder="Enter task title"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="task-description">Description (optional)</Label>
                        <Textarea 
                          id="task-description"
                          value={newTask.description}
                          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                          placeholder="Add details about this task"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Due Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {format(newTask.dueDate, "PPP")}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComponent
                                mode="single"
                                selected={newTask.dueDate}
                                onSelect={(date) => date && setNewTask({...newTask, dueDate: date})}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Priority</Label>
                          <Select
                            value={newTask.priority}
                            onValueChange={(value) => setNewTask({...newTask, priority: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High Priority</SelectItem>
                              <SelectItem value="medium">Medium Priority</SelectItem>
                              <SelectItem value="low">Low Priority</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                          value={newTask.category}
                          onValueChange={(value) => setNewTask({...newTask, category: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="extracurricular">Extracurricular</SelectItem>
                            <SelectItem value="career">Career</SelectItem>
                            <SelectItem value="skill-building">Skill Building</SelectItem>
                            <SelectItem value="personal">Personal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-compass-600 hover:bg-compass-700" onClick={handleAddTask}>
                        Add Task
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {sortedTasks.length > 0 ? (
                  sortedTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-start p-3 rounded-lg border ${
                        task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="mr-3 pt-0.5">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskCompletion(task.id)}
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex flex-wrap gap-2 mb-1">
                          <span className={`text-xs px-2 py-1 rounded ${categoriesMap[task.category as keyof typeof categoriesMap].color}`}>
                            {categoriesMap[task.category as keyof typeof categoriesMap].label}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${priorityMap[task.priority as keyof typeof priorityMap].color}`}>
                            {priorityMap[task.priority as keyof typeof priorityMap].label}
                          </span>
                        </div>
                        
                        <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </h4>
                        
                        {task.description && (
                          <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{format(new Date(task.dueDate), "h:mm a")}</span>
                        </div>
                      </div>
                      
                      <div className="ml-3">
                        <Button variant="ghost" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                            <path d="M12 20h9"/>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                          </svg>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-compass-50 mb-4">
                      <Calendar className="h-6 w-6 text-compass-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No tasks for today</h3>
                    <p className="text-gray-500 mt-1">Create a new task to get started</p>
                    <Button 
                      className="mt-4 bg-compass-600 hover:bg-compass-700"
                      onClick={() => setIsAddingTask(true)}
                    >
                      Add Your First Task
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">
                {sortedTasks.filter(t => !t.completed).length} tasks remaining
              </p>
              <Button variant="link" size="sm" className="text-compass-600">
                View All Tasks
              </Button>
            </CardFooter>
          </Card>
          
          {/* Progress Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Progress</CardTitle>
              <CardDescription>Track your accomplishments for the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Tasks Completed</span>
                    <span className="text-sm text-gray-500">
                      {tasks.filter(t => t.completed).length}/{tasks.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-compass-600 h-2 rounded-full"
                      style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-compass-50 rounded-lg p-4 text-center">
                    <h4 className="font-medium text-compass-700">Focus Time</h4>
                    <p className="text-2xl font-bold text-compass-800 mt-1">2.5 hrs</p>
                    <p className="text-xs text-compass-600 mt-1">Today's study sessions</p>
                  </div>
                  
                  <div className="bg-compass-50 rounded-lg p-4 text-center">
                    <h4 className="font-medium text-compass-700">Productivity</h4>
                    <p className="text-2xl font-bold text-compass-800 mt-1">85%</p>
                    <p className="text-xs text-compass-600 mt-1">Based on task completion</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar with recommendations */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Events</CardTitle>
              <CardDescription>Upcoming events related to your interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="bg-white border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">{event.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        event.relevance === 'High' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.relevance} Match
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center mt-3 text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="mr-3">{format(new Date(event.date), "MMMM d, h:mm a")}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-1">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {event.location}
                    </p>
                    
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" className="bg-compass-600 hover:bg-compass-700">
                        Add to Calendar
                      </Button>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full text-compass-600">
                View All Recommended Events
              </Button>
            </CardFooter>
          </Card>
          
          {/* Study Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Focus Tip</CardTitle>
              <CardDescription>Based on your learning patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-compass-50 rounded-lg p-4">
                <h4 className="font-medium text-compass-800">Pomodoro Technique</h4>
                <p className="text-sm text-compass-700 mt-2">
                  For your Data Structures assignment, try using the Pomodoro technique: 25 minutes of focused work followed by a 5-minute break.
                </p>
                <p className="text-xs text-compass-600 mt-3">
                  This technique has helped improve your productivity by 23% in similar tasks.
                </p>
              </div>
              
              <div className="mt-4 p-3 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium">Suggested Study Schedule</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Data Structures: 2:00pm - 3:30pm</span>
                  </li>
                  <li className="flex items-center">
                    <Circle className="h-4 w-4 text-gray-300 mr-2" />
                    <span>JavaScript Tutorial: 4:00pm - 5:00pm</span>
                  </li>
                  <li className="flex items-center">
                    <Circle className="h-4 w-4 text-gray-300 mr-2" />
                    <span>AI Club Preparation: 7:30pm - 8:30pm</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Planner;
