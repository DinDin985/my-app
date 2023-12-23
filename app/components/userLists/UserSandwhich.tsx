"use client";

import { categoriesLists, sandwichLayout } from "@/app/atoms/categoryAtoms";
import { useAtom } from "jotai";

export default function UserSandwhich() {
  const [categories, setCategories] = useAtom(categoriesLists);
  const [userSandwich, setUserSandwich] = useAtom(sandwichLayout);

  return (
    <div className="mb-16 flex w-11/12 flex-col items-center rounded-3xl bg-secondary py-7 text-primary">
      <h1 className="mb-5 text-3xl font-bold">YOUR SANDWHICH</h1>

      <ul className="w-10/12">
        {Object.keys(categories).map((category, index) => {
          return (
            <li
              key={index}
              className="mb-2 flex h-10 items-center rounded-lg bg-slate-300 pl-2"
            >
              <h2
                className="max-w-[10rem] truncate text-2xl font-bold"
                title={category.charAt(0).toUpperCase() + category.slice(1)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              <h2 className="mr-1.5 pl-1 text-2xl font-bold">:</h2>
              <h2 className="pl-1 text-2xl">{userSandwich[category]}</h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
