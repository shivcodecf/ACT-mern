import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${apiUrl}/api/auth/logout`,
        {},
        { withCredentials: true },
      );

      navigate("/login");

      localStorage.removeItem("user"); // ✅ correct
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const stats = [
    { title: "Leads", count: 24 },
    { title: "Tasks", count: 12 },
    { title: "Users", count: 5 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-5 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">Phonix</h2>
        <ul className="space-y-4">
          <li className="hover:text-gray-300 cursor-pointer">Dashboard</li>
          <li className="hover:text-gray-300 cursor-pointer">Leads</li>
          <li className="hover:text-gray-300 cursor-pointer">Tasks</li>
          <li className="hover:text-gray-300 cursor-pointer">Users</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user ? user.name : "User"}</span>
            <button
              onClick={handleLogout}
              className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-gray-500">{item.title}</h3>
                <p className="text-2xl font-bold mt-2">{item.count}</p>
              </div>
            ))}
          </div>

          {/* DUMMY LIST */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

            <ul className="space-y-3">
              <li className="border-b pb-2">New lead added</li>
              <li className="border-b pb-2">Task completed</li>
              <li className="border-b pb-2">New user registered</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
