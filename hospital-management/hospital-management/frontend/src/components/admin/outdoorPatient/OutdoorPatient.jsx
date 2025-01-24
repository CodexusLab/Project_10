import { useState } from "react";
import CreateOutdoorPatient from "./CreateOutdoorPatient";
import AllOutdoorPatient from "./AllOutdoorPatient";
import EditOutdoorPatient from "./EditOutdoorPatient";

const OutdoorPatient = () => {
  const [content, setContent] = useState("create");

  const adminContent = (cont) => {
    setContent(cont);
  };
  return (
    <div>
    <div className="doctorlist">
      <li onClick={() => adminContent("create")}>create</li>
      <li onClick={() => adminContent("all OutdoorPatient")}>All Indoor Patient</li>
      <li onClick={() => adminContent("Edit")}>Edit</li>
    </div>
    <br />
    <div className="admin-content">
      {content === "create" && <CreateOutdoorPatient/>}
      {content === "all OutdoorPatient" && <AllOutdoorPatient/>}
      {content === "Edit" && <EditOutdoorPatient/>}
    </div>
  </div>
  )
}

export default OutdoorPatient