import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ExpenseCard from "./ExpenseCard";

const expense = {
  title: "Compra de viveres",
  amount: 60,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, quaerat",
  date: "19-07-2024",
  user: "Randu",
  category: "Test",
};

type UserSectionProps = {
  user: string;
};

const UserSection = ({ user }: UserSectionProps) => {
  return (
    <Card className="bg-primary flex-1">
      <CardHeader className="flex flex-row items-center justify-between p-6">
        <CardTitle className="text-white">{user}</CardTitle>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-6">
        <ExpenseCard {...expense} />
        <ExpenseCard {...expense} />
        <ExpenseCard {...expense} />
        <ExpenseCard {...expense} />
        <ExpenseCard {...expense} />
      </CardContent>
    </Card>
  );
};

export default UserSection;
