import React, { useRef } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";

import JsPDF from "jspdf";
const PdfInvoice = ({
  total,
  subTotal,
  taxAmount,
  data,
  currentDate,
  formattedTime,
}) => {
  const invoiceRef = useRef(null);

  const handleDownloadPDF = () => {
    const invoice = new JsPDF("portrait", "pt", "a4");
    invoice.html(invoiceRef.current).then(() => {
      invoice.save("invoice.pdf");
    });
  };
  const generatePDF = () => {
    const content = document.getElementById("invoice");
    const pdf = new JsPDF({
      orientation: "landscape", // Set the orientation to landscape
      unit: "pt",
      format: "a4",
    });

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Calculate the correct dimensions for the PDF page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const widthRatio = pdfWidth / imgWidth;
      const heightRatio = pdfHeight / imgHeight;
      const ratio = Math.min(widthRatio, heightRatio);

      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;

      // Add the image to the PDF with adjusted dimensions
      pdf.addImage(imgData, "PNG", 0, 0, newWidth, newHeight);

      // Save or download the PDF
      pdf.save("invoice.pdf");
    });
  };
  return (
    <>
      <div id="invoice" ref={invoiceRef }>
        <div className="flex text-black items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full bg-white shadow-lg">
            <div className="flex justify-between p-4">
              <div>
                <h1 className="text-3xl italic font-extrabold tracking-widest text-indigo-500">
                  AMAZON
                </h1>
                <p className="text-base">India ki apni dukan, Amazon</p>
              </div>
              <div className="p-2">
                <ul className="flex">
                  <li className="flex flex-col items-center p-2 border-l-2 border-indigo-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    <span className="text-sm text-black">
                      <Link href="www.amazon.com">www.amazon.com</Link>
                    </span>
                  </li>
                  <li className="flex text-black flex-col p-2 border-l-2 border-indigo-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm text-black">new Delhi, India ,110035</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full h-0.5 bg-indigo-500" />
            <div className="flex justify-between p-4">
              <div>
                <h6 className="font-bold text-black">
                  Order Date :{" "}
                  <span className="text-sm font-medium text-black"> {currentDate}</span>
                </h6>
                <h6 className="font-bold">
                  Order ID :{" "}
                  <span className="text-sm font-medium text-black"> {formattedTime}</span>
                </h6>
              </div>
              <div className="w-40 text-black">
                <address className="text-sm">
                  {data.customerData&&<>
                    <span className="font-bold"> Billed To : </span>
                    {data.customerData.cName} Shahdara, Delhi, 110032, India
                  </>}
                </address>
              </div>
              <div className="w-40">
                <address className="text-sm text-black">
                  {data.customerData &&<>
                    <span className="font-bold">Ship To :</span>
                    {data.customerData.cName} Shahdara, Delhi, 110032, India
                    <span className="font-semibold"> Phone: </span>
                    {data.customerData.cPh}
                    <span className="font-semibold"> Email: </span>
                    {data.customerData.cEMail}
                  </>}
                </address>
              </div>
              <div />
            </div>
            <div className="flex justify-center p-4 w-full text-black">
              <div className="border-b border-gray-200 shadow">
                <table className="">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-xs text-gray-500 ">#</th>
                      <th className="px-4 py-2 text-xs text-gray-500 ">
                        Product Name
                      </th>
                      <th className="px-4 py-2 text-xs text-gray-500 ">
                        Quantity
                      </th>
                      <th className="px-4 py-2 text-xs text-gray-500 ">Rate</th>
                      <th className="px-4 py-2 text-xs text-gray-500 ">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-black">
                    {data.questions &&
                      data.questions.map((item, index) => {
                        return (
                          <tr
                            className="whitespace-nowrap"
                            key={item.name + index}
                          >
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {item.ItemName}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {item.ItemQuantity}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              ${item.ItemPrice}
                            </td>
                            <td className="px-6 py-4">${parseInt(item.ItemQuantity) *
                            parseInt(item.ItemPrice)}</td>
                          </tr>
                        );
                      })}

                    <tr className="py-3 my-3 text-black">
                      <td colSpan={3} />
                      <td className="text-sm font-bold">Sub Total</td>
                      <td className="text-sm font-bold tracking-wider">
                        <b>${subTotal}</b>
                      </td>
                    </tr>
                    {/*end tr*/}
                    <tr>
                      <th colSpan={3} />
                      <td className="text-sm font-semibold">
                        <b>GST Rate</b>
                      </td>
                      <td className="text-sm font-semibold">
                        <b>18%</b>
                      </td>
                    </tr>

                    <tr className="my-2">
                      <th colSpan={3} />

                      <td className="text-sm font-semibold">
                        <b>GST Ammout</b>
                      </td>
                      <td className="text-sm font-semibold">
                        <b>${taxAmount}</b>
                      </td>
                    </tr>
                    {/*end tr*/}

                    <tr className="text-white bg-gray-800 my-2 py-3">
                      <th colSpan={3} />
                      <td className="text-sm font-bold py-3">
                        <b>Total</b>
                      </td>
                      <td className="text-sm font-bold py-3">
                        <b>${parseInt(subTotal)+parseInt(taxAmount)}</b>
                      </td>
                    </tr>
                    {/*end tr*/}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-between p-4">
              <div>
                <h3 className="text-xl">Terms And Condition :</h3>
                <ul className="text-xs list-disc list-inside">
                  <li>
                    All accounts are to be paid within 7 days from receipt of
                    invoice.
                  </li>
                  <li>
                    To be paid by cheque or credit card or direct payment
                    online.
                  </li>
                  <li>
                    If account is not paid within 7 days the credits details
                    supplied.
                  </li>
                </ul>
              </div>
              <div className="p-4">
                <h3>Signature</h3>
                <div className="text-4xl italic text-indigo-500">AAA</div>
              </div>
            </div>
            <div className="w-full h-0.5 bg-indigo-500" />
            <div className="p-4">
              <div className="flex items-center justify-center">
                Thank you very much for doing business with us.
              </div>
              <div className="flex items-end justify-end space-x-3">
                <button
                  onClick={generatePDF}
                  className="px-4 py-2 text-sm text-blue-600 bg-blue-100"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfInvoice;
