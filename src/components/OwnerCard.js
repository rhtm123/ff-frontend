export default function OwnerCard({owner}) {

    return(

    <div className="card bg-base-200">

    
    <div key={owner.id} className="p-6 flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-secondary">
       <h3 className="text-xl font-semibold tracki">{owner.memberId?.name}</h3>
       <span className="text-xs tracki">{new Date(owner.possessionDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}
    -
    {owner.saleDate ?
      <span className="text-xs tracki">{new Date(owner.saleDate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })}</span>: <span>Currently</span>
      }

  </span>

    <div className="card-actions justify-end">
    {owner.isLiving && <div className="badge badge-outline">Living</div> }
      <div className="badge badge-outline">Products</div>
    </div>

      
       {/* <p className="mt-3">Pellentesque feugiat ante at nisl efficitur, in mollis orci scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p> */}
     </div>

    </div>
    )
}