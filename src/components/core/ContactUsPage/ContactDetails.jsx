import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@UpSkill.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
return (
    <div className="flex flex-col gap-y-8 rounded-3xl border border-white/5 bg-richblack-800 p-8 shadow-glass-inset backdrop-blur-xl">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        
        return (
          <div
            className="group flex flex-col gap-[2px] transition-all duration-300"
            key={i}
          >
            {/* Header Section */}
            <div className="flex flex-row items-center gap-4">
              {/* Icon Container with Glow */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-richblack-800 border border-white/5 text-primary-50 shadow-[0_0_15px_rgba(99,102,241,0.1)] group-hover:bg-primary-50 group-hover:text-white transition-all duration-300">
                <Icon size={24} />
              </div>
              
              <h1 className="text-xl font-bold tracking-tight text-white group-hover:text-primary-50 transition-colors">
                {ele?.heading}
              </h1>
            </div>

            {/* Description & Details */}
            <div className="pl-14">
              <p className="text-sm font-medium text-richblack-400 leading-relaxed">
                {ele?.description}
              </p>
              <p className="mt-1 text-sm font-bold text-primary-50/90 tracking-wide hover:text-primary-50 cursor-pointer">
                {ele?.details}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails
