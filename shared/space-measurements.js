export const EMPTY_SPACE_MEASUREMENTS = Object.freeze({
  height: "",
  width: "",
  depth: "",
  dimensionsUnknown: false,
});

const MEASUREMENT_FIELDS = ["height", "width", "depth"];

export function isValidSpaceMeasurement(value) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(trimmed)) return false;
  const numericValue = Number(trimmed.replace(",", "."));
  return Number.isFinite(numericValue) && numericValue > 0;
}

function normaliseMeasurement(value) {
  if (!isValidSpaceMeasurement(value)) return "";
  const [integer, decimal = ""] = value.trim().replace(",", ".").split(".");
  const whole = integer.replace(/^0+(?=\d)/, "");
  const fraction = decimal.replace(/0+$/, "");
  return fraction ? `${whole}.${fraction}` : whole;
}

export function normaliseSpaceMeasurements(values = {}) {
  const source = values && typeof values === "object" ? values : {};
  if (source.dimensionsUnknown === true) {
    return {
      height: "",
      width: "",
      depth: "",
      dimensionsUnknown: true,
      dimensions: "Todavía no las sabe (proyecto en planificación)",
      valid: true,
    };
  }

  const height = normaliseMeasurement(source.height);
  const width = normaliseMeasurement(source.width);
  const depth = normaliseMeasurement(source.depth);
  const valid =
    (source.dimensionsUnknown === undefined || source.dimensionsUnknown === false) &&
    MEASUREMENT_FIELDS.every((field) => isValidSpaceMeasurement(source[field]));

  return {
    height,
    width,
    depth,
    dimensionsUnknown: false,
    dimensions: valid
      ? `Altura: ${height} m · Anchura: ${width} m · Fondo: ${depth} m`
      : "",
    valid,
  };
}

export function getSpaceMeasurementsError(values, language = "es") {
  if (normaliseSpaceMeasurements(values).valid) return "";
  return language === "en"
    ? "Enter a valid height, width and depth in metres (greater than 0, with no more than 2 decimal places), or select ‘I don’t know them yet’."
    : "Indica una altura, anchura y fondo válidos en metros (mayores que 0 y con un máximo de 2 decimales) o marca «Todavía no las sé».";
}
