import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [account, setAccount] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div className="w-full max-w-[450px]">
      <form onSubmit={handleOnSubmit} className="mt-6 flex w-full flex-col gap-y-5">
        
        {/* Email Field */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-neutral-50 font-medium">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded-xl bg-background-card p-3 text-neutral-50 outline-none border border-richblack-700 focus:ring-2 focus:ring-yellow-100 focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
          />
        </label>

        {/* Password Field */}
        <label className="relative">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-neutral-50 font-medium">
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            className="w-full rounded-xl bg-background-card p-3 text-neutral-50 outline-none border border-richblack-700 focus:ring-2 focus:ring-yellow-100 focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] !pr-12"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer p-1 rounded-lg hover:bg-background-700 transition-colors"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          <Link to="/forgot-password">
            <p className="mt-2 ml-auto max-w-max text-xs text-blue-100 hover:text-blue-50 transition-colors underline decoration-blue-100/30">
              Forgot Password?
            </p>
          </Link>
        </label>

        {/* Primary Sign In Button */}
        <button
          type="submit"
          className="mt-4 rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-200 py-3 px-4 font-bold text-neutral-900 shadow-[0_0_20px_rgba(255,214,10,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Sign In to UpSkill
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6 gap-x-3">
        <div className="h-[1px] w-full bg-background-700"></div>
        <p className="text-neutral-5000 font-medium text-sm">OR</p>
        <div className="h-[1px] w-full bg-background-700"></div>
      </div>

      {/* Google Login Section */}
      <div className="w-full">
        {!account ? (
          <button
            onClick={() => setAccount(true)}
            className="flex w-full items-center justify-center gap-x-2 rounded-xl border border-richblack-700 bg-white/5 px-3 py-3 text-neutral-50 font-medium transition-all duration-200 hover:bg-white/10 hover:border-richblack-600 active:scale-95 backdrop-blur-sm"
          >
            <FcGoogle className="text-xl" />
            <span>Continue with Google</span>
          </button>
        ) : (
          <div className="flex w-full flex-col gap-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex gap-x-3">
              <button
                onClick={() => window.open("http://localhost:4000/auth/google?type=Student", "_self")}
                className="flex-1 rounded-xl bg-background-700 py-3 font-semibold text-white border border-richblack-600 hover:bg-background-600 transition-all active:scale-95"
              >
                As Student
              </button>
              <button
                onClick={() => window.open("http://localhost:4000/auth/google?type=Instructor", "_self")}
                className="flex-1 rounded-xl bg-richblue-500 py-3 font-semibold text-white border border-richblue-400 hover:bg-richblue-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              >
                As Instructor
              </button>
            </div>
            <button 
              onClick={() => setAccount(false)}
              className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors uppercase tracking-widest font-bold"
            >
              Cancel Selection
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginForm;