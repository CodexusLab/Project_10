import { useState } from "react";
import CreateNurse from "./CreateNurse";
import AllNurse from "./AllNurse";
import EditNurse from "./EditNurse";

const AdminNurses = () => {
  const [content, setContent] = useState("create");

  const adminContent = (cont) => {
    setContent(cont);
  };
  return (
    <div>
      <div className="doctorlist">
        <li onClick={() => adminContent("create")}>create</li>
        <li onClick={() => adminContent("all Nurses")}>all Nurses</li>
        <li onClick={() => adminContent("Edit")}>Edit</li>
      </div>
      <br />
      <div className="admin-content">
        {content === "create" && <CreateNurse />}
        {content === "all Nurses" && <AllNurse />}
        {content === "Edit" && <EditNurse />}
      </div>
    </div>
  );
};

export default AdminNurses;
