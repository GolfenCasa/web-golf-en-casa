import assert from "node:assert/strict";
import { test } from "node:test";
import {
  EMPTY_SPACE_MEASUREMENTS,
  getSpaceMeasurementsError,
  isValidSpaceMeasurement,
  normaliseSpaceMeasurements,
} from "../shared/space-measurements.js";

test("space measurements: vacío inicial y errores localizados", () => {
  assert.deepEqual(EMPTY_SPACE_MEASUREMENTS, {
    height: "", width: "", depth: "", dimensionsUnknown: false,
  });
  assert.equal(normaliseSpaceMeasurements(EMPTY_SPACE_MEASUREMENTS).valid, false);
  assert.match(getSpaceMeasurementsError(EMPTY_SPACE_MEASUREMENTS), /altura, anchura y fondo/);
  assert.match(getSpaceMeasurementsError(EMPTY_SPACE_MEASUREMENTS, "en"), /height, width and depth/);
  assert.match(getSpaceMeasurementsError(EMPTY_SPACE_MEASUREMENTS, "en"), /I don’t know them yet/);
});

test("space measurements: solo strings decimales positivos con hasta dos decimales", () => {
  for (const value of ["3", "0.01", "0,01", " 03,20 ", "5.00", "6,4"]) {
    assert.equal(isValidSpaceMeasurement(value), true, value);
  }
  for (const value of [
    undefined, null, false, true, 3, {}, [], "", " ", "0", "0,00", "-1", "+3", ".5", "3.",
    "NaN", "Infinity", "1e2", "3.141", "3,141", "2,5.0", "2 5", "3 m", "15 m²", "6 x 5 x 3", "9".repeat(400),
  ]) {
    assert.equal(isValidSpaceMeasurement(value), false, JSON.stringify(value));
  }
});

test("space measurements: coma y punto se normalizan sin redondear ni confundir ejes", () => {
  const input = { height: "03,20", width: "04.10", depth: "06,00", dimensionsUnknown: false, dimensions: "legacy" };
  assert.deepEqual(normaliseSpaceMeasurements(input), {
    height: "3.2", width: "4.1", depth: "6", dimensionsUnknown: false,
    dimensions: "Altura: 3.2 m · Anchura: 4.1 m · Fondo: 6 m", valid: true,
  });
  assert.equal(input.height, "03,20", "no muta los valores del formulario");
  assert.equal(getSpaceMeasurementsError(input), "");
});

test("space measurements: unknown boolean true es la única excepción", () => {
  const values = { height: "-1", width: "NaN", depth: "0", dimensions: "legacy", dimensionsUnknown: true };
  assert.deepEqual(normaliseSpaceMeasurements(values), {
    height: "", width: "", depth: "", dimensionsUnknown: true,
    dimensions: "Todavía no las sabe (proyecto en planificación)", valid: true,
  });
  assert.equal(getSpaceMeasurementsError(values), "");
  for (const dimensionsUnknown of ["true", "false", 1, null]) {
    assert.equal(normaliseSpaceMeasurements({ ...values, dimensionsUnknown }).valid, false);
    assert.equal(normaliseSpaceMeasurements({ height: "3", width: "4", depth: "6", dimensionsUnknown }).valid, false);
  }
});

test("space measurements: no admite resumen legacy ni medidas parciales", () => {
  for (const values of [undefined, null, {}, { dimensions: "6 x 5 x 3 m" }, { height: "3", width: "4" }]) {
    assert.equal(normaliseSpaceMeasurements(values).valid, false);
    assert.equal(normaliseSpaceMeasurements(values).dimensions, "");
  }
});
