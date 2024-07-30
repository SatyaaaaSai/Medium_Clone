import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@satya07thota/common-medium-satya";
import { DATABASE_URL } from "../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });
  async function sendRequest() {
    try {
        toast.info("Processing your request...", { autoClose: 2000 });
      const response = await axios.post(
        `${DATABASE_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,postInputs);
      const jwt = await response.data;
      console.log(jwt);
      localStorage.setItem("token", jwt);
      toast.success("Successfully authenticated!", { autoClose: 2000 });
      navigate("/blogs");
    } catch (error) {
      toast.error("Internal Server Error. Please try again.", { autoClose: 2000 });
      console.log("Internal Serval Error ", error);
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
        <ToastContainer/>
      <div className="flex justify-center">
        <div>
          <div className="px-20">
            <div className="text-3xl font-extrabold">
              {type === "signin"
                ? "Enter valid crenditials"
                : "Create an account"}
            </div>
            <div className="text-slate-400">
              {type === "signin"
                ? "Don't have an account?"
                : "Already an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Signup" : "Signin"}
              </Link>
            </div>
          </div>
          <div>
            {type === "signin" ? (
              ""
            ) : (
              <LabelledInput
                label="Name"
                placeholder="Enter Your Name"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            )}
            <LabelledInput
              label="Email"
              placeholder="abc@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="Enter Your Strong Password(Minimum Six Letters)"
              type={"password"}
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={sendRequest}
                className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                {type === "signin" ? "Signin" : "Signup "}
              </button>
            </div>
          </div>
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
    <div>
      <label className="block my-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border order-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
