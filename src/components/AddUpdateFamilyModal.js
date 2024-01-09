import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const AddUpdateFamilyModal = ({ type="owner", flatMemberId, modalName, familyMembers, setFamilyMembers }) => {
  // console.log(flatMemberId);
  // console.log(ownerId);
  const {token, authMember} = useAuth();
  const [submitting, setSubmitting] = useState(false);


  const [newFamily, setNewFamily] = useState({
    name: '',
    birthYear:"",
    mobile: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFamily((prevFamily) => ({
      ...prevFamily,
      [name]: value,
    }));
  };


  const addToOwner = async (addedMember) => {
    let url = type=="owner" ? 'https://flatfolio.onrender.com/api/ownerFamilies':'https://flatfolio.onrender.com/api/tenantFamilies'
    // let ownerOrTenantId = type=="owner"?"ownerId":"tenantId"
    // console.log(ownerOrTenantId)
    let data = {
      memberId: addedMember._id
    }
    if (type=="owner"){
      data.ownerId = flatMemberId
    } else {
      data.tenantId = flatMemberId
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, // Assuming a Bearer token
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const newOwnerFamily = await response.json();
        console.log('Member added to owner successfully:', newOwnerFamily);
        setFamilyMembers((familyMembers) => [...familyMembers, newOwnerFamily])
        document.getElementById(modalName).close();
        setSubmitting(false);

      } else {
        const errorData = await response.json();
        console.error('Failed to add member to flat:', errorData);
        setSubmitting(false);

      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitting(false);

    }
  };

  const handleAddFamily = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('https://flatfolio.onrender.com/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          societyId: authMember?.societyId,
          username: newFamily.mobile,
          name: newFamily.name,
          mobile: newFamily.mobile,
          birthYear: newFamily.birthYear
        }),
      });

      if (response.ok) {
        const addedMember = await response.json();
        console.log('Tenant added successfully:', addedMember);
        addToOwner(addedMember);

        setNewFamily({
          name: '',
          mobile: '',
          birthYear: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to add tenant:', errorData);
        setSubmitting(false);
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

        <h3 className="font-bold text-lg">Enter Family Details!</h3>
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
                  value={newFamily.name}
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
                  name="mobile"
                  value={newFamily.mobile}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            
            <div className="mb-4">
              <label>
                BirthYear:
                <input
                  type="text"
                  className="input input-bordered input-xs w-full"
                  name="birthYear"
                  value={newFamily.birthYear}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="modal-action">
              {!submitting && <button type="button" className="btn" onClick={handleAddFamily}>
                Add Family
              </button> }

              {submitting && <button className="btn">
              <span className="loading loading-spinner"></span>
              Submitting
            </button>}
            </div>
          </form>
        </div>
      </div>



      {/* Display added tenants */}
    </dialog>
  );
};

export default AddUpdateFamilyModal;
