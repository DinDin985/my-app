"use client";
import Image from "next/image";
import d20 from "../../../public/d20.png";

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
import Warning from "../warning/Warning";
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
  const [disableDice, setDisableDice] = useState(false);
  const [maxCategoryLength, setMaxCategoryLength] = useState(
    currentCategory.length,
  );
  const [rerollAmount, setRerollAmount] = useState(3);
  const [showResult, setShowResult] = useState(false);
  const [userSandwich, setUserSandwich] = useAtom(sandwichLayout);

  const [minIngredientsWarning, setMinIngredientsWarning] = useAtom(
    minIngredientsWarningActive,
  );

  useEffect(() => {
    console.log("test");
    setCurrentCategory(() => {
      return Object.keys(categories)[categorySelector];
    });
    setDiceArray(categories[Object.keys(categories)[categorySelector]]);
  }, [categorySelector]);

  function delay(_: null, index: number, randomRoll: number) {
    setTimeout(() => {
      setDiceArray((prevArray: Array<number>) => {
        return [...prevArray.slice(1), prevArray[0]];
      });
      if (index === randomRoll - 1) {
        setShowResult(true);
        setDisableDice(false);
      }
    }, 25 * index);
  }

  function handleRoll(category: string) {
    if (diceArray.length === 0) {
      setCategoryCounter(categorySelector);
      setMinIngredientsWarning((prevBool) => !prevBool);
    } else {
      setDisableDice(true);

      const randomRoll = 100 + Math.floor(Math.random() * maxCategoryLength);

      for (let i = 1; i < randomRoll; i++) {
        delay(categories[category][i % maxCategoryLength], i, randomRoll);
      }
    }
  }

  function moveToNextCategory(category: string) {
    if (categorySelector < categoriesAmount - 1) {
      setUserSandwich((prevData) => {
        return { ...prevData, [category]: diceArray[0].name };
      });

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
            handleRoll(currentCategory);
          }}
        >
          <Image
            src={d20}
            width={492}
            height={492}
            alt="d20 Interactable"
            className="rotate-180"
          />
          {diceArray[0] && diceArray[0].name && (
            <div className="absolute left-[50%] top-[50%] line-clamp-3 flex w-1/4 translate-x-[-50%] translate-y-[-50%] items-center justify-center text-red-500">
              <h2
                className="w-full overflow-hidden text-ellipsis text-center text-3xl font-bold"
                title={diceArray[0].name}
              >
                {diceArray[0].name}
              </h2>
            </div>
          )}

          {diceArray[1] && diceArray[1].name && (
            <div className="absolute left-[15%] top-[36%] flex w-1/4 translate-x-[-50%] translate-y-[-50%] items-center justify-center [transform:rotateX(50deg)rotateZ(-70deg)]">
              <h3 className="line-clamp-1 w-full overflow-hidden text-ellipsis text-center text-xl">
                {diceArray[1].name}
              </h3>
            </div>
          )}

          {diceArray[2] && diceArray[2].name && (
            <div className="absolute right-[15%] top-[36%] flex w-1/4 translate-x-[-50%] translate-y-[-50%] items-center justify-center [transform:rotateX(50deg)rotateZ(70deg)]">
              <h3 className="line-clamp-1 w-full overflow-hidden text-ellipsis text-center text-xl">
                {diceArray[2].name}
              </h3>
            </div>
          )}

          {diceArray[3] && diceArray[3].name && (
            <div className="absolute left-[37.5%] top-[77%] flex w-1/4 translate-x-[-50%] translate-y-[-50%] items-center justify-center [transform:rotateX(50deg)rotateZ(180deg)]">
              <h3 className="line-clamp-1 w-full overflow-hidden text-ellipsis text-center text-xl">
                {diceArray[3].name}
              </h3>
            </div>
          )}

          {diceArray[4] && diceArray[4].name && (
            <div className="absolute left-[30%] top-[13.5%] flex w-2/12 translate-x-[-50%] translate-y-[-50%] items-center justify-center [transform:rotateY(-35deg)rotateZ(-12deg)]">
              <h3 className="w-full overflow-hidden truncate text-ellipsis text-center text-xl">
                {diceArray[4].name}
              </h3>
            </div>
          )}

          {diceArray[5] && diceArray[5].name && (
            <div className="absolute right-[30%] top-[13.5%] flex w-2/12 translate-x-[-50%] translate-y-[-50%] items-center justify-center [transform:rotateY(35deg)rotateZ(12deg)]">
              <h3 className="w-full overflow-hidden truncate text-ellipsis text-center text-xl">
                {diceArray[5].name}
              </h3>
            </div>
          )}

          {diceArray[6] && diceArray[6].name && (
            <div className="absolute left-[3%] top-[55%] flex w-1/4 translate-x-[-50%] translate-y-[-50%] items-center justify-center [transform:rotateX(35deg)rotateZ(255deg)]">
              <h3 className="line-clamp-1 w-2/3 overflow-hidden text-ellipsis text-center text-xl">
                {diceArray[6].name}
              </h3>
            </div>
          )}

          {diceArray[7] && diceArray[7].name && (
            <div className="absolute right-[3%] top-[55%] flex w-1/4 translate-x-[-50%] translate-y-[-50%] items-center justify-center [transform:rotateX(35deg)rotateZ(-255deg)]">
              <h3 className="line-clamp-1 w-2/3 overflow-hidden text-ellipsis text-center text-xl">
                {diceArray[7].name}
              </h3>
            </div>
          )}

          {diceArray[8] && diceArray[8].name && (
            <div className="absolute right-[12%] top-[72.5%] flex w-1/4 translate-x-[-50%] translate-y-[-50%] items-center justify-center [transform:rotateX(35deg)rotateZ(-230deg)]">
              <h3 className="line-clamp-1 w-2/3 overflow-hidden text-ellipsis text-center text-xl">
                {diceArray[8].name}
              </h3>
            </div>
          )}

          {diceArray[9] && diceArray[9].name && (
            <div className="absolute left-[12%] top-[72.5%] flex w-1/4 translate-x-[-50%] translate-y-[-50%] items-center justify-center [transform:rotateX(35deg)rotateZ(230deg)]">
              <h3 className="line-clamp-1 w-2/3 overflow-hidden text-ellipsis text-center text-xl">
                {diceArray[9].name}
              </h3>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          handleRoll(currentCategory);
        }}
        disabled={disableDice}
        className="relative flex w-1/2 items-center justify-center rounded-lg bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ebeae2] via-[#beb9a0] to-[#8e8b78] p-1 text-lg"
      >
        <h2 className="flex w-full items-center justify-center rounded-lg bg-black">
          <span className="font-bold opacity-100">
            Click <span className="opacity-80">dice to roll</span>
          </span>
        </h2>
      </button>
      <button
        onClick={() => {
          console.log(categories);
          console.log(categorySelector);
          console.log(diceArray);
          console.log(categories[Object.keys(categories)[categorySelector]]);
          console.log(userSandwich.fn);
          console.log(currentCategory);
        }}
      >
        sdaasds
      </button>

      <div
        className={`${
          showResult ? "flex" : "hidden"
        } fixed h-screen w-screen items-center justify-center backdrop-brightness-[20%]`}
      >
        <div className="flex h-1/2 w-[450px] flex-col items-center justify-center rounded-md">
          <div className="flex h-4/6 w-full flex-col items-center justify-center bg-[#666666] p-4">
            {diceArray[0] && diceArray[0].name && (
              <h1
                className="truncate text-5xl font-bold leading-loose"
                title={diceArray[0].name}
              >
                {diceArray[0].name}
              </h1>
            )}

            <p>Has Been Selected</p>
          </div>
          <div className="flex h-2/6 w-full items-center justify-around">
            <button
              onClick={() => {
                setShowResult(false);
                moveToNextCategory(currentCategory);
              }}
              className="w-[45%] rounded-lg bg-[#c1c1c1] p-1 text-xl font-bold uppercase text-primary transition-all ease-in-out hover:scale-105"
            >
              Continue
            </button>
            <button
              disabled={rerollAmount === 0 ? true : false}
              onClick={() => {
                setShowResult(false);
                setRerollAmount((prevAmount) => prevAmount - 1);
                handleRoll(currentCategory);
              }}
              className={`${
                rerollAmount !== 0
                  ? "hover:scale-105"
                  : "brightness-[65%] hover:scale-100"
              } w-[45%] rounded-lg bg-[#666666] p-1 text-xl font-bold uppercase transition-all ease-in-out`}
            >
              Reroll
            </button>
          </div>
        </div>
      </div>
      <div className={`${minIngredientsWarning ? "visable" : "invisible"} `}>
        <Warning
          msg={
            "You must include at least one ingredient in the category or delete the category in order to continue to roll."
          }
        />
      </div>
    </div>
  );
}
