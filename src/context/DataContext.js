
import { myFetch } from '@/utils/myFetch';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const {token, authMember} = useAuth();
    const [complaintData, setComplaintData] = useState(null);
    const [ownerPenaltyData, setOwnerPenanltyData ] = useState(null);


    useEffect(() => {
        // Fetch complaints when the component mounts
        // In this example, fetching from an API
        fetchComplaints();
        getImposePenalties();
      }, [authMember]);
    
      const fetchComplaints = async () => {
        try {
          const data = await myFetch(process.env.API_URL+"api/complaints?societyId="+authMember?._id);
        //   console.log(data);
          
        setComplaintData(data);
        //   setLoading(false); // Set loading to false in case of an error
        } catch (error) {
          console.error("Error fetching complaints:", error);    
        }
      };

      const getImposePenalties = async (page) => {
        try {
        let url = process.env.API_URL + `api/ownerPenalties?page=${page}societyId=`+authMember?.societyId;
        let data = await myFetch(url); 
        setOwnerPenanltyData(data);
        } catch (error) {
            console.error("Error fetching imposePenalties:", error);    
        }    
      }

    return (
        <DataContext.Provider value={{ complaintData, ownerPenaltyData }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    return useContext(DataContext);
};
  