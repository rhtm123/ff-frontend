import React from "react";

import { myFetch } from "@/utils/myFetch";
import { useAuth } from "@/context/AuthContext";
import OwnerPenanlty from "@/components/OwnerPenalty";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie } from "@/utils/myCookie";

import { useData } from "@/context/DataContext";
import Loading from "@/components/Loading";
import SocietyPenalty from "@/components/SocietyPenalty";


export default function Penalty() {

  const {ownerPenaltyData} = useData();
  // console.log(ownerPenaltyData);
  const [penalties, setPenalties] = React.useState([]);

  const [ownerPenalties, setOwnerPenanlties ] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState();
  const { authMember } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();


  const getAllPenalties = async () => {
    let url = process.env.API_URL + "api/penalties";
    let data = await myFetch(url);
    // console.log(data);
    localStorage.setItem("penalties", JSON.stringify(data.penalties));
    setPenalties(data.penalties);
  };


  React.useEffect(() => {
    getAllPenalties();
    // let storedPenalties = localStorage.getItem("penalties")
    // if (storedPenalties) {
    //   setPenalties(JSON.parse(storedPenalties));
    // } else {
    //   getAllPenalties();
    // }
  }, []);


  React.useEffect(()=> {
      if (ownerPenaltyData) {
        // console.log("this is if", ownerPenaltyData.ownerPenalties);
        setOwnerPenanlties(ownerPenaltyData.ownerPenalties);
        setTotalPages(ownerPenaltyData.totalPages);
        setLoading(false);
      }
    
  }, [ownerPenaltyData])


  const initialPostData = {
    amount: "",
    name: "",
  };

  const [postData, setPostData] = React.useState(initialPostData);
  const [submitting, setSubmitting] = React.useState(false);
  // const [deletedLoading, setDeletedLoading] = React.useState(false);
  

  const handleInputChange = (e) => {
    // Update the postData state when input fields change
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const addNewPenalty = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let url = process.env.API_URL + "api/penalties";
      postData.societyId = authMember?.societyId;
      let data = await myFetch(url, "POST", postData);
      setPenalties((penalties) => [...penalties, data]);
      localStorage.setItem("penalties", JSON.stringify([...penalties, data]));

      // console.log(data);
      document.getElementById("my_modal_2").close();
      setSubmitting(false);
      setPostData(initialPostData);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const getImposePenalties = async (page) => {
    setLoading(true);
    let url = process.env.API_URL + `api/ownerPenalties?page=${page}societyId=`+authMember?.societyId;
    let data = await myFetch(url); 
    // setOwnerPenanlties(data.OwnerPenalties);
    setOwnerPenanlties((ownerPenalties) => [...ownerPenalties, ...data.ownerPenalties]);

    setPage(data.page);
    setLoading(false);
    // setTotalPages(data.totalPages);
    // localStorage.setItem('ownerPenalties', data);
    // console.log(data);
  }

  const loadMoreOwnerPenalties = async () => {
    
    getImposePenalties(page+1);
  }

  // React.useEffect(()=>{
  //   getImposePenalties(1);
  // }, [])

  React.useEffect(() => {
    // console.log("token", token);
    const token = getCookie("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <div className="text-sm px-8 breadcrumbs">
        <ul>
          <li><Link href="/dashboard">Dashboard</Link></li> 
          <li>Penalties</li>
        </ul>
      </div>
      <div className="grid px-8 lg:grid-cols-2 gap-8">
        {/* left section */}
        <div className="py-2">
          
          
          <p className="text-3xl my-4">Imposed Penalties</p>
          <div className="mx-auto">

          
          {ownerPenalties.map((ownerPenalty)=> <OwnerPenanlty ownerPenalty={ownerPenalty} />)}

            
            {loading && <Loading />}
            {(page<totalPages && !loading) && 
            <button onClick={loadMoreOwnerPenalties} className="btn btn-sm mt-2">Load More</button>
            }
            
          </div>
        </div>

        <div className="py-2">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          
          <p className="text-3xl my-4">Society's Penalty List</p>
          <div className="mx-auto">
            {penalties.map((penalty) => (
              <SocietyPenalty penalty_={penalty} getAllPenalties={getAllPenalties} />
            ))}

          
          <button
            className="btn btn-secondary"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Add Penalty
          </button>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <form method="dialog" className="modal-backdrop">
                <button className="btn btn-sm btn-circle absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <h3 className="font-bold text-lg">Enter Penalty Details!</h3>
              <div className="modal-action flex items-center justify-center">
                <form
                  className="w-full"
                  id="addNewPenalty"
                  onSubmit={addNewPenalty}
                >
                  <div className="mb-4">
                    <label>
                      Name:
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-xs w-full"
                        name="name"
                        value={postData.name}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label>
                      Price:
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-xs w-full"
                        name="amount"
                        value={postData.amount}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>

                  <div className="modal-action">
                    {!submitting && (
                      <button type="submit" className="btn">
                        Add Penalty
                      </button>
                    )}

                    {submitting && (
                      <button className="btn">
                        <span className="loading loading-spinner"></span>
                        Submitting
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Display added tenants */}
          </dialog>
          
          </div>
        </div>

        <br />
      </div>

    </div>
  );
}
