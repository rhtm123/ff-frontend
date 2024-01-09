import React, { useState } from "react";
import FlatCard from "@/components/FlatCard";
import { useAuth } from "@/context/AuthContext";

import Loading from "@/components/Loading";
import { getCookie } from "../utils/myCookie";
import { useRouter } from "next/router";

import { myFetch } from "@/utils/myFetch";


function CommitteeMember({ member, index }){
  const [member_, setMember_] = useState(member);
  const [editMode, setEditMode_] = useState(false);
  const [selectedRole, setSelectedRole] = useState(member_.role);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState(
    {"role": member.role}
  )

  const changeMember = async () => {
    setSubmitting(true);
    let url = process.env.API_URL + "api/members/" + member._id;
    console.log(formData);
    try {
    let data = await myFetch(url, "PUT", formData);
    console.log("done",data);
    setEditMode_(false);
    setMember_(data);
    setSubmitting(false);
    } catch (err) { 
      console.log("error",err);
    }
  }


 
  const handleChange = (event, key) => {
    const selectedValue = event.target.value;
    setSelectedRole(selectedValue);
    formData[key] = selectedValue;
    setFormData(formData);
    // You can perform additional actions based on the selected value if needed
    // console.log('Selected Role:', selectedValue);
  };

  if (member_.role === "member")  return null;


  return (
      <tr key={index}>
          <th>{index + 1}</th>
          <td>
            {editMode ? <span>{member_.name}</span>:
            <span>{member_.name}</span>
            }
            </td>
          <td>
            {editMode ? 
            
            
            <select value={selectedRole} onChange={(e)=>handleChange(e, "role")} className="select select-sm select-info w-full">
              <option value="member">Member</option>
              <option value="chairmain">Chairman</option>
              <option value="secretary">Secretary</option>
            </select>
            : 
            <spa>{member_.role}</spa>
            }
          </td>
          <td>

          {!editMode ? <svg onClick={()=> setEditMode_(true)}
          className="cursor-pointer h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path></svg>
            : <button onClick={changeMember} class="btn btn-sm">
              
              {submitting ? <span className="loading loading-spinner"></span>: <span>Save</span>}

              </button>
        }
          </td>
      </tr>
  )

}


export default function Dashboard() {
  const [flats, setFlats] = React.useState([]);
  const [committeeMembers, setCommitteeMembers] = React.useState([]);

  const [totalPages, setTotalPages] = React.useState(0);
  const router = useRouter();
  const { token, member } = useAuth();
  const [searchText, setSearchText] = React.useState("");

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
        let url = `${process.env.API_URL}api/flats?societyId=${member.societyId}&search=${searchText}`
        let data = await myFetch(url);
        setFlats(data.flats);
        setTotalPages(data.totalPages);
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching flats:", error);
      }
    };
 
    if (member) {
      fetchFlats();
    }
  }, [member, searchText]);





  React.useEffect(() => {
    setMemberLoading(true);
    setCommitteeMembers([]);

    const fetchMembers = async () => {

      try {
      let data = await myFetch(`${process.env.API_URL}api/members?canAccess=true&societyId=${member.societyId}`)
      // console.log(data);
      setCommitteeMembers(data.members);
      setMemberLoading(false);
      }
      catch(error){
        console.log(error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div>
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
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {memberLoading && <Loading />}
                  {committeeMembers.map((member, index) => (
                    /* row */
                    <CommitteeMember member={member}  index={index} />
                  ))}
                </tbody>
              </table>
            </div>
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
