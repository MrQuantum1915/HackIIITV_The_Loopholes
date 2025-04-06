
import { toast } from "sonner";

// Interface for the assessment form data
export interface AssessmentFormData {
  name,
  email,
  major,
  year,
  interests,
  longTermGoals,
  shortTermGoals,
  currentCourses,
  strengths,
  challenges,
  preferredLearningStyle,
  programmingLanguages,
  techDomainsExplored,
  explorationPreference,
}

// The curriculum data (static for now, could be fetched from an API)
const curriculum = `First Year – Semester I
(Common to all branches of studies)

1. MA101 - Mathematics-I (Linear Algebra and Matrices) [L:3, T:1, P:0, C:4]
2. PH100* - Mechanics and Thermodynamics [L:3, T:1, P:0, C:4]
3. PH160* - Mechanics and Thermodynamics Lab [L:0, T:0, P:2, C:1]
4. IT101 - Computer Programming and Problem Solving [L:3, T:0, P:0, C:3]
5. IT161 - Computer Programming and Problem Solving Lab [L:0, T:0, P:3, C:2]
6. EC100* - Basic Electronic Circuits [L:3, T:1, P:0, C:4]
7. EC160* - Basic Electronic Circuits Lab [L:0, T:0, P:3, C:2]
8. HS101 - Spoken and Written Communication [L:2, T:0, P:2, C:3]

Total: L = 14, T = 3, P = 10, C = 23

*Courses marked with an asterisk may be offered in both Autumn and Winter Semesters.

First Year – Semester II
(Common to all branches of studies)

1. MA102 - Mathematics-II (Discrete Mathematics) [L:3, T:1, P:0, C:4]
2. PH110* - Waves and Electromagnetics [L:3, T:1, P:0, C:4]
3. PH170* - Waves and Electromagnetics Lab [L:0, T:0, P:2, C:1]
4. EE100* - Basic Electrical Engineering [L:3, T:1, P:0, C:4]
5. EE160* - Basic Electrical Engineering Lab [L:0, T:0, P:3, C:2]
6. CS102 - Introduction to Data Structures [L:3, T:0, P:0, C:3]
7. CS162 - Introduction to Data Structures Lab [L:0, T:1, P:2, C:2]
8. HS102 - Science Technology and Society [L:3, T:0, P:0, C:3]

Total: L = 15, T = 4, P = 7, C = 23

*Courses marked with an asterisk may be offered in both Autumn and Winter Semesters.

Second Year – Semester III
(Common to CSE and IT Branch)

1. SC201 - Environmental Science [L:2, T:0, P:0, C:2]
2. MA201 - Probability and Statistics [L:3, T:1, P:0, C:4]
3. HS201 - Technical Writing [L:1, T:1, P:2, C:3]
4. CS201 - Object Oriented Design & Programming [L:3, T:0, P:0, C:3]
5. CS261 - Object Oriented Design & Programming Lab [L:0, T:0, P:3, C:2]
6. CS203 - Design and Analysis of Algorithms [L:3, T:0, P:0, C:3]
7. CS263 - Design and Analysis of Algorithms Lab [L:0, T:0, P:3, C:2]
8. EC201 - Digital Logic Design [L:3, T:0, P:0, C:3]
9. EC261 - Digital Logic Design Lab [L:0, T:0, P:2, C:1]

Total: L = 15, T = 2, P = 10, C = 23

Second Year – Semester IV
[A] CSE Branch

1. CS201 - Computer Networks [L:3, T:0, P:0, C:3]
2. CS202 - Economics [L:3, T:0, P:0, C:3]
3. CS203 - System Software [L:3, T:0, P:0, C:3]
4. CS204 - Database Management System [L:3, T:0, P:0, C:3]
5. CS205 - Database Management System Lab [L:0, T:0, P:3, C:2]
6. CS206 - Operating Systems [L:3, T:0, P:0, C:3]
7. CS207 - Operating Systems Lab [L:0, T:0, P:3, C:2]
8. CS208 - Computer Organization and Architecture [L:3, T:0, P:0, C:3]
9. CS209 - Computer Organization and Architecture Lab [L:0, T:0, P:2, C:1]

Total: L = 15, T = 1, P = 10, C = 22

Note: Semester IV for IT Branch is not provided in the document.

Third Year – Semester V
[A] CSE Branch

1. CS301 - Computer Networks [L:3, T:0, P:0, C:3]
2. CS301 - Computer Networks Lab [L:0, T:0, P:2, C:1]
3. CS303 - Software Engineering [L:3, T:0, P:0, C:3]
4. CS303 - Software Engineering Lab [L:0, T:0, P:3, C:2]
5. CS305 - Formal Language and Automata Theory [L:3, T:0, P:2, C:4]
6. - Program Elective (PE1)* [L:3, T:0, P:2, C:4]
7. - Program Elective (PE2)* [L:3, T:0, P:0, C:3]
8. CS391 - Design Project [L:0, T:0, P:0, C:3]

Total: L = 15, T = 0, P = 9, C = 23

*List of Program Electives is provided in Appendix-I.

[B] IT Branch (Partial Data)

1. CS301 - Computer Networks [L:3, T:0, P:0, C:3]
2. CS301 - Computer Networks Lab [L:0, T:0, P:2, C:1]
3. CS303 - Software Engineering [L:3, T:0, P:0, C:3]

Total: (Incomplete data, exact totals not calculable from provided excerpt)

Note: Semester V for IT Branch is incomplete in the document.

Third Year – Semester VI
[A] CSE Branch

1. CS302 - Artificial Intelligence [L:3, T:0, P:0, C:3]
2. CS302 - Artificial Intelligence Lab [L:0, T:0, P:2, C:1]
3. CS304 - Introduction to Cryptography and Network Security [L:3, T:0, P:0, C:3]
4. CS304 - Introduction to Cryptography and Network Security Lab [L:0, T:0, P:2, C:1]
5. - Program Elective (PE3)* [L:3, T:0, P:2, C:4]
6. - Program Elective (PE4)* [L:0, T:1, P:2, C:2]
7. - Elective from other Branch of Engineering (EO1)* [L:3, T:0, P:0, C:3]
8. - Open Elective (OE1)* [L:3, T:0, P:0, C:3]

Total: L = 15, T = 1, P = 8, C = 20

*List of Program Electives is provided in Appendix-I.
*List of Electives from other Branch of Engineering is provided in Appendix-II.
*List of Open Electives is provided in Appendix-III.

Note: Semester VI for IT Branch is not provided in the document.

Fourth Year – Semester VII
[A] CSE Branch

1. CS401 - Introduction to Distributed and Parallel Computing [L:3, T:0, P:0, C:3]
2. CS461 - Introduction to Distributed and Parallel Computing Lab [L:0, T:0, P:2, C:1]
3. - Program Elective (PE5)* [L:3, T:0, P:0, C:3]
4. - Program Elective (PE6)* [L:3, T:0, P:2, C:4]
5. - Elective from other Branch of Engineering (EO2)* [L:3, T:0, P:0, C:3]
6. - Open Elective (OE2)* [L:3, T:0, P:0, C:3]
7. CS491 - Research/Industrial Internship [L:0, T:0, P:0, C:3]

Total: L = 15, T = 0, P = 4, C = 20

*List of Program Electives is provided in Appendix-I.
*List of Electives from other Branch of Engineering is provided in Appendix-II.
*List of Open Electives is provided in Appendix-III.

Note: Semester VII for IT Branch is not provided in the document.

Fourth Year – Semester VIII
(Common to CSE and IT Branch)

1. CS490/IT490 - B. Tech. Project [L:0, T:0, P:36, C:18]

Total: L = 0, T = 0, P = 36, C = 18

Appendix-I: List of Program Electives for CSE / IT Branch
Program Verticals (PV):
- PV1: Artificial Intelligence and Data Analytics
- PV2: Cyber Physical Systems
- PV3: Security
- PV4: Computational Science

Courses under PV:
PV1: Human Computer Interaction, Software Project Management (CSE), Advanced Image Processing, Natural Language Processing, Data Analytics, Data Compression, Data Information, Pattern Recognition, Modeling and Simulation, Advanced Computer Architecture, Graph Signal Processing, Mathematics and Big Data, Machine Learning, Deep Learning, Reinforcement Learning, VHDL Lab
PV2: Enterprise Resource Planning, Software Project Management (CSE), Advanced Computer Networks (listed multiple times), Computer Design, Logic for Computer Science, Principles of Programming Language, Software Verification, Internet of Things, Cloud Computing Security, Cyber Security, Approach and Information, Introduction to Distributed and Parallel Computing (IT), Introduction to Cryptography, Robotics Lab
PV3: Security Protocols, Block Chain, Number Theory and Cryptography, Post Quantum Cryptography
PV4: Accounting, Vector Space Projection, Numerical Optimization, Parallel Programming Lab, VHDL Lab, HPC Lab

Appendix-II: List of Electives from other Branch of Engineering (EO1 and EO2)
- Digital Image Processing
- Deep Learning
- Information Theory Coding
- Cognitive Science
- Soft Computing
- Advanced Image Processing
- Graph Theory
- Low Power Circuit Design
- Real-time System
- Nano Technology
- VLSI Design
- E-Commerce

Appendix-III: List of Open Electives (OE1 and OE2)
- Operation Research
- Network Flow Algorithms
- Professional Ethics
- Quantum Mechanics
- Quantum Models in Science and Engineering
- Introduction to Quantum Computation
- Game Theory
- Computational Physics`;

