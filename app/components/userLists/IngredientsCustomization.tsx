"use client";

import {
  amountOfCategories,
  categoriesLists,
  counter,
} from "@/app/atoms/categoryAtoms";
import { useAtom } from "jotai";

import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IngredientsListing() {
  const [categories, setCategories] = useAtom(categoriesLists);
  const [categoriesAmount, setCategoriPesAmount] = useAtom(amountOfCategories);
  const [categoryCounter, setCategoryCounter] = useAtom(counter);

  function handleSubmit(e) {
    e.preventDefault();

    const addIngredient = e.target;
    const formData = new FormData(addIngredient);
    const formResults = Object.fromEntries(formData.entries());
  }

  function handleToggleIngredientActiveState(index) {
    const currentCategory = Object.keys(categories)[categoryCounter];
    console.log("currentCategory is ");
    console.log(currentCategory);
    const ingredientData = categories[currentCategory];

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

  function handleDeleteIngredient(index) {
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

  function handleToggleIngredientActivity() {}

  return (
    <div className="flex h-[35rem] w-11/12 flex-col items-center justify-center rounded-3xl bg-secondary py-7 text-primary">
      {Object.keys(categories).map((individualCategory, index) => {
        return (
          <div
            className={`${
              index === categoryCounter ? "block" : "hidden"
            } flex h-full w-full flex-col items-center justify-center`}
            key={index}
          >
            <div className="mb-4 flex h-[8.3%] w-10/12 items-center justify-between">
              <button
                onClick={() => {
                  setCategoryCounter((prevCounter) => {
                    return prevCounter - 1;
                  });
                }}
                disabled={categoryCounter === 0}
                className={`${
                  categoryCounter === 0 ? "invisible" : "visible"
                } h-3/4 w-7 transition-transform ease-in-out hover:scale-125`}
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
                } order-3 h-3/4 w-7 transition-transform ease-in-out hover:scale-125`}
                value={`category_${categoryCounter}`}
              >
                <FontAwesomeIcon
                  className="h-full w-full"
                  icon={faCaretRight}
                />
              </button>
            </div>
            <div className="mb-4 h-full w-11/12 overflow-y-hidden">
              <div
                className="flex h-full flex-col items-center justify-center"
                key={index}
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
                            title={individualIngredient.name}
                          >
                            {individualIngredient.name}
                          </h3>
                          <button
                            onClick={() => {
                              handleToggleIngredientActiveState(index);
                            }}
                            className="w-1/12"
                          >
                            O
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteIngredient(index);
                            }}
                            className="w-1/12"
                          >
                            X
                          </button>{" "}
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
