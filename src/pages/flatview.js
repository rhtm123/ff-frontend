import React from "react";

export default function flat_view() {
  return (
    <div className="my-10 mx-20">
    <h2 className="text-2xl font-bold ">
           Flat No: 2A-501
          </h2>
    
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2" >
    
      <div>
        {/* Heading */}
        <div className="ps-2 my-2 first:mt-0">
       
          <h2 className="text-2xl font-bold ">
            Owner Details
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

        {/* Item */}

        {/* Heading */}
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

      <div>
        <div>
          {/* Heading */}
          <div className="ps-2 my-2 first:mt-0">
          <h2 className="text-2xl font-bold ">
          Tennat Details
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
  );
}
