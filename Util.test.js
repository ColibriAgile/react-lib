import React from "react";
import { render } from "@testing-library/react";
import { fmtDateDDMMYYYYHHMM, fmtDateDDMMYYYY } from "./Util";
import moment from "moment";

test("renderiza data formatada", () => {
  const data = new Date(2021, 0, 1, 0, 0, 0, 0).toISOString();
  const dataFormatada = fmtDateDDMMYYYY(data);
  expect(dataFormatada).toBe("01/01/2021");
});

test("renderiza data hora formatada", () => {
  const data = new Date(2021, 0, 1, 0, 0, 0, 0).toISOString();
  const dataFormatada = fmtDateDDMMYYYYHHMM(data, false);
  expect(dataFormatada).toBe("01/01/2021 00:00:00");
});

test("renderiza data hora formatada convertida para hora local", () => {
  const utc = moment.utc("2021-01-01T03:00:00.000Z");
  const dataFormatadaUtc = fmtDateDDMMYYYYHHMM(utc, false);
  expect(dataFormatadaUtc).toBe("01/01/2021 03:00:00");
  const dataFormatadaLocal = fmtDateDDMMYYYYHHMM(utc, true);
  expect(dataFormatadaLocal).toBe("01/01/2021 00:00:00");
});
