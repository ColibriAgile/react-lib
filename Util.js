import moment from "moment";

const { v4: uuidv4 } = require("uuid");

const CNPJ_REGEX = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g;

const ID_INSTALACAO_REGEX = /([\s\S]{4})/g;

const COD_ATIVACAO_REGEX = /([\s\S]{3})/g;

const uniqueId = () => {
  return uuidv4().substring(0, 8);
};

const fmtDateDDMMYYYYHHMM = (value, convertToLocalDate = true) => {
  if (convertToLocalDate) {
    return moment.utc(value).local().format("DD/MM/YYYY HH:mm:ss");
  }
  return moment(value).format("DD/MM/YYYY HH:mm:ss");
};

const fmtDateDDMMYYYY = (value) => {
  if (value) {
    return moment(value).format("DD/MM/YYYY");
  } else {
    return null;
  }
};

const fmtCNPJ = (value) => {
  if (value) {
    return value.replace(/\D/g, "").replace(CNPJ_REGEX, "$1.$2.$3/$4-$5");
  }
};

const fmtIdInstalacao = (value) => {
  let idInstalacao = "";
  if (value) {
    let blocks = value.toUpperCase().match(ID_INSTALACAO_REGEX);
    idInstalacao = blocks.join("-");
  }
  return idInstalacao;
};

const fmtCodigoAtivacao = (value) => {
  let codigo = "";
  if (value) {
    let blocks = value.toUpperCase().match(COD_ATIVACAO_REGEX);
    codigo = blocks.join("-");
  }
  return codigo;
};

const formatarPreco = (valor) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
};

const formatarPrecoSemMoeda = (valor) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(valor);
};

const formatarPrecoZero = (valor) => {
  if (valor === 0) {
    return "0";
  }
  return formatarPreco(valor);
};

const formatarConversao = (valor) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(valor);
};

const formatarQuantidade = (valor) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(valor);
};

const latinize = require("latinize");

function filterDxStringColumn(filterValue, selectedOperation) {
  if (selectedOperation !== "=") {
    let filtro = latinize(filterValue?.trim()).toLowerCase();
    let data = latinize(this.dataField?.trim()).toLowerCase();
    return [data, selectedOperation, filtro];
  }
  return [this.dataField, selectedOperation, filterValue];
}

function latinizeStr(data) {
  if (data) {
    return latinize(data?.trim()).toLowerCase();
  }
  return "";
}

function roundNumber(number, places) {
  return Number(Math.round(number + "e" + places) + "e-" + places);
}

export {
  fmtCNPJ,
  fmtDateDDMMYYYYHHMM,
  fmtDateDDMMYYYY,
  fmtIdInstalacao,
  fmtCodigoAtivacao,
  uniqueId,
  formatarConversao,
  latinizeStr,
  filterDxStringColumn,
  formatarPreco,
  formatarPrecoZero,
  formatarQuantidade,
  roundNumber,
  formatarPrecoSemMoeda
};
