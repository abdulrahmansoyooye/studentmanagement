// // src/student-dashboard/IdCardStatus.jsx
// import React, { useEffect, useState, useRef, useCallback } from "react";
// import LatestNews from "./LatestNews";
// import axios from "axios";
// import { useSession } from "../../../context/session";
// import { NavLink } from "react-router-dom";
// import { Loader2 } from "lucide-react";

// const API_BASE = process.env.REACT_APP_API_URL || "https://studentbackendportal.onrender.com";

// // Create a shared axios instance for this module (reuse across renders)
// const api = axios.create({
//   baseURL: API_BASE,
//   headers: { "Content-Type": "application/json" },
//   timeout: 10000,
//   withCredentials: false, // typically false for token auth; adjust if using cookies
// });

// export default function IdCardStatus() {
//   const { sessionData } = useSession() || {};
//   const userId = sessionData?.userId;
//   const token = sessionData?.token;

//   const [message, setMessage] = useState(""); // "pending" | "success" | "error" | ""
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetchError, setFetchError] = useState(null);

//   const mountedRef = useRef(true);
//   const abortRef = useRef(null);
//   const pollingRef = useRef({ id: null, interval: 5000, attempts: 0 });

//   // Helper: sanitize/display safe string
//   const safeText = (v) => (v === undefined || v === null ? "—" : String(v));

//   // Fetch function (cancelable)
//   const fetchStatus = useCallback(async (signal) => {
//     if (!userId || !token) return;

//     setFetchError(null);
//     setLoading(true);

//     try {
//       const res = await api.get(`/idcard/${encodeURIComponent(userId)}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         signal,
//       });

//       if (!mountedRef.current) return;

//       const responseData = res.data;
//       // Normalize server status -> client message
//       if (res.status === 202) setMessage("pending");
//       else if (res.status === 200) setMessage("success");
//       else setMessage("error");

//       setData(responseData || null);
//     } catch (err) {
//       if (axios.isCancel && axios.isCancel(err)) {
//         // request cancelled, ignore
//       } else {
//         console.error("IdCardStatus fetch error:", err);
//         if (mountedRef.current) {
//           setFetchError("Unable to load ID card status. Please try again later.");
//           setMessage("error");
//         }
//       }
//     } finally {
//       if (mountedRef.current) setLoading(false);
//     }
//   }, [userId, token]);

//   // Start/stop polling while status is pending
//   const startPolling = useCallback(() => {
//     // clear any existing
//     if (pollingRef.current.id) {
//       clearInterval(pollingRef.current.id);
//       pollingRef.current.id = null;
//       pollingRef.current.attempts = 0;
//     }

//     // only poll if status is pending
//     pollingRef.current.id = setInterval(async () => {
//       pollingRef.current.attempts += 1;

//       // optional exponential backoff (increase interval after N attempts)
//       if (pollingRef.current.attempts > 6) {
//         clearInterval(pollingRef.current.id);
//         pollingRef.current.id = setInterval(fetchStatus, 20000);
//       }

//       // create abort controller for each call
//       const controller = new AbortController();
//       abortRef.current = controller;
//       await fetchStatus(controller.signal);
//     }, pollingRef.current.interval);
//   }, [fetchStatus]);

//   const stopPolling = useCallback(() => {
//     if (pollingRef.current.id) {
//       clearInterval(pollingRef.current.id);
//       pollingRef.current.id = null;
//     }
//     pollingRef.current.attempts = 0;
//   }, []);

//   // Initial + reactive fetch: run when sessionData becomes available
//   useEffect(() => {
//     mountedRef.current = true;

//     if (!userId || !token) {
//       // wait for session to be ready
//       return;
//     }

//     // Abort previous
//     if (abortRef.current) abortRef.current.abort();
//     const controller = new AbortController();
//     abortRef.current = controller;

//     // fetch once
//     fetchStatus(controller.signal).then(() => {
//       // If pending, start polling
//       if (mountedRef.current && message === "pending") {
//         startPolling();
//       }
//     });

//     return () => {
//       mountedRef.current = false;
//       if (abortRef.current) abortRef.current.abort();
//       stopPolling();
//     };
//     // Intentionally include fetchStatus, startPolling, stopPolling. message not included here to avoid double polling start;
//     // polling lifecycle is controlled below in another effect that watches message.
//   }, [userId, token, fetchStatus, startPolling, stopPolling]);

//   // Watch message -> start/stop polling accordingly
//   useEffect(() => {
//     if (message === "pending") {
//       startPolling();
//     } else {
//       stopPolling();
//     }
//     return () => {
//       // noop
//     };
//   }, [message, startPolling, stopPolling]);

//   // UI handlers
//   const onRetry = async () => {
//     if (abortRef.current) abortRef.current.abort();
//     const controller = new AbortController();
//     abortRef.current = controller;
//     await fetchStatus(controller.signal);
//   };

//   return (
//     <div className="min-h-screen w-full">
//       <div className="max-w-4xl mx-auto p-4">
//         <header className="text-center mb-6">
//           <h1 className="text-3xl font-semibold text-gray-800">ID Card Status</h1>
//           <p className="text-sm text-gray-500 mt-1">Track the progress of your ID card application</p>
//         </header>

//         <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
//           <section className="mb-6">
//             <h2 className="text-lg font-semibold mb-3">Please Note</h2>
//             <div className="text-gray-600 leading-relaxed">
//               <p>Dear Student,</p>
//               <p>
//                 Use this page to check your ID card application status. If your application shows <strong>Pending</strong>,
//                 it is awaiting administrative approval — refresh or check back later. Approved cards will be available for
//                 download or collection according to instructions provided.
//               </p>
//             </div>
//           </section>

