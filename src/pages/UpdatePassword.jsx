import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { resetPassword } from "../services/operations/authAPI"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden bg-[#020205]">

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] bg-primary-50/10 blur-[120px] -z-10"></div>
          <div className="absolute top-[20%] right-[10%] h-[200px] w-[200px] bg-blue-200/5 blur-[80px] -z-10"></div>

          <div className="w-full max-w-[450px] p-8 md:p-12 rounded-[32px] border border-white/5 bg-richblack-900/40 backdrop-blur-xl shadow-glass-inset">
            <div className="flex flex-col gap-2 mb-8">
              <h1 className="text-3xl font-extrabold tracking-tighter text-white">
                Choose <span className="bg-gradient-to-r from-primary-50 to-blue-200 bg-clip-text text-transparent">new password</span>
              </h1>
              <p className="text-richblack-400 font-medium leading-relaxed italic">
                Almost done. Enter your new password and you're all set.
              </p>
            </div>

            <form onSubmit={handleOnSubmit} className="flex flex-col gap-6">
              {/* New Password Field */}
              <label className="relative flex flex-col gap-2">
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-richblack-500 ml-1">
                  New Password <span className="text-pink-200">*</span>
                </p>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className="w-full rounded-xl bg-richblack-800/50 p-4 pr-12 text-richblack-5 border border-white/5 focus:border-primary-50 focus:ring-1 focus:ring-primary-50 outline-none transition-all"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-richblack-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
                  </span>
                </div>
              </label>

              {/* Confirm Password Field */}
              <label className="relative flex flex-col gap-2">
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-richblack-500 ml-1">
                  Confirm New Password <span className="text-pink-200">*</span>
                </p>
                <div className="relative">
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm Password"
                    className="w-full rounded-xl bg-richblack-800/50 p-4 pr-12 text-richblack-5 border border-white/5 focus:border-primary-50 focus:ring-1 focus:ring-primary-50 outline-none transition-all"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-richblack-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
                  </span>
                </div>
              </label>

              <button
                type="submit"
                className="mt-4 rounded-xl bg-yellow-50 py-4 px-6 text-center text-sm font-bold text-richblack-900 shadow-glow-indigo transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                Reset Password
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center">
              <Link to="/login" className="flex items-center gap-2 text-richblack-200 hover:text-white transition-all group">
                <BiArrowBack className="group-hover:-translate-x-1 transition-transform" />
                <p className="text-sm font-semibold tracking-wide">Back to Login</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword
