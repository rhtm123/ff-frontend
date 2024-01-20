import { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";
import { myFetch } from "@/utils/myFetch";
import Loading from "./Loading";
import MemberInfoCard from "./OwnerTenantInfoCard";

export default function AddCommitteeMemberModal({modalName, refreshCount, setRefreshCount}){
    const [searchText, setSearchText] = useState("");
    const {authMember} = useAuth();
    const [owners, setOwners] = useState([]);
    const [searching, setSearching] = useState(false);


    const  searchOwners = async (url) => {
      setOwners([]);
      setSearching(true);
      let data = await myFetch(url);
      console.log(data);
      setOwners(data.owners);
      setSearching(false);
    }
    
    useEffect(()=>{
      let url = process.env.API_URL + `api/owners?search=${searchText}&societyId=${authMember?.societyId}`;
      if(searchText.length > 2) {
        searchOwners(url);
      }
    }, [searchText])


    return (
      <dialog id={modalName} className="modal">

        <div className="modal-box w-10/12 md:w-8/12 max-w-5xl">

        <form method="dialog" className="modal-backdrop">
          <button className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </button>
        </form>

        <div className="label">
          <span className="label-text">Search Member</span>
        </div>
        <input onChange={(e)=>setSearchText(e.target.value)} type="text" placeholder="Search Name" className="input input-bordered w-full" />
        

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
            {owners.map((owner, index)=> 
              <MemberInfoCard 
              data={owner} 
              type={"owner"}
              key={index} 
              refreshCount={refreshCount} 
              setRefreshCount={setRefreshCount} />
            )}
            </tbody>
        
        </table>

        {searching && <Loading />}

        {(!searching && owners.length == 0 ) && 
        
        <div className="py-4">
          No member found
        </div>
        }

        
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
}