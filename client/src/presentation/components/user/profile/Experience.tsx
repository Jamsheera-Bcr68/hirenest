const Experience = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Work Experience</h3>
<<<<<<< Updated upstream
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Add Experience
=======
        <button
          onClick={() => setIsExpOpen(true)}
          className="cursor-pointer px-4 py-1 rounded-md inline-block  bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium shadow"
        >
          Add
>>>>>>> Stashed changes
        </button>
      </div>
      <div className="space-y-6">
        {/* Experience 1 */}
        <div className="border-l-4 border-blue-600 pl-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Senior Full Stack Developer
              </h4>
              <p className="text-gray-600">Tech Solutions Pvt Ltd</p>
              <p className="text-gray-500 text-sm">Chennai, India</p>
            </div>
            <span className="text-gray-500 text-sm">2021 - Present</span>
          </div>
          <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc list-inside">
            <li>Led development of e-commerce platform serving 100K+ users</li>
            <li>
              Improved application performance by 40% through optimization
            </li>
            <li>Mentored team of 5 junior developers</li>
          </ul>
        </div>

<<<<<<< Updated upstream
        {/* Experience 2 */}
        <div className="border-l-4 border-gray-300 pl-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Full Stack Developer
              </h4>
              <p className="text-gray-600">Digital Innovations Ltd</p>
              <p className="text-gray-500 text-sm">Bangalore, India</p>
            </div>
            <span className="text-gray-500 text-sm">2019 - 2021</span>
          </div>
          <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc list-inside">
            <li>Built responsive web applications using React and Node.js</li>
            <li>Implemented RESTful APIs and microservices architecture</li>
            <li>
              Collaborated with cross-functional teams in Agile environment
            </li>
          </ul>
        </div>
=======
                      <p className="text-gray-600">{ex.company}</p>

                      {/* Description */}
                      <p className=" text-gray-700 text-sm whitespace-pre-line break-words">
                        {ex.description}
                      </p>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col items-end ml-4">
                      <div className="flex">
                        <button
                          onClick={() => {
                            setExp(ex);
                            setIsExpOpen(true);
                            console.log('selected ex', selectedExp);
                          }}
                          className="px-2 py-2 rounded-full mt-2  text-blue-600 hover:bg-blue-200 text-sm font-medium transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 3.487a2.1 2.1 0 113.03 2.9L7.5 18.78l-4 1 1-4L16.862 3.487z"
                            />
                          </svg>
                        </button>
                        <button className="px-2 py-2 rounded-full mt-2 text-red-700   hover:bg-red-200 text-sm font-medium transition">
                          <Trash
                            size={18}
                            onClick={() => {
                              setDeleteId(ex.id ? ex.id : '');
                              setIsDeleteModalOpen(true);
                            }}
                            //className="mt-2 ml-3 text-red-600  hover:text-red-700 text-sm font-medium transition"
                          />
                        </button>
                      </div>

                      <span className="text-gray-500 text-sm">
                        {new Date(ex.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                        {' - '}
                        {ex.endDate
                          ? new Date(ex.endDate).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            })
                          : 'Present'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm italic">
            Showcase your experience here
          </p>
        )}
>>>>>>> Stashed changes
      </div>
    </div>
  );
};
export default Experience;
