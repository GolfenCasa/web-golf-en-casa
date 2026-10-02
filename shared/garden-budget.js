export const GARDEN_PROJECT = "Golf Studio en jardín";
export const GARDEN_BUDGET = "20.000 € o más";
export const GARDEN_BUDGET_NOTICE =
  "Golf Studio en jardín, incluyendo la caseta y el simulador, parte de 20.000 €. Para solicitar este proyecto, confirma un presupuesto de 20.000 € o más.";

export function isGardenProject(projectType) {
  return String(projectType ?? "").trim().toLocaleLowerCase("es") ===
    GARDEN_PROJECT.toLocaleLowerCase("es");
}

export function isGardenBudgetValid({ projectType, budget }) {
  return !isGardenProject(projectType) ||
    [GARDEN_BUDGET, "Más de 20.000 €"].includes(budget);
}

export function updateLeadForm(current, name, value) {
  const next = { ...current, [name]: value };
  if (name === "projectType") {
    if (isGardenProject(value)) {
      next.budget = isGardenBudgetValid(next) ? GARDEN_BUDGET : "";
    } else if (next.budget === GARDEN_BUDGET) {
      next.budget = "Más de 20.000 €";
    }
  }
  return next;
}
