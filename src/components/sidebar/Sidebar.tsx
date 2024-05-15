"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  UsersRound,
  PackageSearch,
  FolderPen,
  Presentation,
  RectangleVertical,
} from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { User } from "@/auth";
import axiosClient from "@/config/axiosClient";
import toast from "react-hot-toast";

const menuItems = [
  {
    path: "/dashboard",
    icon: <PackageSearch size={40} />,
    title: "Productos",
    subTitle: "Productos",
  },
  {
    path: "/dashboard/users",
    icon: <UsersRound size={40} />,
    title: "Usuarios",
    subTitle: "Usuarios",
  },
];

export const Sidebar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  const logOut = () => {
    window.localStorage.removeItem("token");
    router.push("/login");
    toast.success("Sesión cerrada");
  };

  async function verifyToken(token: string) {
    setIsLogin(true);
    try {
      const { data }: { data: User } = await axiosClient.get(
        `/auth/verify-token/${token}`
      );
      setUser(data);
      setIsLogin(false);
    } catch (error) {
      setIsLogin(false);

      console.log(error);
    }
  }

  useEffect(() => {
    const storedToken = window?.localStorage.getItem("token");
    if (storedToken) {
      verifyToken(storedToken);
    } else {
      router.push("/login");
      toast.error("Debe de iniciar sesion");
    }
  }, [router]);

  return (
    <>
      {isLogin ? (
        <ClipLoader color="#2563EB" loading={isLogin} size={20} />
      ) : (
        <div
          id="menu"
          style={{ width: "400px" }}
          className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0 overflow-y-scroll"
        >
          <div id="logo" className="my-4 px-6">
            <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
              <RectangleVertical className="inline-block text-blue-500 mr-2" />
              <span>Productos</span>
            </h1>
            <p className="text-slate-500 text-sm">
              Sistema de administración de productos
            </p>
          </div>
          <div id="profile" className="px-6 py-10">
            <p className="text-slate-500">Bienvenido de Nuevo,</p>
            <span className="text-sm md:text-base font-bold uppercase">
              {user?.name}
            </span>
          </div>

          <div id="nav" className="w-full px-6">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path} {...item} />
            ))}
          </div>

          <div onClick={logOut} className="p-2 text-center mt-5 cursor-pointer">
            LogOut
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
