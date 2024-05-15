import axiosClient from "@/config/axiosClient";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  nameValue?: string;
  passwordValue?: string;
  emailValue?: string;
  roleValue?: string,
  addressValue?: string,
}

export const CreateUserModal = ({
  onClose,
  nameValue = "",
  passwordValue = "",
  emailValue = "",
  roleValue = "",
  addressValue = "",

}: Props) => {
  const [name, setName] = useState(nameValue);
  const [password, setPassword] = useState(passwordValue);
  const [email, setEmail] = useState(emailValue);
  const [role, setRole] = useState(roleValue);
  const [address, setAddress] = useState(addressValue);

  const router = useRouter();

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    const { data } = await axiosClient.post("/auth/register", {
      name,
      email,
      password,
      role,
      address,
    });
    if (!data) return;
    router.refresh();
    handleClose();
    toast.success("Usuario creado");
  };

  console.log(name, password, email, role, address)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg ">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Registrar Usuario</h3>
            <button
              className="rounded-md bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 "
              type="button"
              onClick={handleClose}
            >
              <XIcon className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="mt-4">
            <div className="mb-6">
              <div className="mb-6">
                <div className="flex justify-between gap-5">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Nombre de Usuario
                    </label>
                    <input
                      className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="name"
                      placeholder="Alexis"
                      required
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                    <input
                      className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-5">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="alexis@alexis.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Dirección
                    </label>
                    <input
                      className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="address"
                      type="text"
                      placeholder="Calle 1234, Ciudad, País"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Rol
                  </label>
                  <select
                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="role"
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                  </select>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
