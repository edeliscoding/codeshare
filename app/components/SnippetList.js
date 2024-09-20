// File: app/components/SnippetList.js
"use client";

import { useState, useEffect } from "react";
import {
  Home,
  Search,
  Upload,
  User,
  Pencil,
  ArrowUp,
  MessageSquare,
  Heart,
} from "lucide-react";
import Link from "next/link";
import IndividualSnippet from "./IndividualSnippet";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SnippetList() {
  const [snippets, setSnippets] = useState([]);
  const router = useRouter();
  useEffect(() => {
    // TODO: Fetch snippets from API
    // setSnippets([
    //   { id: 1, title: "Example Snippet", language: "javascript" },
    //   { id: 2, title: "Another Snippet", language: "python" },
    // ]);
    const fetchSnippets = async () => {
      const response = await fetch("/api/snippets");
      const data = await response.json();
      setSnippets(data);
    };
    fetchSnippets();
    return () => {};
  }, []);

  // const snippetsMock = [
  //   {
  //     title: "React.js",
  //     createdAt: "1 week ago",
  //     language: "JavaScript",
  //     avatar: "/api/placeholder/40/40",
  //     userName: "John Doe",
  //     content:
  //       "Great way to manage state in React. Use the Context API instead of Redux.",
  //     upvotes: 45,
  //     comments: 23,
  //     likes: 30,
  //   },
  //   {
  //     title: "Python",
  //     createdAt: "2 weeks ago",
  //     language: "Python",
  //     avatar: "/api/placeholder/40/40",
  //     userName: "Jane Smith",
  //     content: "A simple guide to using Python for data analysis.",
  //     upvotes: 90,
  //     comments: 42,
  //     likes: 78,
  //   },
  // ];
  const handleUpdate = async (updatedSnippet) => {
    // Implement API call to update snippet
    try {
      const response = await fetch(`/api/snippets/${updatedSnippet._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSnippet),
      });
      if (response.ok) {
        setSnippets(
          snippets.map((snippet) =>
            snippet._id === updatedSnippet._id ? updatedSnippet : snippet
          )
        );
      }
    } catch (error) {
      console.error("Error updating snippet:", error);
    }
  };

  const handleDelete = async (snippetId) => {
    // Implement API call to delete snippet
    try {
      const response = await fetch(`/api/snippets/${snippetId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSnippets(snippets.filter((snippet) => snippet._id !== snippetId));
      }
    } catch (error) {
      console.error("Error deleting snippet:", error);
    }
  };
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <Button onClick={() => router.push("/")} className="mb-4">
          <h1 className="text-xl font-bold">Home</h1>
        </Button>
        <Search className="w-6 h-6" />
      </header>

      {/* Snippet Cards */}
      <main className="flex-grow overflow-y-auto">
        {snippets.map((snippet, index) => (
          <div key={index} className="border-b border-gray-700 p-4">
            <IndividualSnippet
              snippet={snippet}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
            {/* <p className="mb-4">{snippet.content}</p>
            <div className="flex justify-between text-gray-400">
              <span className="flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" /> {snippet.upvotes}
              </span>
              <span className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" /> {snippet.comments}
              </span>
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" /> {snippet.likes}
              </span>
            </div> */}
          </div>
        ))}
      </main>

      {/* Action Button */}
      {/* <div className="absolute bottom-20 right-4">
        <button className="bg-blue-600 p-3 rounded-full shadow-lg">
          <Pencil className="w-6 h-6" />
        </button>
      </div> */}

      {/* Bottom Navigation */}
      {/* <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <Home className="w-6 h-6" />
        <Search className="w-6 h-6" />
        <Upload className="w-6 h-6" />
        <User className="w-6 h-6" />
      </nav> */}
    </div>
  );
}
