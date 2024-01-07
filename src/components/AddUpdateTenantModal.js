import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const AddUpdateTenantModal = ({ tenant, setTenant, flatId, flatTenants, setFlatTenants, modalName }) => {
  const [newTenant, setNewTenant] = useState();
  const [submitting, setSubmitting] = useState(false);
  const {token, member} = useAuth();


  useEffect(() => {
    console.log(tenant, modalName);
 
    setNewTenant({
      name: tenant ? tenant.memberId?.name : '',
      mobile: tenant ? tenant.memberId?.mobile : '',
      email: tenant ? tenant.memberId?.email : '',
      possessionDate: tenant ? (tenant.possessionDate ? new Date(tenant.possessionDate).toISOString().slice(0, 10) : "") : "",
      birthYear: tenant ? tenant.memberId?.birthYear : "",
      gender: tenant ? tenant.memberId?.gender : "",
      isLiving: tenant ? tenant?.isLiving : false,
    });
  }, [modalName]);



  const handleInputChange = (e) => {
    let { name, value, checked } = e.target;
    if (name=="isLiving") {
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
      const response = await fetch(url, {
        method: tenant ? 'PUT':'POST',
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
        const savedTenant = await response.json();
        console.log('Tenant added to flat successfully:', savedTenant);

        if(!tenant){
          setTenantMembers((tenantMembers) => [...tenantMembers, savedTenant]);
        } else {
          setTenant(savedTenant);
        }
        document.getElementById(modalName).close();

        // You can perform further actions if needed
      } else {
        const errorData = await response.json();
        console.error('Failed to add tenant to flat:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddUpdateTenant = async () => {
    console.log("adding tenant..")
    setSubmitting(true);
    let url = tenant? "https://flatfolio.onrender.com/api/members/"+tenant.memberId._id: "https://flatfolio.onrender.com/api/members"

    try {
      const response = await fetch(url, {
        method: tenant?'PUT':'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          societyId: member.societyId,
          name: newTenant.name,
          mobile: newTenant.mobile,
        }),
      });

      if (response.ok) {
        const addedTenant = await response.json();
        console.log('Tenant added successfully:', addedTenant);

        addUpdateToFlat(addedTenant);

        setNewTenant({
            name: '',
            mobile: '',
            email: '',
            moveInDate: "",
            birthYear: "",
            gender:"",
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
                Date of Birth:
                <input
                  type="text"
                  className="input input-bordered input-xs w-full"
                  name="birthYear"
                  value={newTenant?.birthYear}
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
