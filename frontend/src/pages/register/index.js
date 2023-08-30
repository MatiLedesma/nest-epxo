import * as React from "react";
import { navigate } from "gatsby";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggler from "../../design/ThemeToggler";

const Register = () => {
  const { theme } = useTheme();
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [error, setError] = React.useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      user.email === "" ||
      user.password === "" ||
      user.passwordRepeat === "" ||
      user.name === "" ||
      user.lastname === ""
    ) {
      setError("The fields cannot be empty");
      return setLoading(false);
    }
    if (user.password !== user.passwordRepeat) {
      setError("Passwords must be equal");
      return setLoading(false);
    }
    delete user.passwordRepeat;
    const create = await fetch("http://localhost:3030/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const isCreated = await create.json();
    if ("message" in isCreated) {
      setError(isCreated.message);
      return setLoading(false);
    }
    setMessage("Account created with id: " + isCreated.id);
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
      {message !== "" && (
        <div className="alert alert-success absolute bottom-4 w-1/2">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{message}</span>
          <div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => {
                setMessage("");
                navigate("/");
              }}
            >
              Accept
            </button>
          </div>
        </div>
      )}
      <ThemeToggler />
      <h2 className="text-2xl">Gatsby App Register</h2>
      <form className="flex justify-center items-center flex-col p-5 w-full">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered input-accent w-1/2 max-w-xs m-2"
          value={user.name}
          onChange={({ target }) =>
            setUser((state) => ({ ...state, name: target.value }))
          }
        />
        <input
          type="text"
          placeholder="Lastname"
          className="input input-bordered input-accent w-1/2 max-w-xs m-2"
          value={user.lastname}
          onChange={({ target }) =>
            setUser((state) => ({ ...state, lastname: target.value }))
          }
        />
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
          placeholder="Password"
          className="input input-bordered input-accent w-1/2 max-w-xs m-2"
          value={user.password}
          onChange={({ target }) =>
            setUser((state) => ({ ...state, password: target.value }))
          }
        />
        <input
          type="password"
          placeholder="Repeat password"
          className="input input-bordered input-accent w-1/2 max-w-xs m-2"
          value={user.passwordRepeat}
          onChange={({ target }) =>
            setUser((state) => ({ ...state, passwordRepeat: target.value }))
          }
        />
        <button onClick={handleRegister} className="btn btn-primary w-1/4 m-2">
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            "Sign up"
          )}
        </button>
        <button onClick={(e)=>{
            e.preventDefault();
            navigate("/");
        }} className="btn btn-warning btn-outline w-1/4 m-2">
          Go back
        </button>
      </form>
    </main>
  );
};

export default Register;

export const Head = () => <title>Register</title>;
