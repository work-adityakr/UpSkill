import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../Common/Tab"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const [account, setAccount] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = { ...formData, accountType }
    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formData.email, navigate))

    setFormData({
      firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  const tabData = [
    { id: 1, tabName: "Student", type: ACCOUNT_TYPE.STUDENT },
    { id: 2, tabName: "Instructor", type: ACCOUNT_TYPE.INSTRUCTOR },
  ]

  // Shared input style for a unique look
  const inputStyle = "w-full rounded-xl bg-background-card p-3 text-neutral-50 outline-none border border-richblack-700 focus:ring-2 focus:ring-yellow-100 focus:border-transparent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"

  return (
    <div className="w-full max-w-[500px]">
      {/* Refined Tab Component */}
      <div className="mb-6">
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      </div>

      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-5">
        <div className="flex gap-x-4 ">
          <label className="flex-1">
            <p className="mb-1 text-[0.875rem] text-neutral-50 font-medium">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="John"
              className={inputStyle}
            />
          </label>
          <label className="flex-1">
            <p className="mb-1 text-[0.875rem] text-neutral-50 font-medium">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Doe"
              className={inputStyle}
            />
          </label>
        </div>

        <label className="w-full">
          <p className="mb-1 text-[0.875rem] text-neutral-50 font-medium">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="name@example.com"
            className={inputStyle}
          />
        </label>

        <div className="flex gap-x-4">
          <label className="relative flex-1">
            <p className="mb-1 text-[0.875rem] text-neutral-50 font-medium">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="••••••••"
              className={`${inputStyle} !pr-10`}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer text-neutral-200 hover:text-neutral-50"
            >
              {showPassword ? <AiOutlineEyeInvisible fontSize={22} /> : <AiOutlineEye fontSize={22} />}
            </span>
          </label>
          <label className="relative flex-1">
            <p className="mb-1 text-[0.875rem] text-neutral-50 font-medium">
              Confirm <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="••••••••"
              className={`${inputStyle} !pr-10`}
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer text-neutral-200 hover:text-neutral-50"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={22} /> : <AiOutlineEye fontSize={22} />}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-200 py-3 px-4 font-bold text-neutral-900 shadow-[0_0_20px_rgba(255,214,10,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Create UpSkill Account
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-8 gap-x-3">
        <div className="h-[1px] w-full bg-background-card"></div>
        <p className="text-neutral-5000 font-medium text-xs">OR CONTINUE WITH</p>
        <div className="h-[1px] w-full bg-background-card"></div>
      </div>

      <div className="w-full">
        {!account ? (
          <button
            onClick={() => setAccount(true)}
            className="flex w-full items-center justify-center gap-x-2 rounded-xl border border-richblack-700 bg-white/5 px-3 py-3 text-neutral-50 font-medium transition-all duration-200 hover:bg-white/10 hover:border-richblack-600 active:scale-95"
          >
            <FcGoogle className="text-xl" />
            <span>Google Signup</span>
          </button>
        ) : (
          <div className="flex w-full flex-col gap-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex gap-x-3">
              <button
                onClick={() => window.open("http://localhost:4000/auth/google?type=Student", "_self")}
                className="flex-1 rounded-xl bg-background-card py-3 font-semibold text-white border border-richblack-600 hover:bg-background-700 transition-all active:scale-95"
              >
                Student
              </button>
              <button
                onClick={() => window.open("http://localhost:4000/auth/google?type=Instructor", "_self")}
                className="flex-1 rounded-xl bg-richblue-500 py-3 font-semibold text-white border border-richblue-400 hover:bg-richblue-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
              >
                Instructor
              </button>
            </div>
            <button 
              onClick={() => setAccount(false)}
              className="text-xs text-neutral-5000 hover:text-neutral-200 uppercase tracking-widest font-bold text-center"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignupForm