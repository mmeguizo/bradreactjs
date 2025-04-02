import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { LuLetterText, LuText } from "react-icons/lu";
import React, { useState } from "react";
import { BsApple } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/images/logo.png";
import bg from "../assets/images/wallpaper.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { toast, Bounce, ToastContainer } from "react-toastify";
const SignUp = ({ signUp }) => {
  const salt = bcrypt.genSaltSync(10);

  const navigate = useNavigate();
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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "user",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePassword = (e) => {
    const { name, value } = e.target;
    const hash = bcrypt.hashSync(value, salt);
    setFormData((prev) => ({ ...prev, [name]: hash }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addNewUser = await signUp(formData);
    const { success } = addNewUser;
    if (success) {
      toast.success("User added successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
      localStorage.setItem("token", addNewUser.token);
      setTimeout(() => {
        navigate("/jobs");
      }, 1500);
    } else {
      toast.error(addNewUser.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <div
        style={style}
        className=" bg-custom w-full h-screen flex items-center justify-center"
      >
        <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg">
          <img src={logo} alt="logo" className="w-12 md:w-14" />
          <h1 className="text-lg md:text-xl font-semibold">
            Hi there! Welcome
          </h1>
          <p className="text-xs md:text-sm text-gray-500 text-center">
            Got an Account? &nbsp;
            <Link to={"/login"}>
              <span className="text-white">Login here</span>
            </Link>
          </p>

          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl">
              <LuLetterText />
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                placeholder="First Name"
                className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              />
            </div>
            <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl">
              <LuText />
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
                className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              />
            </div>
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
                name="password"
                onChange={handlePassword}
                placeholder="Password"
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
            Sign Up
          </button>

          {/* <div className="relative w-full flex items-center justify-center py-3">
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
          <h3 className="font-lora text-xs md:text-sm px-4 text-gray-500">
            Or
          </h3>
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
        </div>

        <div className="w-full flex items-center justify-evenly md:justify-between gap-2">
          <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
            <BsApple className="text-lg md:text-xl" />
          </div>
          <div className="p-1 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
            <img
              src="/google-icon.png"
              alt="google-icon"
              className="w-6 md:w-8"
            />
          </div>
          <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
            <FaXTwitter className="text-lg md:text-xl" />
          </div>
        </div> */}
        </div>
      </div>
    </form>
  );
};

export default SignUp;
