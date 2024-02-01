import React, { useState } from "react";
import FlatCard from "@/components/FlatCard";
import { useAuth } from "@/context/AuthContext";

import Loading from "@/components/Loading";
import { getCookie } from "../utils/myCookie";
import { useRouter } from "next/router";
import Submenu from "@/components/Submenu";

import { myFetch } from "@/utils/myFetch";
// import AddCommitteeMemberModal from "@/components/AddCommitteeMemberModal";
import OwnerTenantInfoCard from "@/components/OwnerTenantInfoCard";
import OwnerPenanlty from "@/components/OwnerPenalty";


import dynamic from "next/dynamic";

const AddCommitteeMemberModal = dynamic(() => import('@/components/AddCommitteeMemberModal'));
// const AddUpdateTenantModal = dynamic(() => import('@/components/AddUpdateTenantModal'));

import { useData } from "@/context/DataContext";


export default function Dashboard() {
  const [flats, setFlats] = React.useState([]);
  const [committeeOwners, setCommitteeOwners] = React.useState([]);

  const [totalPages, setTotalPages] = React.useState(0);
  const router = useRouter();
  const { authMember } = useAuth();
  const [searchText, setSearchText] = React.useState("");
  const [committeeRefreshCount, setCommitteeRefreshCount] = React.useState(0);


  const {ownerPenaltyData} = useData();
  const [ownerPenalties, setOwnerPenanlties ] = React.useState([]);



  React.useEffect(()=> {
    if (ownerPenaltyData) {
      setOwnerPenanlties(ownerPenaltyData.ownerPenalties);
    }
}, [ownerPenaltyData])


  React.useEffect(() => {
    // console.log("token", token);
    const token = getCookie("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  // const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [memberLoading, setMemberLoading] = React.useState(true);


  const fetchFlats = async () => {
    // console.log("Function called");
    setLoading(true);
    try {
      let url = `${process.env.API_URL}api/flats?societyId=${authMember?.societyId}&search=${searchText}`
      let data = await myFetch(url);
      setFlats(data.flats);
      setTotalPages(data.totalPages);
      setLoading(false);
      localStorage.setItem("flats", JSON.stringify(data.flats));
      
    } catch (error) {
      console.error("Error fetching flats:", error);
    }
  };


  React.useEffect(()=>{
    setFlats([]);

    if (searchText.length > 0) {
      fetchFlats();
    }
  },[searchText])


  React.useEffect(() => {
    setFlats([]);

    if (authMember) {
      let storageFlats = localStorage.getItem("flats");
      if (storageFlats) {
        setFlats(JSON.parse(storageFlats));
        setLoading(false);
      } else {
      fetchFlats();
      }
    }
  }, [authMember]);


  const fetchMembers = async () => {
    setMemberLoading(true);
    setCommitteeOwners([]);
    // console.log("Fetching members...");

    try {
    let data = await myFetch(`${process.env.API_URL}api/owners?isCommitteeMember=true&societyId=${authMember?.societyId}`)
    // console.log(data);
    setCommitteeOwners(data.owners);
    localStorage.setItem("committeeOwners", JSON.stringify(data.owners));
    setMemberLoading(false);
    }
    catch(error){
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (committeeRefreshCount>0){
      fetchMembers();
    }
  }, [committeeRefreshCount]);


  React.useEffect(() => {

    if (authMember){
      let storageCommitteeOwners = localStorage.getItem("committeeOwners");
      if (storageCommitteeOwners) {
        setCommitteeOwners(JSON.parse(storageCommitteeOwners));
        setMemberLoading(false);
      } else{
      fetchMembers();
      }
    }
  }, [authMember]);

  return (
    <div>
      <div className="grid lg:grid-cols-3">
        <Submenu />
      </div>
      <div className="grid lg:grid-cols-3">
        {/* left section */}
        <div className="col-span-2 p-8">
          <form className="w-full mb-8">
            <div className="relative ">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search by flat number"
                  onChange={(e) => setSearchText(e.target.value)}
                  className="input input-bordered w-full pl-10 relative"
                />
                <span
                  className="input-group-addon"
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </form>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

            {(!loading && flats.length == 0) &&
            <p className="text-base-content">No Flat found</p>
            }
            {loading && <Loading />}
            {flats.map((flat, i) => (
              <FlatCard key={i} flat={flat} />
            ))}
          </div>
          <div className="grid pt-4">
            <h1 className="text-2xl font-bold py-4">Committee Members</h1>
            <div className="overflow-x-auto">

            <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Committee Member</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
            {committeeOwners.map((owner,i)=> 
                <OwnerTenantInfoCard 
                key={i} 
                data={owner}  
                type={"owner"}
                refreshCount={committeeRefreshCount}
                setRefreshCount={setCommitteeRefreshCount}
                />
            )}
            </tbody>

            </table>

            {memberLoading && <Loading />}
 
            </div>

            <button 
            onClick={()=>document.getElementById('add_committee_member').showModal()}
            className="btn my-4">Add Committee Member</button>

            <AddCommitteeMemberModal modalName={"add_committee_member"} refreshCount={committeeRefreshCount} setRefreshCount={setCommitteeRefreshCount} />


          </div>
        </div>
        {/* right section */}

        <div className="col-span-1 p-8">

        <h2 className="text-xl font-bold pb-4">Recent Penalties</h2>


        <div className="max-h-96 overflow-y-auto">


        {ownerPenalties.map((ownerPenalty)=> <OwnerPenanlty ownerPenalty={ownerPenalty} />)}






        
	        

         


          </div>


        </div>
      </div>
    </div>
  );
}
