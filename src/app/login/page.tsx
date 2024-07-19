"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Cookies from "js-cookie";

const Login = () => {
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLoginState = (e) => {
    const { id, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const verifyCredentials = (e) => {
    e.preventDefault();

    const envUsername = process.env.NEXT_PUBLIC_USERNAME;
    const envPassword = process.env.NEXT_PUBLIC_PASSWORD;

    if (
      loginState.username !== envUsername ||
      loginState.password !== envPassword
    ) {
      setError("Incorrect credentials");
      return;
    }

    setError("");
    Cookies.set("isAuthenticated", "true", { expires: 1 });
    router.push("/");
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
          <form className="grid gap-4" onSubmit={verifyCredentials}>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Little Blue"
                value={loginState.username}
                onChange={handleLoginState}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginState.password}
                onChange={handleLoginState}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
