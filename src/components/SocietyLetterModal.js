import { useState } from "react";
import dynamic from 'next/dynamic';

const Passport = dynamic(() => import('./letters/Passport'));

export default function SocietyLetterModal({modalName,owner,ownerFamily}){

    const [selected, setSelected] = useState();



    return(
<dialog id={modalName} className="modal">
  <div className="modal-box w-12/12 max-w-5xl" style={{ height: '80vh' }}>
    <form method="dialog">
          <button className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </button>
    </form>
    {/* <h3 className="font-bold text-lg">    {owner?.memberId.name}</h3> */}
    
    <select onChange={(event)=>setSelected(event.target.value)} value={selected} className="select select-bordered select-sm">
        <option disabled selected>Select letter type</option>
        <option value="passport">Passport</option>
        <option value="domicile-certificate">Domicile Certificate</option>
    </select>

    {selected==="passport" && <Passport />}


  </div>


  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    )
}