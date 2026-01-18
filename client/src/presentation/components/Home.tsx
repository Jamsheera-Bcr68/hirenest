

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white px-6 py-4 shadow">
        <h1 className="text-2xl font-semibold">HireNest</h1>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold mb-4">
            Welcome 🎉
          </h2>
          <p className="text-gray-600">
            You have successfully logged in.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
