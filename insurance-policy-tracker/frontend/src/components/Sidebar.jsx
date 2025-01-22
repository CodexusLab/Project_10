import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-blue-800 text-white w-64 min-h-screen p-6">
      <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/dashboard" className="block p-3 hover:bg-blue-600 rounded">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/manage-policies" className="block p-3 hover:bg-blue-600 rounded">Manage Policies</Link>
        </li>
        <li>
          <Link to="/admin/manage-users" className="block p-3 hover:bg-blue-600 rounded">Manage Users</Link>
        </li>
        {/* <li>
          <Link to="/admin/edit-policy" className="block p-3 hover:bg-blue-600 rounded">Edit Policy</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
