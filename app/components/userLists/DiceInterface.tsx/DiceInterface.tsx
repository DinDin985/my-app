"use client";
import d20 from "@/public/d20.png";
import Image from "next/image";

import { getDefaultData } from "@/app/actions";
import {
  amountOfCategories,
  categoriesLists,
  counter,
  initialDiceArray,
  sandwichLayout,
} from "@/app/atoms/categoryAtoms";
import { minIngredientsWarningActive } from "@/app/atoms/warningAtoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import DiceResultModal from "./DiceResultModal";
{
  /*
  Things that need to be worked on:
    Create modal that will prompt the user to keep the ingredient they rolled or reroll for another ingredient
    When changing categories have a popup screen that lets the user confirm the roll choice or reroll. When confirmed change the category
    Reroll mechanics
    Set timing of dice to slowly come to a halt
    After sandwhich is finished disable dice and change the layout to an animation of the userSandwhich expanding
*/
}

export default function SpinInterface() {
  const [categories, setCategories] = useAtom(categoriesLists);
  const [categoriesAmount, setCategoriesAmount] = useAtom(amountOfCategories);
  const [categoryCounter, setCategoryCounter] = useAtom(counter);
  const [categorySelector, setCategorySelector] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(
    Object.keys(categories)[categorySelector],
  );
  const [diceArray, setDiceArray] = useAtom(initialDiceArray);
  const [maxCategoryLength, setMaxCategoryLength] = useState(
    currentCategory.length,
  );

  const [minIngredientsWarning, setMinIngredientsWarning] = useAtom(
    minIngredientsWarningActive,
  );

  // new useStates
  const [defaultData, setDefaultData] = useState([{}]);
  const [disableDice, setDisableDice] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userSandwich, setUserSandwich] = useAtom(sandwichLayout);
  const [currentIngredientsDisplay, setCurrentIngredientsDisplay] = useState(0);

  const tailwindDivSettings = [
    "left-[50%] top-[50%]",
    "left-[15%] top-[36%] [transform:rotateX(50deg)rotateZ(-70deg)]",
    "right-[15%] top-[36%] [transform:rotateX(50deg)rotateZ(70deg)]",
    "left-[37.5%] top-[77%] [transform:rotateX(50deg)rotateZ(180deg)]",
    "left-[30%] top-[13.5%] w-2/12 [transform:rotateY(-35deg)rotateZ(-12deg)]",
    "right-[30%] top-[13.5%] w-2/12 [transform:rotateY(35deg)rotateZ(12deg)]",
    "left-[3%] top-[55%] [transform:rotateX(35deg)rotateZ(255deg)]",
    "right-[3%] top-[55%] [transform:rotateX(35deg)rotateZ(-255deg)]",
    "right-[12%] top-[72.5%] [transform:rotateX(35deg)rotateZ(-230deg)]",
    "left-[12%] top-[72.5%] [transform:rotateX(35deg)rotateZ(230deg)]",
  ];

  const tailwindH2Settings = [
    "w-full text-3xl font-bold text-red-500",
    "w-full text-xl line-clamp-1",
    "w-full text-xl line-clamp-1",
    "w-full text-xl line-clamp-1",
    "w-full text-xl truncate",
    "w-full text-xl truncate",
    "text-xl line-clamp-1 w-2/3",
    "text-xl line-clamp-1 w-2/3",
    "text-xl line-clamp-1 w-2/3",
    "text-xl line-clamp-1 w-2/3",
  ];

  useState(() => {
    const fetchData = async () => {
      const data = await getDefaultData();
      const ingredients = data.map((categoryData) => {
        return categoryData.ingredients.map((ingredient) => {
          return ingredient.name;
        });
      });
      setDefaultData(ingredients);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(userSandwich);
    console.log(defaultData);
    console.log(currentIngredientsDisplay);
    console.log(defaultData[currentIngredientsDisplay]);
  }, [defaultData]);

  useEffect(() => {
    console.log("test");
    setCurrentCategory(() => {
      return Object.keys(categories)[categorySelector];
    });
    setDiceArray(categories[Object.keys(categories)[categorySelector]]);
  }, [categorySelector]);

  function delay(index, randomRoll) {
    setTimeout(() => {
      setDefaultData((prevData) => {
        return prevData.map((ingredientArray, index) => {
          return index !== currentIngredientsDisplay
            ? ingredientArray
            : [...ingredientArray.slice(1), ingredientArray[0]];
        });
      });

      if (index === randomRoll) {
        setShowResult(true);
        setDisableDice(false);
      }
    }, 25 * index);
  }

  function handleRoll() {
    if (defaultData[currentIngredientsDisplay].length === 0) {
    } else {
      const randomRoll = 100 + Math.floor(Math.random() * maxCategoryLength);
      setDisableDice(true);
      for (let i = 0; i <= randomRoll; i++) {
        delay(i, randomRoll);
        console.log(i);
      }
    }
  }

  // function delay(_: null, index: number, randomRoll: number) {
  //   setTimeout(() => {
  //     setDiceArray((prevArray: Array<number>) => {
  //       return [...prevArray.slice(1), prevArray[0]];
  //     });
  //     if (index === randomRoll - 1) {
  //       setShowResult(true);
  //       setDisableDice(false);
  //     }
  //   }, 25 * index);
  // }

  // if (diceArray.length === 0) {
  //   setCategoryCounter(categorySelector);
  //   setMinIngredientsWarning((prevBool) => !prevBool);
  // } else {
  //   setDisableDice(true);
  //   const randomRoll = 100 + Math.floor(Math.random() * maxCategoryLength);
  //   for (let i = 1; i < randomRoll; i++) {
  //     delay(categories[category][i % maxCategoryLength], i, randomRoll);
  //   }
  // }

  function moveToNextCategory() {
    setUserSandwich((prevData) => {
      return { ...prevData, [category]: diceArray[0].name };
    });
  }

  function moveToNextCategory(category: string) {
    if (categorySelector < categoriesAmount - 1) {
      setCategorySelector((prevSelector) => {
        return prevSelector + 1;
      });

      setCurrentCategory(() => {
        return Object.keys(categories)[categorySelector];
      });

      setDiceArray(categories[Object.keys(categories)[categorySelector]]);

      setMaxCategoryLength(diceArray.length);
    } else {
      setDisableDice(true);
    }
  }

  return (
    <div className="mb-16 flex flex-col items-center justify-center 2xl:order-2 2xl:w-[30%]">
      <div className="my-10 flex h-[492px] w-[492px] items-center justify-center">
        <div
          className={`${
            disableDice ? "pointer-events-none" : "pointer-events-auto"
          } relative flex h-full w-full cursor-pointer items-center justify-center`}
          onClick={() => {
            handleRoll();
          }}
        >
          <Image
            src={d20}
            width={492}
            height={492}
            alt="d20 Interactable"
            className="rotate-180"
          />
          {defaultData.length > 0 &&
            Array.isArray(defaultData[currentIngredientsDisplay]) &&
            defaultData[currentIngredientsDisplay].map((ingredient, index) => {
              return (
                <div
                  key={index}
                  className={`${tailwindDivSettings[index]} ${
                    index > 9 ? "hidden" : ""
                  }
                  absolute line-clamp-3 flex w-1/4 translate-x-[-50%] translate-y-[-50%] items-center justify-center`}
                >
                  <h2
                    className={`${tailwindH2Settings[index]} overflow-hidden text-ellipsis text-center`}
                    title={ingredient}
                  >
                    {ingredient}
                  </h2>
                </div>
              );
            })}
        </div>
      </div>
      <button
        onClick={() => {
          handleRoll();
        }}
        disabled={disableDice}
        className="relative flex w-1/2 items-center justify-center rounded-lg bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ebeae2] via-[#beb9a0] to-[#8e8b78] p-1 text-lg"
      >
        <h2 className="flex w-full items-center justify-center rounded-lg bg-black">
          <span className="font-bold text-neutral-100">Click dice to roll</span>
        </h2>
      </button>

      <DiceResultModal
        showResult={showResult}
        setShowResult={setShowResult}
        defaultData={defaultData}
        currentIngredientsDisplay={currentIngredientsDisplay}
        setCurrentIngredientsDisplay={setCurrentIngredientsDisplay}
        handleRoll={handleRoll}
      />
    </div>
  );
}
