import { useState } from "react";
import "./App.css";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // === Regular login ===
  const handleLogin = async () => {
    const api = axios.create({
      baseURL: "http://info-assurance-opal.vercel.app:4000",
      headers: { "Content-Type": "application/json" },
    });

    try {
      const { data } = await api.post("/login", { username, password });

      if (data.success) {
        localStorage.setItem("fullname", data.fullname);
        setMessage("Login successful!");
        window.location.href = "/dashboard";
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error");
    }
  };

  // === Google login ===
  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        setMessage("No Google credentials found");
        return;
      }

      const res = await axios.post("http://info-assurance-opal.vercel.app:4000/google-login", {
        token: credentialResponse.credential,
      });

      if (res.data.success) {
        localStorage.setItem("fullname", res.data.fullname);
        setMessage("Google login successful!");
        window.location.href = "/dashboard";
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error("Google login error:", err);
      setMessage("Google login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId="759282268919-cfu3n7h5ao3e7v5f2dpsaoj2r7njj8t0.apps.googleusercontent.com">
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
  <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Welcome to SecureBank</h2>
      <p className="text-gray-600 mt-1">Sign in to access your accounts securely</p>
    </div>

    {/* Form Fields */}
    <div className="space-y-5">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Customer ID or Username <span className="text-red-500">*</span>
        </label>
        <input
          id="username"
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
          placeholder="Enter your Customer ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Secure Password <span className="text-red-500">*</span>
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="button"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        onClick={handleLogin}
      >
        Sign In to My Account
      </button>
    </div>

    <div className="mt-6 text-center">
      <p className="text-gray-600 text-sm">
        Don’t have an account?{" "}
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 font-medium underline focus:outline-none"
          onClick={() => setMessage("Redirecting to enrollment...")}
        >
          Enroll Now
        </button>
      </p>
    </div>

    <div className="my-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setMessage("Google login failed. Please try again.")}
          useOneTap
          // Optional: Force English if you're seeing localized text like "Mag-sign in sa Google"
          ux_mode="popup"
        />
      </div>
    </div>

    {message && (
      <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
        message.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
      }`}>
        {message}
      </div>
    )}
  </div>
</div>
    </GoogleOAuthProvider>
  );
}



// import React, { useState } from "react";
// import './App.css';

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = async () => {
//     const response = await fetch("http://localhost:4000/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });
//     const data = await response.json();
//     setMessage(data.message);
//   };

//   return (
//     <div className="login">
//       <h2>Login Using ExpressJS and NodeJS</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <br />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <br />
//       <button onClick={handleLogin}>Login</button>
//       <p>{message}</p>
//     </div>
//   );
// }