import Family from "./Family";
// import AddUpdateOwnerModal from "./AddUpdateOwnerModal";
import { useState } from "react";
import { myFetch } from "@/utils/myFetch";
// import SocietyLetterModal from "./SocietyLetterModal";

import dynamic from "next/dynamic";

const AddUpdateOwnerModal = dynamic(() => import("./AddUpdateOwnerModal"));
const SocietyLetterModal = dynamic(() => import("./SocietyLetterModal"));
const ImposeEditPenaltyModal = dynamic(() => import("./ImposeEditPenaltyModal"));


export default function OwnerCard({owner_, flatOwners, setFlatOwners, deletedOwnersCount, setDeletedOwnersCount}) {

  //  console.log(owner_);
   const [owner, setOwner] = useState(owner_);
   const [deletedLoading, setDeletedLoading] =  useState(false);

  const deleteOwner = async () => {
    setDeletedLoading(true);
    let url = "https://flatfolio.onrender.com/api/owners/"+owner._id;

    try {

      let deletedOwner = await myFetch(url, "DELETE", {});

      console.log(deletedOwner);
        let dataArray = flatOwners.filter(item => item._id !== deletedOwner.owner._id);
        setFlatOwners(dataArray);
        setDeletedOwnersCount(deletedOwnersCount+1);
        setDeletedLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  }

    return(

    <div className="card bg-base-200">

    
    <div key={owner.id} className="p-4 flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-secondary">
      
      <div className="flex justify-between align-middle">
       <h3 className="text-xl font-semibold tracki">{owner.memberId?.name} {owner.memberId?.birthYear && `(${new Date().getFullYear()- owner.memberId.birthYear} years old)`}</h3>

       <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-sm btn-primary">Action</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">

          <li><button onClick={() => document.getElementById("modal#"+owner._id).showModal()}>Update</button></li>
          <li><button onClick={() => document.getElementById("modalnoc#"+owner._id).showModal()}>NOC & Letters</button></li>
          <li><button onClick={() => document.getElementById("modalpenatly#"+owner._id).showModal()}>Impose Penalty</button></li>

          
          <li>
            {deletedLoading ?
            <button className="btn">
            <span className="loading loading-spinner"></span>
            Deleting
          </button>
            :<button onClick={deleteOwner}>Delete</button>
            }
          </li>


        </ul>

        
        <AddUpdateOwnerModal
              owner={owner}
              setOwner={setOwner}
              modalName={"modal#"+owner._id}
         />

         <SocietyLetterModal 
            flatMember={owner}
            isOwner={true}
            modalName={"modalnoc#"+owner._id}
         />

         <ImposeEditPenaltyModal 
          owner={owner}
          modalName={"modalpenatly#"+owner._id}
         />
         
      </div>

      

      </div>

       <span className="text-xs tracki">{new Date(owner.possessionDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}
    -
    {owner.saleDate ?
      <span className="text-xs tracki">{new Date(owner.saleDate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })}</span>: <span>Currently</span>
      }
  </span>

    <div className="card-actions py-4">
    {owner.isLiving && <div className="badge badge-success badge-outline">Living</div> }

    {owner.memberId?.mobile && 
    <div className="badge badge-outline badge-info">
      {owner.memberId.mobile}
    </div> }

    </div>



    <Family flatMember={owner} type={"owner"} />
      
       {/* <p className="mt-3">Pellentesque eugiat ante at nisl efficitur, in mollis orci scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p> */}
     </div>

    </div>
    )
}