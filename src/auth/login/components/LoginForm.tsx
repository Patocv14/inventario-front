"use client";

import { useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import axiosClient from "@/config/axiosClient";
import toast, { Toaster } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginUser } from "../interfaces/LoginUser.interface";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data }: { data : LoginUser} = await axiosClient.post("/auth/login", {
        email,
        password,
      });

      if(!data) throw new Error("No se pudo iniciar sesión");

      localStorage.setItem("token", data.user.accessToken);
      toast.success("Inicio de sesión exitoso");
      router.push("/dashboard");

    } catch (error: any) {
      console.log(error)
      toast.error(error.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toaster />
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico a continuación para iniciar sesión en
            tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                placeholder="ejemplo@dominio.com"
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <Input
                id="password"
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <Button className="w-full" type="submit">
              Iniciar sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
