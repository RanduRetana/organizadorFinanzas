import { formatCurrency } from "@/lib/utils";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import CategoryCard from "./CategoryCard";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

type ExpenseCardProps = {
  title: string;
  amount: number;
  description: string;
  date: string;
  user: string;
  category: string;
};

const ExpenseCard = ({
  title,
  amount,
  description,
  date,
  user,
  category,
}: ExpenseCardProps) => {
  return (
    <Card className="mb-2 last:mb-0 sm:w-[49%]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-2 items-center">
          <p className="font-bold">{formatCurrency(amount)}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <Dialog>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuGroup>
              </DropdownMenuContent>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Expense</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this expense? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit">Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenu>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <p className="mt-3">{description}</p>
        <CategoryCard category={category} />
        <div className="flex justify-between items-center mt-3">
          <Badge
            variant={`${user === "Randu" ? "default" : "secondary"}`}
            className="p-2 px-4"
          >
            {user}
          </Badge>
          <p className="text-gray text-sm">{date}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
