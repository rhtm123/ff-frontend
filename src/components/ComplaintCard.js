import React from 'react';
import ComplaintEditModal from './ComplaintEditModal';

export default function ComplaintCard({ complaint }) {
    const [complaint_, setComplaint_] = React.useState(complaint);
    

  return (
    <div key={complaint_._id} className="card bg-base-200">
      <div className="card-body p-4">

        <div className="flex justify-between">

        <div>

        <h2 className="card-title text-lg font-semibold">{complaint_.title}</h2>
        <div className={complaint_==="resolved"?"badge badge-outline badge-success":"badge badge-outline badge-info"}>{complaint_.status}</div>

        <p className="text-gray-700">{complaint_.details}</p>

        </div>

        <button className="btn btn-sm btn-secondary" onClick={()=>document.getElementById(complaint_._id).showModal()}>Edit</button>

        <ComplaintEditModal modalName={complaint_._id} complaint_={complaint_} setComplaint_={setComplaint_} />

       

        </div>

        
        {/* Add other complaint details as needed */}
      </div>
    </div>
  );
}
