import React from "react";
import { SlBasket } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";

export default function Sidebar() {
  return (
    <div className="h-fit border-b w-1/4 flex flex-col gap-9 bg-white items-center border-r border-zinc-500 py-10 ">
      <div className="flex flex-col items-center gap-6 border-b pb-10 w-full border-zinc-500">
        <img
          src="https://scontent.fktm21-1.fna.fbcdn.net/v/t1.6435-9/126373307_118583316727641_1586425431469850350_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=VdzXcJj9Fx4Q7kNvgFw2sIu&_nc_oc=AdjnM24VSaN72SrvdOT84ypwaiPJ8R8jY8q7FDuT8PrYT4WDGTi3U4plZa__l6V-_jTVlhHqvI6rnlZGzfKUc0Yu&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=ANqNlbdpGl9PaVqf5qR78ud&oh=00_AYDyrhf7e38PZiDVZx1u1VQvYeNnmyImDFeKoBjIi_qr7g&oe=67E42312"
          alt="profile"
          className="h-48 w-48 object-cover overflow-hidden rounded-full cursor-pointer"
        />
        <span>
          <h1 className="text-center text-zinc-900 font-semibold text-lg">
            Jiban Pandey
          </h1>
          <h1 className="text-center text-zinc-500 cursor-pointer">kalikot</h1>
        </span>
      </div>
      <div className="flex flex-col gap-2 border-b w-full items-center border-zinc-500 pb-10">
        <span className="flex gap-9 items-center cursor-pointer">
          <p className="text-center text-zinc-900 font-semibold text-lg">
            Branch Country :
          </p>
          <p className="text-center text-zinc-600 text-sm">Nepal</p>
        </span>
        <span className="flex gap-9 items-center cursor-pointer">
          <p className="text-center text-zinc-900 font-semibold text-lg">
            Branch District :
          </p>
          <p className="text-center text-zinc-600 text-sm">Kalikot</p>
        </span>
        <span className="flex gap-9 items-center cursor-pointer">
          <p className="text-center text-zinc-900 font-semibold text-lg">
            Branch Area :
          </p>
          <p className="text-center text-zinc-600 text-sm">Kalikot</p>
        </span>
      </div>

      <div className="flex gap-9 items-center justify-center w-full pb-10">
        <p className="text-center text-zinc-900 font-semibold text-lg cursor-pointer">
          Total Orders :
        </p>
        <div className="flex items-center gap-2 relative cursor-pointer">
          <span>
            <SlBasket className="cursor-pointer" size={35} />
          </span>
          <div className="absolute top-0 right-[40px] bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
            <p className="font-semibold text-xs">0</p>
          </div>
          <span>
            <p className="font-semibold text-sm">Cart</p>
          </span>
        </div>
      </div>
    </div>
  );
}
