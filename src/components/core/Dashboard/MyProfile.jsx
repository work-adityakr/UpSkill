import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../Common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div className="relative flex flex-col gap-y-10 pb-20">
      
      {/* 🌌 Background Ambient Glows (The "Pro" Look) */}
      <div className="absolute -top-20 -left-20 -z-10 h-[300px] w-[300px] rounded-full bg-primary-50/10 blur-[120px]"></div>
      <div className="absolute top-[40%] -right-20 -z-10 h-[250px] w-[250px] rounded-full bg-blue-200/5 blur-[100px]"></div>

      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-tighter text-white">
          My <span className="bg-gradient-to-r from-primary-50 to-blue-200 bg-clip-text text-transparent">Profile</span>
        </h1>
      </div>

      {/* 🪪 Card 1: The Identity Header */}
      <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-richblack-900/40 p-8 md:px-12 backdrop-blur-xl transition-all duration-500 hover:border-primary-50/20 hover:bg-richblack-800/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-50 to-blue-200 opacity-25 blur-md group-hover:opacity-60 transition duration-500"></div>
              <img
                src={user?.image}
                alt="profile"
                className="relative aspect-square w-[90px] rounded-full border-2 border-richblack-700 object-cover shadow-2xl"
              />
            </div>
            <div className="text-center md:text-left space-y-1">
              <p className="text-2xl font-bold tracking-tight text-white capitalize">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-richblack-400 font-medium">{user?.email}</p>
            </div>
          </div>
          <IconBtn
            text="Edit Profile"
            onclick={() => navigate("/dashboard/settings")}
            customClasses="rounded-2xl bg-primary-50 px-6 py-3 font-bold shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-105 transition-all"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      {/* 📊 Section 2: Bento Grid (About & Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Bio Card (Spans 1 Column) */}
        <div className="lg:col-span-1 flex flex-col gap-y-6 rounded-3xl border border-white/20 bg-richblack-900/20 p-8 backdrop-blur-md transition-all hover:border-white/10 hover:bg-richblack-800/40">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Bio</h2>
            <button onClick={() => navigate("/dashboard/settings")} className="text-richblack-400 hover:text-primary-50 transition-colors">
              <RiEditBoxLine size={20} />
            </button>
          </div>
          <p className={`text-sm leading-relaxed ${user?.additionalDetails?.about ? "text-richblack-100" : "italic text-richblack-500"}`}>
            {user?.additionalDetails?.about ?? "Tell the world your coding story..."}
          </p>
        </div>

        {/* Details Card (Spans 2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-y-8rounded-3xl border border-white/20 bg-richblack-900/20 p-8 backdrop-blur-md transition-all hover:border-white/10 hover:bg-richblack-800/40">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Personal Intelligence</h2>
            <button onClick={() => navigate("/dashboard/settings")} className="text-richblack-400 hover:text-primary-50 transition-colors">
              <RiEditBoxLine size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            <DetailField label="First Name" value={user?.firstName} />
            <DetailField label="Last Name" value={user?.lastName} />
            <DetailField label="Email Address" value={user?.email} />
            <DetailField label="Phone" value={user?.additionalDetails?.contactNumber ?? "N/A"} />
            <DetailField label="Gender" value={user?.additionalDetails?.gender ?? "Unset"} />
            <DetailField label="Birthday" value={formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add date"} />
          </div>
        </div>
      </div>
    </div>
  )
}

// 💎 Reusable Field Component for consistent spacing
function DetailField({ label, value }) {
  return (
    <div className="group space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-richblack-500 group-hover:text-primary-50 transition-colors">
        {label}
      </p>
      <p className="text-sm font-semibold text-richblack-5">
        {value}
      </p>
    </div>
  )
}