// Google Gemini API endpoint
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const API_KEY = "AIzaSyAVvR6ptdqZDt-eSvnq1zfGEFyfh8Bh0ko"; // This would be better stored securely

/**
 * Generate a personalized roadmap using Gemini API
 */
export const generateRoadmap = async (formData: AssessmentFormData): Promise<string> => {
  try {
    // Convert the form data to a string
    const userData = JSON.stringify(formData, null, 2);
    console.log('Sending User Data:', userData);

    let explorationPreferenceValue = userData;


    const parsedUserData = JSON.parse(userData);
    if (parsedUserData.explorationPreference) {
      explorationPreferenceValue = parsedUserData.explorationPreference;
    }

    let prompt = "";
    if (explorationPreferenceValue === "project-based") {
      prompt += ` The student prefers a project-based approach to exploring new tech fields instead of traditional Roadmaps.
      Give several project ideas aligning with what they are studying right now in there curriculum.
      
      1 Analyze the student's current knowledge and experience (provided in the input).
      2 Identify nearby curriculum topics.
      3 Project ideas should be specific, creative, and unique, rather than generic.
      4 Define the overall structure of the project, but don't tell us how to do it or step by step process, keep it open-ended.
      5 Give atleast 6 ideas. 


      Output rules:
      1 Enclose all content in one <div>.
      2 Use a new <div style="border: 1px solid; padding: 10px; margin: 10px 0;"> for each idea.
      3 Use HTML tags for formatting (e.g., <b>, <i>, <ul>, <li>) without Markdown.
      4 Do not add code fences
      5 Do not specify font colors or background colors.
      6 Ensure clear, structured, and readable output.`
    }
    else {
      // Prepare the prompt for Gemini
      prompt = `You are an expert AI mentor helping a student build a personalized learning roadmap based on the provided user data and the institute's curriculum structure, generate a personalized roadmap that aligns with the academic timeline and milestones. The roadmap should assess the student's current knowledge, identify gaps, and recommend a step-by-step plan.

      
      1. Assess the student's current knowledge and experience from the input.
      2. Design a roadmap with monthly goals.
      3. Align the roadmap with the curriculum's timeline.
      4. Include online resource links from internet searches.
      5. List specific action items: topics, tools, projects, and milestones.

      Output rules:
      1 Enclose all content in one <div>.
      2 Use a new <div style="border: 1px solid; padding: 10px; margin: 10px 0;"> for each month.
      3 Use HTML tags for formatting (e.g., <b>, <i>, <ul>, <li>) without Markdown.
      4 Do not add code fences
      5 Do not specify font colors or background colors.
      6 Ensure clear, structured, and readable output.

      User Data:
      [${userData}]

      Curriculum Structure:
      [${curriculum}]`;
    }
    // Make the API call to Gemini
    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract the generated text from the response
    const generatedText = data.candidates[0].content.parts[0].text;
    console.log('Generated Roadmap:', generatedText);

    return generatedText;
  } catch (error) {
    console.error('Error generating roadmap:', error);
    toast.error('Failed to generate roadmap. Please try again.');
    throw error;
  }
};
