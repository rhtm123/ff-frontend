// pages/Complaint.js
import React, { useState, useEffect } from "react";

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    details: "",
    memberId: "", // Assuming you have a way to get the member ID
  });

  useEffect(() => {
    // Fetch complaints when the component mounts
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/complaints");
      const data = await response.json();
      setComplaints(data.complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComplaint((prevComplaint) => ({
      ...prevComplaint,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComplaint),
      });
      // After successful submission, fetch updated complaints
      fetchComplaints();
      // Reset the form
      setNewComplaint({
        title: "",
        details: "",
        memberId: "",
      });
    } catch (error) {
      console.error("Error creating complaint:", error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <ul className="list-disc pl-6">
        {complaints.map((complaint) => (
          <li key={complaint._id} className="mb-2">
            {complaint.title}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Create New Complaint</h2>
        <form onSubmit={handleSubmit} className="max-w-md">
          <label className="block text-sm font-medium mb-1">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={newComplaint.title}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 mb-4 w-full"
          />

          <label className="block text-sm font-medium mb-1">
            Details:
          </label>
          <textarea
            name="details"
            value={newComplaint.details}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 mb-4 w-full"
          />

          <label className="block text-sm font-medium  mb-1">
            Mobile Number:
          </label>
          <input
            type="text"
            name="mobile"
            value={newComplaint.mobile}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 mb-4 w-full"
          />
          <button type="submit" className="btn">
            {" "}
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
