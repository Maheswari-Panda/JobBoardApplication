import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from './JobCard';
import JobSearchBar from './JobSearchBar';
import Spinner from './Spinner'; // 👈 Step 1: Import Spinner

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [query, setQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs/getall');
        setJobs(response.data);
        setFilteredJobs(response.data);
        setTimeout(()=>{
          setLoading(false);
        },500);
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
        setTimeout(()=>{
          setLoading(false);
        },500);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let temp = [...jobs];

    if (query) {
      temp = temp.filter(
        job =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedJob) {
      temp = temp.filter(job => job.title === selectedJob);
    }

    if (selectedLocation) {
      temp = temp.filter(job => job.location === selectedLocation);
    }

    setFilteredJobs(temp);
  }, [query, selectedJob, selectedLocation, jobs]);

  const jobTitles = [...new Set(jobs.map(job => job.title))];
  const locations = [...new Set(jobs.map(job => job.location))];

  if (loading) return <div className="flex justify-center my-10"><Spinner /></div>; // 👈 Step 2: Use Spinner
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <JobSearchBar
        query={query}
        setQuery={setQuery}
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        jobTitles={jobTitles}
        locations={locations}
      />

      {filteredJobs.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No jobs found.</div>
      ) : (
        <div className="grid gap-6 mt-6 grid-cols-1">
          {filteredJobs.map((job, index) => (
            <JobCard key={`${job._id}-${index}`} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllJobs;
