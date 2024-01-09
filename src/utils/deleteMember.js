import { myFetch } from "./myFetch"
export async function deleteMember(_id) {
    let url = process.env.API_URL + "api/members/" + _id;

    try{
    const data = await myFetch(url, "DELETE");
    console.log("Member Deleted:", data);
    return data;
    } catch(e){ 
        throw e;
    }
}