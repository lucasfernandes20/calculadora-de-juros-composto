"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { ListItem } from "./ui/list-item";

const calculators: { title: string; href: string; description: string }[] = [
  {
    title: "Calculadora de juros compostos",
    href: "/",
    description:
      "Para calcular o montante de um investimento com juros compostos.",
  },
  {
    title: "Calculadora de Graham",
    href: "/graham",
    description:
      "Para calcular o valor intrínseco de uma ação de acordo com a fórmula de Benjamin Graham.",
  },
];

const HeaderNavigationMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-col gap-2 items-start space-x-0 md:flex-row md:gap-0 md:items-center md:space-x-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Calculadoras</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[200px] md:w-[400px] md:grid-cols-2 lg:w-[600px]">
              {calculators.map((calculator) => (
                <ListItem
                  key={calculator.title}
                  title={calculator.title}
                  href={calculator.href}
                  className="h-full"
                  clamp={3}
                >
                  {calculator.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default HeaderNavigationMenu;
