import { useState } from "react";
import dynamic from 'next/dynamic';

const Passport = dynamic(() => import('./letters/Passport'));
const Domicile = dynamic(() => import('./letters/Domicile'));
const NOCLOAN = dynamic(() => import('./letters/NOC-LOAN'));
const Nominee = dynamic(() => import('./letters/Nominee'));

export default function SocietyLetterModal({modalName,flatMember, isOwner}){

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
        <option value="noc-bankloan">NOC for Bank Loan</option>
        <option value="nominee">Nominee</option>
    </select>

    {selected==="passport" && <Passport 
            flatMember={flatMember}
            isOwner={isOwner} />}
    {selected==="domicile-certificate" && <Domicile />}
    {selected==="noc-bankloan" && <NOCLOAN />}
    {selected==="nominee" && <Nominee />}


  </div>


  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    )
}