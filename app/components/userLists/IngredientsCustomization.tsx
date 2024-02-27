"use client";

import {
  amountOfCategories,
  categoriesLists,
  counter,
  initialDiceArray,
} from "@/app/atoms/categoryAtoms";
import { useAtom } from "jotai";

import { Checkbox } from "@/components/ui/checkbox";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import addIcon from "@/public/icons/add.png";
import Image from "next/image";

export default function IngredientsListing() {
  const [categories, setCategories] = useAtom(categoriesLists);
  const [categoriesAmount, setCategoriesAmount] = useAtom(amountOfCategories);
  const [categoryCounter, setCategoryCounter] = useAtom(counter);
  const [userIngredient, setUserIngredient] = useState("");
  const [diceArray, setDiceArray] = useAtom(initialDiceArray);

  useEffect(() => {
    setDiceArray(() => {
      return categories[Object.keys(categories)[categoryCounter]];
    });
  }, [categories]);

  function handleSubmit(e: Event) {
    e.preventDefault();

    const addIngredient = e.target;
    const formData = new FormData(addIngredient);
    const formResults = Object.fromEntries(formData.entries());
  }

  function handleAddIngredient() {
    const currentCategory = Object.keys(categories)[categoryCounter];
    if (userIngredient !== "") {
      console.log(categories);
      setCategories((prevCategories) => {
        return Object.keys(prevCategories).reduce((acc, individualCategory) => {
          if (individualCategory === currentCategory) {
            acc[individualCategory] = [
              ...prevCategories[individualCategory],
              { name: userIngredient, active: true },
            ];
          } else {
            acc[individualCategory] = [...prevCategories[individualCategory]];
          }
          return acc;
        }, {});
      });
    }
  }

  function handleToggleIngredientActiveState(index: number) {
    const currentCategory = Object.keys(categories)[categoryCounter];

    setCategories((prevCategories) => {
      return Object.keys(prevCategories).reduce((acc, individualCategory) => {
        if (individualCategory === currentCategory) {
          acc[individualCategory] = [...prevCategories[individualCategory]].map(
            (obj, i) => {
              return i === index ? { ...obj, active: !obj.active } : { ...obj };
            },
          );
        } else {
          acc[individualCategory] = [...prevCategories[individualCategory]];
        }
        return acc;
      }, {});
    });
  }

  function handleDeleteIngredient(index: number) {
    const currentCategory = Object.keys(categories)[categoryCounter];
    const ingredientData = categories[currentCategory];
    const newIngredientsArray = ingredientData
      .slice(0, index)
      .concat(ingredientData.slice(index + 1, ingredientData.length));

    setCategories((prevCategories) => {
      return Object.keys(prevCategories).reduce((acc, individualCategory) => {
        console.log(individualCategory);
        if (individualCategory === currentCategory) {
          acc[individualCategory] = newIngredientsArray;
        } else {
          acc[individualCategory] = [...prevCategories[individualCategory]];
        }
        return acc;
      }, {});
    });
  }

  return (
    <div className="flex h-[35rem] min-h-[17.5rem] w-11/12 flex-col items-center justify-center rounded-3xl bg-secondary py-7 text-primary xl:w-[47.5%] 2xl:order-3 2xl:h-[90%] 2xl:w-[30%]">
      {Object.keys(categories).map((individualCategory, index) => {
        return (
          <div
            className={`${
              index === categoryCounter ? "block" : "hidden"
            } flex h-full w-full flex-col items-center justify-center`}
            key={index}
          >
            <div className="mb-4 flex h-[8.3%] min-h-[2.875rem]  w-10/12 items-center justify-between">
              <button
                onClick={() => {
                  setCategoryCounter((prevCounter) => {
                    return prevCounter - 1;
                  });
                }}
                disabled={categoryCounter === 0}
                className={`${
                  categoryCounter === 0 ? "invisible" : "visible"
                } h-3/4 min-h-[35px] w-7 transition-transform ease-in-out hover:scale-125`}
              >
                <FontAwesomeIcon className="h-full w-full" icon={faCaretLeft} />
              </button>

              <div className="flex w-8/12 justify-center">
                <h2
                  className="max-w-xs truncate text-3xl font-bold uppercase"
                  title={
                    individualCategory.charAt(0).toUpperCase() +
                    individualCategory.slice(1)
                  }
                >
                  {individualCategory}
                </h2>
              </div>

              <button
                onClick={() => {
                  setCategoryCounter((prevCounter) => {
                    return prevCounter + 1;
                  });
                }}
                disabled={categoryCounter === categoriesAmount - 1}
                className={`${
                  categoryCounter === categoriesAmount - 1
                    ? "invisible"
                    : "visible"
                } order-3 h-3/4 min-h-[35px] w-7 transition-transform ease-in-out hover:scale-125`}
                value={`category_${categoryCounter}`}
              >
                <FontAwesomeIcon
                  className="h-full w-full"
                  icon={faCaretRight}
                />
              </button>
            </div>

            <div className="mb-4 h-full min-h-[10rem] w-11/12 overflow-y-hidden">
              <div
                className="flex h-full flex-col items-center justify-center"
                key={index}
              >
                <div className="mb-4 h-10 w-11/12">
                  <form
                    className="flex h-full w-full items-center justify-center border-2 border-primary bg-white"
                    onSubmit={handleSubmit}
                  >
                    <input
                      className="min-h-[2rem] w-11/12 p-1 text-xl focus:outline-none"
                      type="text"
                      name="addIngredient"
                      placeholder="Insert custom ingredient here..."
                      onChange={(e) => setUserIngredient(e.target.value)}
                      value={userIngredient}
                    />
                    <button
                      onClick={() => {
                        console.log(userIngredient);
                        handleAddIngredient();
                      }}
                      className="h-full w-1/12 text-3xl"
                      type="submit"
                    >
                      <Image
                        alt="Add Custom Ingredient Button"
                        src={addIcon}
                        height={20}
                        width={20}
                      />
                    </button>
                  </form>
                </div>

                <div className="mb-4 min-h-[4px] w-10/12 rounded-2xl bg-black"></div>

                <div className="flex w-11/12 flex-grow flex-col overflow-y-auto pr-2 scrollbar-thin scrollbar-track-hoverGray scrollbar-thumb-primary scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-h-1">
                  {categories[individualCategory].map(
                    (individualIngredient: object, index: number) => {
                      return (
                        <div
                          key={index}
                          className="mb-2 flex w-full items-center rounded-lg bg-slate-300 p-1"
                        >
                          <p
                            className="w-[85%] truncate"
                            title={individualIngredient.name}
                          >
                            {individualIngredient.name}
                          </p>

                          <div className="flex w-[7.5%] items-center justify-center">
                            <Checkbox
                              onClick={() => {
                                handleToggleIngredientActiveState(index);
                              }}
                              checked={individualIngredient.active}
                              className="text-secondary"
                            />
                          </div>

                          <button
                            onClick={() => {
                              handleDeleteIngredient(index);
                            }}
                            className="w-[7.5%]"
                          >
                            X
                          </button>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
