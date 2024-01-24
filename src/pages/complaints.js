

import ComplaintCard from "@/components/ComplaintCard";
import { myFetch } from "@/utils/myFetch";
import React, { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const { authMember } = useAuth();
  // console.log(authMember);

  useEffect(() => {
    // Fetch complaints when the component mounts
    // In this example, fetching from an API
    
    fetchComplaints();
  }, [authMember]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const data = await myFetch(process.env.API_URL+"api/complaints?societyId="+authMember._id);
      console.log(data);
      
      setComplaints(data.complaints);
      setLoading(false); // Set loading to false in case of an error
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setLoading(false); // Set loading to false in case of an error

    }
  };

  return (
    <div className="mx-auto px-16 py-4">
      <h2 className="text-2xl font-semibold mb-4">Complaints</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 ">


      {loading && <Loading />}
      
        {complaints.map(
          (complaint) => (
            <ComplaintCard key={complaint._id} complaint={complaint}/>
          )
        )}
      </div>
      <br />
    </div>
  );
};

export default ComplaintList;
