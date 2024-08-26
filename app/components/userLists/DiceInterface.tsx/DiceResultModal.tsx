import { initalList } from "@/app/atoms/atoms";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { useState } from "react";
import Warning from "../../warning/Warning";

export default function DiceResultModal({
  showResult,
  setShowResult,
  defaultData,
  currentIngredientsDisplay,
  setCurrentIngredientsDisplay,
  handleRoll,
}) {
  const [listData, setListData] = useAtom(initalList);
  const [rerollAmount, setRerollAmount] = useState(3);

  return (
    <div
      className={`${
        showResult ? "flex" : "hidden"
      } fixed left-0 top-0 z-10 h-screen w-screen items-center justify-center backdrop-brightness-[20%]`}
    >
      <div className="flex h-1/2 w-[450px] flex-col items-center justify-center rounded-md">
        <div className="flex h-4/6 w-full flex-col items-center justify-center bg-neutral-100 p-4 dark:bg-[#666666]">
          {defaultData[currentIngredientsDisplay][0] && (
            <h1
              className="truncate text-5xl font-bold leading-loose"
              title={defaultData[currentIngredientsDisplay][0]}
            >
              {defaultData[currentIngredientsDisplay][0]}
            </h1>
          )}

          <p>Has Been Selected</p>
        </div>

        <div className="flex h-2/6 w-full items-center justify-around">
          <Button
            onClick={() => {
              setShowResult(false);
              setCurrentIngredientsDisplay((prevDisplay) => prevDisplay + 1);
              setListData((prevData) => {
                return prevData.map((targetElement, index) => {
                  return index === currentIngredientsDisplay
                    ? {
                        category: targetElement.category,
                        ingredient: defaultData[currentIngredientsDisplay][0],
                      }
                    : { ...targetElement };
                });
              });
            }}
            className="w-[45%] rounded-lg bg-neutral-100 p-1 text-xl font-bold uppercase text-primary transition-all ease-in-out hover:scale-105 dark:bg-[#c1c1c1]"
          >
            Continue
          </Button>

          <Button
            disabled={rerollAmount === 0 ? true : false}
            onClick={() => {
              setShowResult(false);
              setRerollAmount((prevAmount) => prevAmount - 1);
              handleRoll();
            }}
            className={`${
              rerollAmount !== 0
                ? "hover:scale-105"
                : "brightness-[65%] hover:scale-100"
            } w-[45%] rounded-lg bg-neutral-900 p-1 text-xl font-bold uppercase text-neutral-100 transition-all ease-in-out dark:bg-[#666666]`}
          >
            Reroll ({rerollAmount})
          </Button>
        </div>
      </div>

      <div
        className={`${
          defaultData[currentIngredientsDisplay].length === 0
            ? "visable"
            : "invisible"
        } `}
      >
        <Warning
          msg={
            "You must include at least one ingredient in the category or delete the category in order to continue to roll."
          }
        />
      </div>
    </div>
  );
}
