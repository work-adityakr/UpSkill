import Footer from "../components/Common/Footer"
import ReviewSlider from "../components/Common/ReviewSlider"
import ContactDetails from "../components/core/ContactUsPage/ContactDetails"
import ContactForm from "../components/core/ContactUsPage/ContactForm"

const Contact = () => {
  return (
    <div className="relative overflow-hidden">
      
      <div className="absolute top-[10%] -left-20 -z-10 h-[400px] w-[400px] rounded-full bg-primary-50/5 blur-[120px]"></div>
      <div className="absolute bottom-[20%] -right-20 -z-10 h-[350px] w-[350px] rounded-full bg-blue-200/5 blur-[100px]"></div>

      <div className="mx-auto mt-24 flex w-11/12 max-w-maxContent flex-col justify-between gap-12 text-white lg:flex-row lg:items-start">
        
        <div className="lg:w-[40%] rounded-3xl border border-white/5 bg-richblack-900/40 p-8 md:p-10 backdrop-blur-xl shadow-glass-inset h-fit transition-all duration-300 hover:border-primary-50/20">
          <ContactDetails />
        </div>

        <div className="lg:w-[55%] rounded-3xl border border-white/5 bg-richblack-900/20 p-8 lg:p-16 backdrop-blur-xl shadow-glass-inset">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Got an Idea? We&apos;ve got the <span className="bg-gradient-to-r from-primary-50 to-blue-200 bg-clip-text text-transparent italic">skills.</span>
          </h1>
          <p className="text-richblack-400 font-medium mb-10 text-lg leading-relaxed">
            Tell us more about yourself and what you&apos;re got in mind. Let&apos;s build something <span className="text-white border-b border-primary-50/50">extraordinary.</span>
          </p>
          <ContactForm />
        </div>
      </div>

      <div className="relative mx-auto my-32 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-12">
        <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                What Our <span className="text-primary-50">Learners</span> Say
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary-50 to-transparent mx-auto rounded-full"></div>
        </div>
        
        <div className="w-full py-4">
            <ReviewSlider />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact