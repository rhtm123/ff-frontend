import React, { useEffect } from 'react';

export default function AlertCard({ alertData,  showAlert, setShowAlert, alertType = 'error' }) {
  console.log(alertType);
  useEffect(() => {
    // const alertElement = document.getElementById('alert');

    // Automatically close after a few seconds (adjust the timeout as needed)
    const timeoutId = setTimeout(() => {
      // alertElement.style.display = 'none';
      setShowAlert(false);
    }, 5000);

    // Clear the timeout when the component is unmounted or closed manually
    return () => clearTimeout(timeoutId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    // const alertElement = document.getElementById('alert');
    // alertElement.style.display = 'none';
    setShowAlert(false);
  };

  return (
    <div className="fixed z-50 bottom-10 right-10 toast toast-top toast-center">
      {showAlert && <div id="alert" role="alert" className={"alert alert-"+alertType}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

        
        <span>
            {alertData}
        </span>

        <div>
            <button onClick={handleClose} className="btn btn-sm ghost">Close</button>
        </div>
      </div>
      }
    </div>
  );
}
