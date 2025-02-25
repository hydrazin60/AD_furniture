import React from "react";
import ManagerAdmin from "../../components/ManagerandAdmin/ManagerandAdmin";
import { useNavigate } from "react-router-dom";

export default function Staffcontrollers() {
  const navigate = useNavigate();
  const adminOptions = [
    {
      title: "Register New Staff",
      description: "Add a new staff member to the system.",
      image:
        "https://imgs.search.brave.com/5HxQHPfYRqzNWcW8ubz2CDUjsd84fRRgIdrlVyhRE6c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQy/NTI5MzY0NS9waG90/by9kaXNhYmlsaXR5/LWRpdmVyc2l0eS1h/bmQtYnVzaW5lc3Mt/bWVldGluZy13aXRo/LXN0YWZmLXBlb3Bs/ZS1vci10ZWFtLWNv/bW11bmljYXRpb24t/cGxhbm5pbmctb24u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXV1SjQ4aTVBNEFs/WmZJTXJXcGRYWWRw/RHc2SHJUaTJYTm5M/RnQtbVBtLXc9",
    },
    {
      title: "View Staff List",
      description: "See all staff members and their details.",
      image:
        "https://imgs.search.brave.com/5HxQHPfYRqzNWcW8ubz2CDUjsd84fRRgIdrlVyhRE6c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQy/NTI5MzY0NS9waG90/by9kaXNhYmlsaXR5/LWRpdmVyc2l0eS1h/bmQtYnVzaW5lc3Mt/bWVldGluZy13aXRo/LXN0YWZmLXBlb3Bs/ZS1vci10ZWFtLWNv/bW11bmljYXRpb24t/cGxhbm5pbmctb24u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXV1SjQ4aTVBNEFs/WmZJTXJXcGRYWWRw/RHc2SHJUaTJYTm5M/RnQtbVBtLXc9",
    },
  ];

  const onclick = (title) => {
    if (title == "Register New Staff") {
      navigate("/staff/register");
    } else if (title == "Manage Users") {
      navigate(`/admin/manage_users/${user._id}`);
    } else if (title == "manage Products") {
      navigate(`/admin/product_manage/${user._id}`);
    }
  };

  return (
    <div className="flex flex-col gap-20  lg:p-10 sm:p-5 p-1  ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
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
