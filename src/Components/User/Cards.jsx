import Image from "next/image";
import Link from "next/link";
const Cards = ({ categoryData, category }) => {
  if (!categoryData) {
    return "none";
  }
  // console.log(categoryData);
  return (
    <div className="grid gap-6 my-8 md:grid-cols-2 xl:grid-cols-4">
      {/* <!-- Card --> */}
      {categoryData && Object.keys(categoryData).length > 0 ? (
        <>
          {Object.keys(categoryData).map((subCategoryKey, i) => (
            <Card
              icon={`/assets/ayurveda.png`}
              key={i}
              category={category}
              categoryData={categoryData}
              heading={subCategoryKey}
              subHeading={
                categoryData[subCategoryKey].remedyIngredients[0] + "..."
              }
            />
          ))}
        </>
      ) : (
        <p>No Data Found for Evaluation</p>
      )}
    </div>
  );
};

export default Cards;

const Card = ({ icon, heading, subHeading, categoryData, category }) => {
  const serializedCategoryData = JSON.stringify(categoryData);
  return (
    <Link
      href={`/sub-category/${heading}?category=${category}`}
      className="flex justify-between hover:scale-105 items-center p-2 bg-[#247e6c59] rounded-lg shadow-xs"
    >
      <div className="flex justify-between items-center">
        <Image
          src={icon}
          height={44}
          width={44}
          className="rounded-full w-11 h-11 mr-4"
        />
        <div>
          <p className="mb-2 text-md font-medium">{heading}</p>
          <p className="text-md font-semibold ">
            {subHeading.slice(0, 20) + " ..."}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
    </Link>
  );
};
