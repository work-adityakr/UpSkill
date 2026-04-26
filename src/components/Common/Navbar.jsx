import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false); // New state just for mobile

  // Fetch Categories for the Catalog dropdown
  useEffect(() => {
    ; (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    if (!route) return false;

    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`fixed top-0 z-[1000] flex h-14 w-full items-center justify-center border-b-[1px] border-richblack-800 bg-richblack-900/80 backdrop-blur-md transition-all duration-300`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-1">
            <p className="text-2xl font-bold tracking-tighter text-richblack-5 uppercase">
              Up<span className="text-yellow-50">Skill</span>
            </p>
            <div className="h-2 w-2 rounded-full bg-caribbeangreen-500 shadow-[0_0_10px_#06D6A0]"></div>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-text-secondary">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-text-secondary"
                      }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />

                    {/* Catalog Dropdown - The "Glassmorphism" Version */}
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-2xl border border-white/10 bg-richblack-900 p-2 text-richblack-200 opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[280px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                      {/* The Pointer Triangle - Updated to match dropdown color */}
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded border-t border-l border-white/10 bg-richblack-900/80 backdrop-blur-xl"></div>

                      {loading ? (
                        <div className="flex items-center justify-center py-10">
                          <div className="spinner h-6 w-6 border-2 border-primary-50 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : subLinks?.length ? (
                        <div className="flex flex-col gap-1">
                          {subLinks.map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="group/item flex items-center gap-3 rounded-xl bg-transparent py-3 pl-4 transition-all duration-200 hover:bg-white/5"
                              key={i}
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-richblack-600 transition-all group-hover/item:bg-primary-50 group-hover/item:shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                              <p className="text-sm font-medium text-richblack-200 group-hover/item:text-white">
                                {subLink.name}
                              </p>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="py-6 text-center text-sm font-medium text-richblack-500 italic">
                          No Categories Found
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link.path) ? "text-yellow-50" : "text-richblack-25"} hover:text-white transition-all`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="rounded-xl border border-richblack-700 bg-richblack-700 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700 transition-all">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="rounded-xl bg-gradient-to-b from-yellow-50 to-yellow-200 px-[12px] py-[8px] font-bold text-richblack-900 shadow-[0_0_15px_rgba(255,214,10,0.2)] hover:scale-105 transition-all">
                Sign up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropdown />}
        </div>

        <button className="mr-4 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
{isMenuOpen && (
  <div className="fixed inset-0 z-[2000] md:hidden">
    
    {/* Overlay */}
    <div
      onClick={() => setIsMenuOpen(false)}
      className="absolute inset-0 bg-black/70 backdrop-blur-md"
    ></div>

    {/* Drawer */}
    <div className="absolute right-0 top-0 h-screen w-[88%] max-w-[340px] bg-richblack-900 border-l border-richblack-700 shadow-2xl animate-slideLeft overflow-y-auto">

      <div className="flex min-h-screen flex-col px-5 py-5">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-richblack-700 pb-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
            Up<span className="text-yellow-50">Skill</span>
          </h2>

          <button
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full bg-richblack-800 p-2"
          >
            <AiOutlineClose size={22} className="text-white" />
          </button>
        </div>

        {/* Links */}
        <div className="mt-6 flex flex-col gap-3">

          {NavbarLinks.map((link, index) => (
            <div key={index}>
              {link.title === "Catalog" ? (
                <div className="rounded-xl bg-richblack-800 border border-richblack-700">

                  <button
                    onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                    className="flex w-full items-center justify-between px-4 py-4 text-white font-medium"
                  >
                    <span>{link.title}</span>
                    <BsChevronDown
                      className={`transition-all duration-300 ${
                        isCatalogOpen ? "rotate-180 text-yellow-50" : ""
                      }`}
                    />
                  </button>

                  {isCatalogOpen && (
                    <div className="px-3 pb-3 space-y-2">
                      {subLinks.map((subLink, i) => (
                        <Link
                          key={i}
                          to={`/catalog/${subLink.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-richblack-100 hover:bg-richblack-700"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl bg-richblack-800 px-4 py-4 text-white font-medium hover:bg-richblack-700"
                >
                  {link.title}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Buttons */}
        <div className="mt-auto pt-8 space-y-3">

          {token === null ? (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full rounded-xl border border-richblack-700 py-3 text-white font-semibold">
                  Log In
                </button>
              </Link>

              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-200 py-3 font-bold text-black">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <Link to="/dashboard/my-profile" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full rounded-xl bg-yellow-50 py-3 font-bold text-black">
                Dashboard
              </button>
            </Link>
          )}

        </div>
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default Navbar