import React from "react";

function loading() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#455BB1]"></div>
    </div>
  );
}

export default loading;
