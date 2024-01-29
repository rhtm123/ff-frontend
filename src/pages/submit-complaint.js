// pages/Complaint.js
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

  const handleInputChange = (e) => {
    setErrorMessage("");
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
      let url = process.env.API_URL + "api/owners?mobile=" + newComplaint.mobile;
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
    <div className="container mx-auto my-8">
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Create New Complaint</h2>
        <form onSubmit={handleSubmit} className="max-w-md">
          <label className="block text-sm font-medium mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={newComplaint.title}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 mb-4 w-full"
          />

          <label className="block text-sm font-medium mb-1">Details:</label>
          <textarea
            name="details"
            value={newComplaint.details}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 mb-4 w-full"
          />

          <label className="block text-sm font-medium mb-1">Mobile Number:</label>
          <input
            type="text"
            name="mobile"
            value={newComplaint.mobile}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 mb-4 w-full"
          />

          {errorMessage && (
            <p className="text-red-500 mb-4" style={{ padding: "0.5rem" }}>
              {errorMessage}
            </p>
          )}

          <button type="submit" className={`btn ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={submitting}>
            {submitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Submitting...
              </>
            ) : (
              "Submit Complaint"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
