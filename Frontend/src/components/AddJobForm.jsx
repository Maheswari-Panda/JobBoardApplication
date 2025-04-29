import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Spinner from './Spinner'; // Assuming you have a Spinner component

// Initial form values
const initialValues = {
  title: '',
  company: '',
  type: '',
  location: '',
  description: '',
};

// Validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required('Job title is required'),
  company: Yup.string().required('Company name is required'),
  type: Yup.string().required('Job type is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string().required('Job description is required'),
});

const AddJobForm = () => {
  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      // Making the API call to the backend
      const response = await axios.post('http://localhost:5000/api/jobs/addjob', values);
      console.log('Job added successfully:', response.data);

      // Reset the form after submission
      resetForm();

      // Display success alert and redirect to the homepage
      window.alert('Job added successfully!');
      window.location.href = '/'; // Redirect to homepage

      // Set success status
      setStatus({ success: true });
    } catch (error) {
      console.error('Error adding job:', error);

      // Display error message
      setStatus({ success: false, error: 'Failed to add job. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-base-100 shadow-md rounded-lg border border-black hover:border-gray-500">
      <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <label className="label">Job Title</label>
              <Field
                type="text"
                name="title"
                placeholder="Enter job title"
                className="input input-bordered w-full"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="label">Company Name</label>
              <Field
                type="text"
                name="company"
                placeholder="Enter company name"
                className="input input-bordered w-full"
              />
              <ErrorMessage name="company" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="label">Job Type</label>
              <Field
                as="select"
                name="type"
                className="select select-bordered w-full"
              >
                <option value="">Select type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="label">Location</label>
              <Field
                type="text"
                name="location"
                placeholder="Enter location"
                className="input input-bordered w-full"
              />
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="label">Job Description</label>
              <Field
                as="textarea"
                name="description"
                placeholder="Enter job description"
                className="textarea textarea-bordered w-full"
                rows="4"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <Spinner /> Adding Job...
                </div>
              ) : (
                'Add Job'
              )}
            </button>

            {/* Display success or error message */}
            {status && status.success && (
              <div className="text-green-500 mt-4">Job added successfully!</div>
            )}
            {status && status.error && (
              <div className="text-red-500 mt-4">{status.error}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddJobForm;
