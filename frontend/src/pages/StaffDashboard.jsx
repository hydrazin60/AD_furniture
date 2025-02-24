import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagerAdmin from "../components/ManagerandAdmin/ManagerandAdmin";

export default function StaffDashboard() {
  const navigate = useNavigate();
  const adminOptions = [
    {
      title: "Staff Control Panel",
      description: "this is the Ad- furnteg dndffhf",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
    {
      title: "Branch Control Panel",
      description: "Approve or reject company registrations",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
    {
      title: "Invoice Control Panel",
      description: "View, edit, or remove user accounts",
      image:
        "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
    },
    {
      title: "Product  Control Panel",
      description: "Add, update, or remove internship listings",
      image:
        "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
    },
    {
      title: "Raw Material Control Panel",
      description: "Approve or reject company registrations",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },

    {
      title: "Salary Control Panel",
      description: "View and respond to user inquiries",
      image:
        "https://images.pexels.com/photos/2058130/pexels-photo-2058130.jpeg",
    },
    {
      title: "Vehicles Control Panel",
      description: "Track website traffic and user engagement",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg",
    },
    {
      title: "Today's Schedule  Control Panel",
      description: "Configure platform settings and security",
      image:
        "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
    },
    {
      title: "Supplier Control Panel",
      description: "Configure platform settings and security",
      image:
        "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
    },
  ];

  const onclick = (title) => {
    if (title == "Staff Control Panel") {
      navigate("/staff/controllers");
    } else if (title == "Branch Control Panel") {
      navigate("/branch/controllers");
    } else if (title == "Invoice Control Panel") {
      navigate(`/invoice/controllers`);
    } else if (title == "Product  Control Panel") {
      navigate(`/product/controllers`);
    } else if (title == "Salary Control Panel") {
      navigate("/salary/controllers");
    } else if (title == "Vehicles Control Panel") {
      navigate("/vehicles/controllers");
    } else if (title == "Today's Schedule  Control Panel") {
      navigate("/todolist/controllers");
    } else if (title == "Supplier Control Panel") {
      navigate(`/supplier/customers/controllers`);
    } else if (title == "Raw Material Control Panel") {
      navigate("/raw_material/controllers");
    }
  };

  return (
    <div className="flex flex-col gap-20 lg:p-10 sm:p-5 p-1 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  ">
        {adminOptions.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 h-40 border border-zinc-400 cursor-pointer hover:bg-gray-100 rounded-lg shadow-md"
            onClick={() => {
              onclick(option.title);
            }}
          >
            <div>
              <img
                src={option.image}
                alt=""
                className="w-20 h-20 rounded-lg object-cover"
              />
            </div>

            <div>
              <p className="text-lg font-semibold">{option.title}</p>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
      <ManagerAdmin />
    </div>
  );
}
