import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { myFetch } from '@/utils/myFetch';

const AddUpdateFamilyModal = ({ type="owner", flatMemberId, modalName, familyMembers, setFamilyMembers }) => {
  // console.log(flatMemberId);
  // console.log(ownerId);
  const {authMember} = useAuth();
  const [submitting, setSubmitting] = useState(false);


  const [newFamily, setNewFamily] = useState({
    name: '',
    birthYear:"",
    mobile: "",
    relation:"",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFamily((prevFamily) => ({
      ...prevFamily,
      [name]: value,
    }));
  };


  const addToOwnerTenant = async (addedMember) => {
    let url = type=="owner" ? 'https://flatfolio.onrender.com/api/ownerFamilies':'https://flatfolio.onrender.com/api/tenantFamilies'
    // let ownerOrTenantId = type=="owner"?"ownerId":"tenantId"
    // console.log(ownerOrTenantId)
    let data = {
      memberId: addedMember._id,
      relation: newFamily.relation
    }
    if (type=="owner"){
      data.ownerId = flatMemberId
    } else {
      data.tenantId = flatMemberId
    }
    try {

      const newOwnerFamily = await myFetch(url, "POST", data);
      
        console.log('Member added to owner successfully:', newOwnerFamily);
        setFamilyMembers((familyMembers) => [...familyMembers, newOwnerFamily])
        document.getElementById(modalName).close();
        setSubmitting(false);

      
    } catch (error) {
      console.error('Error:', error);
      setSubmitting(false);

    }
  };

  const handleAddFamily = async () => {
    setSubmitting(true);
    try {
      const addedMember = await myFetch(
        'https://flatfolio.onrender.com/api/members',
        "POST",
        {
          societyId: authMember?.societyId,
          name: newFamily.name,
          mobile: newFamily.mobile,
          birthYear: newFamily.birthYear
        }

      );

      // const response = await fetch('https://flatfolio.onrender.com/api/members', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `${token}`,
      //   },
      //   body: JSON.stringify({
      //     societyId: authMember?.societyId,
      //     username: newFamily.mobile,
      //     name: newFamily.name,
      //     mobile: newFamily.mobile,
      //     birthYear: newFamily.birthYear
      //   }),
      // });

      // if (response.ok) {
      //   const addedMember = await response.json();
        // console.log('Tenant added successfully:', addedMember);
        addToOwnerTenant(addedMember);

        setNewFamily({
          name: '',
          mobile: '',
          birthYear: '',
          relation:"",
        });
      
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

            <div className="mb-4">
              <label>
              relation:
                <input
                  type="text"
                  className="input input-bordered input-xs w-full"
                  name="relation"
                  value={newFamily.relation}
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
