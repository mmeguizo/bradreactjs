import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get token as string

  const { isExpired } = useJwt(token);
  console.log("Token:", token, "Is Expired:", isExpired);

  // If `isExpired` is undefined, wait until it's resolved
  if (isExpired === undefined) return null;

  // Handle navigation and token removal
  useEffect(() => {
    if (!token || isExpired) {
      localStorage.removeItem("token"); // Clean up invalid token
      navigate("/login"); // Redirect to login page
    }
  }, [token, isExpired, navigate]);

  // If token exists and is not expired, render the protected content
  if (!token || isExpired) {
    return null; // Render nothing or a loading spinner if desired while waiting for the redirect
  }

  return children; // Render protected content if token is valid
};

export default AuthGuard;
