
const Experience=()=>{
    return(
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Work Experience
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Add Experience
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
                  <li>
                    Led development of e-commerce platform serving 100K+ users
                  </li>
                  <li>
                    Improved application performance by 40% through optimization
                  </li>
                  <li>Mentored team of 5 junior developers</li>
                </ul>
              </div>

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
                  <li>
                    Built responsive web applications using React and Node.js
                  </li>
                  <li>
                    Implemented RESTful APIs and microservices architecture
                  </li>
                  <li>
                    Collaborated with cross-functional teams in Agile
                    environment
                  </li>
                </ul>
              </div>
            </div>
          </div>
    )
}
export default Experience