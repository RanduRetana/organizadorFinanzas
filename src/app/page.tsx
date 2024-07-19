"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserSection from "@/components/UserSection";
import { LogOut, PlusCircle } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("isAuthenticated");
    router.push("/login");
  };

  return (
    <main className="p-4 flex gap-2 flex-col h-screen">
      <Card className="bg-primary">
        <CardHeader className="px-6">
          <CardTitle className="text-white">Expenses</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Expenses per user:</CardTitle>
            </CardHeader>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Balance:</CardTitle>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>
      <div className="flex gap-2 items-center h-16">
        <Button className="w-full h-full" onClick={handleLogout}>
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary py-8 w-full h-full">
              <PlusCircle className="text-white w-5 h-5 mr-3" />
              Create Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full pb-3">
        <UserSection user="Randu" />
        <UserSection user="Flores" />
      </section>
    </main>
  );
}
