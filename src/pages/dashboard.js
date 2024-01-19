import React, { useState } from "react";
import FlatCard from "@/components/FlatCard";
import { useAuth } from "@/context/AuthContext";

import Loading from "@/components/Loading";
import { getCookie } from "../utils/myCookie";
import { useRouter } from "next/router";
import Submenu from "@/components/Submenu";

import { myFetch } from "@/utils/myFetch";
import AddCommitteeMemberModal from "@/components/AddCommitteeMemberModal";
import MemberInfoCard from "@/components/MemberInfoCard";




export default function Dashboard() {
  const [flats, setFlats] = React.useState([]);
  const [committeeMembers, setCommitteeMembers] = React.useState([]);

  const [totalPages, setTotalPages] = React.useState(0);
  const router = useRouter();
  const { authMember } = useAuth();
  const [searchText, setSearchText] = React.useState("");
  const [committeeRefreshCount, setCommitteeRefreshCount] = React.useState(0);

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


  React.useEffect(() => {
    setLoading(true);
    setFlats([]);

    const fetchFlats = async () => {
      try {
        let url = `${process.env.API_URL}api/flats?societyId=${authMember.societyId}&search=${searchText}`
        let data = await myFetch(url);
        setFlats(data.flats);
        setTotalPages(data.totalPages);
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching flats:", error);
      }
    };
 
    if (authMember) {
      fetchFlats();
    }
  }, [authMember, searchText]);





  React.useEffect(() => {
    setMemberLoading(true);
    setCommitteeMembers([]);

    const fetchMembers = async () => {

      try {
      let data = await myFetch(`${process.env.API_URL}api/members?isCommitteeMember=true&societyId=${authMember.societyId}`)
      // console.log(data);
      setCommitteeMembers(data.members);
      setMemberLoading(false);
      }
      catch(error){
        console.log(error);
      }
    };

    fetchMembers();
  }, [committeeRefreshCount]);

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
            {loading && <Loading />}
            {flats.map((flat, i) => (
              <FlatCard key={i} flat={flat} />
            ))}
          </div>
          <div className="grid pt-4">
            <h1 className="text-2xl font-bold py-4">Society Members</h1>
            <div className="">
            {memberLoading && <Loading />}
            {committeeMembers.map((member, index) => (
              /* row */
              <MemberInfoCard refreshCount={committeeRefreshCount} setRefreshCount={setCommitteeRefreshCount} member={member} key={index} />
            ))}

            </div>

            <button 
            onClick={()=>document.getElementById('add_committee_member').showModal()}
            className="btn my-4">Add Committee Member</button>

            <AddCommitteeMemberModal modalName={"add_committee_member"} refreshCount={committeeRefreshCount} setRefreshCount={setCommitteeRefreshCount} />


          </div>
        </div>
        {/* right section */}

        <div className="p-8">
        <h2 className="text-xl font-bold pb-4">Recent Activities</h2>

          
        
	<div className="pb-4">
		<div className="flex items-center">
			<p className="flex items-center h-8 mr-2 text-sm ">v3.2.0</p>
			<div className="flex-1 space-y-1">
				<div className="flex items-center justify-between space-x-4 ">


          <div className="badge badge-info gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary"></span>
            info
          </div>
          
					<span className="text-xs whitespace-nowrap">10h ago</span>
				</div>
				
			</div>
		</div>

            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum
                nec varius. Et diam cursus quis sed purus nam. Scelerisque amet
                elit non sit ut tincidunt condimentum. Nisl ultrices eu
                venenatis diam.
              </p>
            </div>
          </div>

          <div className="pb-4">
            <div className="flex">
              <p className="flex items-center h-8 mr-2 text-sm ">v3.2.0</p>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between space-x-4 ">
                  <button
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group "
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-primary"
                    ></span>
                    <span className="">Feature</span>
                  </button>
                  <span className="text-xs whitespace-nowrap">10h ago</span>
                </div>
              </div>
            </div>

            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum
                nec varius. Et diam cursus quis sed purus nam. Scelerisque amet
                elit non sit ut tincidunt condimentum. Nisl ultrices eu
                venenatis diam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
