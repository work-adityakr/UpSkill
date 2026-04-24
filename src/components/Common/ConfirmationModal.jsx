import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-background-card p-6">
        <p className="text-2xl font-semibold text-neutral-50">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-neutral-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="cursor-pointer rounded-xl bg-richblack-700 py-2.5 px-6 font-bold text-richblack-5 border border-white/5 hover:bg-richblack-600 transition-all duration-200" onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}
