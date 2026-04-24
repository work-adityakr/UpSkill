// import * as Icons from "react-icons/vsc"
// import { useDispatch } from "react-redux"
// import { NavLink, matchPath, useLocation } from "react-router-dom"

// import { resetCourseState } from "../../../slices/courseSlice"

// export default function SidebarLink({ link, iconName }) {
//   const Icon = Icons[iconName]
//   const location = useLocation()
//   const dispatch = useDispatch()

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname)
//   }

//   return (
//     <NavLink
//       to={link.path}
//       onClick={() => dispatch(resetCourseState())}
//       className={`relative px-8 py-2 text-sm font-medium ${
//         matchRoute(link.path)
//           ? "bg-primary-800 text-yellow-50"
//           : "bg-opacity-0 text-neutral-300"
//       } transition-all duration-200`}
//     >
//       <span
//         className={`absolute left-[-20px] top-0 h-full w-[0.15rem] bg-primary-50 ${
//           matchRoute(link.path) ? "opacity-100" : "opacity-0"
//         }`}
//       ></span>
//       <div className="flex items-center gap-x-2">
//         {/* Icon Goes Here */}
//         <Icon className="text-lg" />
//         <span>{link.name}</span>
//       </div>
//     </NavLink>
//   )
// }



import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"
import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`group relative flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
        matchRoute(link.path)
          ? "bg-yellow-50/10 text-yellow-50 shadow-[inset_0_0_10px_rgba(99,102,241,0.1)]"
          : "text-richblack-100 hover:bg-richblack-800 hover:text-richblack-5"
      }`}
    >
      <span
        className={`absolute left-0 h-6 w-[3px] rounded-r-full bg-yellow-50 transition-all duration-300 shadow-[0_0_10px_#6366f1] ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>

      <Icon className={`text-lg transition-all duration-300 ${
        matchRoute(link.path) ? "scale-110" : "group-hover:text-white"
      }`} />
      
      <span className="tracking-wide">{link.name}</span>
    </NavLink>
  )
}