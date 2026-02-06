const AboutMe = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">About Me</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Edit
        </button>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Passionate Full Stack Developer with 5+ years of experience in building
        scalable web applications. Expertise in React, Node.js, and cloud
        technologies. Looking for opportunities to work on challenging projects
        that make a real impact. Strong problem-solving skills and a team player
        who thrives in collaborative environments.
      </p>
    </div>
  );
};

export default AboutMe;
