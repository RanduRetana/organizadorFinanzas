"use client";

import Image from "next/image";

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const verifyCredentials = () => {
    redirect("/");
  };
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/littleBlue.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Little Blue"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button
              onClick={verifyCredentials}
              type="submit"
              className="w-full"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
