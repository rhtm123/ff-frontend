import { useState } from "react";
import AddUpdateTenantModal from "./AddUpdateTenantModal";
import { useAuth } from "@/context/AuthContext";
import Family from "./Family";
export default function TenantCard({tenant_, flatTenants, setFlatTenants, deletedTenantsCount, setDeletedTenantsCount}) {

  const [tenant, setTenant] = useState(tenant_);
  const {token} = useAuth();

  const [deletedLoading, setDeletedLoading] =  useState(false);

  const deleteTenant = async () => {
    setDeletedLoading(true);
    let url = "https://flatfolio.onrender.com/api/tenants/"+tenant._id;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, // Assuming a Bearer token
        },
      });

      if (response.ok) {
        const deletedTenant = await response.json();       
        console.log(deletedTenant);
        let dataArray = flatTenants.filter(item => item._id !== deletedTenant.tenant._id);
        setFlatTenants(dataArray);
        setDeletedTenantsCount(deletedTenantsCount+1);
        setDeletedLoading(false);

      } else {
        const errorData = await response.json();
        console.error('Failed to add tenant:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

    return(
<div className="card bg-base-200">

    
<div key={tenant.id} className="p-4 flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-secondary">


   <div className="flex justify-between align-middle">
       <h3 className="text-xl font-semibold tracki">{tenant.memberId?.name}</h3>

       <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-sm btn-primary">Action</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><button onClick={() => document.getElementById("modal#"+tenant._id).showModal()}>Update</button></li>
          
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

<div className="card-actions justify-end">
{!tenant.moveOutDate && <div className="badge badge-outline">Living</div> }
  <div className="badge badge-outline">Products</div>
</div>


<Family flatMember={tenant} type={"tenant"} />

  
   {/* <p className="mt-3">Pellentesque feugiat ante at nisl efficitur, in mollis orci scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p> */}
 </div>

</div>
    )
}