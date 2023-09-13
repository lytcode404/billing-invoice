// pages/[customer].js
import PdfInvoice from "@/Components/User/PdfInvoice";
import { db } from "@/db/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const CustomerPage = () => {
  const router = useRouter();
  const { customer } = router.query;
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0.18);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);
              
  const invoiceRef = useRef(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const invoiceDocRef = doc(db, "invoices", customer);
        const invoiceSnapshot = await getDoc(invoiceDocRef);

        if (invoiceSnapshot.exists()) {
          const invoiceData = invoiceSnapshot.data();
         
          setData(invoiceData);
        } else {
          console.log("Document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

   
    fetchInvoice();
  }, [customer]);

  useEffect(() => {
    // Get the current date and time
    const currentDateObj = new Date();
    const year = currentDateObj.getFullYear();
    const month = (currentDateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDateObj.getDate().toString().padStart(2, "0");
    const hours = currentDateObj.getHours();
    const minutes = currentDateObj.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedTimeString = `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    setCurrentDate(`${year}-${month}-${day}`);
    setFormattedTime(formattedTimeString);
  }, []);

  const generatePDF = () => {
    const content = invoiceRef.current;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4",
      });

      // Calculate the dimensions for the PDF page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Save the PDF
      pdf.save("invoice.pdf");
    });
  };

  if (!data) {
    return "loading...";
  }
  console.log(data ? "not empty" : "empty");

  useEffect(() => {
    setSubTotal(parseInt(data.grandTotal))
    setTaxAmount((subTotal*taxRate).toFixed(2))
    setTotal(subTotal+taxAmount)
  }, [data, subTotal, taxAmount, taxRate, total])
  
  
  return (
    <div>
      {data && (
        <>
          <div id="invoice" ref={invoiceRef}>
            <div>
              <h1>Invoice</h1>
              <p>Order Date: {currentDate}</p>
              <p>Order ID: {formattedTime}</p>
              {data.customerData && (
                <div>
                  <p>Customer Name: {data.customerData.cName}</p>
                  <p>Customer Email: {data.customerData.cEMail}</p>
                  <p>Customer Phone: {data.customerData.cPh}</p>
                </div>
              )}
            </div>

            {/* Items */}
            <div>
              <h2>Items</h2>
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Item Quantity</th>
                    <th>Item Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {data.questions &&
                    data.questions.map((item, index) => (
                      <tr key={index}>
                        <td>{item.ItemName}</td>
                        <td>{item.ItemQuantity}</td>
                        <td>${item.ItemPrice}</td>
                        <td>
                          $
                          {parseInt(item.ItemQuantity) *
                            parseInt(item.ItemPrice)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Grand Total */}
            <div>
              <h2>Grand Total</h2>
              <p>Sub Total: ${subTotal&&subTotal}</p>
              <p>GST Rate: {taxRate&&taxRate}%</p>
              <p>GST Amount: ${taxAmount&&taxAmount}</p>
              <p>Total: ${subTotal&&taxAmount && (parseInt(taxAmount)+parseInt(subTotal))}</p>
            </div>

            {/* Terms and Conditions */}
            <div>
              <h3>Terms And Condition:</h3>
              <ul>
                <li>
                  All accounts are to be paid within 7 days from receipt of
                  invoice.
                </li>
                <li>
                  To be paid by cheque or credit card or direct payment online.
                </li>
                <li>
                  If account is not paid within 7 days, the credits details
                  supplied.
                </li>
              </ul>
            </div>
          </div>

          <PdfInvoice total={total} subTotal={subTotal} taxAmount={taxAmount} data={data} currentDate={currentDate} formattedTime={formattedTime} />
        </>
      )}
    </div>
  );
};

export default CustomerPage;
