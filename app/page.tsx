import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Diseases from "../components/Diseases";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#e3f2fd]"> {/* Matches the wave fill color */}
      <Navbar />
      <Hero />
      <Features />
      {/* Add a spacer or gradient here if needed for the diseases section */}
      <div className="bg-gradient-to-b from-[#e3f2fd] to-white">
        <Diseases />
      </div>
      <Footer />
    </main>
  );
}