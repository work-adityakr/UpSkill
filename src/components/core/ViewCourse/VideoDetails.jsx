import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import "video-react/dist/video-react.css"
import { BigPlayButton, Player } from "video-react"
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from "../../Common/IconBtn"
import { MdSkipNext, MdSkipPrevious, MdReplay } from "react-icons/md"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([])
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return
      if (!courseId || !sectionId || !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        const filteredData = courseSectionData.filter((course) => course._id === sectionId)
        const filteredVideoData = filteredData?.[0]?.subSection.filter((data) => data._id === subSectionId)
        setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
      }
    }
    setVideoSpecificDetails()
  }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate])

  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)
    return currentSectionIndx === 0 && currentSubSectionIndx === 0
  }

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)
    return currentSectionIndx === courseSectionData.length - 1 && currentSubSectionIndx === noOfSubsections - 1
  }

  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx + 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId = courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx - 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength = courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId = courseSectionData[currentSectionIndx - 1].subSection[prevSubSectionLength - 1]._id
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete({ courseId: courseId, subsectionId: subSectionId }, token)
    if (res) { dispatch(updateCompletedLectures(subSectionId)) }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-6 text-white pb-10">
      <div className="relative group aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        {!videoData ? (
          <img src={previewSource} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <BigPlayButton position="center" />
            
            {/* Custom Video End Overlay */}
            {videoEnded && (
              <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="flex flex-col items-center gap-y-6">
                  {!completedLectures.includes(subSectionId) && (
                    <IconBtn
                      disabled={loading}
                      onclick={() => handleLectureCompletion()}
                      text={!loading ? "Mark As Completed" : "Saving..."}
                      customClasses="text-xl px-8 py-3 rounded-xl shadow-glow-indigo"
                    />
                  )}
                  
                  <div className="flex items-center gap-x-6">
                    {!isFirstVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToPrevVideo}
                        className="flex items-center gap-x-2 text-richblack-100 hover:text-white transition-all font-bold"
                      >
                        <MdSkipPrevious fontSize={28} /> Previous
                      </button>
                    )}

                    <button
                      disabled={loading}
                      onClick={() => {
                        playerRef?.current?.seek(0)
                        setVideoEnded(false)
                        playerRef?.current?.play()
                      }}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                      title="Rewatch"
                    >
                      <MdReplay fontSize={30} />
                    </button>

                    {!isLastVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToNextVideo}
                        className="flex items-center gap-x-2 text-richblack-100 hover:text-white transition-all font-bold"
                      >
                        Next <MdSkipNext fontSize={28} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Player>
        )}
      </div>

      {/* Video Info Section */}
      <div className="mt-2 space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-richblack-5 bg-gradient-to-r from-richblack-5 to-richblack-200 bg-clip-text text-transparent">
          {videoData?.title}
        </h1>
        <p className="text-richblack-300 leading-relaxed max-w-[90%]">
          {videoData?.description}
        </p>
      </div>
    </div>
  )
}

export default VideoDetails