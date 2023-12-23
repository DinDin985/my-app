"use client";

import {
  amountOfCategories,
  categoriesLists,
  counter,
} from "@/app/atoms/categoryAtoms";
import { useAtom } from "jotai";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

export default function IngredientsListing() {
  const [categories, setCategories] = useAtom(categoriesLists);
  const [categoriesAmount, setCategoriesAmount] = useAtom(amountOfCategories);
  const [categoryCounter, setCategoryCounter] = useAtom(counter);

  useEffect(() => {
    setCategoryCounter(categoryCounter);
  }, [categoryCounter]);

  function handleSubmit(e) {
    e.preventDefault();

    const addIngredient = e.target;
    const formData = new FormData(addIngredient);

    const formResults = Object.fromEntries(formData.entries());
  }

  return (
    <div className="flex h-[35rem] w-11/12 justify-center rounded-3xl bg-secondary py-7 text-primary">
      <Tabs
        defaultValue="category_0"
        className="flex h-full w-11/12 flex-col  items-center"
      >
        <TabsList className="mb-3 flex w-10/12 items-center justify-between">
          <TabsTrigger
            onClick={() => {
              setCategoryCounter((prevCounter) => prevCounter - 1);
            }}
            value={`category_${categoryCounter}`}
            className={`${
              categoryCounter === 0 ? "invisible" : "visable"
            } h-1/2 w-7 transition-transform ease-in-out hover:scale-125`}
          >
            <FontAwesomeIcon className="h-full w-full" icon={faCaretLeft} />
          </TabsTrigger>

          <TabsTrigger
            onClick={() => {
              setCategoryCounter((prevCounter) => prevCounter + 1);
            }}
            className={`${
              categoryCounter === categoriesAmount ? "invisible" : "visable"
            } order-3 h-1/2 w-7 transition-transform ease-in-out hover:scale-125`}
            value={`category_${categoryCounter}`}
          >
            <FontAwesomeIcon className="h-full w-full" icon={faCaretRight} />
          </TabsTrigger>

          <div className="max-w-[80%]">
            {Object.keys(categories).map((individualCategory, index) => {
              return (
                <TabsContent
                  key={index}
                  value={`category_${index}`}
                  className="order-2 truncate text-3xl font-bold"
                  title={
                    individualCategory.charAt(0).toUpperCase() +
                    individualCategory.slice(1)
                  }
                >
                  {individualCategory.toUpperCase()}
                </TabsContent>
              );
            })}
            <button
              onClick={() => {
                console.log(categoryCounter);
                console.log(`category_${categoryCounter}`);
              }}
            >
              Test
            </button>
          </div>
        </TabsList>

        {Object.keys(categories).map((individualCategory, index) => {
          return (
            <TabsContent
              key={index}
              value={`category_${index}`}
              className="flex h-auto w-full flex-col items-center justify-center overflow-y-hidden"
            >
              <div className="mb-4 h-10 w-11/12">
                <form
                  className="flex h-full w-full items-center justify-center border-2 border-black bg-white px-1"
                  onSubmit={handleSubmit}
                >
                  <input
                    className="h-full w-11/12 text-xl focus:outline-none"
                    type="text"
                    name="addIngredient"
                    placeholder="Add custom ingredient here..."
                  />
                  <button className="h-full w-1/12 text-3xl" type="submit">
                    +
                  </button>
                </form>
              </div>

              <div className="mb-4 h-1 w-10/12 rounded-2xl bg-black"></div>

              <div className="flex w-11/12 flex-grow flex-col overflow-y-auto pr-2 scrollbar-thin scrollbar-track-hoverGray scrollbar-thumb-primary scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-h-1">
                {categories[individualCategory].map(
                  (individualIngredient: string, index: number) => {
                    return (
                      <div
                        key={index}
                        className="mb-2 flex w-full items-center rounded-lg bg-slate-300 p-1"
                      >
                        <h3
                          className="w-10/12 truncate"
                          title={individualIngredient}
                        >
                          {individualIngredient}
                        </h3>
                        <button className="w-1/12">O</button>
                        <button className="w-1/12">X</button>{" "}
                      </div>
                    );
                  },
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
