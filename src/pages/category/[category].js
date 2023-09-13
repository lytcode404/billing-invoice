import Cards from "@/Components/User/Cards";
import CategoryCard from "@/Components/User/CategoryCard";
import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Category = () => {
  const [categoryData, setCategoryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { category } = router.query;
  useEffect(() => {
    const fetchData = async () => {
      if (category) {
        try {
          const querySnapshot = await getDocs(collection(db, category));
          const categoryData = {};

          querySnapshot.forEach((doc) => {
            categoryData[doc.id] = doc.data();
          });
          // console.log(categoryData);
          setCategoryData(categoryData);
          setIsLoading(false);
        } catch (error) {
          console.error(`Error fetching data for ${category}:`, error);
        }
      }
    };
    fetchData();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Cards categoryData={categoryData} category={category}/>
    </>
  );
};

export default Category;
