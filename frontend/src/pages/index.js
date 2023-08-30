import * as React from "react";
import { navigate } from "gatsby";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/UserContext";
import ThemeToggler from "../design/ThemeToggler";

const IndexPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { login } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState("");

  const handleAuthentication = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(user);
    if (user.email === "" || user.password === "") {
      setError("The fields cannot be empty");
      return setLoading(false);
    }
    const auth = await fetch("http://localhost:3030/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const token = await auth.json();
    if ("message" in token) {
      setError(token.message);
      return setLoading(false);
    }
    login(token.access_token);
    navigate("/home");
    setLoading(false);
  };

  return (
    <main
      data-theme={theme}
      style={{ height: "100vh" }}
      className="flex justify-center items-center flex-col relative"
    >
      {error !== "" && (
        <div className="alert alert-error absolute bottom-4 w-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
          <div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setError("")}
            >
              Accept
            </button>
          </div>
        </div>
      )}
      <ThemeToggler />
      <h2 className="text-2xl">Gatsby App Login</h2>
      <form className="flex justify-center items-center flex-col p-5 w-full">
        <input
          type="text"
          placeholder="email"
          className="input input-bordered input-accent w-1/2 max-w-xs m-2"
          value={user.email}
          onChange={({ target }) =>
            setUser((state) => ({ ...state, email: target.value }))
          }
        />
        <input
          type="password"
          placeholder="•••••••••"
          className="input input-bordered input-accent w-1/2 max-w-xs m-2"
          value={user.password}
          onChange={({ target }) =>
            setUser((state) => ({ ...state, password: target.value }))
          }
        />
        <button
          onClick={handleAuthentication}
          className="btn btn-primary w-1/4 m-2"
        >
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            "Sign In"
          )}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
          className="btn btn-warning btn-outline w-1/4 m-2"
        >
          Doesn't have an account? <span className="font-bold">Create one!</span>
        </button>
      </form>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Login</title>;
