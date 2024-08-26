import { Button } from "@/components/ui/button";

export default function AddCategoryBtn({ setShowAddCategory }) {
  return (
    <Button
      onClick={() => {
        setShowAddCategory((prevState) => !prevState);
      }}
      className="h-10 min-h-[2.5rem] w-[83.3%] rounded-2xl bg-primary text-xl font-semibold text-secondary"
    >
      + Add new category
    </Button>
  );
}
