import React from "react";
import ManagerAdmin from "../../components/ManagerandAdmin/ManagerandAdmin";

export default function SupplierAndCustomerControllers() {
  const adminOptions = [
    {
      title: "Register New Supplier",
      description: "this is the Ad- furnteg dndffhf",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
    {
      title: "Register New Customer",
      description: "Approve or reject company registrations",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
    {
      title: "See All Suppliers",
      description: "View the list of all registered suppliers.",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
    {
      title: "See All Customers",
      description: "View the list of all registered customers.",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
  ];

  const onclick = (title) => {
    if (title == "Register New Supplier") {
      navigate("/supplier/register");
    } else if (title == "Register New Customer") {
      navigate("/customer/register");
    } else if (title == "manage Products") {
      navigate(`/admin/product_manage/${user._id}`);
    }
  };

  return (
    <div className="flex flex-col gap-20 ">
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
