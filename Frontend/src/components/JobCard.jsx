import React from "react";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/jobs/${job._id}`); // Assuming `_id` is the field for job ID
  };

  return (
    <div
      className="card bg-base-100 w-full shadow-md border cursor-pointer border-black hover:border-gray-500"
    >
      <div className="card-body">
        <h2 className="card-title">{job.title}</h2>
        <h3>{job.company}</h3>
        <p>{job.description.slice(0,250)+'...'}</p>
        <p>
          <i className="fa-solid fa-briefcase mr-2"></i>
          {job.type}
        </p>
        <p>
          <i className="fa-solid fa-location-dot mr-2"></i>
          {job.location}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleViewDetails}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
