import React from "react";
import { Link } from "react-router-dom";
// Using specific icons for Quiz, Donation, and Group
import { MdQuiz } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { HiUsers } from "react-icons/hi2";

export default function FloatingActions() {
  const actions = [
    {
      to: "/marine-quiz",
      label: "Marine Quiz",
      icon: <MdQuiz />,
      color: "bg-teal-500",
    },
    {
      to: "/donate",
      label: "Contribute Now",
      icon: <BiDonateHeart />,
      color: "bg-rose-500",
    },
    {
      to: "/careers#volunteer",
      label: "Volunteer",
      icon: <HiUsers />,
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col items-end z-50">
      {actions.map((item, index) => (
        <Link
          key={index}
          to={item.to}
          className={`group relative flex items-center h-12 overflow-hidden transition-all duration-300 hover:w-52 w-12 ${item.color} text-white mb-[2px] rounded-l-md shadow-md`}
        >
          {/* Label */}
          <span className="absolute left-4 whitespace-nowrap font-bold opacity-0 transition-all duration-300 group-hover:opacity-100">
            {item.label}
          </span>

          {/* Icon Box */}
          <div className="absolute right-0 flex h-12 w-12 items-center justify-center text-2xl bg-inherit">
            {item.icon}
          </div>
        </Link>
      ))}
    </div>
  );
}
