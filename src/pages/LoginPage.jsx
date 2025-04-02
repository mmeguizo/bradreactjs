import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { BsApple } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/images/logo.png";
import bg from "../assets/images/wallpaper.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
const Login = ({ login }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordView = () => setShowPassword(!showPassword);

  const style = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    color: "#ffffff", // Set text color to white
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginResults = await login(formData);

    const { success } = loginResults;

    if (success) {
      setLoading(true);
      toast.success("User logged in successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
      localStorage.setItem("token", loginResults.token);
      setTimeout(() => {
        // navigate("/jobs");
        window.location.reload();
        // setLoading(false); // Hide the loading spinner
        navigate("/", { replace: true });
      }, 1500);
    } else {
      toast.error(loginResults.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />

      <div
        style={style}
        className="bg-custom w-full h-screen flex items-center justify-center"
      >
        <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg">
          <img src={logo} alt="logo" className="w-12 md:w-14" />
          <h1 className="text-lg md:text-xl font-semibold">Welcome Back</h1>
          <p className="text-xs md:text-sm text-gray-500 text-center">
            Don't have an account? &nbsp;
            <Link to={"/signup"}>
              <span className="text-white">Sign up</span>
            </Link>
          </p>

          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl">
              <MdAlternateEmail />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email address"
                className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              />
            </div>

            <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl relative">
              <FaFingerprint />
              <input
                type={showPassword ? "password" : "text"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              />
              {showPassword ? (
                <FaRegEyeSlash
                  className="absolute right-5 cursor-pointer"
                  onClick={togglePasswordView}
                />
              ) : (
                <FaRegEye
                  className="absolute right-5 cursor-pointer"
                  onClick={togglePasswordView}
                />
              )}
            </div>
          </div>

          <button className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:bg-blue-600 text-sm md:text-base">
            Login
          </button>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}
    </form>
  );
};

export default Login;
