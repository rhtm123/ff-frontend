import React from "react";
import { myFetch } from "@/utils/myFetch";

export default function ComplaintEditModal({modalName, complaint_, setComplaint_}){

    const [status, setStatus] = React.useState(complaint_.status);
    const [title, setTitle] = React.useState(complaint_.title);
    const [details, setDetails] = React.useState(complaint_.details);
    const [submitting, setSubmitting] = React.useState(false);


    const submitForm = async (event) => {
        setSubmitting(true);
        // let newStatus = event.target.value;
        // setStatus(newStatus);
        let url = process.env.API_URL+"api/complaints/" + complaint_._id;

        try {
           let data = await myFetch(url, "PUT", { status: status, title:title, details:details });
           setComplaint_(data);
           console.log(data);
        } catch (e){
            console.log("Error", e);
        } finally {
            setSubmitting(false);
            document.getElementById(modalName).close();

        }

    }



    return(
<dialog id={modalName} className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>

    <h3 className="text-lg py-2">Edit Complaint</h3>

    <form className="w-full">

        <div className="mb-4">
            <label>
            title:
            <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-xs w-full"
                name="title"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
            />
            </label>
        </div>
        <div className="mb-4">
        <label>
            Details:
        <textarea className="textarea textarea-bordered textarea-xs w-full" 
        placeholder="Details"
        value={details}
        onChange={(e)=> {setDetails(e.target.value)}}
        >

        </textarea>
        </label>
        </div>

        <div className="mb-4">
        <label>
            Status:
          <select onChange={(e)=>setStatus(e.target.value)} className="select select-sm select-bordered" value={status}>
          {/* Set the default option based on the complaint status from the backend */}
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
    </select>
    </label>
    </div>

        <div className="mb-4">
    
        {!submitting && <button type="button" className="btn btn-primary" onClick={submitForm}>Submit</button>}

        {submitting && <button type="button" className="btn btn-primary">
              <span className="loading loading-spinner"></span>
              Submitting
        </button>}
        </div>

    </form>


  </div>





  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    )
}