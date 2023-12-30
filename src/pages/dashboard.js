import React from "react";
import FlatCard from "@/components/FlatCard";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

import { useRouter } from "next/router";

import Loading from "@/components/Loading";


export default function Dashboard() {
  const [flats, setFlats] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(0);
  const {token, member} = useAuth();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  if (!token) {
    router.push('/dashboard');
  }


  React.useEffect(() => {
    setLoading(true)
    // console.log("Dashboard");
    // console.log(member);
    const fetchFlats = async () => {
      try {
        const response = await axios.get(
          process.env.API_URL + `api/flats?societyId=${member.societyId}`,
          { headers: {"Authorization" : `${token}`} }
          );
        // console.log(response);
        setFlats(response.data.flats);
        console.log(response.data);
        setTotalPages(response.data.totalPages);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching flats:', error);
      }
    };
    if (member){
      fetchFlats();
    }
  }, [member]);
  

  return (
    <div>
     
      <div className="grid lg:grid-cols-3">

        {/* left section */}
        <div className="col-span-2 p-8">
        <form className="w-full mb-8">
      <div className="relative ">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full pl-10 relative"
          />
          <span className="input-group-addon" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
        </div>
      </div>
    </form>


          <div className="grid grid-cols-6 gap-4">
            
            {loading && <Loading />}
            {flats.map((flat, i)=> <FlatCard key={i} flat={flat} />)}

          </div>
          <div className="grid pt-4">
            <h1 className="text-2xl font-bold py-4">Society Members</h1>
            <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Sr.</th>
          <th>Name</th>
          <th>Role</th>
          <th>Flat details</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        <tr>
          <th>1</th>
          <td>Mr Dhiru Singh</td>
          <td>Secretary</td>
          <td>2B-1506</td>
        </tr>
        {/* row 2 */}
        <tr>
          <th>2</th>
          <td>Mr Rohit Maurya</td>
          <td>ChairPerson</td>
          <td>2A-501</td>
        </tr>
        {/* row 3 */}
      </tbody>
    </table>
            </div>
          </div>


        </div>

        {/* right section */}

        <div className="p-8">
        <h2 className="text-xl font-bold pb-4">Recent Activities</h2>

          
        
	<div className="pb-4">
		<div className="flex">
			<p className="flex items-center h-8 mr-2 text-sm ">v3.2.0</p>
			<div className="flex-1 space-y-1">
				<div className="flex items-center justify-between space-x-4 ">
					<button rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group ">
						<span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary"></span>
						<span className="">Feature</span>
					</button>
					<span className="text-xs whitespace-nowrap">10h ago</span>
				</div>
				
			</div>
		</div>

    <div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.</p>
		</div>
		
	</div>

  <div className="pb-4">
		<div className="flex">
			<p className="flex items-center h-8 mr-2 text-sm ">v3.2.0</p>
			<div className="flex-1 space-y-1">
				<div className="flex items-center justify-between space-x-4 ">
					<button rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group ">
						<span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary"></span>
						<span className="">Feature</span>
					</button>
					<span className="text-xs whitespace-nowrap">10h ago</span>
				</div>
				
			</div>
		</div>

    <div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.</p>
		</div>
		
	</div>

        </div>
      </div>
    </div>
  );
}
