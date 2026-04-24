import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserEnrolledCourses(token)
        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    })()
  }, [token])

  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-4xl font-bold text-richblack-5 tracking-tight">
        My Learning <span className="text-primary-50">Journey</span>
      </h1>

      {!enrolledCourses ? (
        <div className="grid min-h-[400px] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <div className="flex flex-col items-center justify-center h-[40vh] rounded-2xl border border-dashed border-richblack-700 bg-richblack-800/50">
          <p className="text-richblack-300 text-lg">You haven't embarked on a course yet.</p>
          <button 
            onClick={() => navigate("/catalog")}
            className="mt-4 text-primary-50 font-semibold underline underline-offset-4 hover:text-white transition-all"
          >
            Browse Catalog
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="hidden md:flex items-center rounded-xl bg-richblack-800 border border-richblack-700 px-6 py-3 text-sm font-bold uppercase tracking-widest text-richblack-400">
            <p className="w-[45%]">Course Details</p>
            <p className="w-1/4">Duration</p>
            <p className="flex-1">Progress</p>
          </div>

          {enrolledCourses.map((course, i) => (
            <div
              key={i}
              className="group flex flex-col md:flex-row items-center rounded-2xl border border-richblack-500 bg-richblack-900/40 p-4 transition-all duration-300 hover:border-primary-50/50 hover:bg-richblack-800 hover:shadow-[0_0_30px_rgba(99,102,241,0.05)]"
            >
              <div
                className="flex w-full md:w-[45%] cursor-pointer items-center gap-4 px-2"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <div className="relative h-16 w-16 flex-shrink-0">
                    <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-full w-full rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="flex flex-col gap-1 overflow-hidden">
                  <p className="font-bold text-richblack-5 text-lg truncate group-hover:text-primary-50 transition-colors">
                    {course.courseName}
                  </p>
                  <p className="text-xs text-richblack-400 line-clamp-1">
                    {course.courseDescription}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/4 mt-4 md:mt-0 px-2">
                <span className="md:hidden text-xs text-richblack-500 block uppercase font-bold">Duration: </span>
                <p className="text-richblack-100 font-medium">{course?.totalDuration || "0h 0m"}</p>
              </div>

              <div className="flex w-full md:flex-1 flex-col gap-2 mt-4 md:mt-0 px-2">
                <div className="flex justify-between items-end">
                    <p className="text-xs font-bold text-richblack-400 uppercase tracking-tighter">Completion</p>
                    <p className="text-sm font-bold text-primary-50">{course.progressPercentage || 0}%</p>
                </div>
                
                <div className="h-2 w-full rounded-full bg-richblack-700 relative overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-primary-50 to-[#A5B4FC] shadow-[0_0_12px_rgba(99,102,241,0.4)] transition-all duration-700 ease-smooth"
                        style={{ width: `${course.progressPercentage || 0}%` }}
                    />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}