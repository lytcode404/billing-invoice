import React from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";


const Question = ({
  q,
  index,
  setQuestions,
  questions
}) => {

  


  const deleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const duplicateQuestion = (index) => {
    const duplicatedQuestion = { ...questions[index] };
    setQuestions([...questions, duplicatedQuestion]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };


  return (
    <div key={index} id={index} className=" p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Question {index + 1}</h2>
      <button
        className="bg-red-500 text-white py-1 px-2 rounded mb-2"
        onClick={() => deleteQuestion(index)}
      >
        Delete
      </button>
      <button
        className="bg-green-500 text-white py-1 px-2 rounded mb-2 ml-2"
        onClick={() => duplicateQuestion(index)}
      >
        Duplicate
      </button>

      <input
        type="text"
        className="border rounded w-full px-2 py-1 mb-2 bg-inherit"
        placeholder="Item Name"
        value={q.ItemName}
        onChange={(e) => updateQuestion(index, "ItemName", e.target.value)}
      />

      <input
        type="number"
        className="border rounded w-full px-2 py-1 mb-2 bg-inherit"
        placeholder="Item Price"
        value={q.ItemPrice}
        onChange={(e) => updateQuestion(index, "ItemPrice", e.target.value)}
      />
      
      <input
        type="number"
        className="border rounded w-full px-2 py-1 mb-2 bg-inherit"
        placeholder="Item Quantity"
        value={q.ItemQuantity}
        onChange={(e) => updateQuestion(index, "ItemQuantity", e.target.value)}
      />
    </div>
  );
};

export default Question;
