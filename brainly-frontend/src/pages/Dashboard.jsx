import useAuth from "../context/UserContext";
const Dashboard = () => {
    let {name}=useAuth()
    

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-6 text-center">
          Welcome to your dashboard <b>{name}</b>. Here you can manage your account and access exclusive features.
        </p>
        {/* Add your dashboard content here */}
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-gray-100 rounded p-4 text-center">
            <span className="block text-lg font-medium text-gray-700">Profile</span>
          </div>
          <div className="flex-1 bg-gray-100 rounded p-4 text-center">
            <span className="block text-lg font-medium text-gray-700">Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;