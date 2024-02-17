import { useState } from "react";
import { myFetch } from "@/utils/myFetch";
import { showAlert } from "@/utils/showAlert";

export default function TenantDocumentModal({ modalName, tenant, setTenant }) {
  const [selected, setSelected] = useState();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      //   console.log(file);
      formData.append("file", file);
      formData.append("fileType", selected); // Specify the file type
      let url = process.env.API_URL + "api/tenants/upload/" + tenant._id;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      showAlert("File Upload successful");
      setTenant(data);

      document.getElementById(modalName).close();
    } catch (error) {
      console.error("Error uploading file:", error);
      showAlert("Upload failed: " + error.message); // Provide user-friendly error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id={modalName} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </button>
        </form>
        {/* <h3 className="font-bold text-lg">    {owner?.memberId.name}</h3> */}

        <select
          onChange={(event) => setSelected(event.target.value)}
          value={selected}
          className="select select-bordered select-sm"
        >
          <option disabled selected>
            Select Document type
          </option>
          <option value="agreement">Agreement</option>
          <option value="policeVerification">Police Verification</option>
        </select>

        <div className="flex m-2">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleFileChange}
          />
          {/* <button onClick={handleFileUpload}>Upload File</button> */}
          <button
            type="button"
            className={`btn btn-primary ${isLoading ? "loading" : ""} mx-auto`}
            onClick={handleFileUpload}
            disabled={isLoading}
          >
            {isLoading ? (
              <button className="btn">
                <span className="loading loading-spinner"></span>
                loading
              </button>
            ) : (
              "Upload File"
            )}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
