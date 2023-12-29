import React from "react";
import FlatCard from "@/components/FlatCard";

export default function Dashboard() {
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
            className="input input-bordered input-info w-full max-w-xs pl-10 relative"
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
            <FlatCard />
            <FlatCard />
            <FlatCard />
            <FlatCard />
            <FlatCard />

            <FlatCard />
            <FlatCard />
            <FlatCard />
            <FlatCard />
            <FlatCard />

          </div>
          <div className="grid grid-cols-4 gap-4 pt-4">
         <h1 className="text-2xl font-bold ">Society Members</h1>
          </div>
          <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
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

        {/* right section */}

        <div className="p-8">
        <div>
        <div>
          {/* Heading */}
          <div className="ps-2 my-2 first:mt-0">
          <h2 className="text-2xl font-bold ">
          Recent Activity
        </h2>
            <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
              1 Aug, 2023
            </h3>
          </div>
          {/* End Heading */}

          {/* Item */}
          <div className="flex gap-x-3">
            {/* Icon */}
            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
              <div className="relative z-10 w-7 h-7 flex justify-center items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
              </div>
            </div>
            {/* End Icon */}

            {/* Right Content */}
            <div className="grow pt-0.5 pb-8">
            
              <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                
                Created "Preline in React" task
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Find more detailed instructions here.
              </p>
            </div>
            {/* End Right Content */}
          </div>
          {/* End Item */}

          {/* Item */}
          <div className="flex gap-x-3">{/* Icon */}</div>
          {/* End Item */}

          {/* Item */}

          <div className="ps-2 my-2 first:mt-0">
          
            <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
              31 Jul, 2023
            </h3>
          </div>
          {/* End Heading */}

          {/* Item */}
          <div className="flex gap-x-3">
            {/* Icon */}
            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
              <div className="relative z-10 w-7 h-7 flex justify-center items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
              </div>
            </div>
            {/* End Icon */}

            {/* Right Content */}
            <div className="grow pt-0.5 pb-8">
              <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                Take a break
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Just chill for now...
              </p>
            </div>
            {/* End Right Content */}
          </div>
          {/* End Item */}
        </div>
        {/* End Timeline */}
      </div>
        </div>
      </div>
    </div>
  );
}
