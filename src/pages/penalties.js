import React from "react";

import { myFetch } from "@/utils/myFetch";
import { useAuth } from "@/context/AuthContext";
import OwnerPenanlty from "@/components/OwnerPenalty";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie } from "@/utils/myCookie";

export default function Penalty() {
  const [penalties, setPenalties] = React.useState([]);
  const [ownerPenalties, setOwnerPenanlties ] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const { authMember } = useAuth();
  const router = useRouter();


  const initialPostData = {
    amount: "",
    name: "",
  };

  const [postData, setPostData] = React.useState(initialPostData);
  const [submitting, setSubmitting] = React.useState(false);
  const [deletedLoading, setDeletedLoading] = React.useState(false);
  

  const getAllPenalties = async () => {
    let url = process.env.API_URL + "api/penalties";
    let data = await myFetch(url);
    // console.log(data);
    localStorage.setItem("penalties", JSON.stringify(data.penalties));
    setPenalties(data.penalties);
  };

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

  React.useEffect(() => {
    let storedPenalties = localStorage.getItem("penalties")
    if (storedPenalties) {
      setPenalties(JSON.parse(storedPenalties));
    } else {
      getAllPenalties();
    }
  }, []);

  const deletePenalty = async (penalty) => {
    try {
      setDeletedLoading(true);
      let url = process.env.API_URL + "api/penalties/" + penalty._id;
      let deletedPenalty = await myFetch(url, "DELETE");
      console.log(deletedPenalty);
      let dataArray = penalties.filter(
        (item) => item._id !== deletedPenalty.penalty._id
      );
      setPenalties(dataArray);
      localStorage.setItem("penalties", JSON.stringify(dataArray));
      setDeletedLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getImposePenalties = async (page) => {
    let url = process.env.API_URL + `api/ownerPenalties?page=${page}societyId=`+authMember?.societyId;
    let data = await myFetch(url); 
    // setOwnerPenanlties(data.OwnerPenalties);
    setOwnerPenanlties((ownerPenalties) => [...ownerPenalties, ...data.OwnerPenalties]);

    setPage(data.page);
    setTotalPages(data.totalPages);
    // localStorage.setItem('ownerPenalties', data);
    console.log(data);
  }

  const loadMoreOwnerPenalties = async () => {
    
    getImposePenalties(page+1);
  }

  React.useEffect(()=>{
    getImposePenalties(1);
  }, [])

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
      <div className="grid lg:grid-cols-2">
        {/* left section */}
        <div className="p-8">
          
          
          <p className="text-3xl py-4">Imposed Penalties</p>
          <div className="mx-auto">

          <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Flat</th>
              <th>Penalty</th>
              <th>Date</th>
            </tr>
          </thead>
            <tbody>
              {ownerPenalties.map((ownerPenanlty)=> <OwnerPenanlty ownerPenalty={ownerPenanlty} />)}
            </tbody>
          </table>
            
            {(page<totalPages) && 
            <button onClick={loadMoreOwnerPenalties} className="btn btn-sm mt-2">Load More</button>
            }
            
          </div>
        </div>

        <div className="p-8">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn bg-accent"
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
          <p className="text-4xl py-4">Penalty List</p>
          <div className="container mx-auto">
            {penalties.map((penalty) => (
              <div
                key={penalty._id}
                className="card w-100 bg-base-200 border my-4"
              >
                
                <div className="card-body p-4 justify-between flex-row">
                  <div>
                  <p className="card-title">
                    {penalty.name} 
                  </p>
                  <p className="subtitle">
                    {penalty.amount} Rs
                  </p>
                  </div>
                  <div className="justify-end">
                    <button
                    className="btn"
                    onClick={() => deletePenalty(penalty)}
                  >
                    Delete
                  </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3"></div>
    </div>
  );
}
