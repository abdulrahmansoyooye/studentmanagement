import React from "react";
import "./Login.css";
import logo from "../../assets/unilorin_logo2.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="p-[2rem]">
      <img src={logo} className="w-[80px] m-auto" alt="Logo" />
      <div className="wrapper">
        <form action="">
          <h1 className="">Login Your Details!</h1>
          <p className=" text-gray-500 text-center mt-2">
            Welcome back! Please enter your Details!
          </p>

          <div className="grid gap-8 mt-8">
            <div className="relative">
              <label htmlFor="matric_no" className="block text-gray-700 mb-2">
                Matric Number
              </label>
              <input
                type="text"
                name="matric_no"
                placeholder="Enter your matric number"
                className="w-full px-4 py-2 border rounded"
              />
              {/* <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2" /> */}
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="w-full px-4 py-2 border rounded"
              />
              {/* <FaLock className="absolute right-5 top-1/2 transform -translate-y-1/2" /> */}
            </div>
          </div>

          <div className="remember-forgot flex justify-between mt-10 mb-8 text-[14.5px]">
            <div className="flex flex-row gap-2 items-center">
              <input type="checkbox" className="accent-white w-4 h-4" />
              <p>Remember for 30 days</p>
            </div>
          </div>
          <button className="blue_btn w-full">Login</button>

          <div className="register-link text-[14.5px] text-center mt-8">
            <p>
              Don't have an account?{" "}
              <Link to={"/register"} href="#" className="underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
