import Invoice from "@/Components/User/Invoice";
import Question from "@/Components/User/Question";
import { db } from "@/db/firebase";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateInvoice = () => {
  const [cName, setCName] = useState("");
  const [cEMail, setCEMail] = useState("");
  const [cPh, setCPh] = useState("");

  const [questions, setQuestions] = useState([]);

  const [newItem, setNewItem] = useState({
    ItemName: "",
    ItemPrice: 0,
    ItemQuantity: 1,
  });

  const [updateMode, setUpdateMode] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: name === "ItemPrice" ? parseFloat(value) : value,
    });
  };

  const addNewItem = () => {
    if (!newItem.ItemName || newItem.ItemPrice <= 0) {
      toast.error("Please fill out product name and price.");
      return;
    }

    if (updateMode) {
      const updatedQuestions = [...questions];
      updatedQuestions[updateIndex] = newItem;
      setQuestions(updatedQuestions);
      setNewItem({
        ItemName: "",
        ItemPrice: 0,
        ItemQuantity: 1,
      });
      setUpdateMode(false);
      setUpdateIndex(null);
    } else {
      setQuestions([...questions, newItem]);
      setNewItem({
        ItemName: "",
        ItemPrice: 0,
        ItemQuantity: 1,
      });
    }
  };

  const deleteItem = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const editItem = (index) => {
    setUpdateMode(true);
    setUpdateIndex(index);
    setNewItem(questions[index]);
    deleteItem(index); // Remove the item from the table
  };

  const calculateTotal = () => {
    return questions.reduce(
      (total, item) => total + item.ItemPrice * item.ItemQuantity,
      0
    );
  };

  const handleUploadTest = async () => {
    if (cName.trim() === "" || cEMail.trim() === "" || cPh.trim() === ""){
      toast.error("Please fill out customer Name and customer Email and customer Phone");
      return;
    }
    if(questions.length <=0){
      toast.error("Please fill out product details");
      return;
    }
    const combinedObject = {
      customerData: {
        cName,
        cEMail,
        cPh,
      },
      questions,
      grandTotal: calculateTotal(),
    };

    // console.log(combinedObject)
    
    try {
      const categoryDocRef = doc(db, "invoices", cName+"$"+cEMail);
      await setDoc(categoryDocRef, combinedObject);

      toast.success("Uploaded successfully");
      setCEMail("");
      setCName("");
      setCPh("");
      setQuestions([]);
    } catch (error) {
      console.error("Error uploading test:", error);
      toast.error("An error occurred while uploading the test.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0033297e] p-8 gap-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Customer Name:</h2>

        <input
          className="border rounded px-2 py-1 mr-2 bg-inherit"
          type="text"
          placeholder="Customer Name"
          value={cName}
          onChange={(e) => {
            setCName(e.target.value);
          }}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Customer Email:</h2>

        <input
          className="border rounded px-2 py-1 mr-2 bg-inherit"
          type="email"
          placeholder="Customer Email"
          value={cEMail}
          onChange={(e) => {
            setCEMail(e.target.value);
          }}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Customer Ph:</h2>

        <input
          className="border rounded px-2 py-1 mr-2 bg-inherit"
          type="number"
          placeholder="Customer Ph"
          value={cPh}
          onChange={(e) => {
            setCPh(e.target.value);
          }}
        />
      </div>

      <div className="max-w-screen-md mx-auto p-4 text-black">
        <h1 className="text-2xl font-bold mb-4">Invoice</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Add Item</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              name="ItemName"
              placeholder="Product Name"
              value={newItem.ItemName}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-1/3"
            />
            <input
              type="number"
              name="ItemPrice"
              placeholder="Price"
              value={newItem.ItemPrice}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-1/3"
            />
            <input
              type="number"
              name="ItemQuantity"
              placeholder="Quantity"
              value={newItem.ItemQuantity}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-1/3"
            />
            <button
              onClick={addNewItem}
              className={`bg-${
                updateMode ? "yellow" : "blue"
              }-500 text-white px-4 py-2 rounded hover:bg-${
                updateMode ? "yellow" : "blue"
              }-600`}
            >
              {updateMode ? "Update" : "Add"}
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Invoice Items</h2>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="text-left">PRODUCT</th>
                <th className="text-left">PRICE</th>
                <th className="text-left">QUANTITY</th>
                <th className="text-left">TOTAL</th>
                <th className="text-left">EDIT</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.ItemName}</td>
                  <td className="border px-4 py-2">{item.ItemPrice}</td>
                  <td className="border px-4 py-2">{item.ItemQuantity}</td>
                  <td className="border px-4 py-2">
                    {item.ItemPrice * item.ItemQuantity}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => editItem(index)}
                      className={`bg-${
                        updateMode ? "yellow" : "green"
                      }-500 text-white px-2 py-1 rounded hover:bg-${
                        updateMode ? "yellow" : "green"
                      }-600 mr-2`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">
            Grand Total: {calculateTotal()}
          </h2>
        </div>
      </div>

      <div className="my-4">
        <button
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          onClick={handleUploadTest}
        >
          Upload Test
        </button>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default CreateInvoice;
