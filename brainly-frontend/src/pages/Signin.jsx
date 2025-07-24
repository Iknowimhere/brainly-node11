import React, { useEffect, useState } from "react";
import axios from "../axios";
import { enqueueSnackbar } from "notistack";
import useAuth from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
    let {setUser,setToken}=useAuth()
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate=useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
    }
  }, [error]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("All fields are required.");
      return;
    }

    try {
      let res = await axios.post("/users/signin", form);
    setLoading(false);
    enqueueSnackbar("Signin Successfull!!", { variant: "success" });
    console.log(res);
    setUser(res.data.existingUser)
    setToken(res.data.token)
    setForm({
      username: "",
      password: "",
    });
      navigate("/dashboard") 
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-4 sm:p-8 rounded-lg shadow-md space-y-4 sm:space-y-6"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
          Sign In
        </h2>
        <div>
          <label className="block text-gray-600 mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
        >
          {loading ? "Signing in..." : "Signin"}
        </button>
        <div className="flex flex-col gap-2 mt-4">
          <span className="text-xs text-gray-500 text-center">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signin;
