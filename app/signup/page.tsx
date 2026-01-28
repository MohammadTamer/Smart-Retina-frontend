"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

//Define Validation Schema ---
const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log("Signup Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API
    alert("Account Created Successfully!");
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#152066] p-4 relative overflow-hidden">
      
      {/* Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px]"></div>

      {/* Main Container */}
      <div className="w-full max-w-5xl h-[700px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex overflow-hidden relative z-10">
        
        {/* --- LEFT SIDE: Branding --- */}
        <div className="hidden md:flex w-1/2 flex-col justify-center items-start p-12 relative bg-gradient-to-br from-[#152066] to-[#2563eb] text-white">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Join the <br /> <span className="text-cyan-300">Future of AI.</span>
            </h2>
            <p className="text-blue-100/80 text-lg font-light leading-relaxed max-w-sm">
              Create an account to start analyzing retinal scans with cutting-edge deep learning technology.
            </p>
            
            {/* Feature List */}
            <ul className="space-y-4 pt-4">
              {['Instant Diagnosis', 'Secure Cloud Storage', 'Detailed Reports'].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-blue-100">
                  <span className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-300 text-xs">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-400/30 rounded-full blur-3xl"></div>
        </div>

        {/* --- RIGHT SIDE: Signup Form --- */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-12 relative ">
          
          <Link href="/" className="absolute top-5 left-8 text-gray-500 hover:text-[#152066] flex items-center text-sm font-medium transition">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>

          <div className="max-w-md w-full mx-auto space-y-6 mt-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#1e293b]">Create Account</h2>
              <p className="text-gray-500 mt-2">Get started with Smart Retina today.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <div className="relative group">
                  <FaUser className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${errors.fullName ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-600"}`} />
                  <input 
                    {...register("fullName")}
                    type="text" 
                    placeholder="Full Name" 
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700
                      ${errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"}
                    `}
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName.message}</p>}
              </div>

              {/* Email */}
              <div>
                <div className="relative group">
                  <FaEnvelope className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${errors.email ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-600"}`} />
                  <input 
                    {...register("email")}
                    type="email" 
                    placeholder="Email Address" 
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700
                      ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"}
                    `}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="relative group">
                  <FaLock className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${errors.password ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-600"}`} />
                  <input 
                    {...register("password")}
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-xl focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700
                      ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"}
                    `}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative group">
                  <FaLock className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${errors.confirmPassword ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-600"}`} />
                  <input 
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Confirm Password" 
                    className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-xl focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700
                      ${errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"}
                    `}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword.message}</p>}
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#152066] hover:bg-[#1e2b85] text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center mt-2"
              >
                {isSubmitting ? (
                   <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : "Create Account"}
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or register with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium">
              <FcGoogle className="text-xl" />
              <span>Google account</span>
            </button>

            <p className="text-center text-gray-600 text-sm">
              Already have an account? 
              <Link href="/login" className="text-blue-600 font-bold ml-1 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;