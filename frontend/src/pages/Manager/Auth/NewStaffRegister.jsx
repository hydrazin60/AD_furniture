import React, { useState } from "react";
import { SlBasket } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import Sidebar from "../../../components/ManagerandAdmin/Sidebar";

export default function NewStaffRegister() {
  const province = [
    "Koshi",
    "Madhesh",
    "Bagmati",
    "Gandaki",
    "Lumbini",
    "Karnali",
    "Sudurpaschim",
  ];

  return (
    <div className="flex relative lg:gap-16">
      <Sidebar />
      <div className="h-[100vh] w-full flex  p-1 bg-white ">
        <form className="h-fit w-[80%] p-10  gap-8 border shadow-lg border-zinc-500 rounded-lg flex flex-col justify-baseline ">
          <p className=" text-3xl font-bold text-center text-red-600 ">
            New Staff
          </p>
          <div className="flex gap-2 flex-col">
            <label className="text-2xl">Branch Details</label>
            <input
              className="w-1/2 p-2 rounded-xl placeholder:text-black border-2 border-zinc-400"
              type="text"
              placeholder="Branch Name"
              name="branchName"
              required
            />
          </div>
          <div className=" border border-zinc-400 ">
            <p className="text-2xl text-center">Staff Details</p>
            <div className="flex gap-2 flex-wrap">
              <input
                className="w-1/2 p-2 rounded-xl placeholder:text-black border-2 border-zinc-400"
                type="text"
                placeholder="Staff Full Name"
                name="FullName"
                required
              />
              <input
                className="w-52 p-2 rounded-xl placeholder:text-black border-2 border-zinc-400"
                type="email"
                placeholder="Staff Email"
                name="email"
                required
              />
              <input
                className="w-52 p-2 rounded-xl placeholder:text-black border-2 border-zinc-400"
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              <input
                className="w-52 p-2 rounded-xl placeholder:text-black border-2 border-zinc-400"
                type="number"
                placeholder="Staff Phone Number"
                name="phoneNumber"
                required
              />
              <input
                className="w-52 p-2 rounded-xl placeholder:text-black border-2 border-zinc-400"
                type="text"
                placeholder="Staff Role"
                name="role"
                list="province"
                required
              />
              <datalist id="province">
                {province.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </datalist>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { SlBasket } from "react-icons/sl";
// import { RxCross2 } from "react-icons/rx";
// import Sidebar from "../../../components/ManagerandAdmin/Sidebar";

// export default function NewStaffRegister() {
//   const categories = [
//     "Manager",
//     "MonthlySalaryWorkers",
//     "DailyWageWorkers",
//     "ProjectBasedWorkers",
//     "DeliveryBoy",
//     "Pending",
//   ];

// const province = [
//   "Koshi",
//   "Madhesh",
//   "Bagmati",
//   "Gandaki",
//   "Lumbini",
//   "Karnali",
//   "Sudurpaschim",
// ];

//   return (
//     <div className="flex relative">
//       <Sidebar />
// <div className="h-[100vh] w-full flex justify-center p-1 bg-white ">
//   <form className="h-fit w-[80%] p-10 flex flex-col justify-between gap-8 border shadow-lg border-zinc-500 rounded-lg">
//           <p className="text-2xl font-semibold text-center ">
//             New Staff Register
//           </p>
//           <div className="flex gap-9">
//             <input
//               className="w-1/2 p-2 rounded-xl placeholder:text-black border-2 border-zinc-400"
//               type="text"
//               placeholder="Branch Name"
//               name="branchName"
//               required
//             />
//             <div className="border border-zinc-400 flex gap-2 p-2 justify-between">
// <input
//   className="w-1/2 p-2 rounded-xl placeholder:text-black border-2 border-zinc-400"
//   type="text"
//   placeholder="Staff Full Name"
//   name="FullName"
//   required
// />
// <input
//   className="w-52 p-2 rounded-xl placeholder:text-black border-2 border-zinc-400"
//   type="text"
//   placeholder="Staff Role"
//   name="role"
//   list="categories"
//   required
// />
// <datalist id="categories">
//   {categories.map((category, index) => (
//     <option key={index} value={category}>
//       {category}
//     </option>
//   ))}
// </datalist>
//             </div>
//           </div>
//           <div>
//             <input
//               className="w-1/2 rounded-xl placeholder:text-zinc-800 placeholder:font-[400] border-2 border-zinc-400 p-2"
//               name="email"
//               id="email"
//               placeholder="Staff Email"
//               type="email"
//               rows="10"
//               required
//             ></input>
//           </div>
//           <div>
//             <input
//               className="w-40 p-2 rounded-xl placeholder:text-zinc-500 border-2 border-zinc-400"
//               type="number"
//               placeholder="phone number"
//               name="phoneNumber"
//             />
//           </div>
//           <span>
//             <p className="text-zinc-900 font-semibold text-[18px]">
//               Permanent Address
//             </p>
//           </span>
//           <div className="flex gap-4 flex-wrap">
//             <input
//               className="w-1/3 p-2 rounded-xl placeholder:text-zinc-800 placeholder:font-[400] border-2 border-zinc-400"
//               name="permanentAddress"
//               id="permanentAddress"
//               placeholder="province Name"
//               type="text"
//               list="province"
//               rows="10"
//             ></input>
//             <datalist id="province">
//               {province.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </datalist>
//             <input
//               className="w-1/3 p-2 rounded-xl placeholder:text-zinc-800 placeholder:font-[400] border-2 border-zinc-400"
//               name="permanentAddress"
//               id="permanentAddress"
//               placeholder="District Address"
//               type="text"
//               rows="10"
//             ></input>
//             <input
//               className="w-1/3 p-2 rounded-xl placeholder:text-zinc-800 placeholder:font-[400] border-2 border-zinc-400"
//               name="permanentAddress"
//               id="permanentAddress"
//               placeholder="Municipality Address"
//               type="text"
//               rows="10"
//               required
//             ></input>
//           </div>
//           <span>
//             <p className="text-zinc-900 font-semibold text-[18px]">
//               {" "}
//               Upload Staff Image{" "}
//             </p>
//           </span>
//           <div className="border border-zinc-400 flex gap-2 p-2 justify-between">
//             <div className="h-44 w-44 border-2 p-2 border-zinc-400 rounded-xl flex items-center justify-center cursor-pointer">
//               <img
//                 src="https://cdn3.iconfinder.com/data/icons/photo-tools/65/upload-512.png"
//                 alt=""
//               />
//               <input
//                 type="file"
//                 required
//                 name="productImage"
//                 id="productImage"
//                 className="hidden"
//                 multiple
//               />
//             </div>

//             <div className="flex gap-2">
//               <div className="relative border-2 border-zinc-400 rounded-xl flex items-center justify-center cursor-pointer group">
//                 <img
//                   src="https://scontent.fktm21-1.fna.fbcdn.net/v/t1.6435-9/126373307_118583316727641_1586425431469850350_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=VdzXcJj9Fx4Q7kNvgFw2sIu&_nc_oc=AdjnM24VSaN72SrvdOT84ypwaiPJ8R8jY8q7FDuT8PrYT4WDGTi3U4plZa__l6V-_jTVlhHqvI6rnlZGzfKUc0Yu&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=ANqNlbdpGl9PaVqf5qR78ud&oh=00_AYDyrhf7e38PZiDVZx1u1VQvYeNnmyImDFeKoBjIi_qr7g&oe=67E42312"
//                   alt={`Uploaded Image `}
//                   className="w-44 h-44 overflow-hidden rounded-xl object-cover"
//                 />
//                 <span className="hidden group-hover:flex items-center absolute top-2 right-2 justify-center h-8 w-8 rounded-full bg-red-600 cursor-pointer">
//                   <RxCross2 className="text-2xl text-white" />
//                 </span>
//               </div>
//             </div>
//           </div>
//           <span>
//             <p className="text-zinc-900 font-semibold text-[18px]">
//               Temporary Address
//             </p>
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
//               voluptate labore impedit! Sapiente ex officiis blanditiis
//             </p>
//           </span>
//           <div className="border p-2 justify-between border-zinc-400 flex gap-1 ">
//             <div className="flex gap-4 flex-wrap">
//               <input
//                 className="w-1/2 p-2 rounded-xl placeholder:text-zinc-800 placeholder:font-[400] border-2 border-zinc-400"
//                 name="permanentAddress"
//                 id="permanentAddress"
//                 placeholder="province Name"
//                 type="text"
//                 list="province"
//                 rows="10"
//               ></input>
//               <datalist id="province">
//                 {province.map((category, index) => (
//                   <option key={index} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </datalist>
//               <input
//                 className="w-1/2 p-2 rounded-xl placeholder:text-zinc-800 placeholder:font-[400] border-2 border-zinc-400"
//                 name="permanentAddress"
//                 id="permanentAddress"
//                 placeholder="District Address"
//                 type="text"
//                 rows="10"
//               ></input>
//               <input
//                 className="w-1/2 p-2 rounded-xl placeholder:text-zinc-800 placeholder:font-[400] border-2 border-zinc-400"
//                 name="permanentAddress"
//                 id="permanentAddress"
//                 placeholder="Municipality Address"
//                 type="text"
//                 rows="10"
//                 required
//               ></input>
//             </div>
//             <div className="h-44 w-72 relative rounded-xl group"></div>
//           </div>
//           <div className="flex flex-col gap-3">
//             <p className="text-zinc-500 text-[16px]">
//               Product Category Lorem ipsum dolor sit amet consectetur
//               adipisicing elit. Nam obcaecati unde eum quod
//             </p>
//             <input
//               className="w-52 p-2 rounded-xl placeholder:text-black border-2 border-zinc-400"
//               type="text"
//               placeholder="Product Category"
//               name="productCategory"
//               list="productCategory"
//               required
//             />
//             {/* <datalist id="productCategory">
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </datalist> */}
//           </div>
//           <div className="flex gap-2">
//             <div>
//               <input
//                 className="w-80 p-2 rounded-xl placeholder:text-black border-2 border-zinc-400"
//                 type="text"
//                 placeholder="Product Category By Age"
//                 name="productCategoryByAge"
//                 list="productCategoryByAge"
//                 required
//               />
//               {/* <datalist id="productCategoryByAge">
//                 {ageCategories.map((age, index) => (
//                   <option key={index} value={age}>
//                     {age}
//                   </option>
//                 ))}
//               </datalist> */}
//             </div>
//             <div>
//               <input
//                 className="w-52 p-2 rounded-xl placeholder:text-black border-2 border-zinc-400"
//                 type="text"
//                 placeholder="Product Brand"
//                 name="productBrand"
//                 list="productBrand"
//               />
//               {/* <datalist id="productBrand">
//                 {brands.map((brand, index) => (
//                   <option key={index} value={brand} />
//                 ))}
//               </datalist> */}
//             </div>
//           </div>
//           <div>
//             <input
//               className="w-52 p-2 rounded-xl placeholder:text-black border-2 border-zinc-400"
//               type="text"
//               placeholder="Product Type"
//               name="productType"
//               list="productType"
//               required
//             />
//             {/* <datalist id="productType">
//               {productTypes.map((type, index) => (
//                 <option key={index} value={type} />
//               ))}
//             </datalist> */}
//           </div>

//           <button type="submit" className="w-52 mt-4">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
