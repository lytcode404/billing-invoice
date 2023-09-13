import React from "react";
import Dropdown from "./Dropdown";

const AllIngred = ({ ingredientDetails }) => {
  console.log(ingredientDetails);
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto text-white">
      <div className="max-w-2xl mx-auto mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-white">
            You might be wondering...
          </h2>
        </div>
        
      <ul>
        <div>
          {Object.keys(ingredientDetails).map((key, index) => (
            <Dropdown key={index} data={ingredientDetails[key]} />
          ))}
        </div>
      </ul>
    </div>
  );
};

export default AllIngred;
