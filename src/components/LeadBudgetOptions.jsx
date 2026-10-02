import { GARDEN_BUDGET, isGardenProject } from "../../shared/garden-budget.js";

export default function LeadBudgetOptions({ projectType, allowUnknown = false }) {
  if (isGardenProject(projectType)) {
    return <option value={GARDEN_BUDGET}>{GARDEN_BUDGET}</option>;
  }
  return <>
    <option>Menos de 5.000 €</option>
    <option>5.000 € - 10.000 €</option>
    <option>10.000 € - 20.000 €</option>
    <option>Más de 20.000 €</option>
    {allowUnknown && <option>Aún no lo sé</option>}
  </>;
}
