"use client";

import { User } from "@/auth/interfaces/User.interface";
import axiosClient from "@/config/axiosClient";
import { Trash2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { CreateUserModal } from "./CreateUserModal";
import { EditUserModal } from "./EditUserModa";

interface Props {
  users: User[];
}

const TableItem = ({ users }: Props) => {
  const [userData, setUserData] = useState(users);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const deleteUser = useCallback(
    async (id: string) => {
      try {
        await axiosClient.delete(`/auth/${id}`);
        setUserData(userData.filter((user) => user.id !== id));
        router.refresh();
        toast.success("Usuario eliminado");
      } catch (error) {
        toast.error("No se pudo eliminar el usuario");
      }
    },
    [userData, router]
  );

  return (
    <>
      {userData &&
        userData.map((user) => (
          <tr
            key={user.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-white"
          >
            <th scope="row" className="px-5 font-medium whitespace-nowrap">
              {user.name}
            </th>
            <td className={`px-6 py-4`}>{user.email}</td>
            <td className="px-6 py-4">{user.address || "No Address"}</td>
            <td className={`px-6 py-4 `}>{user.role}</td>
            <td className=" py-4 flex gap-5">
              <Trash2
                className="cursor-pointer text-red-500"
                onClick={() => deleteUser(user.id)}
              />
              <Pencil
                className="cursor-pointer text-blue-500"
                onClick={() => toggleModal()}
              />
              {isOpen && <EditUserModal onClose={toggleModal} userValue={{...user}} />}
            </td>
          </tr>
        ))}
    </>
  );
};

export default TableItem;
