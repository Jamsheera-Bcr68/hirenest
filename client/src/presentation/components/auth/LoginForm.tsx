import { useLogin } from "../../hooks/auth/useLogin";
import type {ILoginFormProps} from '../../../constants/interfaces/auth'
import type {LoginRole} from '../../../constants/types/user'

const LoginForm = ({role}:ILoginFormProps) => {
    const {handleChange,errors, formData,submitHandle} =useLogin(role)
  return (
  
    <>
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
         Login to your account
        </h1>
       

        {errors.server && (
          <p className="text-red-500 text-sm mt-1">{errors.server}</p>
        )}
        {/* {succesMsg && (
          <p className="text-green-500 text-sm mt-1">{succesMsg}</p>
        )} */}
      </div>

      <div className="space-y-4">
        <button
          type="button"
          className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Login with Google</span>
        </button>

        {/* Email */}
        <input
          value={formData.email}
         onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}

       

        {/* Password */}
        <input
            value={formData.password}
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}

    
       
    

        {/* Submit */}
        <button
          onClick={submitHandle}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
        >
         Login
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{" "}
        <a
          href="/register"
          className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
        >
         Create
        </a>
      </p>
    </>
  );
}

export default LoginForm
