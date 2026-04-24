import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ Review_Count, Star_Size }) {
  const [starCount, SetStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  })

  useEffect(() => {
    const wholeStars = Math.floor(Review_Count) || 0
    SetStarCount({
      full: wholeStars,
      half: Number.isInteger(Review_Count) ? 0 : 1,
      // Fixed the empty star logic to ensure it always totals 5
      empty: 5 - wholeStars - (Number.isInteger(Review_Count) ? 0 : 1),
    })
  }, [Review_Count])

  return (
    <div className="flex gap-1">
      {/* Full Stars with Glow */}
      {[...new Array(starCount.full)].map((_, i) => (
        <TiStarFullOutline 
          key={`full-${i}`} 
          size={Star_Size || 20} 
          className="text-yellow-50 drop-shadow-[0_0_8px_rgba(255,214,10,0.4)] transition-all hover:scale-110"
        />
      ))}

      {/* Half Stars */}
      {[...new Array(starCount.half)].map((_, i) => (
        <TiStarHalfOutline 
          key={`half-${i}`} 
          size={Star_Size || 20} 
          className="text-yellow-50 drop-shadow-[0_0_8px_rgba(255,214,10,0.4)]"
        />
      ))}

      {/* Empty Stars - Muted for Contrast */}
      {[...new Array(starCount.empty)].map((_, i) => (
        <TiStarOutline 
          key={`empty-${i}`} 
          size={Star_Size || 20} 
          className="text-richblack-600"
        />
      ))}
    </div>
  )
}

export default RatingStars