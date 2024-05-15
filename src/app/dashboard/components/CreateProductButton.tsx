"use client";
import { useState } from "react";
import { CreateProductModal } from "./CreateProductModal";


const CreateProductButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Crear Producto
      </button>
      {isOpen && <CreateProductModal onClose={toggleModal} />}
    </>
  );
};

export default CreateProductButton;
