import { minIngredientsWarningActive } from "@/app/atoms/warningAtoms";
import { useAtom } from "jotai";
import Image from "next/image";
import warningIcon from "../../../public/icons/warning.png";

export default function Warning({ msg }) {
  const [minIngredientsWarning, setMinIngredientsWarning] = useAtom(
    minIngredientsWarningActive,
  );

  return (
    <div>
      <div className="fixed left-1/2 top-1/2 z-30 h-[42.5%] w-[90%] translate-x-[-50%] translate-y-[-50%] bg-secondary p-5 text-primary">
        <div className="flex h-[80%] w-full flex-col items-center">
          <Image
            className="mb-4"
            height={100}
            width={100}
            alt="Warning Icon"
            src={warningIcon}
          />
          <h1 className="mb-3 text-3xl font-bold">Warning</h1>
          <p className="text-center">{msg}</p>
        </div>
        <div className="flex h-[20%] w-full items-end justify-end">
          <button
            onClick={() => {
              setMinIngredientsWarning((prevBool) => !prevBool);
            }}
            className="h-9 w-14 rounded-md bg-primary font-bold text-secondary"
          >
            OK
          </button>
        </div>
      </div>

      <div
        onClick={() => {
          setMinIngredientsWarning((prevBool) => !prevBool);
        }}
        className={`${
          minIngredientsWarning
            ? "backdrop-brightness-50"
            : "backdrop-brightness-100"
        } fixed left-0 top-0 z-20 h-screen w-screen transition duration-250 ease-in-out`}
      ></div>
    </div>
  );
}
