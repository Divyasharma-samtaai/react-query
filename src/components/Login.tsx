import { useState } from "react";
import "./Login.css";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/authapi";
import ProductSearch from "./ProductSearch";


interface Errors {
  username?: string;
  password?: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { mutate, isPending, isError, error } = useMutation<
    unknown,
    Error,
    LoginPayload
  >({
    mutationFn: loginUser,
    onSuccess: () => {
      setIsAuthenticated(true);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Errors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    mutate({ username, password });
  };

  if (isAuthenticated) {
    return <ProductSearch />;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {isError && error && <p className="form-error">{error.message}</p>}

        {/* Username */}
        <label htmlFor="username" className="login-label">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors((prev) => ({ ...prev, username: undefined }));
          }}
          className={errors.username ? "error-input" : ""}
        />
        {errors.username && <p className="error-text">{errors.username}</p>}

        {/* Password */}
        <label htmlFor="password" className="login-label">
          Password
        </label>

        <div className="password-container">
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            className={errors.password ? "error-input" : ""}
          />
        </div>

        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
