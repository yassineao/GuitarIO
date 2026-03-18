"use client";
import ProtectedRoute from "../components/protectedContent";
import React from "react";
import App  from "../components/cyberpunk/app";

export default function Page() {
  
  return (
    <div id="nc-netwire">
      
            <ProtectedRoute>  
               <App />
            </ProtectedRoute>
   
    </div>
  );
}
