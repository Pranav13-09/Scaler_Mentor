import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <InfinitySpin className="text-5xl" width="200" color="#ffaf76" />
    </div>
  );
};

export default Loader;