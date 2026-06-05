import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "male",
    contactNumber: "",
    email: "",
    username: "",
    password: "",
    address: "",
    type: "editor",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.age.trim() ||
      !formData.contactNumber.trim() ||
      !formData.email.trim() ||
      !formData.username.trim() ||
      !formData.password.trim() ||
      !formData.address.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^\d+$/.test(formData.age)) {
      setError("Age must be a number only.");
      return;
    }

    if (!/^\d{11}$/.test(formData.contactNumber)) {
      setError("Contact number must be 11 digits.");
      return;
    }

    if (formData.username.includes(" ")) {
      setError("Username must not contain spaces.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      await createUser({
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: formData.age.trim(),
        contactNumber: formData.contactNumber.trim(),
        email: formData.email.trim(),
        username: formData.username.trim(),
        password: formData.password.trim(),
        address: formData.address.trim(),
      });

      setSuccess("Account created successfully. You can now log in.");

      setTimeout(() => {
        navigate("/auth/signin");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-header">
        <p className="auth-label-top">Join Us</p>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">
          Sign up and discover modern fashion styles.
        </p>
      </div>

      <form className="auth-fields" onSubmit={handleSubmit}>
        {error && (
          <p
            style={{
              color: "#dc2626",
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            {error}
          </p>
        )}

        {success && (
          <p
            style={{
              color: "#16a34a",
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            {success}
          </p>
        )}

        <div className="auth-grid">
          <div className="auth-field">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              className="auth-input"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              className="auth-input"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="auth-grid">
          <div className="auth-field">
            <label>Age</label>
            <input
              type="text"
              name="age"
              placeholder="Age"
              className="auth-input"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label>Gender</label>
            <select
              name="gender"
              className="auth-input"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="auth-field">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            placeholder="11-digit contact number"
            className="auth-input"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>

        <div className="auth-field">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="auth-input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="auth-field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Create username"
            className="auth-input"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="auth-field">
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            className="auth-input"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create password"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="auth-help-text">
            Use at least 8 characters. Username must not contain spaces.
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="auth-footer-text">
        Already have an account?{" "}
        <Link to="/auth/signin" className="auth-link">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;