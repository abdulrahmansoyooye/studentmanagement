import React, { useState, useCallback, useRef, useEffect } from "react";
import "./Login.css";
import logo from "../../assets/unilorin_logo2.png";
import loader from "../../assets/loader.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSession } from "../../../context/session";

const API_BASE =
  process.env.REACT_APP_API_URL || "https://studentbackendportal.onrender.com";

export default function Login() {
  const [form, setForm] = useState({ matricNumber: "", password: "" });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateSessionData } = useSession();
  const navigate = useNavigate();

  const isMounted = useRef(true);
  const abortCtrl = useRef(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (abortCtrl.current) abortCtrl.current.abort();
    };
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (loading) return;

      setErrors(null);
      setLoading(true);

      // cleanup previous controller and create a new one
      if (abortCtrl.current) abortCtrl.current.abort();
      abortCtrl.current = new AbortController();

      try {
        const resp = await axios.post(`${API_BASE}/auth/login`, form, {
          signal: abortCtrl.current.signal,
          headers: { "Content-Type": "application/json" },
        });

        if (resp?.status === 200 && isMounted.current) {
          updateSessionData(resp.data);
          navigate("/");
        }
      } catch (err) {
        // avoid showing errors if request was cancelled
        if (err?.code === "ERR_CANCELED") return;

        const message =
          err?.response?.data?.message || err?.message || "An error occurred";
        if (isMounted.current) setErrors(`${message}. Please try again.`);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    },
    [form, loading, navigate, updateSessionData]
  );

  return (
    <div className="p-[2rem]">
      <img src={logo} className="w-[80px] m-auto" alt="University logo" />
      <div className="wrapper">
        <form onSubmit={handleSubmit} noValidate>
          <h1 className="text-[2rem] font-[500]">Enter Your Details!</h1>
          <p className="text-gray-500 text-center mt-2">
            Welcome back! Please enter your details.
          </p>

          {errors && (
            <p
              className="text-red-500 text-center w-full my-4"
              role="alert"
              aria-live="polite"
            >
              {errors}
            </p>
          )}

          <div className="grid gap-8 mt-8">
            <div className="relative">
              <label htmlFor="matricNumber" className="block text-gray-700 mb-2">
                Matric Number
              </label>
              <input
                id="matricNumber"
                required
                type="text"
                value={form.matricNumber}
                onChange={handleChange}
                name="matricNumber"
                placeholder="Enter your matric number"
                className="w-full px-4 py-2 border rounded"
                autoComplete="username"
              />
            </div>

            <div className="relative mb-3">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                required
                value={form.password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="********"
                className="w-full px-4 py-2 border rounded"
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex justify-center items-center blue_btn gap-[1rem] w-full"
            disabled={loading}
            aria-busy={loading}
          >
            {loading && (
              <img
                src={loader}
                className="w-[20px] h-[20px]"
                alt=""
                aria-hidden="true"
              />
            )}
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
