import IngredientsListing from "./components/userLists/IngredientsCustomization";
import SpinInterface from "./components/userLists/SpinInterface";
import UserSandwhich from "./components/userLists/UserSandwhich";

export default function Home() {
  return (
    <div className="relative h-full">
      <div className="hidden h-[calc(100vh-60px)] items-center justify-around 2xl:flex">
        <SpinInterface />
        <UserSandwhich />
        <IngredientsListing />
      </div>

      <div className="flex h-full flex-col items-center 2xl:hidden">
        <SpinInterface />
        <div className="relative flex h-full w-full flex-col items-center xl:flex-row xl:items-start xl:justify-around">
          <UserSandwhich />
          <IngredientsListing />
        </div>
      </div>
    </div>
  );
}
