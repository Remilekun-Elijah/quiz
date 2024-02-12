/* eslint-disable react/prop-types */
import React from "react";

const Emptystate = ({ pagination, msgArray }) => {
  return (
    <div className="text-center py-20 bg-[#EAEAEA4D]">
      <div className="flex justify-center mt-0 items-center flex-col">
        <img
          src="./empty_folder.svg"
          className="my-0 py-0 h-[200px] w-[180px]"
          alt="empty state"
        />
        {pagination.search ? (
          <p className="leading-5 text-[#71717A] text-lg">
            {msgArray?.[0] || "No record found."}
          </p>
        ) : (
          <>
            <p className="leading-5 text-[#71717A] text-lg">
              {msgArray?.[0] || "No record found for this page at the moment."}
            </p>
            <p className="leading-8 text-[#71717A] text-lg">
              {msgArray?.[1] || "Kindly check back later."}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Emptystate;
