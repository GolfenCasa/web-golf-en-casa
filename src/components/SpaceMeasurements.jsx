import { useId, useRef, useState } from "react";
import { isValidSpaceMeasurement } from "../../shared/space-measurements.js";

const COPY = {
  es: {
    title: "Medidas aproximadas del espacio",
    help: "Indica cada medida en metros. Puedes usar coma o punto decimal, por ejemplo: 2,80.",
    unknown: "Todavía no las sé",
    planning: "Puedes enviar tu consulta para planificar el simulador. Te pediremos las medidas antes de valorar la viabilidad y preparar un presupuesto.",
    fields: [
      ["height", "Altura libre (m)", "2,80", "altura libre"],
      ["width", "Anchura (m)", "4,00", "anchura"],
      ["depth", "Fondo (m)", "6,00", "fondo"],
    ],
    required: (name) => `Falta la medida de ${name}. Rellénala o marca «Todavía no las sé».`,
    invalid: (name) => `Indica la medida de ${name} en metros, mayor que 0 y con un máximo de dos decimales.`,
    mandatory: "obligatorio",
  },
  en: {
    title: "Approximate space dimensions",
    help: "Enter each measurement in metres. Use a decimal point or comma, for example: 2.80.",
    unknown: "I don’t know them yet",
    planning: "You can send your enquiry to start planning your simulator. We will need the dimensions before assessing feasibility and preparing a quote.",
    fields: [
      ["height", "Clear height (m)", "2.80", "clear height"],
      ["width", "Width (m)", "4.00", "width"],
      ["depth", "Depth (m)", "6.00", "depth"],
    ],
    required: (name) => `Enter the ${name} or select “I don’t know them yet”.`,
    invalid: (name) => `Enter the ${name} in metres, greater than 0 and with up to two decimal places.`,
    mandatory: "required",
  },
};

export default function SpaceMeasurements({ values, setValues, language = "es", appearance = "light", className = "" }) {
  const id = useId();
  const inputs = useRef({});
  const [invalidFields, setInvalidFields] = useState({});
  const copy = COPY[language] || COPY.es;
  const unknown = values.dimensionsUnknown === true;
  const dark = appearance === "dark";
  const signature = appearance === "signature";
  const helpClass = dark ? "text-zinc-300" : "text-zinc-600";
  const inputClass = signature
    ? "signature-input w-full min-w-0 disabled:cursor-not-allowed disabled:opacity-50"
    : "w-full min-w-0 rounded-xl border border-zinc-300 bg-white px-3 py-3 text-base text-zinc-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:border-zinc-300 disabled:bg-zinc-200 disabled:text-zinc-500";

  const fieldError = (value, label) => !String(value ?? "").trim()
    ? copy.required(label)
    : isValidSpaceMeasurement(value) ? "" : copy.invalid(label);

  const toggleUnknown = (event) => {
    const checked = event.target.checked;
    Object.values(inputs.current).forEach((input) => input?.setCustomValidity(""));
    setInvalidFields({});
    setValues((current) => ({
      ...current,
      dimensionsUnknown: checked,
      ...(checked ? { height: "", width: "", depth: "" } : {}),
    }));
  };

  return (
    <fieldset className={`min-w-0 rounded-2xl border p-4 ${dark ? "border-white/15 bg-white/5 text-white" : "border-zinc-200 bg-white text-zinc-900"} ${className}`} aria-describedby={`${id}-help`}>
      <legend className="px-1 text-sm font-semibold">{copy.title}</legend>
      <p id={`${id}-help`} className={`mb-4 text-xs leading-5 ${helpClass}`}>{copy.help}</p>
      <div className="grid grid-cols-3 gap-3">
        {copy.fields.map(([name, label, placeholder, errorLabel]) => {
          const error = !unknown && invalidFields[name] ? fieldError(values[name], errorLabel) : "";
          return (
            <div key={name} className="min-w-0">
              <label htmlFor={`${id}-${name}`} className="mb-2 flex min-h-10 items-end text-xs font-medium sm:min-h-5">
                {label}{!unknown && <span className="ml-1" aria-label={copy.mandatory}>*</span>}
              </label>
              <input
                ref={(input) => { inputs.current[name] = input; }}
                id={`${id}-${name}`}
                name={name}
                type="text"
                inputMode="decimal"
                pattern={"\\s*[0-9]+([.,][0-9]{1,2})?\\s*"}
                maxLength={10}
                autoComplete="off"
                placeholder={unknown ? "—" : placeholder}
                value={unknown ? "" : values[name] || ""}
                required={!unknown}
                disabled={unknown}
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? `${id}-${name}-error` : `${id}-help`}
                onChange={(event) => {
                  const value = event.target.value;
                  event.target.setCustomValidity(value ? fieldError(value, errorLabel) : "");
                  setValues((current) => ({ ...current, [name]: value }));
                }}
                onInvalid={(event) => {
                  event.target.setCustomValidity(fieldError(event.target.value, errorLabel));
                  setInvalidFields((current) => ({ ...current, [name]: true }));
                }}
                onBlur={(event) => {
                  if (event.target.value) setInvalidFields((current) => ({ ...current, [name]: true }));
                }}
                className={`${inputClass} ${error ? "border-red-500 ring-1 ring-red-500" : ""}`}
              />
              {error && <p id={`${id}-${name}-error`} className={`mt-2 text-xs leading-5 ${dark ? "text-red-300" : "text-red-700"}`}>{error}</p>}
            </div>
          );
        })}
      </div>
      <label htmlFor={`${id}-unknown`} className="mt-4 flex cursor-pointer items-center gap-3 text-sm font-medium">
        <input id={`${id}-unknown`} name="dimensionsUnknown" type="checkbox" checked={unknown} onChange={toggleUnknown} className="h-5 w-5 shrink-0 accent-emerald-700" />
        {copy.unknown}
      </label>
      {unknown && <p role="status" className={`mt-3 text-xs leading-5 ${helpClass}`}>{copy.planning}</p>}
    </fieldset>
  );
}
