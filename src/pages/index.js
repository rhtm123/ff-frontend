import Link from "next/link"
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/router";

import { PiBuildings, PiGavel, PiNotebook, PiRobot, PiWarning, PiScroll, PiPhoneCall} from "react-icons/pi";


export default function Home() {
  const {token} = useAuth();
  const router = useRouter();

  if (token) {
    router.push('/dashboard');
  }


  const youtubeVideoUrl = "https://www.youtube.com/watch?v=OnTDSLzBO8E"

  const newWidth = 560 * 1.5;
  const newHeight = 315 * 1.5;


  return (
    <div>


    {/* hero section */}
    <div className="hero mx-auto px-4 min-h-screen sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
        <div>
          <h1 className="block text-3xl font-bold sm:text-4xl lg:text-5xl lg:leading-tight">
            Hey Committee Members, <span className="text-primary">
              SocietySathi</span> will make your job easy
          </h1>

          <div className="mt-7 grid gap-3 w-full sm:inline-flex">
            {/* <button className="btn btn-primary">
            <Link className="" href="#">
              Try it out
            </Link>
            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>

            </button> */}
            <button className="btn btn-secondary">
            <Link className="" href="/contact">
              Contact sales team
            </Link>
            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>

            </button>
            
          </div>

        </div>

        <div className="mt-10 md:mt-0">
          <img className="rounded-lg shadow-xl" src="/images/apartment2.jpg" alt="Your Alt Text" />
        </div>
      </div>
    </div>

    {/* hero section */}


    {/* video section */}

    <div className="relative bg-base-200">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl text-center mx-auto">
          <h1 className="block text-3xl font-bold sm:text-4xl md:text-5xl leading-tight">Designed to solve all critical problems of a <span className="text-primary">Society</span></h1>
          <p className="mt-3 text-lg">Integrate your society with us. We will take care of everything.</p>
        </div>

        <div className="mt-10 relative max-w-5xl mx-auto">
          <div className="w-full object-cover h-96 sm:h-[480px] bg-[url('/images/dashboard.jpg')] bg-no-repeat bg-center bg-cover rounded-xl"></div>

          <div className="absolute inset-0 w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">

              {/* <button onClick={()=>document.getElementById('my_modal_1').showModal()}  className="btn btn-secondary">
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Play the overview
              </button> */}

              <dialog id="my_modal_1" className="modal">
              <div className="modal-box p-0 max-w-none w-auto">
                
              <iframe
            width={newWidth}
            height={newHeight}
          src={youtubeVideoUrl.replace('watch?v=', 'embed/')}
          title="YouTube Video"
          allowFullScreen
        ></iframe>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* video section */}


<section className="body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="text-center mb-20">
      <h1 className="sm:text-5xl text-2xl leading-tight font-bold title-font mb-4">
        Every Society loves these features
      </h1>
      {/* <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
        Blue bottle crucifix vinyl post-ironic four dollar toast vegan
        taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi
        pug.
      </p> */}
      <div className="flex mt-6 justify-center">
        <div className="w-16 h-1 rounded-full bg-primary inline-flex" />
      </div>
    </div>
    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-base-300 text-primary mb-5 flex-shrink-0">

          <PiBuildings size={40} />

        </div>
        <div className="flex-grow">
          <h2 className="text-lg title-font font-medium mb-3">
            Apartment Management Systems
          </h2>
          <p className="leading-relaxed opacity-80">
          Effortlessly organize flat details and documents for owners and tenants, fostering transparent communication and smooth community living.
          </p>
        
        </div>
      </div>
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-base-300 text-primary mb-5 flex-shrink-0">
         
         {/* <Gavel size={40} /> */}
         <PiGavel size={40} />
        </div>
        <div className="flex-grow">
          <h2 className="text-lg title-font font-medium mb-3">
            Penanlty Systems
          </h2>
          <p className="leading-relaxed opacity-80">
          Enable the committee to uphold community standards with a fair and transparent Penalty System, ensuring accountability and responsible living.
          </p>
          {/* <a className="mt-3 text-indigo-500 inline-flex items-center">
            Learn More
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a> */}
        </div>
      </div>
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-base-300 text-primary mb-5 flex-shrink-0">
          {/* <Notebook size={40} /> */}
          <PiNotebook size={40} />
        </div>
        <div className="flex-grow">
          <h2 className="text-lg title-font font-medium mb-3">
            Complaint Management
          </h2>
          <p className="leading-relaxed opacity-80">
          Easily register and track complaints for efficient resolution, promoting a responsive and well-maintained living environment.
          </p>
          {/* <a className="mt-3 text-indigo-500 inline-flex items-center">
            Learn More
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a> */}
        </div>
      </div>


      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-base-300 text-primary mb-5 flex-shrink-0">
          {/* <Robot size={40} /> */}
          <PiRobot size={40} />
        </div>
        <div className="flex-grow">
          <h2 className="text-lg title-font font-medium mb-3">
            Automated NOC & letters
          </h2>
          <p className="leading-relaxed text-base">
          Save time with automated generation of NOCs and letters, reducing paperwork and streamlining administrative processes.
          </p>
          {/* <a className="mt-3 text-indigo-500 inline-flex items-center">
            Learn More
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a> */}
        </div>
      </div>

      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-base-300 text-primary mb-5 flex-shrink-0">
          {/* <Warning size={40} /> */}
          <PiWarning size={40} />
        </div>
        <div className="flex-grow">
          <h2 className="text-lg title-font font-medium mb-3">
            Alert System
          </h2>
          <p className="leading-relaxed opacity-80">
          Stay informed with timely notifications on important events, meetings, and critical updates, enhancing community engagement.
          </p>

        </div>
      </div>

      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-base-300 text-primary mb-5 flex-shrink-0">
          {/* <Scroll size={40} /> */}
          <PiScroll size={40} />
        </div>
        <div className="flex-grow">
          <h2 className="text-lg title-font font-medium mb-3">
          Maintenance Collection
          </h2>
          <p className="leading-relaxed opacity-80">
          Simplify maintenance fee collection, ensuring smooth operations and organized management of essential services within the society.
          </p>
          
        </div>
      </div>

    </div>
    {/* <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
      Button
    </button> */}
  </div>
</section>



<div className="hero" style={{backgroundImage: 'url(/images/apartment1.jpg)'}}>
  <div className="hero-overlay bg-opacity-20"></div>
  <div className="py-16 text-center">
    <div className="glass bg-opacity-60 p-8 rounded-xl">
      <h1 className="mb-5 text-5xl font-bold">What are you waiting for ?</h1>
      <div className="flex justify-center items-center gap-4">
      {/* <PhoneCall size={48} className="mt-2 text-accent" /> */}
      <PiPhoneCall size={48} className="mt-2 text-accent" />
      <h1 className="text-5xl font-bold text-primary">
         9518901902
      </h1>
      </div>
      {/* <button className="btn btn-primary">Get Started</button> */}
    </div>
  </div>
  
</div>


      

    </div>
  )
}


