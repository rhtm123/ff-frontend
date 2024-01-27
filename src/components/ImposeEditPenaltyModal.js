import { myFetch } from "@/utils/myFetch";
import React from "react";
import { useState } from "react";
import AlertCard from "./AlertCard";

export default function ImposeEditPenaltyModal({modalName, owner}){
  const [penalties, setPenalties] = React.useState([]);
  const [selectedPenalty, setSelectedPenalty] = React.useState(null);
  const [details, setDetails] = React.useState("");
  const [submitting, setSubmitting] = useState(false);

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertData, setAlertData] = React.useState("");
  const [alertType, setAlertType] = React.useState(null);

  
  const getAllPenalties = async () => {
    let url = process.env.API_URL + "api/penalties";
    let data = await myFetch(url);
    // console.log(data);
    localStorage.setItem("penalties", JSON.stringify(data.penalties));
    setPenalties(data.penalties);
  };

  React.useEffect(() => {
    let storedPenalties = localStorage.getItem("penalties")
    if (storedPenalties) {
      setPenalties(JSON.parse(storedPenalties));
    } else {
      getAllPenalties();
    }
  }, []);

  const imposePenalty = async () => {
    if (! selectedPenalty) {
        setAlertType("error")
        setAlertData("Select a penalty");
        setShowAlert(true);
        return 
    }
    setSubmitting(true);
    let url = process.env.API_URL + "api/ownerPenalties";
    let formData = {details: details, penaltyId: selectedPenalty, ownerId: owner._id}
    let data = await myFetch(url, "POST", formData);

    // console.log(data);
    setAlertType("success")
    setAlertData("Impose penalty successfully");
    setShowAlert(true);
    setSubmitting(false);
    setSelectedPenalty(null);
    setDetails("");
    // document.getElementById(modalName).close();

  }
    

    return(
        <dialog id={modalName} className="modal">

            {showAlert && <AlertCard 
            alertType={alertType} 
            alertData={alertData} 
            showAlert={showAlert} 
            setShowAlert={setShowAlert} />}
            
            <div className="modal-box">
            <form method="dialog" className="modal-backdrop">
            <button className="btn btn-sm btn-circle absolute right-2 top-2">
                ✕
            </button>
            </form>

        
        <select onChange={(event)=>setSelectedPenalty(event.target.value)} value={selectedPenalty} className="select select-bordered select-sm">
        <option disabled selected>Select Penalty</option>
        {penalties.map((penalty)=>
            <option key={penalty._id} value={penalty._id}>{penalty.name}</option>
        )}

        </select>

        <div className="mt-4">
              <label>
              Details:
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="relation"
                  value={details}
                  onChange={(e) =>setDetails(e.target.value)}
                />
              </label>
            </div>

        <div className="modal-action">
              {!submitting && <button type="button" className="btn" onClick={imposePenalty}>
                Impose Penalty
              </button> }

              {submitting && <button className="btn">
              <span className="loading loading-spinner"></span>
              Submitting
            </button>}
        </div>

            </div>
        </dialog>
    )


}