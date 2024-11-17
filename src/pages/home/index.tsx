"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleForm } from "./models/simpleForm";

export const HomePage = () => {
  const handleSubmit = (arg: unknown) => {
    console.log(arg);
  };

  return (
    <div>
      <header className="border-b-[1px] border-muted mb-4 py-2 ">
        <div className="container mx-auto flex items-center justify-between">
          <nav>
            <ul>
              <li>
                <Button variant="link">Cálculadora</Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="container m-auto flex flex-col gap-6">
        <h1 className="text-4xl font-bold">Cálculadora de juros composto</h1>
        <Tabs defaultValue="simple">
          <TabsList className="">
            <TabsTrigger value="simple">Simplificado</TabsTrigger>
            <TabsTrigger value="advanced">Avançado</TabsTrigger>
          </TabsList>
          <TabsContent value="simple">
            <Card className="p-4">
              <SimpleForm onSubmit={handleSubmit} />
            </Card>
          </TabsContent>
          <TabsContent value="advanced">Em breve.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
