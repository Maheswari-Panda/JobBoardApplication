import React from 'react';

function JobSearchBar({
  query,
  setQuery,
  selectedJob,
  setSelectedJob,
  selectedLocation,
  setSelectedLocation,
  jobTitles = [],
  locations = [],
}) {
  return (
    <div className="w-full px-4 sm:px-8 md:px-16 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search job keyword..."
          className="input input-bordered w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Job Title Dropdown */}
        <select
          className="select select-bordered w-full"
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
        >
          <option value="">All Job Titles</option>
          {jobTitles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>

        {/* Location Dropdown */}
        <select
          className="select select-bordered w-full"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default JobSearchBar;
