export function IngredientSkeleton() {
  return (
    <div className="mb-2 flex w-full items-center rounded-lg bg-neutral-100 p-1"></div>
  );
}

export function IngredientsSkeleton() {
  return (
    <div>
      <IngredientSkeleton />
      <IngredientSkeleton />
      <IngredientSkeleton />
      <IngredientSkeleton />
      <IngredientSkeleton />
      <IngredientSkeleton />
      <IngredientSkeleton />
      <IngredientSkeleton />
      <IngredientSkeleton />
      <IngredientSkeleton />
    </div>
  );
}
