import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
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

export default function Home() {
  return (
    <main className="p-4 flex flex-col h-screen">
      <Card className="bg-primary">
        <CardTitle className="text-white p-4">Expenses</CardTitle>
      </Card>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primary h-14 w-full my-2">
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
        <Card className="bg-primary flex-1 h-full">
          <CardTitle className="text-white p-4">Randu</CardTitle>
        </Card>
        <Card className="bg-primary flex-1 h-full">
          <CardTitle className="text-white p-4">Flores</CardTitle>
        </Card>
      </section>
    </main>
  );
}
