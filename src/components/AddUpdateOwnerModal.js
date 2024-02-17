import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const AddUpdateOwnerModal = ({ owner, setOwner, flatId, flatOwners, setFlatOwners, modalName }) => {

  const {token, authMember} = useAuth();
  const [newOwner, setNewOwner] = useState();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
 
    setNewOwner({
      name: owner ? owner.memberId.name : '',
      mobile: owner ? owner.memberId.mobile : '',
      email: owner ? owner.memberId.email : '',
      possessionDate: owner ? (owner.possessionDate ? new Date(owner.possessionDate).toISOString().slice(0, 10) : "") : "",
      birthYear: owner ? owner.memberId.birthYear : "",
      gender: owner ? owner.memberId.gender : "",
      isLiving: owner ? owner.isLiving : false,
    });
  }, [modalName]);

  const handleInputChange = (e) => {
    
    let { name, value, checked } = e.target;
    if (name=="isLiving") {
      value = checked;
    } 
    setNewOwner((prevOwner) => ({
      ...prevOwner,
      [name]: value,
    }));
  
  };

  const addUpdateToFlat = async (addedMember) => {
    let url = owner? process.env.API_URL+'api/owners/'+owner._id: process.env.API_URL+'api/owners'
    try {
      const response = await fetch(url, {
        method: owner? 'PUT':'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, // Assuming a Bearer token
        },
        body: JSON.stringify({
          // societyId: societyId,
          flatId: flatId,  // Assuming you have access to flatId
          memberId: addedMember._id,  // Use the actual property name based on your API
          possessionDate: newOwner.possessionDate,
          isLiving: Boolean(newOwner.isLiving),
        }),
      });
  
      if (response.ok) {
        const savedOwner = await response.json();
        console.log('successfully:', savedOwner);
        setSubmitting(false);

        if (!owner){
          setFlatOwners((flatOwners) => [...flatOwners, savedOwner]);
        } else {
          setOwner(savedOwner);
        }

        document.getElementById(modalName).close();
        // You can perform further actions if needed
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

  const addUpdateMember = async () => {
    console.log(newOwner.isLiving, typeof newOwner.isLiving)
    setSubmitting(true);
    let url = owner? process.env.API_URL+"api/members/"+owner.memberId._id: process.env.API_URL+"api/members"
    try {
      const response = await fetch(url, {
        method: owner?'PUT':'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, // Assuming a Bearer token
        },
        body: JSON.stringify({
          societyId: authMember?.societyId,
          name: newOwner.name,
          mobile: newOwner.mobile,
          email: newOwner.email,
          birthYear: newOwner.birthYear,
          role: "member",
          isOwner: true,
        }),
      });

      if (response.ok) {
        const addedMember = await response.json();
        console.log('Owner added successfully:', addedMember);
       
        addUpdateToFlat(addedMember);

        if (!owner) {
          setNewOwner({
            name: '',
            mobile: '',
            email: '',
            possessionDate: "",
            birthYear: "",
            gender:"",
            isLiving:""
          });
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to add owner:', errorData);
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitting(false);
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
                value={newOwner?.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Mobile:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-xs w-full"
                name="mobile"
                value={newOwner?.mobile}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-4">
            <label>
              Email:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-xs w-full"
                name="email"
                value={newOwner?.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          
          <div className="mb-4">
            <label>
              possessionDate:
              <input
                type="date"
                className="input input-bordered input-xs w-full"
                name="possessionDate"
                value={newOwner?.possessionDate}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-4">
            <label>
              birthYear:
              <input
                type="string"
                className="input input-bordered input-xs w-full"
                name="birthYear"
                value={newOwner?.birthYear}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className='cursor-pointer label'>
              Is Living ?
              <input
                type="checkbox"
                className="toggle toggle-primary" 
                name="isLiving"
                checked={newOwner?.isLiving}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="modal-action">
            {!submitting && <button type="button" className="btn" onClick={addUpdateMember}>
              Submit
            </button>}
            {submitting && <button className="btn">
              <span className="loading loading-spinner"></span>
              Submitting
            </button>}
          </div>
        </form>
      </div>

      {/* Display added owners */}


      
    
    </div>

    {/* Dont delete this - modal will be closed when outside clicked*/}
    <form method="dialog" className="modal-backdrop">
      <button id="close">close</button>
    </form>
    {/*  */}
    </dialog>
  );
};

export default AddUpdateOwnerModal;
