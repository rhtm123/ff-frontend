import React from "react";
import { useRouter } from "next/router";
// import AddUpdateOwnerModal from "@/components/AddUpdateOwnerModal";
import Error from "@/components/Error";
import { useAuth } from "@/context/AuthContext";
import OwnerCard from "@/components/OwnerCard";
// import AddUpdateTenantModal from '@/components/AddUpdateTenantModal';
import Loading from "@/components/Loading";

import TenantCard from "@/components/TenantCard";
import { myFetch } from "@/utils/myFetch";

// import dynamic from "next/dynamic";

// const AddUpdateOwnerModal = dynamic(() => import('@/components/AddUpdateOwnerModal'));
// const AddUpdateTenantModal = dynamic(() => import('@/components/AddUpdateTenantModal'));
import AddUpdateOwnerModal from "@/components/AddUpdateOwnerModal";
import AddUpdateTenantModal from "@/components/AddUpdateTenantModal";


export default function FlatView({ flat, error }) {
  const [owners, setOwners] = React.useState([]);
  const { token, authMember } = useAuth();

  const [tenants, setTenants] = React.useState([]);
  const [loadingOwners, setLoadingOwners] = React.useState(true);
  const [loadingTenants, setLoadingTenants] = React.useState(true);
  const [deletedOwnersCount, setDeletedOwnersCount] = React.useState(0);
  const [deletedTenantsCount, setDeletedTenantsCount] = React.useState(0);

  const router = useRouter();

  if (error) {
    return <Error />;
  }

  React.useEffect(() => {
    setLoadingOwners(true);
    setOwners([]);


    const fetchOwners = async () => {
      try {

        let data = await myFetch(process.env.API_URL + `api/owners?flatId=${flat._id}`)

        // const response = await fetch(
        //   process.env.API_URL + `api/owners?flatId=${flat._id}`,
        //   {
        //     method: 'GET',
        //     headers: {
        //       Authorization: `${token}`,
        //       'Content-Type': 'application/json',
        //     },
        //   }
        // );
    
        // if (!response.ok) {
        //   throw new Error(`Failed to fetch data. Status: ${response.status}`);
        // }
    
        // const data = await response.json();
        setOwners(data.owners);
        setLoadingOwners(false);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching flats:", error);
      }
    };

    
    if (true) {
      fetchOwners();
    }
  }, [deletedOwnersCount]);

  React.useEffect(() => {
    setLoadingTenants(true);

    // setLoading(true);
    setTenants([]);

    // console.log("Dashboard");
    // console.log(member);
    const fetchTenants = async () => {
      try {
        let url = process.env.API_URL + `api/tenants?flatId=${flat._id}`
        
        let data = await myFetch(url);
        // const response = await fetch(
        //   process.env.API_URL + `api/tenants?flatId=${flat._id}`,
        //   {
        //     method: 'GET',
        //     headers: {
        //       Authorization: `${token}`,
        //       'Content-Type': 'application/json',
        //     },
        //   }
        // );
    
        // if (!response.ok) {
        //   throw new Error(`Failed to fetch data. Status: ${response.status}`);
        // }
    
        // const data = await response.json();
        setTenants(data.tenants);
        setLoadingTenants(false);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching flats:", error);
      }
    };

    
    if (true) {
      fetchTenants();
    }
  }, [deletedTenantsCount]);

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 pb-4 breadcrumbs">
        <ul className="flex items-center font-bold space-x-2">
          <li>
            <button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center font-bold text-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>
          </li>
          <li>
            <h2 className="text-2xl font-bold">
              {flat.wingId?.name} {flat.name}
            </h2>
          </li>
        </ul>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {/* owner */}
        <div className="">
          <h2 className="text-xl font-bold py-4">Owner Details</h2>

          <div className="relative col-span-12 px-4 space-y-6 ">
            <div className="space-y-6 relative px-4 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-secondary">
              {loadingOwners && <Loading />}

              {!loadingOwners && owners.length == 0 && (
                <div className="py-6">No owner available</div>
              )}
              {owners.map((owner, index) => (
                <OwnerCard
                  key={index}
                  owner_={owner}
                  flatOwners={owners}
                  setFlatOwners={setOwners}
                  deletedOwnersCount={deletedOwnersCount}
                  setDeletedOwnersCount={setDeletedOwnersCount}
                />
              ))}
            </div>
          </div>

          <button
            className="btn mt-6"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Add Owner
          </button>

          <AddUpdateOwnerModal
            societyId={authMember?.societyId}
            token={token}
            flatId={flat._id}
            flatOwners={owners}
            setFlatOwners={setOwners}
            modalName={"my_modal_1"}
          />
        </div>

        {/* owner */}

        {/* Tenant */}
        <div>
          <h2 className="text-xl font-bold py-4">Tenant Details</h2>

          <div className="relative col-span-12 px-4 space-y-6 ">
            <div className="space-y-6 relative px-4 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-secondary">
              {loadingTenants && <Loading />}

              {!loadingTenants && tenants.length == 0 && (
                <div className="py-6">No tenant available</div>
              )}

              {tenants.map((tenant, index) => (
                <TenantCard
                  key={index}
                  tenant_={tenant}
                  flatTenants={tenants}
                  setFlatTenants={setTenants}
                  deletedTenantsCount={deletedTenantsCount}
                  setDeletedTenantsCount={setDeletedTenantsCount}
                />
              ))}
            </div>
          </div>

          <button
            className="btn mt-6"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Add Tenant
          </button>

          <AddUpdateTenantModal
            societyId={authMember?.societyId}
            token={token}
            flatId={flat._id}
            flatTenants={tenants}
            setFlatTenants={setTenants}
            modalName={"my_modal_2"}
          />
        </div>
        {/* end Tenant  */}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const { id } = context.params;
  const url = process.env.API_URL + "api/flats/" + id;

  const res = await fetch(url);
  // console.log(res)
  const error = res.ok ? false : true;
  const data = await res.json();

  return {
    props: {
      flat: data,
      error: error,
    },
  };
}
