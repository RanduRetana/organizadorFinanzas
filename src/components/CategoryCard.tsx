import { Bus } from "lucide-react";
import { Card, CardHeader } from "./ui/card";

type CategoryCardProps = {
  category: string;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card className="bg-primary text-white my-4">
      <CardHeader className="flex flex-row items-center gap-3">
        <Bus />
        <p>{category}</p>
      </CardHeader>
    </Card>
  );
};

export default CategoryCard;
