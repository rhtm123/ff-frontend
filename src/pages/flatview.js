import React from "react";

export default function FlatView() {
  return (
    <div className="p-8">
    <h2 className="text-2xl font-bold pb-4">
           Flat No: 2A-501
    </h2>
    
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2" >
    
    
{/* owner */}
    <div className="">

    <h2 className="text-xl font-bold py-4">
      Owner Details
    </h2>
	<div className="py-4">

  

			
			<div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
				<div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-secondary">
					<div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-secondary">
						<h3 className="text-xl font-semibold tracki">Sunteck West World</h3>
						<time className="text-xs tracki uppercase ">2 Dec 2020</time>
						<p className="mt-3">Pellentesque feugiat ante at nisl efficitur, in mollis orci scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
					</div>
					<div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-secondary">
						<h3 className="text-xl font-semibold tracki">Ramashankar Maurya</h3>
						<time className="text-xs tracki uppercase dark:text-gray-400">2 Jul 2019</time>
						<p className="mt-3">Morbi vulputate aliquam libero non dictum. Aliquam sit amet nunc ut diam aliquet tincidunt nec nec dui. Donec mollis turpis eget egestas sodales.</p>
					</div>
					
				</div>
			</div>
	</div>
</div>

{/* owner */}

{/* Tenant */}
      <div>
      <h2 className="text-xl font-bold py-4">
      Tenant Details
    </h2>
      </div>
      {/* end Tenant  */}
    </div>
    </div>
  );
}
