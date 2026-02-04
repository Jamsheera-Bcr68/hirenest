import { useEditBasicData } from "../../../hooks/user/candidate/profile/useEditBascData";
import ChangePasswordModal from "../../../modals/ChangePasswordModal";

const BasicDataPart = () => {
  const { handleChangePassword, open, setOpen } = useEditBasicData();
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-4xl font-bold text-gray-600">
            RK
          </div>
          <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
            Change Photo
          </button>
        </div>

        {/* Basic Info */}
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Rajesh Kumar</h2>
          <p className="text-gray-600 mt-1">Full Stack Developer</p>
          <p className="text-gray-500 text-sm mt-2">
            Chennai, Tamil Nadu, India
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-gray-600 text-sm">Applications</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-600">3</p>
            <p className="text-gray-600 text-sm">Interviews</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-700 text-sm">rajesh.k@email.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-gray-700 text-sm">+91 98765 43210</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span className="text-gray-700 text-sm">
              linkedin.com/in/rajeshk
            </span>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button className="w-full mt-6 bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Edit Profile
        </button>
        <button
          onClick={handleChangePassword}
          className="w-full mt-6 bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Change Password
        </button>
      </div>
      <ChangePasswordModal open={open} onClose={() => {
        console.log('set open closed');
        
        setOpen(false)}}/>
       
    
    </div>
  );
};
export default BasicDataPart;
