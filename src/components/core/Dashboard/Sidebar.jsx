import { useState } from "react"
import { VscSignOut, VscMenu, VscClose } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../Common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-richblack-500 bg-richblack-900">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden fixed bottom-6 right-6 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50 text-richblack-900 shadow-glow-indigo transition-all active:scale-90"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
         {isMobileMenuOpen ? <VscClose className="text-2xl"/> : <VscMenu className="text-2xl"/>}
      </button>

      {/* Sidebar Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[40] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-[50] flex h-full w-[260px] flex-col 
        border-r border-richblack-500 bg-richblack-900/80 backdrop-blur-xl
        pt-[4rem] transition-all duration-300 ease-in-out md:static md:h-[calc(100vh-3.5rem)] md:pt-10
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        
        <div className="flex flex-col gap-y-1 px-3">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <div key={link.id} onClick={() => setIsMobileMenuOpen(false)}>
                <SidebarLink link={link} iconName={link.icon} />
              </div>
            )
          })}
        </div>

        {/* Divider Line */}
        <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700" />

        <div className="flex flex-col gap-y-1 px-3">
          <div onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
          </div>

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Ready to leave?",
                text2: "You will need to login again to access your courses.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="group flex items-center gap-x-2 rounded-lg px-4 py-3 text-sm font-medium text-richblack-100 transition-all duration-200 hover:bg-pink-900/20 hover:text-pink-200"
          >
            <VscSignOut className="text-lg transition-transform group-hover:-translate-x-1" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}