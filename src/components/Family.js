import { useState, useEffect } from "react";
// import AddUpdateFamilyModal from "./AddUpdateFamilyModal";
// import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";
import { myFetch } from "@/utils/myFetch";
import { deleteMember } from "@/utils/deleteMember";

import dynamic from "next/dynamic";

const AddUpdateFamilyModal = dynamic(() => import('./AddUpdateFamilyModal'));


export default function Family({flatMember, type="owner"}) {
    const [show, setShow] = useState(false);
    const [familyMembers, setFamilyMembers ] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [deletedfamilyMemberCount, setDeletedFamilyMemberCount] = useState(0);


    const deleteFamilyMember = async (_id)=>{
      // console.log(_id);
      setLoading(true);
      let url2 = type=="owner"?`ownerFamilies`:`tenantFamilies`

      let url = process.env.API_URL + `api/${url2}/${_id}`;
      try {
        const deletedFamilyMember = await myFetch(url, "DELETE");

        //  const deletedFamilyMember = await response.json();       
          console.log(deletedFamilyMember);
          setLoading(false);
          setDeletedFamilyMemberCount(deletedfamilyMemberCount+1);
          setFetched(false);
          if (type=="owner"){
            deleteMember(deletedFamilyMember.ownerFamily.memberId);
          } else {
            deleteMember(deletedFamilyMember.tenantFamily.memberId)
          }


      } catch (error) {
        console.error('Error:', error);
        setDeletedFamilyMemberCount(deletedfamilyMemberCount+1);

      }

    }

    useEffect(() => {
        
        const fetchfamilies = async () => {
        setLoading(true);
        setFamilyMembers([]);
          let url2 = type=="owner"?`ownerFamilies?ownerId`:`tenantFamilies?tenantId`
          console.log(url2);

          try {
            let data = await myFetch( process.env.API_URL + `api/${url2}=${flatMember._id}`,)
            console.log(process.env.API_URL + `api/${url2}=${flatMember._id}`)
            console.log("families: ", data);
            if (type=="owner"){
            setFamilyMembers(data.ownerFamilies);
            } else {
            setFamilyMembers(data.tenantFamilies);

            }
            setFetched(true);
            setLoading(false);

          } catch (error) {
            console.error("Error fetching flats:", error);
          }
        };
    
        if (show && !fetched) {
            fetchfamilies();
        }
      }, [ show, deletedfamilyMemberCount]);


    return (
        <div>
            <button className="btn btn-sm mr-2 btn-outline" onClick={()=> setShow(!show)}>
            
            {show ? "Hide Family": "Show Family"}
     
            </button>

            <button className="btn btn-sm btn-outline" 
              onClick={() => document.getElementById(flatMember._id).showModal()}
            >
            
            Add Family
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m-6-6h12"></path>
            </svg>
     
            </button>

            {<AddUpdateFamilyModal 
            type={type}
            flatMemberId={flatMember._id}
            setFamilyMembers={setFamilyMembers}
            familyMembers={familyMembers}
            modalName={flatMember._id} />}


       {show && <div className="py-2">
            
       <div className="overflow-x-auto">
  <table className="table table-sm">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Relation</th>
        <th>Age</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {loading && 
      <Loading />
      }

      {(fetched && familyMembers.length == 0 ) && 
      <tr className="p-8">
        <td>
          No Member found.  
        </td>
      </tr>
      }

      {familyMembers.map((familyMember, index)=>
      <tr key={index}>
        <td>{familyMember?.memberId.name}</td>
        <td>{familyMember?.relation}</td>
        <td>{`${new Date().getFullYear()- familyMember?.memberId.birthYear}`}</td>
        <td>
          <button className="btn" onClick={()=>deleteFamilyMember(familyMember._id)}>Delete</button>
        </td>
        </tr>
      )}
      
    </tbody>
  </table>
</div>

        </div>}

        </div>
    )
}