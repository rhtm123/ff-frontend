import { useState, useEffect } from "react";
// import AddUpdateTenantModal from "./AddUpdateTenantModal";
import Family from "./Family";
import { myFetch } from "@/utils/myFetch";
import dynamic from "next/dynamic";

const AddUpdateTenantModal = dynamic(() => import('./AddUpdateTenantModal'));
const TenantDocumentModal = dynamic(() => import('./TenantDocumentModal'));



export default function TenantCard({tenant_, flatTenants, setFlatTenants, deletedTenantsCount, setDeletedTenantsCount}) {

  const [tenant, setTenant] = useState(tenant_);

  const [deletedLoading, setDeletedLoading] =  useState(false);

  const [monthsLeft, setMonthsLeft] = useState(0);

  useEffect(() => {
    const moveInDate = new Date(tenant.moveInDate);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = currentDate - moveInDate;

    // Calculate the number of months
    const monthsPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44));

    if (tenant?.agreementMonth){
      setMonthsLeft(tenant?.agreementMonth-monthsPassed);
    } else {
      setMonthsLeft(11-monthsPassed);
    }
  }, [tenant.moveInDate]);

  const deleteTenant = async () => {
    setDeletedLoading(true);
    let url = "https://flatfolio.onrender.com/api/tenants/"+tenant._id;

    try {
      
      let deletedTenant = await myFetch(url, "DELETE", {})

      console.log(deletedTenant);
      let dataArray = flatTenants.filter(item => item._id !== deletedTenant.tenant._id);
      setFlatTenants(dataArray);
      setDeletedTenantsCount(deletedTenantsCount+1);
      setDeletedLoading(false);

    } catch (error) {
      console.error('Error:', error);
    }
  }

    return(
<div className="card bg-base-200">

    
<div key={tenant.id} className="p-4 flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-secondary">


   <div className="flex justify-between align-middle">
       <h3 className="text-xl font-semibold tracki">{tenant.memberId?.name} {tenant.memberId?.birthYear && `(${new Date().getFullYear()- tenant.memberId.birthYear} years old)`}</h3>

       <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-sm btn-primary">Action</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><button onClick={() => document.getElementById("modal#"+tenant._id).showModal()}>Update</button></li>
          <li><button onClick={() => document.getElementById("modaldocument#"+tenant._id).showModal()}>Documents</button></li>
          
          <li>
            {deletedLoading ?
            <button className="btn">
            <span className="loading loading-spinner"></span>
            Deleting
          </button>
            :<button onClick={deleteTenant}>Delete</button>
            }
          </li>
        </ul>

        <AddUpdateTenantModal
              tenant={tenant}
              setTenant={setTenant}
              modalName={"modal#"+tenant._id}
            />
        <TenantDocumentModal 
           tenant={tenant}
           setTenant={setTenant}
            modalName={"modaldocument#"+tenant._id}
         />    
      </div>

      </div>




   <span className="text-xs tracki">{new Date(tenant.moveInDate).toLocaleDateString('en-US', {
day: 'numeric',
month: 'short',
year: 'numeric',
})}
-
{tenant.moveOutDate ?
  <span className="text-xs tracki">{new Date(tenant.moveOutDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}</span>: <span>Currently</span>
  }

</span>

<div className="card-actions py-4">

{tenant?.policeVerified && 
<div className="badge badge-outline badge-success">
  Police Verified
</div>
}


{tenant.memberId?.mobile && 
<div className="badge badge-outline badge-info">
  {tenant.memberId.mobile}
</div> }

{tenant?.agreementMonth && 
<div className="badge badge-outline badge-info">
  {tenant.agreementMonth} months Agreement
</div>
}

{!tenant.moveOutDate && 
<div className="badge badge-outline badge-info">
  Living
</div> }


{tenant?.moveInDate && 
<div className="badge badge-outline badge-info">
  {monthsLeft} months left
</div>
}

{tenant?.agreementFile && 
<div className="badge badge-outline badge-info">
  <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
    >
      <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" />
    </svg>
     agreement uploaded
</div>
}

</div>


<Family flatMember={tenant} type={"tenant"} />

  
   {/* <p className="mt-3">Pellentesque feugiat ante at nisl efficitur, in mollis orci scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p> */}
 </div>

</div>
    )
}