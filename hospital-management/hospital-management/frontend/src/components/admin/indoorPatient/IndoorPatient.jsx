import { useState } from "react";
import CreateIndoorPatient from "./CreateIndoorPatient";
import AllIndoorPatient from "./AllIndoorPatient";
import EditIndorePatient from "./EditIndorePatient";

const IndoorPatient = () => {
  const [content, setContent] = useState("create");

  const adminContent = (cont) => {
    setContent(cont);
  };
  return (
    <div>
      <div className="doctorlist">
        <li onClick={() => adminContent("create")}>create</li>
        <li onClick={() => adminContent("all IndoorPatient")}>All Indoor Patient</li>
        <li onClick={() => adminContent("Edit")}>Edit</li>
      </div>
      <br />
      <div className="admin-content">
        {content === "create" && <CreateIndoorPatient/>}
        {content === "all IndoorPatient" && <AllIndoorPatient />}
        {content === "Edit" && <EditIndorePatient />}
      </div>
    </div>
  )
}

export default IndoorPatient