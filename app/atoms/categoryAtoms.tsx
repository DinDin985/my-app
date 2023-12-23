import { atom } from "jotai";
import Categories from "../../data/db.json";

const categoriesLists = atom<object>(Categories.defaultIngredients);

const amountOfCategories = atom<number>(
  Object.keys(Categories.defaultIngredients).length,
);

const counter = atom<number>(0);

const wheelsData = atom<object>({});

const sandwichLayout = atom({
  fn: () => {
    const result: object = {};
    Object.keys(Categories.defaultIngredients).map((category: string) => {
      result[category] = "";
    });

    return result;
  },
});

export {
  amountOfCategories,
  categoriesLists,
  counter,
  sandwichLayout,
  wheelsData,
};
