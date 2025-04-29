import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner'; // Assuming you have a Spinner component

function JobDetails() {
  const { id } = useParams(); // Get job ID from route
  const navigate = useNavigate(); // Hook for navigation
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true); // Set loading to true initially
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
        
        // Simulate a 500ms delay before stopping the spinner
        setTimeout(() => {
          setLoading(false);
        }, 500);
        
      } catch (err) {
        setError('Job not found or server error.');
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <div className="text-center my-10"><Spinner /></div>;
  if (error) return <div className="text-center text-red-500 text-xl">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 shadow-lg rounded-lg border border-gray-900">
      {/* Back Button */}
      <button
        className="btn btn-primary mb-4"
        onClick={() => navigate(-1)} // Go back to the previous page
      >
        <i className="fa-solid fa-arrow-left"></i>Back
      </button>

      {/* Job Title and Company */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white-800">{job.title}</h1>
          <h2 className="text-xl text-white-600">{job.company}</h2>
        </div>
        <button className="btn btn-primary mt-4 md:mt-0 md:ml-4 w-full md:w-auto" onClick={() => window.alert("Applied Successfully!")}>
          Apply Now
        </button>
      </div>

      {/* Job Type, Location, Posted Date */}
      <div className="mt-4 flex flex-wrap gap-4">
        <span className="badge badge-outline">{job.type}</span>
        <span className="badge badge-outline">{job.location}</span>
        <span className="badge badge-outline">
          Posted: {new Date(job.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Job Description */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Job Description</h3>
        <p className="text-white-800 text-base">{job.description}</p>
      </div>
    </div>
  );
}

export default JobDetails;
