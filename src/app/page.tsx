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
import { PlusCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="p-4 flex flex-col h-screen">
      <Card className="bg-primary">
        <CardHeader>
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
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primary py-8 w-full my-2">
            <PlusCircle className="text-white mr-3" />
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
      <section className="flex flex-auto gap-2 w-full">
        <UserSection user="Randu" />
        <UserSection user="Flores" />
      </section>
    </main>
  );
}
