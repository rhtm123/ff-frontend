import React from 'react';
import ComplaintEditModal from './ComplaintEditModal';
import { myFetch } from '@/utils/myFetch';

import { FaHouseUser } from "react-icons/fa";


export default function ComplaintCard({ complaint }) {
    const [complaint_, setComplaint_] = React.useState(complaint);

    const [owner, setOwner] = React.useState(null);

    // console.log(complaint);

    const getOwner = async () => {
      let url = process.env.API_URL + "api/owners/"+complaint.ownerId?._id;
      let data = await myFetch(url);
      setOwner(data);
      localStorage.setItem(complaint.ownerId?._id, JSON.stringify(data));
      // console.log(data);
  }

  React.useEffect(()=>{

      let storedData = localStorage.getItem(complaint.ownerId?._id);
      if (storedData) { 
          setOwner(JSON.parse(storedData))
      } else {
          getOwner();
      }
  },[])

    

  return (
    <div key={complaint_._id} className="card bg-base-200">
      <div className="card-body p-4">

        <div className="flex justify-between">

        <div>

        <div className='flex items-center gap-4'>
        <h2 className="card-title text-xl font-semibold mb-1">{complaint_.title}</h2>
        <div className={complaint_.status==="resolved"?"badge badge-outline badge-success":"badge badge-outline badge-info"}>{complaint_.status}</div>
        </div>
        <span className='font-bold mb-1 text-sm opacity-70 flex items-center gap-2'>
          <FaHouseUser /> {owner?.memberId.name} / {owner?.flatId?.wingName} {owner?.flatId.name} 
          

          
          </span>

        <p className="opacity-70 mb-2">{complaint_.details}</p>


        {/* <button className='btn btn-sm btn-outline'>Show Comments</button>

        <div></div> */}




        </div>

        <button className="btn btn-sm btn-secondary" onClick={()=>document.getElementById(complaint_._id).showModal()}>Edit</button>

        <ComplaintEditModal modalName={complaint_._id} complaint_={complaint_} setComplaint_={setComplaint_} />

        </div>

        
        {/* Add other complaint details as needed */}
      </div>
    </div>
  );
}
