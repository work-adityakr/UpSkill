const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponenet = () => {
  return (
    <div className="bg-background-700">
      {/* Stats */}
      <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {Stats.map((data, index) => {
            return (
              <div
                className="group flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-richblack-900/40 py-12 px-8 backdrop-blur-xl transition-all duration-500 hover:bg-richblack-800/60 hover:border-white/10 hover:-translate-y-2 shadow-glass-inset"
                key={index}
              >
                {/* 📈 The Large Number - Extra Bold & Glowing */}
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white transition-all duration-500 group-hover:scale-110 group-hover:text-primary-50">
                  {data.count}
                </h1>

                {/* 🏷️ The Label - Modern Tracking & Uppercase */}
                <h2 className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-richblack-500 group-hover:text-richblack-200 transition-colors">
                  {data.label}
                </h2>

                {/* 🌌 Hidden Glow Background (Appears on Hover) */}
                <div className="absolute inset-0 -z-10 rounded-3xl bg-primary-50/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsComponenet;
