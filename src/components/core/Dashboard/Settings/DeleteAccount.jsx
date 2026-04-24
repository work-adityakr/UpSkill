import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      // Adding a standard browser confirm for extra safety
      if (window.confirm("Are you absolutely sure? This action is permanent.")) {
        dispatch(deleteProfile(token, navigate))
      }
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <div className="my-10 flex flex-col md:flex-row gap-x-6 rounded-3xl border border-pink-700/50 bg-pink-900/20 p-8 md:px-12 backdrop-blur-md transition-all hover:bg-pink-900/30">
      
      <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700/20 border border-pink-700/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
        <FiTrash2 className="text-3xl text-pink-200" />
      </div>

      <div className="flex flex-col space-y-3 mt-4 md:mt-0">
        <h2 className="text-xl font-bold text-pink-5 tracking-tight">
          Delete Account
        </h2>
        
        <div className="w-full md:w-4/5 text-pink-200/70 text-sm leading-relaxed">
          <p>Would you like to delete your account?</p>
          <p className="mt-1">
            This account may contain <span className="text-pink-100 font-bold underline decoration-pink-500/50">Paid Courses</span>. 
            Deleting your account is permanent and will remove all content associated with it.
          </p>
        </div>

        <button
          type="button"
          className="w-fit mt-4 cursor-pointer rounded-xl bg-pink-700 px-6 py-2.5 text-sm font-bold text-pink-5 shadow-[0_4px_14px_rgba(239,68,68,0.3)] hover:scale-105 hover:bg-pink-600 transition-all active:scale-95"
          onClick={handleDeleteAccount}
        >
          I want to delete my account
        </button>
      </div>
    </div>
  )
}