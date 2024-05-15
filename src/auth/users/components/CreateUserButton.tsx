"use client";
import { useState } from "react";
import { CreateUserModal } from "./CreateUserModal";


const CreateUserButton = () => {

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
        Crear Usuario
      </button>
      {isOpen && <CreateUserModal onClose={toggleModal} />}
    </>
  );
};

export default CreateUserButton;
