import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

 
 const diseaseCategory = [
    "Digestive",
    "Respiratory",
    "Musculoskeletal",
    "Skin and Hair",
    "Reproductive",
    "Cardiovascular and General",
  ];

 const InstantTest = () => {
    return (
      <div className="container mx-auto py-4 flex flex-col items-center justify-between">
        <div className="w-[85%] text-start mb-4">
          <h1 className="text-2xl font-bold mb-4">Ayurvedic Healing for Common Ailments</h1>
          <p>
          Nature&apos;s pharmacy holds the key to healing. Ayurveda illuminates the path to wellness, one holistic remedy at a time
          </p>
        </div>
  
        <div className="mt-4 w-[90%] grid grid-cols-2 gap-3 justify-center items-center">
          {diseaseCategory &&
            diseaseCategory.map((category, index) => (
              <BulletCard key={index} title={category} image={`/assets/ayurveda2.png`} />
            ))}
        </div>
      </div>
    );
  };

  export default InstantTest 


  const BulletCard = ({ title, image }) => {
    return (
      <>
        <Head>
          <style>
            {`
        #card:hover svg {
          transform: translateX(5px);
          transition: transform 0.3s ease-in-out;
        }
      `}
          </style>
        </Head>
        <Link
          href={`category/${title}`}
          id="card"
          className="card rounded-lg overflow-hidden shadow-md bg-[#247e6c59] hover:shadow-lg transition duration-300 ease-in-out flex justify-between items-center cursor-pointer hover:scale-110 p-4 w-full"
        >
          <div className="flex justify-between items-center">
            <Image
              src={image}
              alt={title}
              height={44}
              width={44}
              className="rounded-full w-11 h-11 mr-4"
            />
            <div className="py-4">
              <h2 className="text-md">{title}</h2>
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
      </>
    );
  };