import { myFetch } from "@/utils/myFetch";
import React from "react";

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
        <tr>
            <span className="loading loading-dots loading-md"></span>
        </tr>
    )

    return(
        <tr>
            <td>{owner?.memberId.name}</td>
            <td>{owner?.flatId?.wingName} {owner?.flatId.name}</td>
            <td>{ownerPenalty?.penaltyId?.name}</td>
            <td>{new Date(ownerPenalty?.created).toLocaleDateString()}</td>
        </tr>
    )
}