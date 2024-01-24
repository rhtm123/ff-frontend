import { myFetch } from "@/utils/myFetch";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function OwnerTenantInfoCard({
  data,
  type,
  editAllow = true,
  refreshCount,
  setRefreshCount,
}) {
  const [member, setMember] = useState(data.memberId);

  // const [owners, setOwners] = useState([]);
  // const [tenants, setTenants] = useState([]);

  const [editMode, setEditMode_] = useState(false);
  const [selectedRole, setSelectedRole] = useState(data.memberId);
  const [submitting, setSubmitting] = useState(false);

  const { authMemebr } = useAuth();

  const [formData, setFormData] = useState({
    role: data.memberId.role,
    isCommitteeMember: data.memberId.isCommitteeMember,
  });

  const changeMember = async () => {
    setSubmitting(true);
    let url = process.env.API_URL + "api/members/" + data.memberId._id;
    // console.log(formData);
    try {
      let data = await myFetch(url, "PUT", formData);
      // console.log("done",data);
      setEditMode_(false);
      setMember(data);
      setRefreshCount(refreshCount + 1);
      setSubmitting(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleChange = (event, key) => {
    const selectedValue = event.target.value;
    setSelectedRole(selectedValue);
    formData[key] = selectedValue;
    setFormData(formData);
  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setFormData({
      ...formData,
      isCommitteeMember: checked,
    });
  };

  return (
    <tr>
      <th>
        {editMode ? <span>{member.name}</span> : <span>{member.name}</span>}
      </th>

      <td>
        {editMode ? (
          <select
            value={selectedRole}
            onChange={(e) => handleChange(e, "role")}
            className="select select-sm select-info w-full"
          >
            <option value="member">Member</option>
            <option value="committeeMember">Committee Member</option>
            <option value="chairman">Chairman</option>
            <option value="secretary">Secretary</option>
          </select>
        ) : (
          <span>{member.role}</span>
        )}
      </td>

      <td>
        {editMode ? (
          <div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Is Committee Member? </span>
                <input
                  checked={formData.isCommitteeMember}
                  onChange={handleCheckboxChange}
                  type="checkbox"
                  className="checkbox checkbox checkbox-info"
                />
              </label>
            </div>
          </div>
        ) : (
          <div>
            {member.isCommitteeMember ? (
              <div className="badge badge-success badge-outline">Yes</div>
            ) : (
              <div className="badge badge-outline">No</div>
            )}
          </div>
        )}
      </td>

      {editAllow && (
        <td>
          {!editMode ? (
            <svg
              onClick={() => setEditMode_(true)}
              className="cursor-pointer h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path>
            </svg>
          ) : (
            <button onClick={changeMember} class="btn btn-sm">
              {submitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <span>Save</span>
              )}
            </button>
          )}
        </td>
<<<<<<< Updated upstream

        <td>
        {editMode ?
                <div>
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text">Is Committee Member? </span>
                      <input checked={formData.isCommitteeMember}
                              onChange={handleCheckboxChange}
                      type="checkbox" 
                      className="checkbox checkbox checkbox-info" />
                    </label>
                  </div>
                </div>
                : 
                <div>{
                  member.isCommitteeMember? 
                  <div className="badge badge-success badge-outline">Yes</div>: 
                  <div className="badge badge-outline">No</div>
                  
                }</div>
                }
        </td>

      {editAllow && <td>
        {!editMode ? <svg onClick={()=> setEditMode_(true)}
              className="cursor-pointer h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path></svg>
                : <button onClick={changeMember} className="btn btn-sm">
                  
                  {submitting ? <span className="loading loading-spinner"></span>: <span>Save</span>}

                  </button>
            }
        </td>}

      </tr>

    )
}
=======
      )}
    </tr>
  );
}
>>>>>>> Stashed changes
