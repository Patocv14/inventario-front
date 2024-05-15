import { User } from "@/auth/interfaces/User.interface";
import axiosClient from "@/config/axiosClient";
import toast from "react-hot-toast";
import TableItem from "./TableItem";
import CreateUserButton from "./CreateUserButton";

const getUsers = async (): Promise<User[] | null> => {
  const { data } = await axiosClient.get<User[]>("/auth");
  if (!data) {
    toast.error("No se pudieron obtener los usuarios");
    return null;
  }
  return data;
};

export const UserTable = async () => {
  const users = await getUsers();
  if (!users)
    return (
      <div className="text-center">No se pudieron obtener los usuarios</div>
    );

  return (
    <>
      <div className="flex justify-between py-5">
        <div>
          <h1 className="text-2xl font-bold">Users Page</h1>
        </div>
        <div>
          <CreateUserButton />
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Rol
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <TableItem users={users} />
          </tbody>
        </table>
      </div>
    </>
  );
};
