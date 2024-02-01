import { myFetch } from "@/utils/myFetch";
import React from "react";

import { FaBuildingUser } from "react-icons/fa6";


export default function OwnerPenanlty({ownerPenalty}){
    const [owner, setOwner] = React.useState(null);


    // console.log(ownerPenalty);

    const getOwner = async () => {
        let url = process.env.API_URL + "api/owners/"+ownerPenalty.ownerId?._id;

        let data = await myFetch(url);
        setOwner(data);
        localStorage.setItem(ownerPenalty.ownerId?._id, JSON.stringify(data));
        // console.log(data);
    }

    React.useEffect(()=>{

        let storedData = localStorage.getItem(ownerPenalty.ownerId?._id);
        if (storedData) { 
            setOwner(JSON.parse(storedData))
        } else {
            getOwner();
        }
        
    },[])

    if (!owner) return (
            <span className="loading loading-dots py-4 loading-md"></span>
    )

    return(
        // <tr>
        //     <td>
            
        //     <div className="flex items-center gap-2">
            
        //         <FaBuildingUser size={24} />

        //         <div>
        //         <div className="font-bold">{owner?.memberId.name}</div>
        //         <div className="text-sm opacity-70">{owner?.flatId?.wingName} {owner?.flatId.name}</div>
        //         </div>
        //     </div>

        //     </td>
        //     <td>{ownerPenalty?.penaltyId?.name}</td>
        //     <td className="">₹ {ownerPenalty?.penaltyId?.amount}</td>

        //     <td>{new Date(ownerPenalty?.created).toLocaleDateString()}</td>
        // </tr>

        <div
        key={ownerPenalty._id}
        className="card w-100 bg-base-200 my-4"
        >

        <div className="card-body p-4 justify-between flex-row">
        <div>
        <p className="card-title">
        {owner?.memberId.name} ( {owner?.flatId?.wingName} {owner?.flatId.name} )
        </p>
        <p className="subtitle">
        {ownerPenalty?.penaltyId?.name} | ₹ {ownerPenalty?.penaltyId?.amount}
        </p>
        </div>
        <div className="justify-end">
            {new Date(ownerPenalty?.created).toLocaleDateString()}


        </div>
        </div>
        </div>
    )
}