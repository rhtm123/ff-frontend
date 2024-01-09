import React, { useEffect } from 'react';

export default function AlertCard({ data, type = 'error' }) {
  useEffect(() => {
    const alertElement = document.getElementById('alert');

    // Automatically close after a few seconds (adjust the timeout as needed)
    const timeoutId = setTimeout(() => {
      alertElement.style.display = 'none';
    }, 5000000);

    // Clear the timeout when the component is unmounted or closed manually
    return () => clearTimeout(timeoutId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    const alertElement = document.getElementById('alert');
    alertElement.style.display = 'none';
  };

  return (
    <div className="fixed bottom-10 right-10 transform -translate-x-1/2">
      <div id="alert" role="alert" className={"alert alert-"+type}>
        
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>

        <span>
            {data}
        </span>

        <div>
            <button onClick={handleClose} className="btn btn-sm ghost">Close</button>
        </div>
      </div>
    </div>
  );
}
