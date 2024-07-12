import React from "react";
import Topbar from "../../../../components/layout/Topbar";

const layout = ({ children }) => {
  return <div>
       <Topbar/>
    {children}</div>;
};

export default layout;
