import React from 'react';
import { myFetch } from '@/utils/myFetch';

export default function ComplaintCard({ complaint }) {
    const [status, setStatus] = React.useState(complaint.status);

    const handleStatus = async (event) => {
        let newStatus = event.target.value;
        setStatus(newStatus);
        let url = process.env.API_URL+"api/complaints/" + complaint._id;

        try {
           let data = await myFetch(url, "PUT", { status: newStatus});
            console.log(data);
        } catch (e){
            console.log("Error", e);
        }



    }
  return (
    <div key={complaint._id} className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <select onChange={handleStatus} className="select select-bordered w-full max-w-xs" value={status}>
          {/* Set the default option based on the complaint status from the backend */}
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <h2 className="card-title text-lg font-semibold mb-2">{complaint.title}</h2>
        <p className="text-gray-700">{complaint.details}</p>
        <p className="text-blue-500">Mobile Number: {complaint.mobile}</p>
        {/* Add other complaint details as needed */}
      </div>
    </div>
  );
}
