import React, { useState } from 'react';

const AddTenant = ({ societyId, token, flatId, flatMembers, setFlatMembers, modalName }) => {
  const [newTenant, setNewTenant] = useState({
    name: '',
    mobileNo: '',
    role: '',
    dob: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTenant((prevTenant) => ({
      ...prevTenant,
      [name]: value,
    }));
  };

  const addToFlat = async (addedMember) => {
    try {
      const response = await fetch('https://flatfolio.onrender.com/api/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, 
        },
        body: JSON.stringify({
          flatId: flatId,
          memberId: addedMember._id,
        }),
      });

      if (response.ok) {
        const newFlatTenant = await response.json();
        console.log('Tenant added to flat successfully:', newFlatTenant);

        setFlatMembers((flatMembers) => [...flatMembers, newFlatTenant]);
        // You can perform further actions if needed
      } else {
        const errorData = await response.json();
        console.error('Failed to add tenant to flat:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddTenant = async () => {
    try {
      const response = await fetch('https://flatfolio.onrender.com/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          societyId: societyId,
          username: newTenant.mobileNo,
          name: newTenant.name,
          mobile: newTenant.mobileNo,
          role: newTenant.role,
          dob: newTenant.dob,
        }),
      });

      if (response.ok) {
        const addedTenant = await response.json();
        console.log('Tenant added successfully:', addedTenant);

        addToFlat(addedTenant);

        setNewTenant({
          name: '',
          mobileNo: '',
          role: '',
          dob: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to add tenant:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <dialog id={modalName} className="modal">
      <div className="modal-box">
        <form method="dialog" className="modal-backdrop">
          <button className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg">Enter Tenant Details!</h3>
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
                  value={newTenant.name}
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
                  value={newTenant.mobileNo}
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
                  value={newTenant.role}
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
                  value={newTenant.dob}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleAddTenant}>
                Add Tenant
              </button>
            </div>
          </form>
        </div>
      </div>



      {/* Display added tenants */}
    </dialog>
  );
};

export default AddTenant;
