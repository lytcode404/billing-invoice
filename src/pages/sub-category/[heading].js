import CategoryCard from "@/Components/User/CategoryCard";
import { db } from "@/db/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const Heading = () => {
  const router = useRouter();
  const { heading, category } = router.query;
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const documentRef = doc(db, category, heading);
      try {
        const documentSnapshot = await getDoc(documentRef);
        if (documentSnapshot.exists()) {
          const fetchedData = documentSnapshot.data();
          setData(fetchedData);
          
          setIsLoading(false)
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [router]);

  if(isLoading){
    return "loding..."
  }
  // console.log(data)

  return (
    <>
      <CategoryCard data={data} disease={heading}/>
    </>
  );
};

export default Heading;
