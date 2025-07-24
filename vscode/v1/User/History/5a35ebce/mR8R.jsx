import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppHeader from "@/components/AppHeader";
import { Code, FileText } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
                Master Your Technical Interviews
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Practice with our AI-powered mock interview platform that
                simulates real technical interviews, provides instant feedback,
                and helps you improve your skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={() => navigate("/interview")}>
                  Start a Coding Interview
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/design-problems")}
                >
                  Try a Design Interview
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate("/voice-test")}
                >
                  Test Voice Interaction
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Interview Types
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Coding Interview
                </CardTitle>
                <CardDescription>
                  Solve coding problems with real-time feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Interactive coding environment</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Support for multiple programming languages</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Natural voice conversation with AI interviewer</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Instant code execution and testing</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => navigate("/coding-problems")}
                >
                  Start Coding Interview
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  System Design Interview
                </CardTitle>
                <CardDescription>
                  Practice low-level design with interactive diagrams
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Interactive UML diagram creation</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Real-world design problems</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Guided approach to system decomposition</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Detailed feedback on your design decisions</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => navigate("/design-problems")}
                >
                  Start Design Interview
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Enhanced with AI Capabilities
            </h2>
            <p className="max-w-[700px] mx-auto text-gray-500 dark:text-gray-400 mb-8">
              Our platform uses advanced AI to provide a realistic interview
              experience with natural conversation flow and insightful feedback.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Conversational AI</h3>
                <p className="text-sm text-gray-500">
                  Natural dialogue with voice interaction and automatic turn
                  detection
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Real-time Feedback</h3>
                <p className="text-sm text-gray-500">
                  Get immediate insights on your code and approach as you work
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Personalized Hints</h3>
                <p className="text-sm text-gray-500">
                  Stuck? Request contextual hints that guide without giving away
                  the solution
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-gray-500">
              © 2023 InterviewAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
