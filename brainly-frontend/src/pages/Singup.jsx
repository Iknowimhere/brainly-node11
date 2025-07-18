import { useEffect, useState } from "react";
import axios from "../axios";
import { enqueueSnackbar } from "notistack";
import useAuth from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const Singup = () => {
  let {setUser,setToken}=useAuth()
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  let navigate=useNavigate()
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  useEffect(()=>{
    if(error){
        enqueueSnackbar(error,{variant:"error",autoHideDuration:3000,preventDuplicate:true})
    }
  },[error])

  const handleSubmit = async (e) => {
    e.preventDefault();
        setLoading(true)
    // Basic frontend validation
    if (!form.username || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Password pattern: 8-12 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 symbol
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&*_=+\-])[a-zA-Z0-9!@#\$%\^&*_=+\-]{8,12}$/;
    if (!pattern.test(form.password)) {
      setError(
        "Password must be 8-12 chars, include uppercase, lowercase, number, and symbol (!@#$%^&*_=+-)."
      );
      return;
    }
    // TODO: Add your signup logic here (API call etc.)
    // Example: console.log(form);

   try {
    let res=await axios.post("/users/signup",form)
    setLoading(false)
    enqueueSnackbar("Signup Successfull!!",{variant:"success",preventDuplicate:true,autoHideDuration:3000})
    console.log(res);
    setUser(res.data.newUser)
    setToken(res.data.token)
    setForm({
    username: "",
    password: "",
    confirmPassword: "",
  }) 
  navigate("/dashboard")  
   } catch (error) {
    console.log(error.response.data.message);
    setError(error.response.data.message)
   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Sign Up</h2>
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
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
        >
          {loading?"Signing up...":"Signup"}
        </button>
      </form>
    </div>
  );
};

export default Singup;