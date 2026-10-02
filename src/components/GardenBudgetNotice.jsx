import { GARDEN_BUDGET_NOTICE, isGardenProject } from "../../shared/garden-budget.js";

export default function GardenBudgetNotice({ projectType }) {
  return <div role="status" aria-live="polite" className="md:col-span-2 empty:hidden">
    {isGardenProject(projectType) && <p className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
      {GARDEN_BUDGET_NOTICE}
    </p>}
  </div>;
}
