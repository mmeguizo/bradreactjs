/*eslint no-unused-vars: "off"*/
import { useEffect, useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";

const JobCard = ({ id, type, title, description, salary, location }) => {
  const [showFullJobDescription, setShowFullJobDescription] = useState(false);
  const lessJobDescriptions = description.split(" ").slice(0, 20).join(" ");

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{type}</div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        <div className="mb-5">
          {showFullJobDescription ? description : lessJobDescriptions + "..."}
        </div>
        <div
          className="text-sm mb-3 text-indigo-500 hover:underline cursor-pointer"
          onClick={() => setShowFullJobDescription((oldState) => !oldState)}
        >
          {/* <div
          className="text-sm mb-3 text-indigo-500 hover:underline cursor-pointer"
          onClick={toggleFullJobDescription}
        > */}
          {showFullJobDescription ? "Show Less" : "Show More"}
        </div>

        <h3 className="text-indigo-500 mb-2">{salary}</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            {/* <i className="fa-solid fa-location-dot text-lg"></i> */}
            <FaMapMarker className="inline mb-1 mr-1 text-lg" />
            {location}
          </div>
          <Link
            to={`/job/${id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
