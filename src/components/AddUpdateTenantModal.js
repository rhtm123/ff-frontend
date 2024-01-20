import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { myFetch } from '@/utils/myFetch';

const AddUpdateTenantModal = ({ tenant, setTenant, flatId, flatTenants, setFlatTenants, modalName }) => {
  const [newTenant, setNewTenant] = useState();
  const [submitting, setSubmitting] = useState(false);
  const {token, authMember} = useAuth();


  useEffect(() => {
    console.log(tenant, modalName);
 
    setNewTenant({
      name: tenant ? tenant.memberId?.name : '',
      mobile: tenant ? tenant.memberId?.mobile : '',
      email: tenant ? tenant.memberId?.email : '',
      moveInDate: tenant ? (tenant.moveInDate ? new Date(tenant.moveInDate).toISOString().slice(0, 10) : "") : "",
      moveOutDate: tenant ? (tenant.moveOutDate ? new Date(tenant.moveOutDate).toISOString().slice(0, 10) : "") : "",
      
      policeVerified: tenant ? Boolean(tenant.policeVerified) : false,
      agreementMonth: tenant ? tenant.agreementMonth : 11,

      birthYear: tenant ? tenant.memberId?.birthYear : "",
      gender: tenant ? tenant.memberId?.gender : "",
      // isLiving: tenant ? tenant?.isLiving : false,
      
    });
  }, [modalName]);



  const handleInputChange = (e) => {
    let { name, value, checked } = e.target;
    if (name=="policeVerified") {
      value = checked;
    } 

    setNewTenant((prevTenant) => ({
      ...prevTenant,
      [name]: value,
    }));
  };

  const addUpdateToFlat = async (addedMember) => {
    let url = tenant? 'https://flatfolio.onrender.com/api/tenants/'+tenant._id:'https://flatfolio.onrender.com/api/tenants'

    try {
      const savedTenant = await myFetch(
        url, 
        tenant ? 'PUT':'POST',
        {flatId: flatId,
          memberId: addedMember._id,
          moveInDate: newTenant.moveInDate,
          moveOutDate: newTenant.moveOutDate,
          policeVerified: newTenant.policeVerified,
          agreementMonth: Number(newTenant.agreementMonth),
        }
        )

      console.log('Tenant added to flat successfully:', savedTenant);

      if(!tenant){
          setFlatTenants((flatTenants) => [...flatTenants, savedTenant]);
        } else {
          setTenant(savedTenant);
        }
      document.getElementById(modalName).close();
      setSubmitting(false);


      // const response = await fetch(url, {
      //   method: tenant ? 'PUT':'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `${token}`, 
      //   },
      //   body: JSON.stringify({
      //     flatId: flatId,
      //     memberId: addedMember._id,
      //   }),
      // });

      // if (response.ok) {
        
      //   // You can perform further actions if needed
      // } else {
      //   const errorData = await response.json();
      //   console.error('Failed to add tenant to flat:', errorData);
      // }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddUpdateTenant = async () => {
    console.log("adding tenant..")
    setSubmitting(true);
    let url = tenant? "https://flatfolio.onrender.com/api/members/"+tenant.memberId._id: "https://flatfolio.onrender.com/api/members"

    try {

      const addedTenant = await myFetch(url,
      
        tenant?'PUT':'POST',
        {
          societyId: authMember?.societyId,
          name: newTenant.name,
          mobile: newTenant.mobile,
          birthYear: newTenant.birthYear,
          gender: newTenant.gender,
          isTenant: true,
          role: "member"
        }
        )

        console.log('Tenant added successfully:', addedTenant);

        addUpdateToFlat(addedTenant);
        if (!tenant) {
          setNewTenant({
            name:"",
      mobile: '',
      email: '',
      moveInDate:  "",
      moveOutDate: "",
      policeVerified: false,
      agreementMonth: 11,
      birthYear:  "",
      gender:"",
        });
        }
        

      // const response = await fetch(url, {
      //   method: tenant?'PUT':'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `${token}`,
      //   },
      //   body: JSON.stringify({
      //     societyId: member.societyId,
      //     name: newTenant.name,
      //     mobile: newTenant.mobile,
      //   }),
      // });

      // if (response.ok) {
      //   const addedTenant = await response.json();
      //   console.log('Tenant added successfully:', addedTenant);

      //   addUpdateToFlat(addedTenant);

      //   setNewTenant({
      //       name: '',
      //       mobile: '',
      //       email: '',
      //       moveInDate: "",
      //       birthYear: "",
      //       gender:"",
      //   });
      // } else {
      //   const errorData = await response.json();
      //   console.error('Failed to add tenant:', errorData);
      // }
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

        <h3 className="font-bold text-lg">Enter Tenant Details Here!</h3>
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
                  value={newTenant?.name}
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
                  value={newTenant?.mobile}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            
            <div className="mb-4">
              <label>
                Birth Year:
                <input
                  type="text"
                  className="input input-bordered input-xs w-full"
                  name="birthYear"
                  value={newTenant?.birthYear}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="mb-4">
            <label>
              moveInDate:
              <input
                type="date"
                className="input input-bordered input-xs w-full"
                name="moveInDate"
                value={newTenant?.moveInDate}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-4">
            <label>
              moveOutDate:
              <input
                type="date"
                className="input input-bordered input-xs w-full"
                name="moveOutDate"
                value={newTenant?.moveOutDate}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className='cursor-pointer label'>
            policeVerified ?
              <input
                type="checkbox"
                className="toggle toggle-primary" 
                name="policeVerified"
                checked={newTenant?.policeVerified}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className='cursor-pointer label'>
            agreementMonth : 
              <input
                type="number"
                className="input input-bordered input-sm"

                name="agreementMonth"
                value={newTenant?.agreementMonth}
                onChange={handleInputChange}
              />
            </label>
          </div>

            <div className="modal-action">
              {!submitting && <button type="button" className="btn" onClick={handleAddUpdateTenant}>
                Submit
              </button>
              }

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

export default AddUpdateTenantModal;
