"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
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
import { HexColorPicker } from "react-colorful";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [color, setColor] = useState("#000000");
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const { toast } = useToast()

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

  const handleSubmitExpenses = async () => {
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
        setIsExpenseDialogOpen(false); 
        toast({
          title: "Expense created successfully",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      } else {
        const errorData = await response.json();
        console.error("Error creating expense:", errorData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmitCategory = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName,
          color,
        }),
      });

      if (response.ok) {
        console.log("Category created successfully");
        fetchCategories();
        setIsCategoryDialogOpen(false);
        toast({
          title: "Category created successfully",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      } else {
        const errorData = await response.json();
        console.error("Error creating category:", errorData);
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
      <Toaster />
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
        <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary py-8 w-full my-2" onClick={() => setIsExpenseDialogOpen(true)}>
              <PlusCircle className="text-white mr-3" />
              Create Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Expense</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new expense.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="col-span-3"
                  type="number"
                  step="0.01"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user" className="text-right">
                  User
                </Label>
                <Select onValueChange={(value) => setUserId(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select onValueChange={(value) => setCategoryId(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full" type="submit" onClick={handleSubmitExpenses}>
                Save Expense
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary py-8 w-full h-full" onClick={() => setIsCategoryDialogOpen(true)}>
              <PlusCircle className="text-white w-5 h-5 mr-3" />
              Create Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Category</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new category.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Entretenimiento"
                  className="col-span-3"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Color
                </Label>
                <div className="col-span-3">
                  <HexColorPicker
                    color={color}
                    onChange={setColor}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmitCategory}>Create</Button>
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
