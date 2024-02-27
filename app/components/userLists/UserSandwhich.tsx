"use client";

import {
  amountOfCategories,
  categoriesLists,
  sandwichLayout,
} from "@/app/atoms/categoryAtoms";
import { useAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import addIcon from "@/public/icons/add.png";
import closeIcon from "@/public/icons/close.png";

export default function UserSandwhich() {
  const [categories, setCategories] = useAtom(categoriesLists);
  const [categoriesAmount, setCategoriesAmount] = useAtom(amountOfCategories);
  const [userSandwich, setUserSandwich] = useAtom(sandwichLayout);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [customCategoryData, setCustomCategoryData] = useState({
    categoryName: "",
    ingredients: generateInitialIngredientsArray(),
  });
  const [customIngredient, setCustomIngredient] = useState("");

  function resetForm() {
    setCustomCategoryData(() => {
      return {
        categoryName: "",
        ingredients: generateInitialIngredientsArray(),
      };
    });
  }

  function generateInitialIngredientsArray() {
    const endArray = [];
    for (let i = 0; i < 11; i++) {
      endArray.push({ name: "", active: true });
    }
    return endArray;
  }

  function addCustomIngredient() {
    if (customIngredient !== "") {
      setCustomIngredient("");
      setCustomCategoryData((prevData) => {
        let anyEmptyNames = false;
        let firstEmptyFufilled = false;
        prevData.ingredients.forEach((ingredient) => {
          if (ingredient.name === "") {
            anyEmptyNames = true;
          }
        });

        if (anyEmptyNames) {
          return {
            categoryName: prevData.categoryName,
            ingredients: prevData.ingredients.map((ingredient) => {
              if (ingredient.name === "" && !firstEmptyFufilled) {
                firstEmptyFufilled = true;
                console.log("test");
                return { name: customIngredient, active: ingredient.active };
              } else {
                console.log(ingredient.name);
                return { name: ingredient.name, active: ingredient.active };
              }
            }),
          };
        } else {
          return {
            categoryName: prevData.categoryName,
            ingredients: [
              ...prevData.ingredients,
              { name: customIngredient, active: true },
            ],
          };
        }
      });
    }
  }

  function toggleCustomIngredientActiveState(placement) {
    setCustomCategoryData((prevData) => {
      return {
        categoryName: prevData.categoryName,
        ingredients: prevData.ingredients.map((individualIngredient, i) => {
          return placement === i
            ? {
                name: individualIngredient.name,
                active: !individualIngredient.active,
              }
            : {
                name: individualIngredient.name,
                active: individualIngredient.active,
              };
        }),
      };
    });
  }

  function deleteCustomIngredient(placement) {
    const newCustomIngredientsArray = customCategoryData.ingredients
      .slice(0, placement)
      .concat(
        customCategoryData.ingredients.slice(
          placement + 1,
          customCategoryData.ingredients.length + 1,
        ),
      );

    setCustomCategoryData((prevData) => {
      return {
        categoryName: prevData.categoryName,
        ingredients: newCustomIngredientsArray,
      };
    });
  }

  function addCustomCategory() {
    let newCategoryName =
      customCategoryData.categoryName.charAt(0).toLowerCase() +
      customCategoryData.categoryName.slice(1);
    let counter = 1;

    while (categories[newCategoryName]) {
      newCategoryName = `${
        customCategoryData.categoryName.charAt(0).toLowerCase() +
        customCategoryData.categoryName.slice(1)
      }(${counter})`;
      counter++;
    }

    setCategories((prevCategories) => {
      return {
        ...prevCategories,
        [newCategoryName]: customCategoryData.ingredients,
      };
    });

    setCategoriesAmount((prevAmount) => {
      return prevAmount + 1;
    });
  }

  return (
    <div className="mb-16 flex h-full min-h-[17.5rem] w-11/12 flex-col items-center rounded-3xl bg-secondary py-7 text-primary xl:mb-0 xl:h-[35rem] xl:w-[47.5%] 2xl:order-1 2xl:h-[90%] 2xl:w-[30%]">
      <div className="mb-5 flex h-[8.3%] items-center justify-center">
        <h1 className="text-3xl font-bold">YOUR SANDWHICH</h1>
      </div>

      <ul className="mb-5 h-fit w-[83.3%] overflow-y-auto ">
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

      <button
        onClick={() => {
          setShowAddCategory((prevState) => !prevState);
        }}
        className="transition-duration:200ms h-10 min-h-[2.5rem] w-[83.3%] rounded-2xl bg-primary text-xl text-secondary transition-transform ease-in-out hover:scale-105 focus:scale-105 active:scale-95"
      >
        + Add new category
      </button>

      <div
        className={`${
          showAddCategory ? "visable" : "invisible"
        } absolute h-full w-full`}
      >
        <div className="fixed left-1/2 top-1/2 z-40 flex h-[85%] w-[80%] translate-x-[-50%] translate-y-[-50%] flex-col items-center overflow-y-auto rounded-2xl bg-secondary py-7 scrollbar-thin scrollbar-track-hoverGray scrollbar-thumb-primary scrollbar-thumb-rounded-none scrollbar-h-1">
          <button
            onClick={() => {
              setShowAddCategory((prevState) => !prevState);
              resetForm();
            }}
            title="Exit"
            className="absolute right-4 top-4"
          >
            <Image alt="Close Button" src={closeIcon} width={20} height={20} />
          </button>

          <h2 className="mb-4 text-3xl font-bold">Add Custom Category</h2>

          <div className="mb-4 min-h-[.25rem] w-10/12 rounded-2xl bg-black"></div>

          <form className="mb-4 flex w-11/12 flex-col justify-center">
            <input
              value={customCategoryData.categoryName}
              onChange={(e) => {
                setCustomCategoryData((prevCategoryData) => {
                  return {
                    categoryName: e.target.value,
                    ingredients: prevCategoryData.ingredients,
                  };
                });
              }}
              className="mb-3 w-full border-2 border-black p-1 text-xl focus:outline-none"
              placeholder="Insert Category Title here..."
            ></input>

            <div className="flex w-full border-2 border-black bg-white">
              <input
                value={customIngredient}
                onChange={(e) => {
                  setCustomIngredient(e.target.value);
                }}
                className="w-11/12 p-1 text-xl focus:outline-none"
                placeholder="Insert Custom Ingredient here..."
              ></input>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  addCustomIngredient();
                }}
              >
                <Image
                  alt="Add Custom Ingredient Button"
                  src={addIcon}
                  height={20}
                  width={20}
                />
              </button>
            </div>
          </form>

          <div className="mb-4 min-h-[.25rem] w-10/12 rounded-2xl bg-black"></div>

          <div className="flex min-h-[10rem] w-full flex-grow flex-col items-center overflow-hidden">
            <h2
              title={`${customCategoryData.categoryName}`}
              className="mb-3 min-h-[2.5rem] max-w-[90%] truncate text-[1.7rem] font-bold"
            >
              {customCategoryData.categoryName
                ? customCategoryData.categoryName
                : "Custom Category"}
            </h2>

            <div className="flex h-full min-h-[12.5rem] w-11/12 flex-grow flex-col items-center overflow-y-auto pr-2 scrollbar-thin scrollbar-track-hoverGray scrollbar-thumb-primary scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-h-1">
              <div className="flex w-full flex-col items-center">
                {customCategoryData.ingredients.map(
                  (individualIngredient, i) => {
                    return (
                      <div
                        key={i}
                        className="mb-2 flex h-[32px] w-full rounded-lg bg-slate-300 p-1"
                      >
                        {individualIngredient.name && (
                          <div className="flex h-full w-full">
                            <p
                              title={`${individualIngredient.name}`}
                              className="w-[85%] truncate"
                            >
                              {individualIngredient.name}
                            </p>

                            <div className="flex w-[7.5%] items-center justify-center">
                              <Checkbox
                                onClick={() => {
                                  toggleCustomIngredientActiveState(i);
                                }}
                                checked={individualIngredient.active}
                                className="text-secondary"
                              />
                            </div>

                            <button
                              onClick={() => {
                                deleteCustomIngredient(i);
                              }}
                              className="w-[7.5%]"
                            >
                              X
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              addCustomCategory();
            }}
            className="transition-duration:200ms mt-4 min-h-[2.5rem] w-[83.3%] rounded-2xl bg-primary text-xl text-secondary transition-transform ease-in-out hover:scale-105 focus:scale-105 active:scale-95"
          >
            Add category
          </button>
        </div>

        <div
          className={`${
            showAddCategory
              ? "backdrop-brightness-50"
              : "backdrop-brightness-100"
          } fixed left-0 top-0 z-30 h-screen w-screen`}
        ></div>
      </div>
    </div>
  );
}
