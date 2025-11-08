import { useState, useCallback, useEffect, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSession } from "../../../context/session";
import logo from "../../assets/unilorin_logo2.png";
import loader from "../../assets/loader.svg";

/**
 * Centralized API config — allows easy swapping between environments.
 */
const API_BASE =  "https://studentbackendportal.onrender.com";

/**
 * Secure Axios instance with sane defaults and protection headers.
 */
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

export default function Login() {
  const navigate = useNavigate();
  const { updateSessionData } = useSession();

  const [form, setForm] = useState({ matricNumber: "", password: "" });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortCtrl = useRef(null);
  const isMounted = useRef(true);

  // ✅ cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (abortCtrl.current) abortCtrl.current.abort();
    };
  }, []);

  /** ✅ Input Change Handler with Sanitization */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/[<>]/g, "");
    setForm((prev) => ({ ...prev, [name]: cleanValue }));
  }, []);

  /** ✅ Fixed Submit Handler */
  const handleSubmit = useCallback(
    async (e) => {

      e.preventDefault();
      if (loading) return;

      setErrors(null);
      setLoading(true);

      // cancel previous request
      if (abortCtrl.current) abortCtrl.current.abort();
      abortCtrl.current = new AbortController();

      try {
        const response = await api.post(
          "/auth/login",
          { ...form },
          { signal: abortCtrl.current.signal }
        );
        if (response.status === 200 && isMounted.current) {
          const { token, userId, ...rest } = response.data;
           
          // ✅ ensure your session context updates reactively
          updateSessionData({
            token,
            userId,
            ...rest, // optional extra user info
          });

          // ✅ also persist to storage (optional but useful)
          localStorage.setItem("sessionData", JSON.stringify({ token, userId }));

          // ✅ navigate without hard reload (keeps React context alive)
          navigate("/", { replace: true });
        }
      } catch (error) {
        if (error.code === "ERR_CANCELED") return;

        const message =
          error.response?.data?.message ||
          "Invalid credentials or network error.";
        if (isMounted.current) setErrors(message);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    },
    [form, loading, navigate, updateSessionData]
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md transition-transform hover:scale-[1.01]">
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="University Logo"
            className="w-20 mb-3 drop-shadow-sm"
            loading="lazy"
          />
          <h1 className="text-2xl font-semibold text-gray-800">
            Sign in to your account
          </h1>
          <p className="text-gray-500 text-sm mt-1">Enter your details below</p>
        </div>

        {errors && (
          <div
            className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3 mb-4 text-center"
            role="alert"
            aria-live="polite"
          >
            {errors}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="matricNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Matric Number
            </label>
            <input
              id="matricNumber"
              name="matricNumber"
              type="text"
              required
              value={form.matricNumber}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="e.g. 21/01/0012"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-white font-medium transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading && <img src={loader} alt="" className="w-5 h-5 animate-spin" />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Forgot password?{" "}
          <a
            href="/reset"
            className="text-blue-600 hover:text-blue-700 font-medium transition"
          >
            Reset here
          </a>
        </p>
      </section>
    </main>
  );
}

