
import Dashboard from '@/Components/User/Dashboard'
import { db } from '@/db/firebase';
import { collection, getDocs } from 'firebase/firestore';

import React, { useEffect, useState } from 'react'

const Home = () => {
  const [data, setData] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        const collectionData1 = await fetchCollectionData('Cardiovascular and General');
        const collectionData2 = await fetchCollectionData('Digestive');
        const collectionData3 = await fetchCollectionData('Musculoskeletal');
        const collectionData4 = await fetchCollectionData('Reproductive');
        const collectionData5 = await fetchCollectionData('Respiratory');
        const collectionData6 = await fetchCollectionData('Skin and Hair');

        // Combine data from all collections into one array Cardiovascular and General 


        const combinedData = {
          'Cardiovascular and General': collectionData1,
          'Digestive': collectionData2,
          'Musculoskeletal': collectionData3,
          'Reproductive': collectionData4,
          'Respiratory': collectionData5,
          'Skin and Hair': collectionData6,
        };

        setData(combinedData);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);


  async function fetchCollectionData(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));

      const categoryData = {};

      querySnapshot.forEach((doc) => {
        categoryData[doc.id] = doc.data();
      });
  
      return categoryData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  if (!data) {
    return "Loading...";
  }
  return (
    <><Dashboard data={data}/></>
  )
}

export default Home