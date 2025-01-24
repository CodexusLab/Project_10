import { useState } from "react"
import CreateDoctor from "./CreateDoctor"
import AllDoctors from "./AllDoctors"
import EditDoctors from "./EditDoctors"

const AdminDoctor = () => {
    const [content,setContent] = useState("create")

    const adminContent = (cont) => {
        setContent(cont)
    }
  return (
    <div>
        <div className="doctorlist">
            <li onClick={() => adminContent("create")}>create</li>
            <li onClick={() => adminContent("all Doctors")}>all Doctors</li>
            <li onClick={() => adminContent("Edit")}>Edit</li>
        </div>
        <br />
        <div className="admin-content">
        {
            content === "create" && (<CreateDoctor/>)
        }
         {
            content === "all Doctors" && (<AllDoctors/>)
        }
         {
            content === "Edit" && (<EditDoctors/>)
        }
        </div>
    </div>
  )
}

export default AdminDoctor