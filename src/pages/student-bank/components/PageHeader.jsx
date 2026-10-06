import { ChevronLeft, CreditCard } from "lucide-react";

export function PageHeader({
  title = "Student Bank List",
  des = "You can see your student banks here.",
  isDetail = false,
}) {
  return (
    <div className="flex items-center gap-3">
      {isDetail ? (
        <button
          onClick={() => history.back()}
          className="group flex size-12 cursor-pointer items-center justify-center rounded-md transition-colors duration-200 hover:bg-zinc-100"
        >
          <ChevronLeft className="size-6 text-zinc-500 group-hover:text-zinc-900" />
        </button>
      ) : (
        <div className="flex size-12 items-center justify-center rounded-md bg-green-700 text-white">
          <CreditCard />
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-xs text-zinc-500">{des}</p>
      </div>
    </div>
  );
}
