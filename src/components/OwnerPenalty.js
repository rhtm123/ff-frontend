import { myFetch } from "@/utils/myFetch";
import React from "react";

export default function OwnerPenanlty({ownerPenalty}){
    const [owner, setOwner] = React.useState(null);


    // console.log(ownerPenalty);

    React.useEffect(()=>{
        let url = process.env.API_URL + "api/owners/"+ownerPenalty.ownerId?._id;

        const getOwner = async () => {
            let data = await myFetch(url);
            setOwner(data);
            // console.log(data);
        }
        getOwner();
        
    },[])

    return(
        <tr>
            <td>{owner?.memberId.name}</td>
            <td>{owner?.flatId?.wingName} {owner?.flatId.name}</td>
            <td>{ownerPenalty?.penaltyId?.name}</td>
            <td>{new Date(ownerPenalty?.created).toLocaleDateString()}</td>
        </tr>
    )
}