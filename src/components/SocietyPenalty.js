import React from "react";
import { myFetch } from "@/utils/myFetch";

export default function SocietyPenalty({penalty_, getAllPenalties}){

    const [penalty, setPenalty] = React.useState(penalty_);

    const initialPostData = {
        amount: penalty_.amount,
        name: penalty_.name,
      };
    
      const [postData, setPostData] = React.useState(initialPostData);
      const [submitting, setSubmitting] = React.useState(false);
      
      const handleInputChange = (e) => {
        // Update the postData state when input fields change
        setPostData({
          ...postData,
          [e.target.name]: e.target.value,
        });
      };


  const editPenalty = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    try {
    
    let url = process.env.API_URL + "api/penalties/" + penalty._id;
    let data = await myFetch(url, "PUT", postData);
    setPenalty(data);
    document.getElementById(penalty._id).close();
    getAllPenalties();
    } catch (e) { 
        console.log(e);
    } 
    finally { 
        setSubmitting(false);
    }

  }
      
//   const deletePenalty = async (penalty) => {
//     try {
//       setDeletedLoading(true);
//       let url = process.env.API_URL + "api/penalties/" + penalty._id;
//       let deletedPenalty = await myFetch(url, "DELETE");
//       console.log(deletedPenalty);
//       let dataArray = penalties.filter(
//         (item) => item._id !== deletedPenalty.penalty._id
//       );
//       setPenalties(dataArray);
//       localStorage.setItem("penalties", JSON.stringify(dataArray));
//       setDeletedLoading(false);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

    return(

        <div
                key={penalty._id}
                className="card w-100 bg-base-200 my-4"
              >
                
                <div className="card-body p-4 justify-between flex-row">
                  <div>
                  <p className="card-title">
                    {penalty.name} 
                  </p>
                  <p className="subtitle">
                  ₹ {penalty.amount}
                  </p>
                  </div>
                  <div className="justify-end">
                    <button
                    className="btn"
                    // onClick={() => deletePenalty(penalty)}

                    onClick={() => document.getElementById(penalty._id).showModal()}

                    >
                    Edit
                </button>


        
        
        <dialog id={penalty._id} className="modal">
            <div className="modal-box">
              <form method="dialog" className="modal-backdrop">
                <button className="btn btn-sm btn-circle absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <h3 className="font-bold text-lg">Enter Penalty Details!</h3>
              <div className="modal-action flex items-center justify-center">
                <form
                  className="w-full"
                  id="addNewPenalty"
                  onSubmit={editPenalty}
                >
                  <div className="mb-4">
                    <label>
                      Name:
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-xs w-full"
                        name="name"
                        value={postData.name}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label>
                      Price:
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-xs w-full"
                        name="amount"
                        value={postData.amount}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>

                  <div className="modal-action">
                    {!submitting && (
                        <input type="submit" className="btn" />
                      
                    )}

                    {submitting && (
                      <button className="btn">
                        <span className="loading loading-spinner"></span>
                        Submitting
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Display added tenants */}
          </dialog>



                  </div>
                </div>
              </div>
    )


}