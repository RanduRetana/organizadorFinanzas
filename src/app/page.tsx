"use client";

import { useState, useEffect } from "react";
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
import { Select, SelectItem } from "@/components/ui/select"; // Assuming you have a Select component
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Category, User } from "@prisma/client";
import UserSection from "@/components/UserSection";
import { LogOut, PlusCircle } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

export default function Home() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      console.log("Users:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      console.log("Categories:", data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount: parseFloat(amount),
          description,
          userId: parseInt(userId),
          categoryId: parseInt(categoryId),
        }),
      });

      if (response.ok) {
        console.log("Expense created successfully");
      } else {
        const errorData = await response.json();
        console.error("Error creating expense:", errorData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCategories();
  }, []);

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
            <CardContent>
              <div className="flex gap-3">
                <p className="font-bold">Randu:</p>
                <p>{formatCurrency(150)}</p>
              </div>
              <div className="flex gap-3">
                <p className="font-bold">Flores:</p>
                <p>{formatCurrency(150)}</p>
              </div>
              <div className="flex gap-3">
                <p className="font-bold">Total:</p>
                <p>{formatCurrency(150)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Balance:</CardTitle>
              <CardContent className="text-center">
                <p>Randu</p>
              </CardContent>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary py-8 w-full h-full">
              <PlusCircle className="text-white w-5 h-5 mr-3" />
              Create Category
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
