import Image from "next/image";
import React from "react";

const CategoryCard = ({data, disease}) => {
  console.log(data)
  return (
    <div className=" shadow-md rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-center  mb-4">
          Ayurvedic Healing
        </h2>
        <div className="flex flex-col space-y-2 text-center ">
          <Image
            width={328}
            height={364}
            src="/assets/ayurveda.png" 
            alt="Ayurvedic Herbs"
            className="w-32 h-16 mx-auto rounded-full  shadow-md bg-white px-4 py-2"
          />
          <p className="text-lg">
            Traditional Ayurvedic remedy for
            <span className="text-[aqua]">{" "}{disease}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 gap-y-5 sm:gap-y-0 lg:mx-auto lg:max-w-6xl">
        <div className="grid grid-cols-2 mt-20 ">
          <div className="col-span-2 px-3 pb-3 dark2f-slate-700 f-gray-50 sm:col-span-1 sm:flex sm:flex-col sm:justify-center sm:pl-7 sm:f-t lg:f-r">
            <h2 className="text-2xl font-semibold  mb-2">
              Symptoms
            </h2>
          
            <p className="">
              {data.symptoms}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Image
              height="500"
              width="500"
              alt="alt"
              className="w-full rounded "
              src="/assets/rishi.png"
            />
          </div>
        </div>

        {/*  */}
        <div className="grid grid-cols-2 mt-20 ">
          <div className=" col-span-2 order-2 sm:col-span-1 sm:order-none">
            <Image
              height="500"
              width="500"
              alt="alt"
              className="w-full h-full  rounded"
              src="/desktop person.png"
            />
          </div>
          <div className="col-span-2 px-3 pb-3 dark2f-slate-700 f-gray-50 sm:col-span-1 sm:flex sm:flex-col sm:justify-center sm:pl-7 sm:f-t lg:f-r">
            <h2 className="text-2xl font-semibold  mb-2">
              Remedy Ingredients
            </h2>
            <ul className="list-disc pl-4 ">
              {data && data.remedyIngredients.map((ingredient, i)=>(
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
        </div>
        {/*  */}

        <div className="grid grid-cols-2 mt-10 w-full">
          <div className="col-span-2 px-3 pb-3  sm:col-span-1 sm:flex sm:flex-col sm:justify-center sm:pl-7 ">
            <h2 className="text-2xl font-semibold  mb-2">
              Dosage
            </h2>
            <p className="">
              {data.dosage}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1 items-center">
            <Image
              height="500"
              width="500"
              alt="alt"
              className="w-full rounded h-full"
              src="/assets/rishi2.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
