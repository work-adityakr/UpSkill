import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highliteText: "Anyone, Anywhere",
    description:
      "UpSkill partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "UpSkill partners with more than 275+ leading universities and companies to bring world-class pedagogy to your screen.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Earn industry-recognized certificates from top-tier institutions to validate your skills globally.",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Get instant feedback on your assignments with our AI-powered auto-grading system.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Our career-focused paths ensure you are job-ready from day one with real-world project experience.",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12 gap-0">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`transition-all duration-500 hover:scale-[1.02] cursor-default
              ${i === 0 && "xl:col-span-2 xl:h-[300px] p-0"}  
              ${
                card.order % 2 === 1
                  ? "bg-richblack-700/40 h-[300px]"
                  : card.order % 2 === 0
                  ? "bg-richblack-800/60 h-[300px]"
                  : "bg-transparent"
              } 
              ${card.order === 3 && "xl:col-start-2"} 
              border border-white/5 backdrop-blur-md shadow-glass-inset
              ${i === 0 ? "border-none bg-transparent" : "rounded-3xl m-2"}
            `}
          >
            {card.order < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-4 pb-10 xl:pb-0 pr-10">
                <div className="text-4xl font-extrabold tracking-tighter text-white">
                  {card.heading}
                  <HighlightText text={card.highliteText} />
                </div>
                <p className="text-richblack-300 font-medium leading-relaxed">
                  {card.description}
                </p>

                <div className="w-fit mt-4">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-6 h-full justify-start">
                <h1 className="text-white text-xl font-bold tracking-tight">
                    {card.heading}
                </h1>

                <p className="text-richblack-400 font-medium text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;