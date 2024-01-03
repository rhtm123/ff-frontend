import React, { useState } from 'react';

const AddMember = ({ societyId, token, flatId, flatMembers, setFlatMembers, modalName }) => {
  const [newOwner, setNewOwner] = useState({
    name: '',
    mobileNo: '',
    role: '',
    dob: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOwner((prevOwner) => ({
      ...prevOwner,
      [name]: value,
    }));
  };

  const addToFlat = async (addedMember) => {
    try {
      const response = await fetch('https://flatfolio.onrender.com/api/owners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, // Assuming a Bearer token
        },
        body: JSON.stringify({
          // societyId: societyId,
          flatId: flatId,  // Assuming you have access to flatId
          memberId: addedMember._id,  // Use the actual property name based on your API
        }),
      });
  
      if (response.ok) {
        const newFlatOwner = await response.json();
        console.log('Member added to flat successfully:', newFlatOwner);

        setFlatMembers((flatMembers) => [...flatMembers, newFlatOwner]);

        // You can perform further actions if needed
      } else {
        const errorData = await response.json();
        console.error('Failed to add member to flat:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleAddOwner = async () => {
    try {
      const response = await fetch('https://flatfolio.onrender.com/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, // Assuming a Bearer token
        },
        body: JSON.stringify({
          societyId: societyId,
          username: newOwner.mobileNo,
          name: newOwner.name,
          mobile: newOwner.mobileNo,
          role: newOwner.role,
          dob: newOwner.dob,
        }),
      });

      if (response.ok) {
        const addedMember = await response.json();
        console.log('Owner added successfully:', addedMember);

       
        addToFlat(addedMember);

        setNewOwner({
          name: '',
          mobileNo: '',
          role: '',
          dob: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to add owner:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <dialog id={modalName} className="modal">

    <div className="modal-box">
      <form method="dialog" className="modal-backdrop">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle absolute right-2 top-2">
        ✕
        </button>
      </form>

      <h3 className="font-bold text-lg">Enter Owner Details!</h3>
      <div className="modal-action flex items-center justify-center">
        <form className="w-full">
          <div className="mb-4">
            <label>
              Name:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-xs w-full"
                name="name"
                value={newOwner.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Mobile No:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-xs w-full"
                name="mobileNo"
                value={newOwner.mobileNo}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Role:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-xs w-full"
                name="role"
                value={newOwner.role}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Date of Birth:
              <input
                type="date"
                className="input input-bordered input-xs w-full"
                name="dob"
                value={newOwner.dob}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleAddOwner}>
              Add Owner
            </button>
          </div>
        </form>
      </div>

      {/* Display added owners */}


      
    
    </div>

    {/* Dont delete this - modal will be closed when outside clicked*/}
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
    {/*  */}
    </dialog>
  );
};

export default AddMember;
