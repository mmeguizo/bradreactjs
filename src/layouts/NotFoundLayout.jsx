import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const NotFoundLayout = () => {
  console.log("NotFoundLayout rendered"); // Debugging log
  useEffect(() => {
    console.log("NotFoundPage useEffect rendered"); // Debugging log
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default NotFoundLayout;
