"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { FaUserMd, FaUsers, FaClipboardList, FaSearch, FaCheckCircle, FaExclamationCircle, FaTimes, FaArrowLeft, FaArrowRight, FaEye } from "react-icons/fa";

// --- MOCK DATA ---
const initialData = [
    { id: "#SR-9012", date: "2025-10-24", patient: "Ahmed Ali", diagnosis: "Diabetic Retinopathy (DR)", confidence: "94%", status: "Pending Review", img: "/diabetic_retinopathy.png", riskLevel: "High Risk" },
    { id: "#SR-9011", date: "2025-10-24", patient: "Sarah Smith", diagnosis: "Healthy", confidence: "99%", status: "Verified", img: "/hero_image.png", riskLevel: "Normal" },
    { id: "#SR-9009", date: "2025-10-22", patient: "Mona Karim", diagnosis: "Retinal Vein Occlusion (RVO)", confidence: "92%", status: "Verified", img: "/retinal_vein_occlusion.png", riskLevel: "Moderate" },
    { id: "#SR-9008", date: "2025-10-21", patient: "Omar Youssef", diagnosis: "Retinal Detachment (RD)", confidence: "98%", status: "High Risk", img: "/retinal_detachment.png", riskLevel: "High Risk" },
    { id: "#SR-9007", date: "2025-10-20", patient: "Laila Hassan", diagnosis: "Retinitis Pigmentosa (RP)", confidence: "88%", status: "Pending Review", img: "/retinitis_pigmentosa.png", riskLevel: "Moderate" },
];

