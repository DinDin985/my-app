import { getDefaultCategories } from "@/app/actions";
import { initalList } from "@/app/atoms/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function UserSandwhichList({ customCategories }) {
  const [listData, setListData] = useAtom(initalList);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDefaultCategories();
      const itemData = data.map((category) => {
        return { category: category.name, ingredient: "" };
      });
      setListData(itemData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setListData((prevData) => {
      return [...prevData, ...customCategories];
    });
  }, [customCategories]);

  useEffect(() => {
    console.log(listData);
  }, [listData]);

  return (
    <ul className="mb-5 h-fit w-10/12 overflow-y-auto ">
      {listData &&
        listData.map((item, index) => {
          return (
            <li
              key={index}
              className="mb-2 flex h-10 items-center rounded-lg bg-neutral-100 pl-2 dark:text-neutral-900"
            >
              <h2
                className="max-w-[10rem] truncate text-2xl font-bold"
                title={item.category}
              >
                {item.category}
              </h2>
              <h2 className="mr-1.5 pl-1 text-2xl font-bold">:</h2>
              <h2 className="pl-1 text-2xl">{item.ingredient}</h2>
            </li>
          );
        })}
    </ul>
  );
}
