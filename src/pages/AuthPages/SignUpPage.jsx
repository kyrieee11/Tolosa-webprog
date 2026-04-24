import { Link } from "react-router-dom";
import Button from "../../components/Button";

const SignUpPage = () => {
  return (
    <div className="auth-form">
      <div className="auth-header">
        <p className="auth-label-top">Join Us</p>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">
          Sign up and discover modern fashion styles.
        </p>
      </div>

      <form className="auth-fields">
        <div className="auth-grid">
          <div className="auth-field">
            <label>First Name</label>
            <input type="text" placeholder="First name" className="auth-input" />
          </div>

          <div className="auth-field">
            <label>Last Name</label>
            <input type="text" placeholder="Last name" className="auth-input" />
          </div>
        </div>

        <div className="auth-field">
          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" className="auth-input" />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input type="password" placeholder="Create password" className="auth-input" />
          <p className="auth-help-text">
            Use at least 8 characters with letters and numbers.
          </p>
        </div>

        <Button type="submit" className="w-full">
          Create Account
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