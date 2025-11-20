import { useEffect, useState } from "react";
import axios from "axios";

interface Department {
  id: number;
  abbreviation: string;
  name: string;
  description: string;
  status: string;
}

export default function Dashboard() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [form, setForm] = useState({ abbreviation: "", name: "", description: "", status: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const fullname = localStorage.getItem("fullname");

  const api = axios.create({
    baseURL: "http://localhost:4000",
    headers: { "Content-Type": "application/json" },
  });

  // Load all users
  const fetchDepartments = async () => {
    const res = await api.get("/departments");
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async () => {
      if (
    !form.abbreviation.trim() ||
    !form.name.trim() ||
    !form.description.trim() ||
    !form.status.trim()
  ) {
    alert("Please fill in all fields before submitting.");
    return;
  }
    if (editingId) {
      await api.put(`/departments/${editingId}`, form);
    } else {
      await api.post("/departments", form);
    }
    setForm({ abbreviation: "", name: "", description: "", status: "" });
    setEditingId(null);
    fetchDepartments();
  };


  const handleEdit = (department: Department) => {
    setForm({
      abbreviation: department.abbreviation,
      name: department.name,
      description: department.description,
      status: department.status,
    });
    setEditingId(department.id);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this department?")) {
      await api.delete(`/departments/${id}`);
      fetchDepartments();
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("fullname");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <h1 className="text-2xl font-bold text-gray-800">Welcome, {fullname}</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
      >
        Logout
      </button>
    </div>

    <hr className="border-gray-200 my-6" />

    {/* Department Form */}
    <div className="bg-white rounded-xl shadow-md p-6 mb-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {editingId ? "Edit Department" : "Add New Department"}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Abbreviation <span className="text-red-500">*</span>
          </label>
          <input
            name="abbreviation"
            type="text"
            placeholder="e.g. HR, FIN"
            value={form.abbreviation}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Full department name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            name="description"
            type="text"
            placeholder="Brief description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status <span className="text-red-500">*</span>
          </label>
          <input
            name="status"
            type="text"
            placeholder="e.g. Active, Inactive"
            value={form.status}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className={`px-5 py-2 font-medium text-white rounded-lg ${
              editingId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-600 hover:bg-green-700"
            } transition`}
          >
            {editingId ? "Update Department" : "Add Department"}
          </button>
        </div>
      </form>
    </div>

    {/* Department List */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Department List</h2>
      </div>
      <div className="overflow-x-auto">
        {departments.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Abbreviation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{u.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.abbreviation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{u.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{u.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      u.status.toLowerCase() === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-12 text-center text-gray-500">
            No departments found.
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  );
}












// export default function Dashboard(){
//     const fullname = localStorage.getItem("fullname");

//     return(
//         <div>
//             <h1>Welcome, {fullname}</h1>
//             <button
//                 onClick={() => {
//                     localStorage.removeItem("fullname")
//                     window.location.href = "/";
//                }}
//             >
//                 logout
//             </button>
//         </div>
//     );
// }