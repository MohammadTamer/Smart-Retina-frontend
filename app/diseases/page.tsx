// "use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";


import { diseasesData } from "@/common";
const DiseasesPage = () => {
    return (
        <main className={` min-h-screen font-sans bg-[#f8fafc] text-[#1e293b]`}>
            <Navbar />

            <section className="pt-32 pb-20 text-center bg-gradient-to-b from-blue-50 to-white">
                <h1 className="text-4xl md:text-5xl font-bold text-[#152066] mb-6">
                    Retinal Diseases We Detect
                </h1>
                <p className="max-w-3xl mx-auto text-lg text-blue-800/70 leading-relaxed">
                    Advanced AI-driven analysis for early detection and accurate understanding
                    of critical retinal conditions.
                </p>
            </section>


            {/* --- Diseases Cards Section --- */}
            <section className="max-w-7xl mx-auto px-6 pb-28 space-y-8">
                {diseasesData.map((disease, index) => (
                    <div
                        key={index}
                        className="grid md:grid-cols-2 gap-14 items-center bg-white rounded-[2.5rem]
                            shadow-[0_20px_60px_rgba(21,32,102,0.12)] p-10
                            hover:shadow-[0_30px_80px_rgba(21,32,102,0.2)]
                            transition-all duration-500"
                    >

                        {index % 2 == 0 && (<><div className="relative h-[350px] rounded-3xl overflow-hidden">
                            <Image
                                src={disease.img}
                                alt={disease.title}
                                fill
                                className="object-contan hover:scale-105 transition-transform duration-700"
                            />
                        </div>


                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-[#152066]">
                                    {disease.title}
                                </h2>

                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {disease.desc}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                                        AI Detection
                                    </span>
                                    <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                        Early Diagnosis
                                    </span>
                                    <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                                        Vision Risk
                                    </span>
                                </div>

                                <Link
                                    href={`${disease.slug}`}
                                    className="inline-block mt-4 px-6 py-3 rounded-xl
                                    bg-gradient-to-r from-blue-600 to-cyan-500
                                    text-white font-semibold shadow-md
                                    hover:scale-105 transition-transform"
                                >
                                    Learn More
                                </Link>
                            </div></>)}
                        {index % 2 != 0 && (<>


                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-[#152066]">
                                    {disease.title}
                                </h2>

                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {disease.desc}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                                        AI Detection
                                    </span>
                                    <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                        Early Diagnosis
                                    </span>
                                    <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                                        Vision Risk
                                    </span>
                                </div>

                                <Link
                                    href={`${disease.slug}`}
                                    className="inline-block mt-4 px-6 py-3 rounded-xl
                                    bg-gradient-to-r from-blue-600 to-cyan-500
                                    text-white font-semibold shadow-md
                                    hover:scale-105 transition-transform"
                                >
                                    Learn More
                                </Link>
                            </div>
                            <div className="relative h-[350px] rounded-3xl overflow-hidden">
                                <Image
                                    src={disease.img}
                                    alt={disease.title}
                                    fill
                                    className="object-contan hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                        </>)}
                    </div>
                ))}
            </section>


            <Footer />
        </main>
    );
};

export default DiseasesPage;