import React from "react";
import ManagerAdmin from "../../components/ManagerandAdmin/ManagerandAdmin";

export default function ProductControllers() {
  const adminOptions = [
    {
      title: "Add New Product",
      description: "Upload a new product to the store.",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
    {
      title: "See All Products",
      description: "View and manage all products.",
      image:
        "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    },
  ];

  const onclick = (title) => {
    if (title == "Add New Product") {
      navigate("upload/final_product");
    } else if (title == "Manage Users") {
      navigate(`/admin/manage_users/${user._id}`);
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
