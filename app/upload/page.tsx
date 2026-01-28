"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaCloudUploadAlt, FaSpinner, FaCheckCircle } from "react-icons/fa";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null); // Reset previous result
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setAnalyzing(true);
    
    // Simulate AI Processing Delay (2 seconds)
    setTimeout(() => {
      setAnalyzing(false);
      setResult("Healthy Retinopathy Detected (Confidence: 94%)");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eef2ff] to-white font-sans text-[#1e293b]">
      <Navbar />

      <div className="pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-[80vh]">
        
        <div className="text-center mb-10 max-w-2xl">
          <h1 className="text-4xl font-bold text-[#152066] mb-4">Upload Retinal Scan</h1>
          <p className="text-gray-500 text-lg">
            Upload a high-quality fundus image (JPEG/PNG) to receive an instant AI-powered diagnosis report.
          </p>
        </div>

        {/* --- Upload Card --- */}
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
          
          {/* Decorative Top Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-cyan-400"></div>

          {!result ? (
            // Upload State
            <div className="flex flex-col items-center">
              <label 
                htmlFor="dropzone" 
                className={`w-full h-64 border-3 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                  ${file ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}
                `}
              >
                {file ? (
                  <div className="text-center">
                    <FaCheckCircle className="text-5xl text-green-500 mb-3 mx-auto" />
                    <p className="text-lg font-semibold text-gray-700">{file.name}</p>
                    <p className="text-sm text-gray-500 mt-1">Click to change file</p>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <FaCloudUploadAlt className="text-6xl text-blue-300 mb-4 mx-auto" />
                    <p className="text-gray-600 font-medium">Click to upload or drag & drop</p>
                    <p className="text-sm text-gray-400 mt-2">SVG, PNG, JPG (MAX. 5MB)</p>
                  </div>
                )}
                <input id="dropzone" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>

              <button 
                onClick={handleAnalyze}
                disabled={!file || analyzing}
                className={`mt-8 w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2
                  ${!file ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#152066] text-white hover:bg-[#1e2b85]'}
                `}
              >
                {analyzing ? <><FaSpinner className="animate-spin" /> Analyzing...</> : "Analyze Image"}
              </button>
            </div>
          ) : (
            // Result State
            <div className="text-center animate-fadeIn">
              <div className={`w-20 h-20  ${result.startsWith('Healthy') ? 'text-green-600  bg-green-50' : 'text-red-600 bg-red-50'} rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-sm`}>
                !
              </div>
              <h2 className="text-2xl font-bold text-[#152066] mb-2">Analysis Complete</h2>
              <p className={`text-lg ${result.startsWith('Healthy') ? 'text-green-600 bg-green-50'  : 'text-red-600 bg-red-50 border-red-100'} font-medium  py-3 px-6 rounded-lg inline-block border `}>
                {result}
              </p>
              
              <p className="text-gray-500 mt-6 text-sm">
                *This is an AI-generated result. Please consult an ophthalmologist for confirmation.
              </p>

              <button 
                onClick={() => { setFile(null); setResult(null); }}
                className="mt-8 text-blue-600 font-bold hover:underline"
              >
                Upload Another Image
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default UploadPage