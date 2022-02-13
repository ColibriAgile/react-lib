import React from "react";
import {
  fmtDateDDMMYYYYHHMM,
  fmtDateDDMMYYYY,
  fmtCNPJ,
  fmtDateDDMMYYYYHHMMSS,
  formatarPreco,
  formatarPrecoSemMoeda,
  formatarPrecoZero,
  formatarQuantidade
} from "../Util";
import moment from "moment";

test("renderiza data formatada", () => {
  const data = new Date(2021, 0, 1, 0, 0, 0, 0).toISOString();
  const dataFormatada = fmtDateDDMMYYYY(data);
  expect(dataFormatada).toBe("01/01/2021");
});

test("renderiza data hora formatada", () => {
  const data = new Date(2021, 0, 1, 0, 0, 0, 0).toISOString();
  const dataFormatada = fmtDateDDMMYYYYHHMM(data, false);
  expect(dataFormatada).toBe("01/01/2021 00:00");
});

test("renderiza data hora formatada com segundos", () => {
  const data = new Date(2021, 0, 1, 0, 0, 0, 0).toISOString();
  const dataFormatada = fmtDateDDMMYYYYHHMMSS(data, false);
  expect(dataFormatada).toBe("01/01/2021 00:00:00");
});

test("renderiza data hora formatada convertida para hora local", () => {
  const utc = moment.utc("2021-01-01T03:00:00.000Z");
  const dataFormatadaUtc = fmtDateDDMMYYYYHHMM(utc, false);
  expect(dataFormatadaUtc).toBe("01/01/2021 03:00");
  const dataFormatadaLocal = fmtDateDDMMYYYYHHMM(utc, true);
  expect(dataFormatadaLocal).toBe("01/01/2021 00:00");
});

test("renderiza data hora formatada convertida para hora local com segundos", () => {
  const utc = moment.utc("2021-01-01T03:00:00.000Z");
  const dataFormatadaUtc = fmtDateDDMMYYYYHHMMSS(utc, false);
  expect(dataFormatadaUtc).toBe("01/01/2021 03:00:00");
  const dataFormatadaLocal = fmtDateDDMMYYYYHHMMSS(utc, true);
  expect(dataFormatadaLocal).toBe("01/01/2021 00:00:00");
});

test("deve formatar um cnpj", () => {
  const cnpj = "12345678901234";
  const cnpjFormatado = fmtCNPJ(cnpj);
  expect(cnpjFormatado).toBe("12.345.678/9012-34");
});

test("deve formatar preco", () => {
  const valor = 123456789.123456789;
  const valorFormatado = formatarPreco(valor);
  expect(valorFormatado).toBe("R$ 123.456.789,12");
});

test("deve formatar preco sem R$", () => {
  const valor = 123456789.123456789;
  const valorFormatado = formatarPrecoSemMoeda(valor);
  expect(valorFormatado).toBe("123.456.789,12");
});

test("deve formatar preco zero", () => {
  let valor = 123456789.123456789;
  let valorFormatado = formatarPrecoZero(valor);
  expect(valorFormatado).toBe("R$ 123.456.789,12");

  valor = 0;
  valorFormatado = formatarPrecoZero(valor);
  expect(valorFormatado).toBe("0");
});

test("deve formatar quantidade", () => {
  const valor = 123456789.123456789;
  const valorFormatado = formatarQuantidade(valor);
  expect(valorFormatado).toBe("123.456.789,1235");
});