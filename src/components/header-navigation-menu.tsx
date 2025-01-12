"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import Image from "next/image";
import LastVideos from "@/data/youtube/last-videos.json";
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
          <NavigationMenuTrigger>Youtube</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[200px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="group flex h-full w-full select-none relative flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="https://www.youtube.com/@capitalrico"
                    target="_blank"
                  >
                    <Image
                      src="/images/banner.png"
                      alt="Youtube banner background"
                      className="object-cover rounded-md group-hover:opacity-85"
                      fill
                    ></Image>
                    <Image
                      src="/images/youtube_profile.png"
                      alt="Youtube Profile"
                      className="absolute left-0 right-0 m-auto top-0 lg:top-4 h-full w-auto lg:w-16 lg:h-16 rounded-full opacity-85 group-hover:opacity-100"
                      width={300}
                      height={300}
                    ></Image>
                  </Link>
                </NavigationMenuLink>
              </li>
              {LastVideos.map((video) => (
                <ListItem
                  href={video.url}
                  title={video.title}
                  key={video.title}
                  target="_blank"
                >
                  {video.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
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
