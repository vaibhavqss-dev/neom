import React, { useState, FormEvent } from "react";

interface SignupFormData {
  username: string;
  password: string;
  name: string;
  email: string;
  mobile_number: string;
}

interface SignupErrors {
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  mobile_number?: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    username: "",
    email: "",
    mobile_number: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof SignupErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: SignupErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.mobile_number.trim()) {
      newErrors.mobile_number = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile_number.replace(/\D/g, ""))) {
      newErrors.mobile_number = "Mobile number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Form data", formData);

    setApiError(null);
    setSignupSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign up");
      }

      // Success
      setSignupSuccess(true);
      // Reset form
    //   setFormData({
    //     username: "",
    //     password: "",
    //     name: "",
    //     email: "",
    //     mobile_number: "",
    //   });
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create an Account</h2>
        <p className="subtitle">Join us today and start your journey</p>

        {signupSuccess && (
          <div className="success-message">
            Account created successfully! You can now log in.
          </div>
        )}

        {apiError && <div className="error-message">{apiError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              placeholder="example@email.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "error" : ""}
              placeholder="Choose a username"
            />
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              type="tel"
              id="mobile_number"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              className={errors.mobile_number ? "error" : ""}
              placeholder="Enter your mobile number"
            />
            {errors.mobile_number && (
              <span className="error-text">{errors.mobile_number}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
              placeholder="Create a password"
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
