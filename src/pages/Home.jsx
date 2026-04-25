import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import firstvid from "../assets/Images/firstvid.mp4"

// Component Imports
import Footer from "../components/Common/Footer"
import ReviewSlider from "../components/Common/ReviewSlider"
import CTAButton from "../components/core/HomePage/Button"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import TimelineSection from "../components/core/HomePage/Timeline"

function Home() {
  return (
    <div className="relative min-h-screen bg-[#020205] font-inter overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[1000px] bg-primary-50/10 blur-[160px] -z-10 opacity-60"></div>
      <div className="absolute top-[1500px] -left-20 h-[500px] w-[500px] bg-blue-200/5 blur-[120px] -z-10"></div>

      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-center pt-24 pb-20">

        <Link to={"/signup"}>
          <div className="group mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md transition-all hover:bg-white/10 cursor-pointer shadow-glass-inset">
            <span className="text-[10px] font-bold text-primary-50 tracking-widest">NEW</span>
            <div className="h-3 w-[1px] bg-white/20"></div>
            <span className="text-xs font-medium text-richblack-200">The 2026 MERN Career Path is live</span>
            <FaArrowRight className="text-[10px] text-richblack-300 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Hero Title */}
        <h1 className="text-center text-5xl md:text-7xl lg:text-[84px] font-extrabold tracking-tighter text-white leading-[1.05] max-w-[1000px]">
          Master coding. <br />
          <span className="bg-gradient-to-b from-primary-50 to-blue-200 bg-clip-text text-transparent italic">
            Build the future.
          </span>
        </h1>

        <p className="mt-8 text-center text-lg md:text-xl text-richblack-300 max-w-[700px] font-medium leading-relaxed">
          UpSkill is the professional-grade platform for developers.
          Experience high-fidelity learning with AI-driven mentorship and real-world projects.
        </p>

        {/* Hero Actions */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <CTAButton active={true} linkto={"/signup"}>
            Start Learning for Free
          </CTAButton>
          <button className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 font-bold text-white backdrop-blur-md hover:bg-white/10 transition-all">
            Explore Courses
          </button>
        </div>

        {/* Floating Video Dashboard */}
        <div className="mt-24 w-full max-w-[1150px] relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-50/20 to-blue-200/20 rounded-[32px] blur-2xl -z-10 group-hover:opacity-100 opacity-50 transition-opacity duration-500"></div>
          <div className="rounded-[32px] border border-white/10 bg-richblack-900/40 p-3 backdrop-blur-3xl shadow-2xl">
            <video className="rounded-[22px] border border-white/5 shadow-2xl" muted loop autoPlay>
              <source src={firstvid} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* BENTO GRID FEATURES */}
      <div className="mx-auto w-11/12 max-w-maxContent py-32 flex flex-col gap-16">
        <div className="text-center md:text-left max-w-[700px] space-y-6">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight">
            Harness the power of <br />
            <span className="bg-gradient-to-r from-primary-50 to-blue-200 bg-clip-text text-transparent">AI-driven learning</span>
          </h2>
          <p className="text-richblack-300 text-xl font-medium leading-relaxed">
            Everything you need to go from beginner to industry-pro in months, not years.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-8 min-h-[850px]">

          <div className="md:col-span-7 rounded-[40px] border border-white/5 bg-richblack-700 p-10 md:p-14 backdrop-blur-xl overflow-hidden relative group transition-all duration-500 hover:border-white/10">
            <div className="absolute -top-20 -right-20 h-96 w-96 bg-primary-50/10 blur-[120px] rounded-full -z-10"></div>

            <div className="relative z-20 space-y-4">
              <h3 className="text-3xl font-bold text-white tracking-tight">Interactive IDE</h3>
              <p className="text-richblack-300 text-lg max-w-[350px] leading-relaxed">
                Write, debug, and deploy high-performance code directly in your browser without any setup.
              </p>

              <Link to="/signup" className="mt-8 flex items-center gap-3 text-primary-50 text-lg font-bold hover:gap-5 transition-all group/btn">
                Try it yourself <FaArrowRight className="text-sm transition-transform" />
              </Link>
            </div>

            <div className="absolute bottom-[-10px] right-[-10px] w-[85%] h-[55%] rounded-tl-[32px] border-t border-l border-white/10 bg-[#020205] p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:translate-y-[-15px] group-hover:translate-x-[-15px] group-hover:border-white/20">
              <div className="flex gap-2.5 mb-6 opacity-60">
                <div className="h-3 w-3 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.3)]"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-100 shadow-[0_0_10px_rgba(255,214,10,0.3)]"></div>
                <div className="h-3 w-3 rounded-full bg-caribbeangreen-200 shadow-[0_0_10px_rgba(6,214,160,0.3)]"></div>
              </div>
              <pre className="text-sm md:text-base font-mono leading-relaxed tracking-tight">
                <code className="text-blue-100">const </code>
                <code className="text-yellow-50">UpSkill </code>
                <code className="text-blue-100">= () =&gt; {"{"} </code> <br />
                <code className="text-richblack-400 pl-6">  return "Building Future";</code> <br />
                <code className="text-blue-100">{"}"}</code>
              </pre>
            </div>
          </div>

          {/* 24/7 Support (Improved Visual Weight) */}
          <div className="md:col-span-5 rounded-[40px] border border-white/5 bg-gradient-to-br from-richblack-600 to-richblack-800/20 p-10 md:p-14 backdrop-blur-xl flex flex-col justify-between group hover:border-primary-50/20 transition-all duration-500">
            <Link to="/signup" className="h-20 w-20 rounded-3xl bg-primary-50/10 border border-primary-90/20 flex items-center justify-center text-primary-50 shadow-glow-indigo group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <FaArrowRight className="-rotate-45 text-2xl" />
            </Link>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-white tracking-tight">24/7 Expert Support</h3>
              <p className="text-richblack-300 text-lg leading-relaxed">Stuck on a bug? Our mentors and AI assist you within minutes, anytime.</p>
            </div>
          </div>

          {/* Industry Ready (Larger text and background) */}
          <div className="md:col-span-5 rounded-[40px] border border-white/5 bg-richblack-800 p-10 md:p-14 backdrop-blur-xl flex flex-col justify-end relative group overflow-hidden">
            <div className="absolute top-5 right-[-20px] p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
              <h1 className="text-9xl font-black text-white">FAANG</h1>
            </div>
            <div className="relative z-10 space-y-3">
              <h3 className="text-3xl font-bold text-white tracking-tight">Industry Ready</h3>
              <p className="text-richblack-300 text-lg leading-relaxed">Curriculum designed by world-class engineers from top tech giants.</p>
            </div>
          </div>

          <div className="md:col-span-7 rounded-[40px] border border-white/5 bg-richblack-800 p-10 md:p-14 backdrop-blur-xl flex items-center justify-between group hover:border-white/10 transition-all duration-500">
            <div className="max-w-[55%] space-y-3">
              <h3 className="text-3xl font-bold text-white tracking-tight">Global Community</h3>
              <p className="text-richblack-300 text-lg leading-relaxed">Join 20,000+ developers learning and building projects together.</p>
            </div>
            <div className="flex -space-x-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-20 w-20 rounded-full border-[6px] border-richblack-900 bg-primary-500 shadow-2xl group-hover:translate-y-[-10px] transition-all duration-500" style={{ transitionDelay: `${i * 70}ms` }}></div>
              ))}
              <div className="h-20 w-20 rounded-full border-[6px] border-richblack-900 bg-primary-50 flex items-center justify-center text-sm font-bold text-white shadow-glow-indigo group-hover:translate-y-[-10px] transition-all duration-500" style={{ transitionDelay: '350ms' }}>
                +20k
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-24">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-extrabold tracking-tighter lg:w-[45%] text-richblack-900 leading-tight">
              Get the skills you need for a <br />
              <span className="bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] bg-clip-text text-transparent italic">
                job that is in demand.
              </span>
            </div>

            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px] text-richblack-600 font-medium leading-relaxed">
                The modern <span className="font-bold text-primary-50">UpSkill</span> dictates its own terms.
                Today, becoming a specialist requires more than just professional skills—it requires <span className="text-richblack-900 font-bold underline decoration-cyan-200">constant evolution.</span>
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>

          <div className="mt-20">
            <TimelineSection />
          </div>
        </div>
      </div>

      {/* INSTRUCTOR & SOCIAL PROOF */}
      <div className="mx-auto w-11/12 max-w-maxContent py-24 flex flex-col gap-24">
        <InstructorSection />

        <div className="flex flex-col gap-12 items-center">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white tracking-tight">Hear from our <code className="text-yellow-50">Learner</code></h2>
            <div className="h-1 w-20 bg-primary-50 mx-auto rounded-full"></div>
          </div>
          <ReviewSlider />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home