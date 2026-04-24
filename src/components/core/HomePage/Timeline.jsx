import firstphoto from "../../../assets/Images/firstphoto.jpg";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const TimeLine = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];


const TimelineSection = () => {
  return (
<div className="w-full py-20">
      <div className="flex flex-col lg:flex-row gap-24 items-center justify-between">
        
        {/* 🗺️ LEFT SECTION: ROADMAP */}
        <div className="lg:w-[45%] flex flex-col items-start">
          {TimeLine.map((ele, i) => {
            return (
              <div className="flex flex-col group" key={i}>
                <div className="flex gap-8 items-start">
                  {/* Icon with Ring Effect */}
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white rounded-full flex justify-center items-center shadow-[0_0_40px_rgba(0,0,0,0.08)] group-hover:scale-110 transition-transform duration-300">
                      <img src={ele.Logo} alt={ele.Heading} className="w-6 h-6" />
                    </div>
                    {/* Dashed Line Connection */}
                    {i !== TimeLine.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-14 h-14 border-l-2 border-dashed border-richblack-100"></div>
                    )}
                  </div>

                  <div className="pb-10">
                    <h2 className="font-bold text-xl text-richblack-800 tracking-tight">
                        {ele.Heading}
                    </h2>
                    <p className="text-richblack-500 font-medium mt-1 leading-relaxed">
                        {ele.Description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🖼️ RIGHT SECTION: IMAGE & STATS */}
        <div className="relative lg:w-[50%] h-fit">
          {/* Ambient Background Glow behind the image */}
          <div className="absolute -inset-10 bg-blue-200/20 rounded-full blur-[120px] -z-10"></div>
          
          <div className="relative">
            <img
              src={firstphoto}
              alt="timelineImage"
              className="rounded-3xl object-cover shadow-[25px_25px_0px_0px_#F5F5F5] border border-white/20 h-[400px] lg:h-auto"
            />

            {/* 📊 THE "COOL" STATS BAR: Glassmorphism Design */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 
                            bg-caribbeangreen-700 flex flex-col md:flex-row items-center py-8 px-10 gap-8 md:gap-0
                            rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md">
              
              {/* Stat 1 */}
              <div className="flex gap-6 items-center md:border-r border-caribbeangreen-300/30 pr-10">
                <h1 className="text-4xl font-extrabold text-white">10</h1>
                <p className="text-caribbeangreen-200 text-xs font-bold uppercase tracking-widest leading-tight">
                  Years <br/> Experience
                </p>
              </div>

              {/* Stat 2 */}
              <div className="flex gap-6 items-center pl-0 md:pl-10">
                <h1 className="text-4xl font-extrabold text-white">250</h1>
                <p className="text-caribbeangreen-200 text-xs font-bold uppercase tracking-widest leading-tight">
                  Types of <br/> Courses
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TimelineSection;
