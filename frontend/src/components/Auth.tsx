import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@sahilcodes23/medium-commons";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Loader2 } from "lucide-react";

// Custom Alert component
const Alert = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
    <span className="block sm:inline">{children}</span>
  </div>
);

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateInputs = () => {
    if (type === "signup" && !postInputs.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(postInputs.email)) {
      setError("Invalid email address");
      return false;
    }
    if (postInputs.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  async function sendRequest() {
    if (!validateInputs()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="px-8 pb-8">
            <div className="text-3xl font-extrabold mb-2">
              {type === "signup" ? "Create an account" : "Sign in"}
            </div>
            <div className="text-slate-400 pb-4">
              {type === "signin"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="underline">
                {type === "signin" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </div>
          {error && <Alert>{error}</Alert>}
          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Sahil Chauhan"
              onChange={(e) => {
                setPostInputs((c) => ({ ...c, name: e.target.value }));
              }}
            />
          )}
          <LabelledInput
            label="Email"
            placeholder="sahilcodes23@gmail.com"
            onChange={(e) => {
              setPostInputs((c) => ({ ...c, email: e.target.value }));
            }}
          />
          <LabelledInput
            label="Password"
            placeholder="••••••••"
            type="password"
            onChange={(e) => {
              setPostInputs((c) => ({ ...c, password: e.target.value }));
            }}
          />
          <button
            type="button"
            onClick={sendRequest}
            disabled={isLoading}
            className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {type === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
        id={label.toLowerCase()}
        type={type || "text"}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}