//           <section className="mb-6">
//             <div className="flex flex-wrap gap-4 justify-center items-center">
//               {/* Status tiles */}
//               <StatusTile label="Pending" active={message === "pending"} color="yellow" />
//               <StatusTile label="Ready" active={message === "success"} color="green" />
//               <StatusTile label="Error" active={message === "error"} color="red" />
//             </div>
//           </section>

//           <section className="mb-4">
//             {loading ? (
//               <div className="flex items-center justify-center p-6">
//                 <Loader2 className="animate-spin text-[#000080]" size={28} />
//                 <span className="ml-3 text-gray-600">Checking status…</span>
//               </div>
//             ) : fetchError ? (
//               <div className="text-center text-sm text-red-600 p-4">
//                 {fetchError}
//                 <div className="mt-3 flex gap-2 justify-center">
//                   <button onClick={onRetry} className="px-4 py-2 rounded-md bg-blue-600 text-white">Retry</button>
//                 </div>
//               </div>
//             ) : message === "success" && data ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="p-4 border rounded-md">
//                   <div className="text-sm text-gray-500">Full name</div>
//                   <div className="font-medium text-gray-800">{safeText(data.fullName)}</div>
//                 </div>
//                 <div className="p-4 border rounded-md">
//                   <div className="text-sm text-gray-500">Matric number</div>
//                   <div className="font-medium text-gray-800">{safeText(data.matricNumber)}</div>
//                 </div>
//                 <div className="p-4 border rounded-md">
//                   <div className="text-sm text-gray-500">Level</div>
//                   <div className="font-medium text-gray-800">{safeText(data.level)}</div>
//                 </div>
//                 <div className="p-4 border rounded-md">
//                   <div className="text-sm text-gray-500">Department</div>
//                   <div className="font-medium text-gray-800">{safeText(data.department)}</div>
//                 </div>

//                 <div className="md:col-span-2 mt-2">
//                   <NavLink to="/identity-cards" className="inline-block px-4 py-2 rounded-md bg-[#000080] text-white">
//                     View / Download ID Card
//                   </NavLink>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center text-gray-600 p-4">
//                 <p>Status: <strong className="capitalize">{message || "Unknown"}</strong></p>
//                 <div className="mt-3">
//                   <button onClick={onRetry} className="px-4 py-2 rounded-md bg-blue-600 text-white">Check again</button>
//                 </div>
//               </div>
//             )}
//           </section>
//         </div>

//         <LatestNews />
//       </div>
//     </div>
//   );
// }

// /* Small presentational tile for status */
// function StatusTile({ label, active, color }) {
//   const colors = {
//     yellow: "bg-yellow-400",
//     green: "bg-green-500",
//     red: "bg-red-500",
//   };
//   return (
//     <div className={`flex flex-col items-center gap-3 p-4 rounded-lg ${active ? "shadow-md bg-gray-100" : ""} w-36`}>
//       <div className={`w-14 h-14 rounded-full ${colors[color] || "bg-gray-300"}`} />
//       <div className="font-medium text-gray-700">{label}</div>
//     </div>
//   );
// }
// src/student-dashboard/IdCardStatus.jsx
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSession } from "../../../context/session";
import { Loader2 } from "lucide-react";

const API_BASE =
  process.env.REACT_APP_API_URL || "https://studentbackendportal.onrender.com";

export default function IdCardStatus() {
  const { sessionData } = useSession() || {};
  const userId = sessionData?.userId;
  const token = sessionData?.token;

  const [status, setStatus] = useState(""); // pending | ready | error
  const [data, setData] = useState(null); // full ID card data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStatus = useCallback(async () => {
    if (!userId || !token) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${API_BASE}/idcard/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(res.data);
      setStatus(res.data.status); // <-- read status from backend
    } catch (err) {
      console.error(err);
      setError("Unable to fetch status. Try again later.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  // Initial fetch + polling if status is pending
  useEffect(() => {
    fetchStatus();

    let intervalId = null;

    if (status === "pending") {
      intervalId = setInterval(fetchStatus, 5000); // poll every 5s
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchStatus, status]);

  return (
    <div className="min-h-screen w-full p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">ID Card Status</h1>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <StatusTile label="Pending" active={status === "pending"} color="yellow" />
        <StatusTile label="Ready" active={status === "ready"} color="green" />
        <StatusTile label="Error" active={status === "error"} color="red" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" size={24} />
          <span>Checking status...</span>
        </div>
      ) : error ? (
        <div className="text-red-600 mb-4">{error}</div>
      ) : status === "ready" && data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InfoBox label="Full Name" value={data.fullName} />
          <InfoBox label="Matric Number" value={data.matricNumber} />
          <InfoBox label="Level" value={data.level} />
          <InfoBox label="Department" value={data.department} />
        </div>
      ) : null}

      <button
        onClick={fetchStatus}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Refresh Status
      </button>
    </div>
  );
}

function StatusTile({ label, active, color }) {
  const colors = {
    yellow: "bg-yellow-400",
    green: "bg-green-500",
    red: "bg-red-500",
  };

  return (
    <div
      className={`flex flex-col items-center p-4 rounded-lg w-36 ${
        active ? "shadow-md bg-gray-100" : ""
      }`}
    >
      <div className={`w-14 h-14 rounded-full ${colors[color]}`}></div>
      <div className="font-medium text-gray-700 mt-2">{label}</div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="p-4 border rounded-md">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium text-gray-800">{value || "—"}</div>
    </div>
  );
}
