import axiosClient from "@/config/axiosClient";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
}

export const CreateProductModal = ({ onClose }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("1");
  const [stock, setStock] = useState("");
  const [makerId, setMakerId] = useState("1");

  const router = useRouter();

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    console.log({ name, price, description, categoryId, stock, makerId });
    const { data } = await axiosClient.post("/product", {
      name,
      price: parseFloat(price),
      description,
      categoryId,
      stock: parseInt(stock),
      makerId,
    });

    if (!data) return;
    router.refresh();
    handleClose();
    toast.success("Usuario creado");
  };

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
                      Nombre del producto
                    </label>
                    <input
                      className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="name"
                      placeholder="Tornillo"
                      required
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Precio
                    </label>
                    <input
                      className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="price"
                      type="number"
                      placeholder="20"
                      required
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-5">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Description
                    </label>
                    <input
                      className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="text"
                      placeholder="Tornillo de 1/2 pulgadas"
                      required
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Categoria
                    </label>
                    <select
                      className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="categoryId"
                      onChange={(e) => setCategoryId(e.target.value)}
                      value={categoryId}
                    >
                      <option value="1">Categoria 1</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Stock
                  </label>
                  <input
                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="stock"
                    type="number"
                    placeholder="10"
                    required
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Creador
                  </label>
                  <select
                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="categoryId"
                    onChange={(e) => setMakerId(e.target.value)}
                    value={makerId}
                  >
                    <option value="1">Categoria 1</option>
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
