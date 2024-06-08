import React from "react";
import { useParams } from "react-router-dom";

const Test = () => {
  const param = useParams();
  console.log("parems", param);
  return <div>hiii</div>;
};

export default Test;
