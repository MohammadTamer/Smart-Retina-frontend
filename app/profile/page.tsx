"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { FaUserCircle, FaEnvelope, FaIdBadge, FaCheckCircle, FaSignOutAlt } from "react-icons/fa";

const ProfilePage = () => {
  const { user, logout } = useAuth() as any;

  if (!user) return null;

  return (
    <ProtectedRoute allowedRoles={["patient", "doctor"]}>
      <main className="min-h-screen bg-slate-50 font-sans text-[#1e293b]">
        <Navbar />

        <div className="pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-[80vh]">
          
          <div className="w-full max-xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-xl">
            
            {/* Header Background */}
            <div className="h-32 bg-[#19246c] w-full"></div>

            <div className="px-8 pb-10 flex flex-col items-center -mt-16">
              
              {/* Profile Avatar */}
              <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg border border-gray-100">
                <div className="w-full h-full rounded-full bg-blue-50 flex items-center justify-center text-blue-400">
                   {user.avatar_url ? (
                     <img src={user.avatar_url} alt="Profile" className="w-full h-full rounded-full object-cover" />
                   ) : (
                     <FaUserCircle size={80} />
                   )}
                </div>
              </div>

              {/* User Identity */}
              <div className="text-center mt-6">
                <h1 className="text-3xl font-extrabold text-[#152066]">{user.full_name}</h1>
                <div className="flex items-center justify-center gap-2 mt-1">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border 
                    ${user.role === 'doctor' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                      {user.role}
                   </span>
                   <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                     <FaCheckCircle /> Verified Account
                   </span>
                </div>
              </div>

              {/* Account Details */}
              <div className="w-full mt-10 space-y-4">
                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500">
                       <FaEnvelope />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                       <p className="text-sm font-semibold text-gray-700">{user.email}</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-500">
                       <FaIdBadge />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Details</p>
                       <p className="text-sm font-semibold text-gray-700">Role: <span className="capitalize">{user.role}</span></p>
                    </div>
                 </div>
              </div>

              {/* Logout Button */}
              <div className="w-full mt-4 border-t border-gray-100 pt-4">
                 <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-2xl font-bold border border-red-100 hover:bg-red-600 hover:text-white transition duration-300 shadow-sm text-sm"
                 >

                    <FaSignOutAlt /> Sign Out
                 </button>
              </div>

            </div>
          </div>

        </div>

        <Footer />
      </main>
    </ProtectedRoute>
  );
};

export default ProfilePage;
