import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../Common/IconBtn"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [course?.status, setValue])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

  const onSubmit = () => {
    handleCoursePublish()
  }

  return (
    <div className="rounded-3xl border border-white/5 bg-richblack-900/40 p-8 md:p-10 backdrop-blur-xl shadow-glass-inset mt-10 relative overflow-hidden">
      
      {/* 🌌 Background Ambient Accents */}
      <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary-50/10 blur-[80px] rounded-full"></div>

      <div className="flex flex-col gap-2 mb-10">
        <h2 className="text-3xl font-extrabold tracking-tighter text-white">
          Publish <span className="bg-gradient-to-r from-primary-50 to-blue-200 bg-clip-text text-transparent">Settings</span>
        </h2>
        <p className="text-richblack-400 font-medium italic">Finalize your course and make it live for the world.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 🔘 Interactive Glass Checkbox Tile */}
        <div className="group mb-12">
          <label 
            htmlFor="public" 
            className="relative flex cursor-pointer items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-6 transition-all duration-300 hover:bg-white/10 hover:border-primary-50/20"
          >
            <div className="flex h-6 items-center">
              <input
                type="checkbox"
                id="public"
                {...register("public")}
                className="h-5 w-5 cursor-pointer rounded-md border-richblack-500 bg-richblack-800 text-primary-50 focus:ring-primary-50 transition-all accent-primary-50"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white group-hover:text-primary-50 transition-colors">
                Make this course public
              </span>
              <p className="text-sm font-medium text-richblack-400 mt-1 leading-relaxed">
                Once published, this course will appear in the store and be accessible to all registered students.
              </p>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center border-t border-white/5 pt-8">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-xl bg-richblack-800 py-3 px-8 font-bold text-richblack-100 border border-white/5 hover:bg-richblack-700 transition-all active:scale-95 disabled:opacity-50"
          >
            Back
          </button>
          
          <div className="flex gap-x-4">
             <IconBtn 
                disabled={loading} 
                text="Save & Publish" 
                customClasses="shadow-glow-indigo hover:scale-[1.02] active:scale-95 transition-all"
             />
          </div>
        </div>
      </form>
    </div>
  )
}