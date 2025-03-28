import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import { setFullname, setToken, setUser_id } from "../../../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { addToken } from "../../../Redux/reducers/login";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success && data.token) {
        console.log("Login successful, saving token");
        setToken(data.token);
        setUser_id(data.user_id);
        setFullname(data.fullname || "Test User");

        dispatch(addToken(data));
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
      setIsSubmitted(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <button type="submit" disabled={loading} className={styles.loginButton}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
