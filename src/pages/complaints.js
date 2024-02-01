import ComplaintCard from "@/components/ComplaintCard";
import { myFetch } from "@/utils/myFetch";
import React, { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { getCookie } from "@/utils/myCookie";
import { useRouter } from "next/router";
import { useData } from "@/context/DataContext";

const ComplaintList = () => {

  const { complaintData } = useData();
  const [complaints, setComplaints] = useState([]);

  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState();

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null); // New state for error message


  useEffect(() => {

    if (complaintData) {
      console.log(complaintData);
      setComplaints(complaintData.complaints);
      setTotalPages(complaintData.totalPages);
      setLoading(false);

    }

  }, complaintData)


  const { authMember } = useAuth();
  // console.log(authMember);

  useEffect(() => {
    // console.log("token", token);
    const token = getCookie("token");

    if (!token) {
      router.push("/login");
    }
  }, []);


  const fetchMoreComplaints = async (page) => {
    setLoading(true);
    try {
      const data = await myFetch(process.env.API_URL+"api/complaints?societyId="+authMember?._id);
      // console.log(data);

      setComplaints((complaints) => [...complaints, ...data.complaints]);

      setPage(page+1);
      
      // setComplaints(data.complaints);
      setLoading(false); // Set loading to false in case of an error
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setLoading(false); // Set loading to false in case of an error

    }
  };

  const loadMoreComplaints = async () => {
    
    fetchMoreComplaints(page+1);
  }

  return (
    <>
    <div className="text-sm px-8 breadcrumbs">
        <ul>
          <li><Link href="/dashboard">Dashboard</Link></li> 
          <li>Complaints</li>
        </ul>
      </div>
    <div className="mx-auto px-8 py-4">
      
      <h2 className="text-2xl font-semibold mb-4">Complaints</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 ">


      
        {complaints.map(
          (complaint) => (
            <ComplaintCard key={complaint._id} complaint={complaint}/>
          )
        )}

        
      </div>

      {loading && <Loading />}


      {(page<totalPages && !loading) && 
            <button onClick={loadMoreComplaints} className="btn btn-sm mt-2">Load More</button>
      }

      <br />
      <br />
    </div>
    </>
  );
};

export default ComplaintList;
