import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@sahilcodes23/medium-commons";
import axios from "axios";
import { BACKEND_URL } from "../config";
//trps lib for extremely strict frontends and backends types
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostinputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {}
  }

  return (
    <>
      <div className="h-screen flex justify-center flex-col">
        {/* {JSON.stringify(postInputs)} */}
        <div className="flex justify-center">
          <div>
            <div className="px-12">
              <div className="text-3xl font-extrabold">Create an account</div>
              <div className="text-slate-400 pb-4">
                {type === "signin"
                  ? "Don't have an account ? "
                  : "Already have an account ? "}
                <Link
                  to={type === "signin" ? "/signup" : "/signin"}
                  className="underline">
                  {type === "signin" ? "Sign Up" : "Sign In"}
                </Link>
              </div>
            </div>
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Sahil Chauhan"
                onChange={(e) => {
                  setPostinputs((c) => ({ ...c, name: e.target.value }));
                }}></LabelledInput>
            ) : null}
            <LabelledInput
              label="Email"
              placeholder="sahilcodes23@gmail.com"
              onChange={(e) => {
                setPostinputs((c) => ({ ...c, email: e.target.value }));
              }}></LabelledInput>
            <LabelledInput
              label="Password"
              placeholder="sahil1234"
              type={"password"}
              onChange={(e) => {
                setPostinputs((c) => ({ ...c, password: e.target.value }));
              }}></LabelledInput>
            <button
              type="button"
              onClick={sendRequest}
              className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              {type === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

interface labelledInputType {
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
}: labelledInputType) {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-2xl"
          id="username"
          type={type || "text"}
          onChange={onChange}
          placeholder={placeholder}></input>
      </div>
    </>
  );
}
