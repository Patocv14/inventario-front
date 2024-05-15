"use client";

import { User } from "@/auth/interfaces/User.interface";
import axiosClient from "@/config/axiosClient";
import { Trash2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Products } from "../interfaces/Prodct.interface";
import { EditProductModal } from "./EditProductModal";

interface Props {
  products: Products[];
}

const TableItem = ({ products }: Props) => {
  const [prodctData, setProdctData] = useState(products);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const deleteUser = useCallback(
    async (id: string) => {
      try {
        await axiosClient.delete(`/product/${id}`);
        setProdctData(prodctData.filter((product) => product.id !== id));
        router.refresh();
        toast.success("Producto eliminado");
      } catch (error) {
        toast.error("No se pudo eliminar el producto");
      }
    },
    [prodctData, router]
  );

  return (
    <>
      {prodctData &&
        prodctData.map((product) => (
          <tr
            key={product.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-white"
          >
            <th scope="row" className="px-5 font-medium whitespace-nowrap">
              {product.name}
            </th>
            <td className={`px-6 py-4`}>{product.price}</td>
            <td className="px-6 py-4">{product.description || "No Description"}</td>
            <td className={`px-6 py-4 `}>{product.stock}</td>
            <td className={`px-6 py-4 `}>{product.categoryId}</td>
            <td className={`px-6 py-4 `}>{product.categoryId}</td>
            <td className=" py-4 flex gap-5">
              <Trash2
                className="cursor-pointer text-red-500"
                onClick={() => deleteUser(product.id)}
              />
              <Pencil
                className="cursor-pointer text-blue-500"
                onClick={() => toggleModal()}
              />
              {isOpen && <EditProductModal onClose={toggleModal} productValue={{...product}} />}
            </td>
          </tr>
        ))}
    </>
  );
};

export default TableItem;
