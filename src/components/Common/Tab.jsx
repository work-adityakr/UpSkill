export default function Tab({ tabData, field, setField }) {
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-richblack-500 p-1 gap-x-1 my-6 rounded-full max-w-max border border-richblack-700"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`${
            field === tab.type
              ? "bg-richblack-900 text-blue-50" 
              : "bg-transparent text-richblack-200 hover:bg-richblack-700 hover:text-richblack-5"
          } py-2 px-5 rounded-full transition-all duration-200 font-medium text-sm`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  )
}