import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const CreatedInvoice = () => {
  const [data, setData] = useState([]);
  //   const [pdf, setPdf] = useState(null);


  useEffect(() => {
    const collectionRef = collection(db, "invoices");

    const fetchData = async () => {
      const querySnapshot = await getDocs(collectionRef);
      const dataObject = {};
      querySnapshot.forEach((doc) => {
        dataObject[doc.id] = doc.data();
      });

      console.log(dataObject);
      setData(dataObject);
    };

    fetchData();
  }, []);



  return (
    <div>
      <div>
        <h1>Customer List</h1>
        <ul>
          {Object.keys(data).map((key) => {
            const [customerName, email] = key.split("$");
            return (
              <li key={key}>
                <Link href={`/${key}`}>
                  {customerName} - {email}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CreatedInvoice;
