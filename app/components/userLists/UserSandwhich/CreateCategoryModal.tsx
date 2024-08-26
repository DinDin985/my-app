import { Button } from "@/components/ui/button";
import addIcon from "@/public/icons/add.png";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CreateCategoryModal({
  showAddCategory,
  setShowAddCategory,
  setCustomCategories,
}) {
  const [customCategoryData, setCustomCategoryData] = useState({
    category: "",
    ingredients: [],
  });
  const [customIngredient, setCustomIngredient] = useState("");

  function addCustomIngredient() {
    if (customIngredient !== "") {
      setCustomCategoryData((prevData) => {
        const index = prevData.ingredients.length;
        return {
          category: prevData.category,
          ingredients: [
            ...prevData.ingredients,
            { name: customIngredient, index: index },
          ],
        };
      });

      setCustomIngredient("");
    }
  }

  function deleteCustomIngredient(index: number) {
    setCustomCategoryData((prevData) => {
      return {
        category: prevData.category,
        ingredients: [
          ...prevData.ingredients.slice(0, index),
          ...prevData.ingredients.slice(index + 1),
        ],
      };
    });
  }

  function addCustomCategory() {
    if (
      customCategoryData.category !== "" &&
      customCategoryData.ingredients.length !== 0
    ) {
      setCustomCategories((prevCategories) => {
        return [...prevCategories, customCategoryData];
      });
    }
  }

  function resetForm() {
    setCustomCategoryData({
      category: "",
      ingredients: [],
    });
    setCustomIngredient("");
  }

  return (
    <div
      className={`${
        showAddCategory ? "visable" : "invisible"
      } absolute h-full w-full`}
    >
      <div className="fixed left-1/2 top-1/2 z-40 flex h-[85%] w-[80%] translate-x-[-50%] translate-y-[-50%] flex-col items-center overflow-y-auto rounded-2xl bg-secondary py-7 scrollbar-thin scrollbar-track-hoverGray scrollbar-thumb-primary scrollbar-thumb-rounded-none scrollbar-h-1">
        <Button
          onClick={() => {
            setShowAddCategory((prevState: boolean) => !prevState);
            resetForm();
          }}
          title="Exit"
          className="absolute right-2 top-2 h-6 w-6 p-0"
        >
          <X className="h-8 w-8" />
        </Button>

        <h2 className="mb-4 text-3xl font-bold">Add Custom Category</h2>

        <div className="mb-4 min-h-[.25rem] w-10/12 rounded-2xl bg-black"></div>

        <form className="mb-4 flex w-11/12 flex-col justify-center">
          <input
            value={customCategoryData.category}
            onChange={(e) => {
              setCustomCategoryData((prevCategoryData) => {
                return {
                  category: e.target.value,
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
            />

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
            title={`${customCategoryData.category}`}
            className="mb-3 min-h-[2.5rem] max-w-[90%] truncate text-[1.7rem] font-bold"
          >
            {customCategoryData.category
              ? customCategoryData.category
              : "Custom Category"}
          </h2>

          <div className="flex h-full min-h-[12.5rem] w-11/12 flex-grow flex-col items-center overflow-y-auto pr-2 scrollbar-thin scrollbar-track-hoverGray scrollbar-thumb-primary scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-h-1">
            <div className="flex w-full flex-col items-center">
              {customCategoryData.ingredients &&
                customCategoryData.ingredients.map((ingredient, index) => {
                  return (
                    <div
                      key={index}
                      className="mb-2 flex h-[32px] w-full rounded-lg bg-slate-300 p-1"
                    >
                      {ingredient.name && (
                        <div className="flex h-full w-full">
                          <p
                            title={`${ingredient.name}`}
                            className="w-[85%] truncate"
                          >
                            {ingredient.name}
                          </p>

                          <Button
                            onClick={() => {
                              deleteCustomIngredient(index);
                            }}
                            className="ml-[7.5%] h-6 w-6 p-0"
                            variant="secondary"
                          >
                            <X className="h-8 w-8" />
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <Button
          onClick={() => {
            addCustomCategory();
            setShowAddCategory((prevState: boolean) => !prevState);
            resetForm();
          }}
          className="mt-4 min-h-[2.5rem] w-10/12 rounded-2xl bg-primary text-xl text-secondary"
        >
          Add category
        </Button>
      </div>

      <div
        className={`${
          showAddCategory ? "backdrop-brightness-50" : "backdrop-brightness-100"
        } fixed left-0 top-0 z-30 h-screen w-screen`}
      ></div>
    </div>
  );
}
