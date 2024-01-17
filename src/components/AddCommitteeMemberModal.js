import { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";
import { myFetch } from "@/utils/myFetch";
import Loading from "./Loading";
import MemberInfoCard from "./MemberInfoCard";

export default function AddCommitteeMemberModal({modalName, refreshCount, setRefreshCount}){
    const [searchText, setSearchText] = useState("");
    const {authMember} = useAuth();
    const [members, setMembers] = useState([]);
    const [searching, setSearching] = useState(false);

    

    const  searchMembers = async (url) => {
      setMembers([]);
      setSearching(true);
      let data = await myFetch(url);
      console.log(data);
      setMembers(data.members);
      setSearching(false);
    }
    
    useEffect(()=>{
      let url = process.env.API_URL + `api/members?search=${searchText}&societyId=${authMember.societyId}`;
      if(searchText.length > 2) {
        searchMembers(url);
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
        
        {searching && <Loading />}

        {(!searching && members.length == 0 ) && 
        
        <div className="py-4">
          No member found
        </div>
        }

        {members.map((member, index)=> 
          <MemberInfoCard member={member} key={index} refreshCount={refreshCount} setRefreshCount={setRefreshCount} />
        )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
}