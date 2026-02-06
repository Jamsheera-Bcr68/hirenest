const Education = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Education</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Add Education
        </button>
      </div>
      <div className="space-y-4">
        <div className="border-l-4 border-green-600 pl-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                B.Tech in Computer Science
              </h4>
              <p className="text-gray-600">Anna University</p>
              <p className="text-gray-500 text-sm">Chennai, India</p>
            </div>
            <span className="text-gray-500 text-sm">2015 - 2019</span>
          </div>
          <p className="mt-1 text-gray-700 text-sm">CGPA: 8.5/10</p>
        </div>
      </div>
    </div>
  );
};
export default Education;
