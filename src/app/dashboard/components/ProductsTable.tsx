
import axiosClient from "@/config/axiosClient";
import TableItem from "./TableItem";
import CreateProductButton from "./CreateProductButton";
import { Products } from "../interfaces/Prodct.interface";

const getProducts = async () => {
    const data = await axiosClient.get<Products[]>("/product");
    if(!data) return;
    return data.data;
};

export const ProductsTable = async () => {
  const products = await getProducts();
  if (!products)
    return (
      <div className="flex justify-evenly">
        <div>No hay productos</div>
        <CreateProductButton />
      </div>
    );

  return (
    <>
      <div className="flex justify-between py-5">
        <div>
          <h1 className="text-2xl font-bold">Products Page</h1>
        </div>
        <div>
          <CreateProductButton />
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Categoria
              </th>
              <th scope="col" className="px-6 py-3">
                Creador
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <TableItem products={products} />
          </tbody>
        </table>
      </div>
    </>
  );
};
