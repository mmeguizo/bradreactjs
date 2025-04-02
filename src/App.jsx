import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import NotFoundLayout from "./layouts/NotFoundLayout";
import ViewAllJobsCta from "./components/ViewAllJobsCta"; // Ensure this is imported
import JobPage from "./pages/JobPage";
import jobLoader from "./utils/jobLoader";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import AuthGuard from "./utils/authGuard";
import ManualJsonWebTokenCreator from "./utils/jsonwebtoken";
import bcrypt from "bcryptjs";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import Spinner from "./components/Spinner";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert token to boolean
    setLoading(false); // Stop loading once checked
  }, []);

  if (loading) return <Spinner />; // Prevent flashing of protected pages

  const addJob = async (newJob) => {
    try {
      const results = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });
      const data = await results.json();
      return data ? data : null;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const editJob = async (editJob) => {
    try {
      const results = await fetch(`/api/jobs/${editJob.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editJob),
      });

      const data = await results.json();
      return data ? data : null;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const deleteJob = async (jobId) => {
    try {
      const results = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      const data = await results.json();
      return data ? data : null;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const signUp = async (newUserData) => {
    try {
      // check first if the email is taken,
      const checkEmail = await fetch(
        `/api/users?email=${encodeURIComponent(newUserData.email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const existingUser = await checkEmail.json();
      // return existingUser;
      if (existingUser.length > 0) {
        return {
          message: "Email already taken",
          data: existingUser,
          status: 409,
          success: false,
        };
      } else {
        const addUser = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserData),
        });

        const data = await addUser.json();
        const token = await ManualJsonWebTokenCreator(data);
        // return data ? data : null;
        return {
          data: data,
          message: "User added successfully",
          status: 200,
          success: true,
          token: token,
        };
      }
    } catch (error) {
      return { message: error, status: 400, success: false };
    }
  };

  /*
   const checkEmailResponse = await fetch(`/api/users?email=${encodeURIComponent(newUserData.email)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

  */
  const login = async (userData) => {
    try {
      const responseData = await fetch(
        `/api/users?email=${encodeURIComponent(userData.email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await responseData.json();
      const passwordCompare = bcrypt.compareSync(
        userData.password,
        data[0].password
      ); // false

      if (passwordCompare) {
        const token = await ManualJsonWebTokenCreator(data[0]);
        setIsAuthenticated(true);
        return {
          data: data,
          message: "User logged in successfully",
          status: 200,
          success: true,
          token: token,
        };
      } else {
        return { message: "Invalid credentials", status: 401, success: false };
      }
    } catch (error) {
      return { message: error, status: 400, success: false };
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login login={login} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <SignUp signUp={signUp} />
            )
          }
        />

        <Route
          path="/"
          element={
            isAuthenticated ? (
              <MainLayout setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route
            path="/job/:id"
            element={<JobPage deleteJob={deleteJob} />}
            loader={jobLoader}
          />
          <Route
            path="/edit-job/:id"
            element={
              <AuthGuard>
                <EditJobPage editJob={editJob} />
              </AuthGuard>
            }
            loader={jobLoader}
          />
          <Route
            path="/add-job"
            element={
              <AuthGuard>
                <AddJobPage addJobSubmit={addJob} />
              </AuthGuard>
            }
          />
        </Route>
        {/* Catch-all route for 404 should be outside of MainLayout */}
        <Route path="*" element={<NotFoundLayout />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="test" element={<ViewAllJobsCta />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
