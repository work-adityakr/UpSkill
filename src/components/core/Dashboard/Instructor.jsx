import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) setCourses(result)
      setLoading(false)
    })()
  }, [token])

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)
  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)

  return (
    <div className="flex flex-col gap-y-6 pb-12">
      {/* 🟢 Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-richblack-800 to-transparent p-8">
        <div className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-primary-50/10 blur-3xl"></div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Welcome back, <span className="bg-gradient-to-r from-primary-50 to-blue-200 bg-clip-text text-transparent italic">{user?.firstName}</span> 👋
        </h1>
        <p className="mt-2 font-medium italic text-richblack-300">"The best way to predict the future is to create it."</p>
      </div>

      {loading ? (
        <div className="grid min-h-[400px] place-items-center"><div className="spinner"></div></div>
      ) : courses.length > 0 ? (
        <div className="flex flex-col gap-y-6">
          {/* 📊 Analytics & Stats Section */}
          <div className="flex flex-col gap-6 lg:flex-row">
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 rounded-2xl border border-white/5 bg-richblack-900/40 p-8 backdrop-blur-md">
                <p className="text-xl font-bold text-white">Visualize Analytics</p>
                <p className="mt-10 text-center text-lg font-medium text-richblack-400 italic">Not enough data to generate insights yet.</p>
              </div>
            )}

            {/* Quick Stats Sidebar */}
            <div className="flex min-w-[280px] flex-col gap-y-8 rounded-2xl border border-white/5 bg-richblack-900/40 p-8 backdrop-blur-md shadow-glass-inset">
              <p className="text-xl font-bold text-white tracking-tight">Quick Analytics</p>
              <div className="space-y-7">
                <StatTile label="Total Courses" value={courses.length} />
                <StatTile label="Total Students" value={totalStudents} />
                <div className="rounded-2xl border border-primary-50/20 bg-primary-50/5 p-5">
                  <StatTile label="Estimated Income" value={`₹ ${totalAmount}`} color="text-caribbeangreen-300 shadow-glow-green" />
                </div>
              </div>
            </div>
          </div>

          {/* 🎓 Your Courses Section (Bento Grid) */}
          <div className="rounded-2xl border border-white/5 bg-richblack-900/40 p-8 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <p className="text-2xl font-bold text-white tracking-tight">Recent Courses</p>
              <Link to="/dashboard/my-courses" className="text-sm font-bold text-yellow-50 hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-richblack-800/50 transition-all hover:bg-richblack-800">
                  <div className="aspect-video overflow-hidden">
                    <img src={course.thumbnail} alt={course.courseName} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-5">
                    <p className="text-lg font-bold text-richblack-5 truncate">{course.courseName}</p>
                    <div className="mt-3 flex items-center justify-between border-t border-richblack-700 pt-3">
                      <p className="text-xs font-bold text-richblack-400 uppercase tracking-widest">{course.studentsEnroled.length} Students</p>
                      <p className="text-sm font-extrabold text-primary-50">₹ {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* 📭 Empty State */
        <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-richblack-700 bg-richblack-900/20 py-20 text-center backdrop-blur-sm">
          <p className="text-2xl font-bold text-white">Your digital classroom is empty</p>
          <p className="mt-2 text-richblack-400">Share your expertise and start your instructor journey today.</p>
          <Link to="/dashboard/add-course" className="mt-6 rounded-xl bg-yellow-50 px-8 py-3 font-bold text-richblack-900 shadow-glow-yellow transition-all hover:scale-105">
            Create Your First Course
          </Link>
        </div>
      )}
    </div>
  )
}

// Sub-component for Stats
function StatTile({ label, value, color = "text-white" }) {
  return (
    <div className="group">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-richblack-500 group-hover:text-primary-50 transition-colors">
        {label}
      </p>
      <p className={`text-3xl font-extrabold ${color} tracking-tight`}>{value}</p>
    </div>
  )
}