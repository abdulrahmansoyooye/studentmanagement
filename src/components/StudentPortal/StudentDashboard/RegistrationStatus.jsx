
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useSession } from "../../../context/session";
import { Loader2, RefreshCcw, AlertCircle, CheckCircle, Clock } from "lucide-react";

// Use environment variable or fallback
const API_BASE = process.env.REACT_APP_API_URL || "https://studentbackendportal.onrender.com";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

export default function RegistrationStatus() {
  const { sessionData } = useSession() || {};
  const userId = sessionData?.userId;
  const token = sessionData?.token;

  // State
  const [statusState, setStatusState] = useState({
    loading: false,
    error: null,
    status: "idle", // 'idle' | 'pending' | 'success' | 'error'
    data: null,
  });

  const pollingTimerRef = useRef(null);

  // Memoized fetch function
  const fetchStatus = useCallback(async (isPolling = false) => {
    if (!userId || !token) return;

    if (!isPolling) {
      setStatusState((prev) => ({ ...prev, loading: true, error: null }));
    }

    try {
      const response = await api.get(`/idcard/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { status, ...restData } = response.data;
      // Normalize 'ready' or 'approved' to 'success' for UI if needed, 
      // but assuming backend returns 'pending', 'ready'/'success', etc.
      
      const normalizedStatus = status === "ready" || status === "approved" ? "success" : status;

      setStatusState({
        loading: false,
        error: null,
        status: normalizedStatus,
        data: { status, ...restData },
      });

    } catch (err) {
      console.error("ID Card status fetch error:", err);
      // Only show error state if not polling (to avoid flickering on background updates)
      if (!isPolling) {
        setStatusState((prev) => ({
          ...prev,
          loading: false,
          error: "Unable to retrieve status. Please try again.",
          status: "error",
        }));
      }
    }
  }, [userId, token]);

  // Initial fetch and polling logic
  useEffect(() => {
    // Initial fetch
    fetchStatus();

    // Cleanup timer on unmount
    return () => {
      if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
    };
  }, [fetchStatus]);

  // Effect to manage polling based on status
  useEffect(() => {
    if (statusState.status === "pending") {
      if (!pollingTimerRef.current) {
        pollingTimerRef.current = setInterval(() => {
          fetchStatus(true);
        }, 5000);
      }
    } else {
      // Stop polling if success (ready) or error
      if (pollingTimerRef.current) {
        clearInterval(pollingTimerRef.current);
        pollingTimerRef.current = null;
      }
    }
  }, [statusState.status, fetchStatus]);

  const handleRetry = () => fetchStatus(false);

  // Render Helpers
  const renderContent = () => {
    if (statusState.loading && !statusState.data) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin mb-2 text-blue-600" />
          <p>Checking your registration status...</p>
        </div>
      );
    }

    if (statusState.error) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center px-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Connection Error</h3>
          <p className="text-gray-500 mt-1 mb-4">{statusState.error}</p>
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCcw size={16} />
            Try Again
          </button>
        </div>
      );
    }

    if (statusState.status === "pending") {
      return (
        <div className="py-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-yellow-600 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Application Pending</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Your ID card application is currently under review by the administration. 
              This page will update automatically once approved.
            </p>
          </div>
        </div>
      );
    }

    if (statusState.status === "success") {
      const { fullName, matricNumber, level, department } = statusState.data || {};
      return (
        <div className="py-2 animate-in fade-in duration-500">
           <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-green-900">ID Card Ready!</h3>
              <p className="text-green-700 text-sm">Your application has been approved and processed.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <InfoBox label="Full Name" value={fullName} />
            <InfoBox label="Matric Number" value={matricNumber} />
            <InfoBox label="Level" value={level} />
            <InfoBox label="Department" value={department} />
          </div>
          
          <div className="mt-6 flex justify-center">
             <button disabled className="px-6 py-2.5 bg-gray-900 text-white rounded-lg opacity-50 cursor-not-allowed">
               Download ID Card (Coming Soon)
             </button>
          </div>
        </div>
      );
    }

    // Default/Empty state
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No status information available.</p>
        <button onClick={handleRetry} className="text-blue-600 mt-2 hover:underline">Refresh</button>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full max-w-5xl mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">ID Card Status</h1>
        <p className="text-gray-500 mt-2">Track the live progress of your student identification card.</p>
      </header>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
         {/* Status Indicators (Visual Aid) */}
         <div className="flex gap-4 justify-center mb-8 border-b border-gray-100 pb-8">
            <StatusIndicator label="Pending" isActive={statusState.status === 'pending'} color="bg-yellow-400" />
            <StatusIndicator label="Ready" isActive={statusState.status === 'success'} color="bg-green-500" />
            <StatusIndicator label="Rejected" isActive={statusState.status === 'error'} color="bg-red-500" />
         </div>

         {renderContent()}
      </div>
    </div>
  );
}

// Sub-components
function StatusIndicator({ label, isActive, color }) {
  return (
    <div className={`flex flex-col items-center gap-2 transition-all duration-300 ${isActive ? 'opacity-100 scale-110' : 'opacity-40 grayscale'}`}>
      <div className={`w-3 h-3 rounded-full ${color} ring-4 ring-opacity-20 ${isActive ? 'ring-current' : 'ring-transparent'}`} />
      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-widest block mb-1">{label}</span>
      <span className="text-base font-semibold text-gray-900 block truncate">{value || "—"}</span>
    </div>
  );
}
