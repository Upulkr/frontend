import React, { Children } from "react";
import Topbar from "./../../components/layout/Topbar";
import Image from "next/image";

function HomeLayout({ children }) {
  return (
    <>
      <div className="bg-blue-800 h-1/2 ">
        <Topbar />
        {children}
      </div>{" "}
      <div className="flex justify-between">
        <div className="w-1/2">
          <Image src="/girl.jpg" alt="Girl" width={800} height={600} />
        </div>
        <div className="w-1/2">
          <Image src="/hotel.jpg" alt="Hotel" width={800} height={600} />
        </div>
      </div>
    </>
  );
}

export default HomeLayout;
