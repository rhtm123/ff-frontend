import React from "react";

import { myFetch } from "@/utils/myFetch";
import { useAuth } from "@/context/AuthContext";

export default function Penalty() {
  const [penalties, setPenalties] = React.useState([]);
  const { authMember } = useAuth();
  const initialPostData = {
    amount: "",
    name: "",
  };

  const [postData, setPostData] = React.useState(initialPostData);

  const [submitting, setSubmitting] = React.useState(false);

  const [deletedLoading, setDeletedLoading] = React.useState(false);

  const getAllPenalties = async () => {
    let url = process.env.API_URL + "api/penalties";
    let data = await myFetch(url);
    // console.log(data);
    localStorage.setItem("penalties", JSON.stringify(data.penalties));
    setPenalties(data.penalties);
  };

  const handleInputChange = (e) => {
    // Update the postData state when input fields change
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const addNewPenalty = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let url = process.env.API_URL + "api/penalties";
      postData.societyId = authMember?.societyId;
      let data = await myFetch(url, "POST", postData);
      setPenalties((penalties) => [...penalties, data]);
      localStorage.setItem("penalties", JSON.stringify([...penalties, data]));

      // console.log(data);
      document.getElementById("my_modal_2").close();
      setSubmitting(false);
      setPostData(initialPostData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {

    let storedPenalties = localStorage.getItem("penalties")
    if (storedPenalties) {
      setPenalties(JSON.parse(storedPenalties));
    } else {
      getAllPenalties();
    }
  }, []);

  const deletePenalty = async (penalty) => {
    try {
      setDeletedLoading(true);
      let url = process.env.API_URL + "api/penalties/" + penalty._id;
      let deletedPenalty = await myFetch(url, "DELETE");
      console.log(deletedPenalty);
      let dataArray = penalties.filter(
        (item) => item._id !== deletedPenalty.penalty._id
      );
      setPenalties(dataArray);
      localStorage.setItem("penalties", JSON.stringify(dataArray));
      setDeletedLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2">
        {/* left section */}
        <div className="p-8">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Impose Penalty
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog" className="modal-backdrop">
                <button className="btn btn-sm btn-circle absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <h3 className="font-bold text-lg">Impose Penalty!</h3>
              <div className="modal-action flex items-center justify-center">
                <form className="w-full">
                  <div className="mb-4">
                    <label>
                      Wing :
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-xs w-full"
                        name="name"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label>
                      Flat Number:
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-xs w-full"
                        name="name"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label>
                      Name:
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-xs w-full"
                        name="name"
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
                        name="mobile"
                      />
                    </label>
                  </div>

                  <div className="modal-action">
                    <button type="button" className="btn">
                      Add Family
                    </button>

                    {/* <button className="btn">
                                            <span className="loading loading-spinner"></span>
                                            Submitting
                                        </button> */}
                  </div>
                </form>
              </div>
            </div>

            {/* Display added tenants */}
          </dialog>
          <p className="text-4xl py-4">Flat Number</p>
          <div className="container mx-auto">
            <div className="card w-100 bg-base-100 shadow-xl border my-4">
              <div className="card-body justify-between flex-row">
                <p className="card-title">
                  <span>2A</span> <span>903</span>
                </p>
                <p className="text-lg">Penalty 1</p>
                <div className="justify-end">
                  <span className="">Rs. 100</span>
                </div>
              </div>
            </div>
            <div className="card w-100 bg-base-100 shadow-xl border my-4">
              <div className="card-body justify-between flex-row">
                <p className="card-title">
                  <span>2A</span> <span>101</span>
                </p>
                <p className="text-lg">Penalty 2</p>
                <div className="justify-end">
                  <span className="">Rs. 200</span>
                </div>
              </div>
            </div>
            <div className="card w-100 bg-base-100 shadow-xl border my-4">
              <div className="card-body justify-between flex-row">
                <p className="card-title">
                  <span>2A</span> <span>1106</span>
                </p>
                <p className="text-lg">Penalty 3</p>
                <div className="justify-end">
                  <span className="">Rs. 300</span>
                </div>
              </div>
            </div>
            <div className="card w-100 bg-base-100 shadow-xl border my-4">
              <div className="card-body justify-between flex-row">
                <p className="card-title">
                  <span>2A</span> <span>1204</span>
                </p>
                <p className="text-lg">Penalty 4</p>
                <div className="justify-end">
                  <span className="">Rs. 400</span>
                </div>
              </div>
            </div>
            <div className="card w-100 bg-base-100 shadow-xl border my-4">
              <div className="card-body justify-between flex-row">
                <p className="card-title">
                  <span>2A</span> <span>2201</span>
                </p>
                <p className="text-lg">Penalty 5</p>
                <div className="justify-end">
                  <span className="">Rs. 500</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn bg-accent"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Add Penalty
          </button>
          <dialog id="my_modal_2" className="modal">
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
                  onSubmit={addNewPenalty}
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
                      <button type="submit" className="btn">
                        Add Penalty
                      </button>
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
          <p className="text-4xl py-4">Penalty List</p>
          <div className="container mx-auto">
            {penalties.map((penalty) => (
              <div
                key={penalty._id}
                className="card w-100 bg-base-200 border my-4"
              >
                
                <div className="card-body p-4 justify-between flex-row">
                  <div>
                  <p className="card-title">
                    {penalty.name} 
                  </p>
                  <p className="subtitle">
                    {penalty.amount} Rs
                  </p>
                  </div>
                  <div className="justify-end">
                    <button
                    className="btn"
                    onClick={() => deletePenalty(penalty)}
                  >
                    Delete
                  </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3"></div>
    </div>
  );
}
