"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { FaFileMedical, FaCalendarAlt, FaSearch, FaEye, FaCheckCircle, FaExclamationCircle, FaTimes, FaUpload, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) { setLoading(false); return; }
      try {
        const res = await axios.get("http://localhost:8000/api/scans/my-scans", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScans(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch scans:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScans();
  }, []);

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }); }
    catch { return "N/A"; }
  };

  const filteredData = scans.filter((item) =>
    (item.scan_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.ai_diagnosis || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-[#1e293b] relative">
      <Navbar />

      <div className="pt-32 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 text-[#152066] mb-1">
               <FaFileMedical className="text-3xl" />
               <h1 className="text-3xl font-bold">My Medical History</h1>
            </div>
            <p className="text-gray-500">View your past AI diagnosis reports and doctor notes.</p>
          </div>
        </div>


        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-[#152066] to-[#2563eb] text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-blue-100 font-medium text-sm uppercase">Total Scans</h3>
            <p className="text-4xl font-bold mt-2">{scans.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-medium text-sm uppercase">Last Checkup</h3>
            <p className="text-2xl font-bold text-[#152066] mt-2">
              {scans.length > 0 ? formatDate(scans[0].upload_date) : "No scans yet"}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-medium text-sm uppercase">Current Status</h3>
            <p className={`text-2xl font-bold mt-2 ${scans.some(s => s.risk_level === 'High Risk') ? 'text-orange-500' : 'text-green-500'}`}>
              {scans.length > 0 ? (scans.some(s => s.risk_level === 'High Risk') ? 'Attention Needed' : 'All Clear') : "N/A"}
            </p>
          </div>
        </div>

        {/* --- History Table --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-lg font-bold text-[#152066]">Recent Reports</h3>
            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search scans..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-20">
              <FaSpinner className="animate-spin text-4xl text-blue-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                    <th className="p-5">Scan ID</th>
                    <th className="p-5">Date</th>
                    <th className="p-5">Scan Name</th>
                    <th className="p-5">Diagnosis</th>
                    <th className="p-5">Risk Level</th>
                    <th className="p-5">Status</th>
                    <th className="p-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={index} className="hover:bg-blue-50/30 transition duration-150">
                        <td className="p-5 font-medium text-[#152066]">#SR-{item.id}</td>
                        <td className="p-5 text-gray-500 flex items-center gap-2">
                           <FaCalendarAlt className="text-xs text-gray-400" /> {formatDate(item.upload_date)}
                        </td>
                        <td className="p-5 font-bold text-gray-700">{item.scan_name || "Scan File"}</td>
                        <td className="p-5 text-gray-700">{item.final_diagnosis || item.ai_diagnosis || "Pending"}</td>
                        
                        <td className="p-5">
                            <span className={`px-2 py-1 rounded text-xs font-bold border 
                                ${item.risk_level === 'High Risk' ? 'bg-red-50 text-red-600 border-red-200' : 
                                  item.risk_level === 'Moderate' ? 'bg-orange-50 text-orange-600 border-orange-200' : 
                                  'bg-green-50 text-green-600 border-green-200'}`}>
                                {item.risk_level || "Unknown"}
                            </span>
                        </td>

                        <td className="p-5">
                           {item.status === "Pending Review" ? (
                               <span className="inline-flex items-center gap-1 text-yellow-600 text-xs font-bold"><FaExclamationCircle /> Pending</span>
                           ) : (
                               <span className="inline-flex items-center gap-1 text-green-600 text-xs font-bold"><FaCheckCircle /> Verified</span>
                           )}
                        </td>

                        <td className="p-5 text-right">
                           <button 
                             onClick={() => setSelectedReport(item)}
                             className="text-blue-600 text-xs font-medium hover:underline px-3 flex items-center justify-end gap-1 ml-auto"
                           >
                             <FaEye /> View Report
                           </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={7} className="p-8 text-center text-gray-400">{scans.length === 0 ? "No scans yet. Upload your first retinal scan!" : "No reports found."}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* --- REPORT VIEW MODAL --- */}
      {selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-fadeIn flex flex-col md:flex-row h-[80vh] md:h-[550px]">
            
            <div className="w-full md:w-1/2 bg-black flex flex-col items-center justify-center relative p-4">
               <div className="relative w-full h-full">
                  <Image 
                    src={`http://localhost:8000${selectedReport.image_url}`} 
                    alt="Scan" 
                    fill 
                    className="object-contain"
                    unoptimized
                  />
               </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col bg-white">
               <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                  <div>
                     <h3 className="text-xl font-bold text-[#152066]">Medical Report</h3>
                     <p className="text-gray-500 text-sm mt-1">Scan ID: #SR-{selectedReport.id}</p>
                  </div>
                  <button onClick={() => setSelectedReport(null)} className="text-gray-400 hover:text-red-500 transition"><FaTimes size={24} /></button>
               </div>

               <div className="p-6 flex-1 overflow-y-auto space-y-6">
                  <div className={`p-4 rounded-xl border ${selectedReport.status === 'Verified' ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'}`}>
                      <p className="text-xs font-bold uppercase mb-1 opacity-70">Diagnosis</p>
                      <p className="text-xl font-bold text-[#152066]">{selectedReport.final_diagnosis || selectedReport.ai_diagnosis || "Pending"}</p>
                      <div className="flex gap-2 mt-2">
                         <span className="text-xs font-semibold px-2 py-1 bg-white rounded border border-gray-200">
                            Confidence: {selectedReport.ai_confidence ? `${(selectedReport.ai_confidence * 100).toFixed(1)}%` : "N/A"}
                         </span>
                         <span className="text-xs font-semibold px-2 py-1 bg-white rounded border border-gray-200">
                            Risk: {selectedReport.risk_level || "Unknown"}
                         </span>
                      </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Doctor&apos;s Note</label>
                     <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm leading-relaxed">
                        {selectedReport.doctor_notes || "Awaiting doctor review. Check back later."}
                     </div>
                  </div>

                  {selectedReport.status === "Pending Review" && (
                     <div className="flex items-start gap-3 p-4 bg-orange-50 text-orange-700 text-sm rounded-xl border border-orange-100">
                        <FaExclamationCircle className="mt-0.5 text-lg" />
                        <p>This report is currently pending doctor verification. The result shown is based on AI analysis only.</p>
                     </div>
                  )}
               </div>

               <div className="p-6 border-t border-gray-100 bg-gray-50">
                  <button onClick={() => setSelectedReport(null)} className="w-full py-3 bg-[#152066] text-white rounded-xl font-bold hover:bg-[#1e2b85] shadow-lg transition">
                     Close Report
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default UserDashboard;