const AdminDashboard = () => {
    // State
    const [patients, setPatients] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [reviewForm, setReviewForm] = useState({ finalDiagnosis: "", riskLevel: "" });

    // NEW: View Mode State
    const [isViewMode, setIsViewMode] = useState(false);

    const itemsPerPage = 5;

    // --- FILTER & PAGINATION ---
    const filteredData = patients.filter((item) =>
        item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // --- HANDLERS ---

    // 1. OPEN MODAL (Handles both Pending and Verified)
    const handleOpenModal = (patient: any) => {
        setSelectedPatient(patient);

        // CHECK: If status is 'Verified', enable Read-Only Mode
        const isVerified = patient.status === "Verified";
        setIsViewMode(isVerified);

        setReviewForm({
            finalDiagnosis: patient.diagnosis,
            riskLevel: patient.riskLevel || (patient.status === "High Risk" ? "High Risk" : "Normal")
        });
    };

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (isViewMode) return; // Prevent saving in view mode

        const updatedList = patients.map(p => {
            if (p.id === selectedPatient.id) {
                return {
                    ...p,
                    diagnosis: reviewForm.finalDiagnosis,
                    status: "Verified",
                    confidence: "Doctor Verified",
                    riskLevel: reviewForm.riskLevel // Save the risk level
                };
            }
            return p;
        });
        setPatients(updatedList);
        setSelectedPatient(null);
    };

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-[#1e293b] relative">
            <Navbar />

            <div className="pt-32 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">

                {/* Header & Stats (Kept same) */}
                <div className="flex items-center gap-3 text-[#152066] mb-8">
                    <FaUserMd className="text-3xl" />
                    <div>
                        <h1 className="text-3xl font-bold">Doctor Portal</h1>
                        <p className="text-gray-500 text-sm">Review pending AI diagnoses and manage patient records.</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div><p className="text-gray-500 text-xs font-bold uppercase">Total Patients</p><p className="text-3xl font-bold text-[#152066]">1,248</p></div>
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl"><FaUsers /></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div><p className="text-gray-500 text-xs font-bold uppercase">Total Scans</p><p className="text-3xl font-bold text-[#152066]">3,850</p></div>
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xl"><FaClipboardList /></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div><p className="text-gray-500 text-xs font-bold uppercase">Critical Cases</p><p className="text-3xl font-bold text-red-500">142</p></div>
                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-xl">!</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#152066] to-[#2563eb] text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
                        <div><p className="text-blue-100 text-xs font-bold uppercase">System Status</p><p className="text-xl font-bold">AI Online</p></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h3 className="text-lg font-bold text-[#152066]">Patient Queue</h3>
                        <div className="relative w-full md:w-96">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search patient..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                                    <th className="p-5">ID</th>
                                    <th className="p-5">Patient</th>
                                    <th className="p-5">Date</th>
                                    <th className="p-5">AI Diagnosis</th>
                                    <th className="p-5">Status</th>
                                    <th className="p-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {currentItems.length > 0 ? (
                                    currentItems.map((item, index) => (
                                        <tr key={index} className="hover:bg-blue-50/30 transition duration-150">
                                            <td className="p-5 font-medium text-[#152066]">{item.id}</td>
                                            <td className="p-5 font-bold text-gray-700">{item.patient}</td>
                                            <td className="p-5 text-gray-500">{item.date}</td>
                                            <td className="p-5 text-gray-700">{item.diagnosis} <br /><span className="text-xs text-gray-400">Confidence: {item.confidence}</span></td>
                                            <td className="p-5">
                                                <span className={`px-2 py-1 rounded text-xs font-bold border 
                                                ${item.riskLevel === 'High Risk' ? 'bg-red-50 text-red-600 border-red-200' :
                                                        item.riskLevel === 'Moderate' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                                                            'bg-green-50 text-green-600 border-green-200'}`}>
                                                    {item.riskLevel}
                                                </span>
                                            </td>

                                            <td className="p-5">
                                                {item.status === "Pending Review" ? (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold border border-yellow-200"><FaExclamationCircle /> Pending Review</span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200"><FaCheckCircle /> Verified</span>
                                                )}
                                            </td>

                                            <td className="p-5 text-right">
                                                {/* Button logic: Different text, same handler */}
                                                {item.status === "Pending Review" ? (
                                                    <button onClick={() => handleOpenModal(item)} className="bg-[#152066] text-white px-4 py-2 rounded-lg text-xs font-bold shadow hover:bg-[#1e2b85] transition">Review Case</button>
                                                ) : (
                                                    <button onClick={() => handleOpenModal(item)} className="text-blue-600 text-xs font-medium hover:underline px-3 flex items-center justify-end gap-1 ml-auto">
                                                        <FaEye /> View Details
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan={6} className="p-8 text-center text-gray-400">No patients found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500 bg-gray-50/30">
                        <span>Showing <span className="font-bold">{indexOfFirstItem + 1}</span> to <span className="font-bold">{Math.min(indexOfLastItem, filteredData.length)}</span> of {filteredData.length} results</span>
                        <div className="flex gap-2 items-center">
                            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="flex items-center gap-1 px-3 py-1.5 border bg-white rounded-md hover:bg-gray-50 disabled:opacity-50"><FaArrowLeft /> Prev</button>
                            <span className="px-2 font-medium">Page {currentPage} of {totalPages}</span>
                            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="flex items-center gap-1 px-3 py-1.5 border bg-white rounded-md hover:bg-gray-50 disabled:opacity-50">Next <FaArrowRight /></button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {/* --- SPLIT MODAL (View / Edit) --- */}
            {selectedPatient && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden animate-fadeIn flex flex-col md:flex-row h-[85vh] md:h-[600px]">

                        {/* --- LEFT SIDE: IMAGE --- */}
                        <div className="w-full md:w-1/2 bg-black flex flex-col items-center justify-center relative p-4 group">
                            <div className="relative w-full h-full">
                                <Image
                                    src={selectedPatient.img}
                                    alt="Retinal Scan"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md">
                                Scan ID: {selectedPatient.id}
                            </div>
                        </div>

                        {/* --- RIGHT SIDE: FORM --- */}
                        <div className="w-full md:w-1/2 flex flex-col bg-white">

                            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-[#152066]">
                                        {isViewMode ? "Diagnosis Report (Read Only)" : "Diagnosis Verification"}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">Patient: <span className="font-semibold text-gray-800">{selectedPatient.patient}</span></p>
                                </div>
                                <button onClick={() => setSelectedPatient(null)} className="text-gray-400 hover:text-red-500 transition"><FaTimes size={24} /></button>
                            </div>

                            <div className="p-6 overflow-y-auto flex-1 space-y-6">

                                {/* AI Report Card */}
                                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
                                    <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">AI Analysis Report</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-bold text-[#152066]">{selectedPatient.diagnosis}</p>
                                            <p className="text-sm text-gray-600 mt-1">Based on feature extraction (CNN)</p>
                                        </div>
                                        <div className="text-center bg-white px-3 py-2 rounded-lg border border-blue-100 shadow-sm">
                                            <span className="block text-2xl font-bold text-blue-600">{selectedPatient.confidence}</span>
                                            <span className="text-[10px] text-gray-400 uppercase">Confidence</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Section */}
                                <form id="reviewForm" onSubmit={handleSubmitReview} className="space-y-6">

                                    {/* Diagnosis Dropdown */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            {isViewMode ? "Final Verified Diagnosis" : "Doctor's Final Diagnosis"}
                                        </label>
                                        <select
                                            disabled={isViewMode} // <--- READ ONLY LOGIC
                                            className={`w-full p-3 border rounded-lg outline-none transition 
                                                ${isViewMode ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-50 border-gray-200 focus:ring-2 focus:ring-[#152066]'}`}
                                            value={reviewForm.finalDiagnosis}
                                            onChange={(e) => setReviewForm({ ...reviewForm, finalDiagnosis: e.target.value })}
                                        >
                                            <option value="Healthy">Healthy (No Disease)</option>
                                            <option value="Diabetic Retinopathy (DR)">Diabetic Retinopathy (DR)</option>
                                            <option value="Age-Related Macular Degeneration (AMD)">Age-Related Macular Degeneration (AMD)</option>
                                            <option value="Retinal Vein Occlusion (RVO)">Retinal Vein Occlusion (RVO)</option>
                                            <option value="Retinal Detachment (RD)">Retinal Detachment (RD)</option>
                                            <option value="Retinitis Pigmentosa (RP)">Retinitis Pigmentosa (RP)</option>
                                        </select>
                                    </div>

                                    {/* Risk Assessment */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Risk Assessment</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['Normal', 'Moderate', 'High Risk'].map((risk) => (
                                                <button
                                                    key={risk}
                                                    type="button"
                                                    disabled={isViewMode} // <--- READ ONLY LOGIC
                                                    onClick={() => setReviewForm({ ...reviewForm, riskLevel: risk })}
                                                    className={`py-2 text-sm rounded-lg border transition 
                                                        ${reviewForm.riskLevel === risk
                                                            ? risk === 'High Risk' ? 'bg-red-50 border-red-500 text-red-600 font-bold'
                                                                : risk === 'Moderate' ? 'bg-orange-50 border-orange-500 text-orange-600 font-bold'
                                                                    : 'bg-green-50 border-green-500 text-green-600 font-bold'
                                                            : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                                        }
                                                        ${isViewMode ? 'opacity-70 cursor-not-allowed' : ''}
                                                    `}
                                                >
                                                    {risk}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
                                <button onClick={() => setSelectedPatient(null)} className="w-full py-3 border border-gray-300 rounded-xl text-gray-600 font-bold hover:bg-white transition">
                                    {isViewMode ? "Close Report" : "Cancel"}
                                </button>

                                {/* Only show SAVE button if NOT in View Mode */}
                                {!isViewMode && (
                                    <button type="submit" form="reviewForm" className="w-full py-3 bg-[#152066] text-white rounded-xl font-bold hover:bg-[#1e2b85] shadow-lg transition flex justify-center items-center gap-2">
                                        <FaCheckCircle /> Verify & Save
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </main>
    );
};

export default AdminDashboard;
