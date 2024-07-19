import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="p-4 flex flex-col h-screen">
      <Card className="bg-primary">
        <CardTitle className="text-white p-4">Expenses</CardTitle>
      </Card>
      <Button className="bg-primary h-14 w-full my-2">Create Expense</Button>
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
