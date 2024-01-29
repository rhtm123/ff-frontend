import React, { useState } from "react";
import { myFetch } from "@/utils/myFetch"; // Update the path based on your project structure

const Complaint = () => {
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    details: "",
    mobile: "",
  });
  const [errorMessage, setErrorMessage] = useState(null); // New state for error message
  const [submitting, setSubmitting] = useState(false); // New state for submitting
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const handleInputChange = (e) => {
    setErrorMessage("");
    setSuccessMessage(""); // Clear success message on input change
    const { name, value } = e.target;
    setNewComplaint((prevComplaint) => ({
      ...prevComplaint,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newComplaint.mobile === "") {
      setErrorMessage("Please enter a mobile number");
      return;
    }

    setSubmitting(true); // Set submitting to true when the form is being submitted

    let ownerId = null;

    try {
      // Fetch owner details based on the mobile number
      let url =
        process.env.API_URL + "api/owners?mobile=" + newComplaint.mobile;
      let ownersData = await myFetch(url);

      // Use ownerId from ownersData (assuming ownerId is available in ownersData)
      if (ownersData.owners.length > 0) {
        ownerId = ownersData.owners[0]?._id;
      } else {
        setErrorMessage("This Mobile number is not registered");
        return;
      }

      // Submit the complaint with ownerId, title, and details
      await myFetch(process.env.API_URL + "api/complaints", "POST", {
        ownerId: ownerId,
        title: newComplaint.title,
        details: newComplaint.details,
      });

      // Set success message
      setSuccessMessage("Complaint Registered Successful!");

      // Reset the form and clear the error
      setNewComplaint({
        title: "",
        details: "",
        mobile: "",
      });
      setErrorMessage(null);
    } catch (error) {
      console.error("Error creating complaint:", error);
    } finally {
      setSubmitting(false); // Set submitting back to false after the form is submitted
    }
  };

  return (
    <div className="min-h-screen px-6 py-3 mx-auto">
      <div className="lg:flex">
        <div className="lg:w-1/2 lg:mx-10">
          <h2 className="text-2xl font-semibold lg:text-3xl mt-4">
            Create New Complaint
          </h2>

          {successMessage && (
            <div role="alert" className="alert alert-success mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {!successMessage && (
            <form onSubmit={handleSubmit} className="mt-12">
              <div className="mb-6">
                <label className="block mb-2 text-sm">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={newComplaint.title}
                  onChange={handleInputChange}
                  placeholder=""
                  className="py-5 input input-bordered input-xs w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm">Details</label>
                <textarea
                  name="details"
                  value={newComplaint.details}
                  onChange={handleInputChange}
                  className="py-3 textarea textarea-bordered textarea-xs w-full"
                  placeholder=""
                />
              </div>

              <div className="mb-4">
                <label className="block mb-4 text-sm">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  required
                  value={newComplaint.mobile}
                  onChange={handleInputChange}
                  placeholder=""
                  className="py-5 input input-bordered input-xs w-full"
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 mb-4" style={{ padding: "0.5rem" }}>
                  {errorMessage}
                </p>
              )}

              <div className="mb-4">
                {!submitting && 
                <input type="submit" className="btn" />
                }

                {submitting && <button className="btn">
                  <span className="loading loading-spinner"></span>
                  Submitting..
                </button>}
                
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Complaint;
