import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";

const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ simple check (you can change values)
    if (email === "admin@gmail.com" && password === "123456") {
      navigate("/"); // go to home
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-header">
        <h1 className="auth-title">Login</h1>
      </div>

      <form className="auth-fields" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>

      <p className="auth-footer-text">
        No account?{" "}
        <Link to="/auth/signup" className="auth-link">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;