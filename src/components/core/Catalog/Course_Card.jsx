import { useEffect, useState } from "react"
// Icons
import { Link } from "react-router-dom"

import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../Common/RatingStars"

function Course_Card({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="group relative rounded-3xl border border-white/5 bg-richblack-900/20 p-4 backdrop-blur-xl transition-all duration-500 hover:bg-richblack-800/40 hover:border-white/10 hover:-translate-y-2">

          {/* 🖼️ Thumbnail with Inner Glow */}
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          {/* 📝 Course Details */}
          <div className="mt-6 space-y-3 px-2">
            <p className="text-xl font-bold tracking-tight text-white line-clamp-1">
              {course?.courseName}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-yellow-50 font-bold">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-500 text-sm">({course?.ratingAndReviews?.length} Ratings)</span>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <p className="text-2xl font-extrabold text-white">₹ {course?.price}</p>
              <div className="rounded-full bg-primary-50/10 px-3 py-1 border border-primary-50/20">
                <p className="text-[10px] font-bold text-primary-50 uppercase tracking-widest">Enroll Now</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card
