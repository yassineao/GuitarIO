"use client";
import ProtectedRoute from "../components/protectedContent";
import React from "react";
import App  from "../components/cyberpunk/app";

export default function Page() {
  
  console.log("GEMINI_API_KEY:", process.env.NEXT_PUBLIC_GEMINI_API_KEY, "NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
  return (
    <div id="nc-netwire">
      
            <ProtectedRoute>  
               <App />
            </ProtectedRoute>
   
    </div>
  );
}
