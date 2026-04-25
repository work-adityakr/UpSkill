import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../components/Common/Footer"
import CourseCard from "../components/core/Catalog/Course_Card"
import CourseSlider from "../components/core/Catalog/Course_Slider"
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"
import Error from "./Error"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const navigate = useNavigate();
  
  // Fetch All Categories
  useEffect(() => {
    ; (async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id
        setCategoryId(category_id)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catalogName])
  useEffect(() => {
    if (categoryId) {
      ; (async () => {
        try {
          const res = await getCatalogPageData(categoryId)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative border-b border-white/5 bg-[#020205] py-24 overflow-hidden">
        <div className="absolute top-0 left-0 -z-10 h-[500px] w-[800px] bg-primary-50/10 blur-[160px]"></div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-richblack-500">
            {`Home / Catalog / `}
            <span className="text-primary-50">{catalogPageData?.data?.selectedCategory?.name}</span>
          </p>

          {/* Title - Extra Bold */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-tight">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>

          <p className="max-w-[800px] text-xl font-medium text-richblack-300 italic leading-relaxed">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      <div className="mx-auto box-content w-full max-w-maxContent px-4 py-16">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-extrabold tracking-tight text-white">
            Courses to get you <span className="text-primary-50">started</span>
          </h2>
          <div className="h-1 w-20 bg-primary-50 rounded-full"></div>
        </div>

        {catalogPageData?.data?.selectedCategory?.courses?.length > 0 && (
          <div className="my-10 flex w-fit bg-richblack-700 p-1 rounded-2xl border border-white/5 shadow-glass-inset">
            <button
              className={`rounded-xl py-3 px-10 text-sm font-bold transition-all duration-300 ${active === 1 ? "bg-richblack-800 text-primary-50 shadow-glow-indigo" : "text-richblack-200 hover:text-white"
                }`}
              onClick={() => setActive(1)}
            >
              Most Popular
            </button>
            <button
              className={`rounded-xl py-3 px-10 text-sm font-bold transition-all duration-300 ${active === 2 ? "bg-richblack-800 text-primary-50 shadow-glow-indigo" : "text-richblack-200 hover:text-white"
                }`}
              onClick={() => setActive(2)}
            >
              New
            </button>
          </div>
        )}

        <div className="py-8">
          {catalogPageData?.data?.selectedCategory?.courses?.length > 0 ? (
            <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 rounded-[40px] border border-white/5 bg-white/5 backdrop-blur-xl shadow-glass-inset">
              <div className="h-24 w-24 rounded-full bg-richblack-700 flex items-center justify-center mb-6 border border-white/10 shadow-glow-indigo">
                <p className="text-5xl animate-pulse">📚</p>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">No courses found yet</h3>
              <p className="text-richblack-400 mt-2 text-lg font-medium">Check back later or explore our other top-rated categories.</p>
              <button
                onClick={() => navigate("/courses/68fced76cf6a3c2138c63c99")}
                className="mt-8 text-primary-50 font-bold hover:underline"
              >
                Explore Java Courses →
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto box-content w-full max-w-maxContent px-4 py-16">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-12">Frequently Bought</h2>

        {catalogPageData?.data?.mostSellingCourses?.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, i) => (
              <div key={i} className="transition-all duration-500 hover:scale-[1.01]">
                <CourseCard course={course} Height={"h-[400px]"} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-richblack-400 italic">Popular courses will appear here once students start enrolling.</p>
        )}
      </div>

      <Footer />
    </>
  )
}

export default Catalog
