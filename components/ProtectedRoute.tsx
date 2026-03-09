"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { user, loading } = useAuth() as any;
  const router = useRouter();

  useEffect(() => {
    console.log("ProtectedRoute Check:", { user: user?.role });
    // Only run checks once the AuthContext has finished fetching the user
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (!allowedRoles.includes(user.role)) {
        // Wrong role -> Send them to their correct dashboard
        if (user.role === "doctor") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    }
  }, [user, loading, router, allowedRoles]);

  // Show a loading spinner while we check their token
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  // If they are logged in AND have the right role, show the page
  if (user && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  return null;
}