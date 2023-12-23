import React from "react";
import SpinInterface from "./components/userLists/SpinInterface";
import UserSandwhich from "./components/userLists/UserSandwhich";
import IngredientsListing from "./components/userLists/IngredientsCustomization";

export default function Home() {
  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <SpinInterface />
        <UserSandwhich />
        <IngredientsListing />
      </div>
    </div>
  );
}
