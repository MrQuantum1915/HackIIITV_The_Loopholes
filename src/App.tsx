
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import Roadmap from "./pages/Roadmap";
import Planner from "./pages/Planner";
import Mentors from "./pages/Mentors";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import Chatbot from './pages/Chatbot'; 
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/chatbot" element={<Chatbot />} /> {/* Add the Chatbot route */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
