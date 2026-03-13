// components/navbar.js
import React from "react";
import Link from "next/link";
import { useAuth } from  "../pages/api/AuthContext";
import { useRouter } from "next/router";


const Footer = () => {
  
  return (
   
    <footer id="site-footer">
  <p>&copy; 2026 GuitarTuto. All rights reserved.</p>
</footer>



  );
};

export default Footer;
