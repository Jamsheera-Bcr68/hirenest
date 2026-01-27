import BasicDataPart from "./BasicdataPart";
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import Experience from "./Experience";
import Education from "./Education";


const ProfilePart = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Profile Card */}
        <BasicDataPart/>

        {/* Right Side - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Me */}
         {/* <AboutMe/> */}

          {/* Skills */}
          {/* <Skills/> */}

          {/* Experience */}
          {/* <Experience/> */}

          {/* Education */}
         {/* <Education/> */}

          {/* Certifications
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Certifications
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Add Certificate
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 rounded-lg p-2">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    AWS Certified Solutions Architect
                  </h4>
                  <p className="text-gray-600 text-sm">Amazon Web Services</p>
                  <p className="text-gray-500 text-sm">
                    Issued: Jan 2023 • Expires: Jan 2026
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 rounded-lg p-2">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    Meta React Developer Professional
                  </h4>
                  <p className="text-gray-600 text-sm">Meta (Facebook)</p>
                  <p className="text-gray-500 text-sm">Issued: Sep 2022</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          {/* <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Resume/CV</h3>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-gray-700 mb-2">Rajesh_Kumar_Resume.pdf</p>
              <p className="text-gray-500 text-sm mb-4">
                Uploaded on: Dec 15, 2024
              </p>
              <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                Update Resume
              </button>
            </div>
          </div> */} 
        </div>
      </div>
    </div>
  );
};
export default ProfilePart;
