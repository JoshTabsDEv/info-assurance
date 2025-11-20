import { useState } from "react";
import "./App.css";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // === Regular login ===
  const handleLogin = async () => {
    const api = axios.create({
      baseURL: "http://localhost:4000",
      headers: { "Content-Type": "application/json" },
    });

    try {
      const { data } = await api.post("/registration", { username, password, fullname, email });
 
      if (data.success) {
        localStorage.setItem("fullname", data.fullname);
        setMessage("Signup successful!");
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

      const res = await axios.post("http://localhost:4000/google-dashboard", {
        token: credentialResponse.credential,
      });

      if (res.data.success) {
        localStorage.setItem("fullname", res.data.fullname);
        setMessage("Google login successful!");
        window.location.href = "/login";
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
      <div className="login">
        <h2>Sign up Using React + TypeScript + Express + MySQL</h2>

        {/* Regular login */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="fullname"
          placeholder="fullname"
          value={password}
          onChange={(e) => setFullname(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="email"
          value={password}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Sign up</button>
        

        <hr />

        {/* Google login option */}
        <h3>Or login with Google</h3>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setMessage("Google login failed")}
        />

        <p>{message}</p>
      </div>
    </GoogleOAuthProvider>
  );
}

