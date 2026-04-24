import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import IconBtn from "../../Common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex(
        (data) => data._id === subSectionId
      )
      const activeSubSectionId = courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId])

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-richblack-800 bg-richblack-900/50 backdrop-blur-xl">
        
        {/* Top Header Section */}
        <div className="mx-5 flex flex-col items-start justify-between gap-y-4 border-b border-richblack-700 py-6">
          <div className="flex w-full items-center justify-between">
            <div
              onClick={() => navigate(`/dashboard/enrolled-courses`)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-richblack-800 text-richblack-100 hover:bg-primary-50 hover:text-white transition-all cursor-pointer shadow-lg"
              title="Back to Courses"
            >
              <IoIosArrowBack size={24} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold text-richblack-5 tracking-tight line-clamp-1">
              {courseEntireData?.courseName}
            </p>
            <div className="flex items-center gap-2">
                <div className="h-1.5 w-24 rounded-full bg-richblack-700">
                    <div 
                        className="h-full rounded-full bg-caribbeangreen-300 shadow-[0_0_8px_#06D6A0]" 
                        style={{width: `${(completedLectures?.length / totalNoOfLectures) * 100}%`}}
                    ></div>
                </div>
                <p className="text-xs font-bold text-caribbeangreen-300">
                {completedLectures?.length} / {totalNoOfLectures}
                </p>
            </div>
          </div>
        </div>

        {/* Sections and Lectures Scrollable Area */}
        <div className="h-[calc(100vh-5rem)] overflow-y-auto custom-scrollbar">
          {courseSectionData.map((section, index) => (
            <div
              className="mt-2 text-sm"
              key={index}
            >
              {/* Section Header */}
              <div 
                className="flex flex-row justify-between bg-richblack-800/40 px-5 py-4 cursor-pointer hover:bg-richblack-800 transition-colors"
                onClick={() => setActiveStatus(activeStatus === section._id ? "" : section._id)}
              >
                <div className="w-[70%] font-bold text-richblack-5">
                  {section?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      activeStatus === section?._id ? "rotate-0" : "rotate-180"
                    } transition-all duration-300 text-richblack-400`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Lectures (Sub Sections) */}
              {activeStatus === section?._id && (
                <div className="bg-richblack-900/20 py-1">
                  {section.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3 px-5 py-3 transition-all duration-200 cursor-pointer border-l-2 ${
                        videoBarActive === topic._id
                          ? "bg-primary-50/10 border-primary-50 text-primary-50 font-bold"
                          : "border-transparent text-richblack-200 hover:bg-richblack-800 hover:text-richblack-5"
                      }`}
                      key={i}
                      onClick={() => {
                        navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                        className="accent-caribbeangreen-300 h-4 w-4 cursor-pointer rounded"
                      />
                      <span className="truncate">{topic.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}