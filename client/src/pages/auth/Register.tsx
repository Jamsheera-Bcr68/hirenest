import { useState } from "react";
import { registerSchema } from "../../libraries/validations/user/registerValidations";
import axios from "../../libraries/axios";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });
  type FormErrors = {
    email?: string;
    password?: string;
    phone?: string;
    confirm_password?: string;
    server?: string;
  };

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandle =async (e: any) => {
    e.preventDefault();
    console.log("formData", formData);
    const result = registerSchema.safeParse(formData);
    console.log("result", result);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      console.log("fieldErrors", fieldErrors);

      const formattedErrors: FormErrors = {
        email: fieldErrors?.email?.[0],
        password: fieldErrors.password?.[0],
        confirm_password: fieldErrors.confirm_password?.[0],
        phone: fieldErrors.phone?.[0],
      };
      setErrors(formattedErrors);
      return;
    }
    setErrors({});
    console.log("validation successful");

    try {
      const response =await axios.post("/auth/register", formData);
      console.log("response", response);
      
    } catch (error:any) {
       setErrors({
        server: error.response.data.message || "Something went wrong",
      })
      console.log('errors?.server?.[0]',errors?.server?.[0]);
      
      alert(errors?.server?.[0])
      return
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join us today and get started</p>
           {errors.server && (
              <p className="text-red-500 text-sm mt-1">{errors?.server}</p>
            )}
        </div>

        <div className="space-y-5">
          <button
            type="button"
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              value={formData.email}
              onChange={(e) => handleChange(e)}
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors?.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange(e)}
              id="phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              value={formData.password}
              onChange={(e) => handleChange(e)}
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              value={formData.confirm_password}
              onChange={(e) => handleChange(e)}
              type="password"
              id="confirm-password"
              name="confirm_password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => submitHandle(e)}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-8">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
export default Register;
