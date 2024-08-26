export default function IngredientsList({ ingredientName }) {
  return (
    <div className="mb-2 flex w-full items-center rounded-lg bg-neutral-100 p-1 dark:text-neutral-900">
      {ingredientName}
    </div>
  );
}
