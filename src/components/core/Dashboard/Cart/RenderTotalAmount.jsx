import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI"
import IconBtn from "../../../Common/IconBtn"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    BuyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-2xl border border-richblack-800 bg-richblack-800/60 p-6 backdrop-blur-md">
      <p className="mb-1 text-sm font-bold text-richblack-400 uppercase tracking-widest">Total Amount:</p>
      <p className="mb-6 text-4xl font-extrabold text-primary-50 shadow-glow-indigo">₹ {total}</p>

      <IconBtn
        text="Checkout Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center py-4 text-lg font-bold rounded-xl shadow-glow-indigo"
      />

      <p className="mt-4 text-center text-xs text-richblack-400">
        🔒 Secure Payment Gateway
      </p>
    </div>
  )
}
