import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Doughnut } from "react-chartjs-2" // Swapped Pie for Doughnut

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")

  // 🎨 Professional Color Palette instead of random colors
  const chartColors = [
    "#6366F1", // Indigo
    "#06D6A0", // Caribbeangreen
    "#3B82F6", // Blue
    "#A855F7", // Purple
    "#EC4899", // Pink
  ]

  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: chartColors,
        borderWidth: 0,
        hoverOffset: 20,
      },
    ],
  }

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: chartColors,
        borderWidth: 0,
        hoverOffset: 20,
      },
    ],
  }

  // 🛠️ Modern Chart Options
  const options = {
    maintainAspectRatio: false,
    cutout: "75%", // This creates the "Ring" look
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#94a3b8", // richblack-300
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: "600",
          }
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
        padding: 12,
        cornerRadius: 10,
        displayColors: true,
      }
    },
  }

  return (
    <div className="flex flex-1 flex-col gap-y-6 rounded-2xl border border-white/5 bg-richblack-900/40 p-6 backdrop-blur-md shadow-glass-inset">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-white tracking-tight">Visualize Analytics</p>
        
        {/* Toggle Switch Style Buttons */}
        <div className="flex bg-richblack-800 p-1 rounded-xl border border-richblack-700">
          <button
            onClick={() => setCurrChart("students")}
            className={`rounded-lg py-1.5 px-4 text-xs font-bold transition-all duration-300 ${
              currChart === "students"
                ? "bg-richblack-900 text-primary-50 shadow-lg"
                : "text-richblack-300 hover:text-white"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setCurrChart("income")}
            className={`rounded-lg py-1.5 px-4 text-xs font-bold transition-all duration-300 ${
              currChart === "income"
                ? "bg-richblack-900 text-primary-50 shadow-lg"
                : "text-richblack-300 hover:text-white"
            }`}
          >
            Income
          </button>
        </div>
      </div>

      <div className="relative mx-auto h-[300px] w-full lg:h-[350px]">
        {/* The center "Total" label inside the Doughnut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs font-bold uppercase tracking-widest text-richblack-500">
                Total {currChart === "students" ? "Users" : "INR"}
            </p>
            <p className="text-3xl font-extrabold text-white">
                {currChart === "students" 
                    ? courses.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)
                    : `₹${courses.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)}`
                }
            </p>
        </div>

        <Doughnut
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}