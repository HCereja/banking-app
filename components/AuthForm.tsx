"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    //Logar com appwrite e criar plaid token
    try {
      console.log(data);
      if (type === "sign-up") {
        // const newUser = await signUp(data);
        // setUser(newUser);
      }
      if (type === "sign-in") {
        // const user = await signIn({
        //   email: data.email,
        //   password: data.password,
        // });
        // if (user) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer items-center gap-1 flex">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Logo Horizon"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? "Vincular conta"
              : type === "sign-in"
              ? "Entrar"
              : "Inscrever-se"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Vincule sua conta para começar"
              : "Por favor insira suas informações"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="Nome:"
                      placeholder="Informe seu nome"
                    />

                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Sobrenome:"
                      placeholder="Informe seu sobrenome"
                    />
                  </div>

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="CEP:"
                      placeholder="Informe seu CEP"
                    />

                    <CustomInput
                      control={form.control}
                      name="state"
                      label="UF:"
                      placeholder="Informe sua UF"
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    name="address"
                    label="Endereço:"
                    placeholder="Informe seu endereço"
                  />

                  <CustomInput
                    control={form.control}
                    name="city"
                    label="Cidade:"
                    placeholder="Informe sua cidade"
                  />

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="birth"
                      label="Aniversário:"
                      placeholder="Informe seu aniversário"
                    />
                    <CustomInput
                      control={form.control}
                      name="cpf"
                      label="CPF:"
                      placeholder="Informe seu CPF"
                    />
                  </div>
                </>
              )}

              {/* E-mail */}
              <CustomInput
                control={form.control}
                name="email"
                label="E-mail*"
                placeholder="Informe seu e-mail"
              />
              {/* Senha */}
              <CustomInput
                control={form.control}
                name="password"
                type="password"
                label="Senha*"
                placeholder="Informe sua senha"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Carregando...
                    </>
                  ) : type === "sign-in" ? (
                    "Logar"
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Não possui uma conta?"
                : "Já possui uma conta?"}
            </p>
            <Link
              href={type === "sign-in" ? "sign-up" : "sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Cadastrar" : "Entrar"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
