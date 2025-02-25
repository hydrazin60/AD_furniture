import React from "react";
import ManagerAdmin from "../../components/ManagerandAdmin/ManagerandAdmin";
import { useNavigate } from "react-router-dom";

export default function InvoiceControllers() {
    const navigate = useNavigate();
  const adminOptions = [
    {
      title: "Create Purchase Bill",
      description: "Make a bill for bought items.",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
    {
      title: "Create Expense Bill",
      description: "Make a bill for company expenses.",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
    {
      title: "Create Sales Bill",
      description: "Make a bill for sold items.",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
    {
      title: "View Purchase Bills",
      description: "See all bought item bills.",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
    {
      title: "View Expense Bills",
      description: "See all company expense bills.",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
    {
      title: "View Sales Bills",
      description: "See all sold item bills.",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
  ];

  const onclick = (title) => {
    if (title == "Create Expense Bill") {
      navigate("/create/expenseinvoice");
    } else if (title == "Create Purchase Bill") {
      navigate("/create/purchaseinvoice");
    } else if (title == "Create Sales Bill") {
      navigate("/create/salesreceipt");
    }
  };
  return (
    <div className="flex flex-col gap-20  lg:p-10 sm:p-5 p-1  ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6   lg:p-10 sm:p-5 ">
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
      <ManagerAdmin/>
    </div>
  );
}
