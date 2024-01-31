import { myFetch } from "@/utils/myFetch";
// import { Medal, PencilSimple } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";

export default function OwnerTenantInfoCard({
  data,
  type,
  editAllow = true,
  refreshCount,
  setRefreshCount,
}) {
  const [member, setMember] = useState(data.memberId);
  const [flat, setFlat] = useState(data.flatId);

  // const [owners, setOwners] = useState([]);
  // const [tenants, setTenants] = useState([]);

  const [editMode, setEditMode_] = useState(false);
  const [selectedRole, setSelectedRole] = useState(data.memberId?.role);
  const [submitting, setSubmitting] = useState(false);

  // const { authMemebr } = useAuth();

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
        <div className="flex items-center gap-3">
          <span>Medal</span>
          {/* <Medal size={32}  weight="thin" className="text-accent" /> */}
          <div>
            <div className="font-bold">{member?.name}</div>
            <div className="text-sm opacity-70">{flat?.wingName} {flat?.name}</div>
          </div>
        </div>
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
            <span className="cursor-pointer">Pencil</span>
            // <PencilSimple size={20} className="cursor-pointer" />
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
      )}
    </tr>
  );
}
