import { formatCurrency } from "@/lib/utils";
import CategoryCard from "./CategoryCard";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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
    <Card className="mb-4 last:mb-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <p className="font-bold">{formatCurrency(amount)}</p>
      </CardHeader>
      <Separator />
      <CardContent>
        <p className="mt-3">{description}</p>
        <CategoryCard category={category} />
        <div className="flex justify-between items-center">
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
