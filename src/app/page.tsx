import { PackageOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-screen bg-gray-200">
        <div className="h-full flex flex-col justify-center">
          <div className="flex justify-center items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Bienvenido a nuestra app de Inventario
              </h1>
              <p className="text-gray-700 mt-4 w-1/2">
                Esta es una aplicación de inventario de productos. Puedes ver la
                lista de productos, agregar nuevos productos, editar productos y
                eliminar productos.
              </p>
            </div>
            <div>
              <PackageOpen size={150} className="text-gray-800" />
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href={'/login'} className="text-2xl cursor-pointer" >Iniciar Sesión</Link>
          </div>
        </div>
      </div>
    </>
  );
}
