import { useOtp } from "../../hooks/auth/useOtp";

const Otp: React.FC = () => {
  const { otp, handleChange, otprefs, submitOtp,error,handleKeyDown } = useOtp();
//  console.log("refs from page ", otprefs.current[0]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* <form  onSubmit={submitOtp}> */}
      <form
        onSubmit={submitOtp}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Verify OTP
        </h1>
        {!error&&(<p className="text-sm text-gray-500 text-center mt-2">
          Enter the 6-digit code sent to your email
        </p>)}
        {error&&(<p className="text-sm text-red-500 text-center mt-2">
          {error}
        </p>)}

        {/* OTP Inputs */}
        <div className="flex justify-between mt-6">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <input
              ref={(el) => {
                otprefs.current[index] = el;
              }}
              key={index}
              type="text"
              data-index={index}
              maxLength={1}
              value={otp[index] ?? ""}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Verify OTP
        </button>

        {/* Resend */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Didn’t receive the code?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </form>
      {/* </form> */}
    </div>
  );
};

export default Otp;
