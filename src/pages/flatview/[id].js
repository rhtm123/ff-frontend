import React from "react";
import AddMember from "@/components/AddMember";
import Error from "@/components/Error";
import { useAuth } from "@/context/AuthContext";
import OwnerCard from "@/components/OwnerCard";

export default function FlatView({ flat, error }) {
  const [owners, setOwners] = React.useState([]);
  const { token, member } = useAuth();

  const [tenants, setTenants] = React.useState([]);

  if (error) {
    return <Error />;
  }

  React.useEffect(() => {
    // setLoading(true);
    setOwners([]);

    // console.log("Dashboard");
    // console.log(member);
    const fetchOwners = async () => {
      try {
        const response = await fetch(
          process.env.API_URL + `api/owners?flatId=${flat._id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
    
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    
        const data = await response.json();
        setOwners(data.owners);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching flats:", error);
      }
    };

    
    if (true) {
      fetchOwners();
    }
  }, []);

  React.useEffect(() => {
    // setLoading(true);
    setTenants([]);

    // console.log("Dashboard");
    // console.log(member);
    const fetchTenants = async () => {
      try {
        const response = await fetch(
          process.env.API_URL + `api/tenants?flatId=${flat._id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
    
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    
        const data = await response.json();
        setTenants(data.tenants);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching flats:", error);
      }
    };

    
    if (true) {
      fetchTenants();
    }
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 pb-4">
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

        <h2 className="text-2xl font-bold">
          {flat.wingId?.name} {flat.name}
        </h2>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {/* owner */}
        <div className="">
          <h2 className="text-xl font-bold py-4">Owner Details</h2>

          <div className="relative col-span-12 px-4 space-y-6 ">
            <div className="space-y-12 relative px-4 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-secondary">
              {owners.map((owner, index) => (
                <OwnerCard key={index} owner={owner} />
              ))}
            </div>
          </div>

          <button
            className="btn mt-6"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Add Owner
          </button>
          

          
            <AddMember
              societyId={member?.societyId}
              token={token}
              flatId={flat._id}
              flatMembers={owners}
              setFlatMembers={setOwners}
              modalName={"my_modal_1"}
            />

          </div>

        {/* owner */}

        {/* Tenant */}
        <div>
          <h2 className="text-xl font-bold py-4">Tenant Details</h2>

          <div className="relative col-span-12 px-4 space-y-6 ">
            <div className="space-y-12 relative px-4 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-secondary">
              {tenants.map((tenant, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-secondary"
                >
                  <h3 className="text-xl font-semibold tracki">
                    {tenant.memberId?.name}
                  </h3>
                  <span className="text-xs tracki">
                    {new Date(tenant.moveInDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    -
                    {tenant.moveOutDate ? (
                      <span className="text-xs tracki">
                        {new Date(tenant.moveOutDate).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    ) : (
                      <span>Currently</span>
                    )}
                  </span>

                  {/* <p className="mt-3">Pellentesque feugiat ante at nisl efficitur, in mollis orci scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p> */}
                </div>
              ))}
            </div>
          </div>

          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Add Tenant
          </button>

            <AddMember modalName={"my_modal_2"} />

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
