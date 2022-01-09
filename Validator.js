const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const urlPattern = '(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?';

const campoVazio = (value) => {
  return (
    value === null ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

const emailInvalido = (value) => {
  return campoVazio(value) || !emailPattern.test(value);
};

const urlInvalida = (value) => {
  return campoVazio(value) || !urlPattern.test(value);
}

const minLength = (value, length) => {
  return !campoVazio(value) && value.length < length;
};

const maxLength = (value, length) => {
  return !campoVazio(value) && value.length > length;
};

const hasNumber = (value) => {
  const pattern = new RegExp(/[0-9]/);
  return pattern.test(value);
};

const hasCapitalLetter = (value) => {
  const pattern = new RegExp(/[A-Z]/);
  return pattern.test(value);
};

const hasEspecialCharacter = (value) => {
  const pattern = new RegExp(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/);
  return pattern.test(value);
};

const validate = (form, name, field, t) => {
  const value = form[name];
  if (field.rules["required"] && campoVazio(value)) {
    return t("erro.obrigatorio");
  }
  if (field.rules["email"] && emailInvalido(value)) {
    return t("erro.email");
  }
   if (field.rules["url"] && urlInvalida(value)) {
    return t("erro.url");
  }
  if (field.rules["minLength"] && minLength(value, field.rules["minLength"])) {
    return t("erro.tam-min", { tam: field.rules["minLength"] });
  }
  if (field.rules["maxLength"] && maxLength(value, field.rules["maxLength"])) {
    return t("erro.tam-max", { tam: field.rules["maxLength"] });
  }
  if (field.rules["hasNumber"] && !hasNumber(value)) {
    return t("erro.numero");
  }
  if (field.rules["hasCapitalLetter"] && !hasCapitalLetter(value)) {
    return t("erro.letra-maiuscula");
  }
  if (field.rules["hasEspecialCharacter"] && !hasEspecialCharacter(value)) {
    return t("erro.caracter-especial");
  }
  if (field.rules["equal"] && value !== form[field.rules["equal"]]) {
    return t("erro.valor-diferente");
  }

  return null;
};

export default validate;
