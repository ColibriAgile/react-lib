const campoVazio = (value) => {
  return (
    value === null ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

const emailInvalido = (value) => {
  const emailPattern = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  return campoVazio(value) || !emailPattern.test(value);
};

const urlInvalida = (value) => {
  const pattern = new RegExp(/^(ftp|https?):\/\/[^\s$.?#].[^\s]*$/i);
  return campoVazio(value) || !pattern.test(value);
}

const minLength = (value, length) => {
  return !campoVazio(value) && value.length < length;
};

const maxLength = (value, length) => {
  return !campoVazio(value) && value.length > length;
};

const hasNumber = (value) => {
  const pattern = new RegExp(/\d/);
  return !campoVazio(value) && !pattern.test(value);
};

const hasCapitalLetter = (value) => {
  const pattern = new RegExp(/[A-Z]/);
  return !campoVazio(value) && !pattern.test(value);
};

const hasEspecialCharacter = (value) => {
  const pattern = new RegExp(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/);
  return !campoVazio(value) && !pattern.test(value);
};

/**
 * só pode conter números e pontos [\d.]
 * não pode começar nem terminar em ponto (?!\.) (?!.*\.$)
 * não pode ter 2 pontos consecutivos (?!.*\.\.)
 */
const versaoInvalida = (value) => {
   const pattern = new RegExp( /^(?!\.)(?!.*\.$)(?!.*\.\.)[\d.]+$/);
  return !campoVazio(value) && !pattern.test(value);
}

const validations = {
  required: campoVazio,
  email: emailInvalido,
  url: urlInvalida,
  minLength: minLength,
  maxLength: maxLength,
  hasNumber: hasNumber,
  hasCapitalLetter: hasCapitalLetter,
  hasEspecialCharacter: hasEspecialCharacter,
  versao: versaoInvalida,
  equal: (value, field) => {
    return value !== field;
  }
}

const messages = {
  required: "erro.obrigatorio",
  email: "erro.email",
  url: "erro.url",
  minLength: "erro.tam-min",
  maxLength: "erro.tam-max",
  hasNumber: "erro.numero",
  hasCapitalLetter: "erro.letra-maiuscula",
  hasEspecialCharacter: "erro.caracter-especial",
  equal: "erro.valor-diferente",
  versao: "erro.versao"
}

const validate = (form, name, field) => {
  const value = form[name];

  for (let key in field.rules) {
    if (field.rules[key]) {
      let validation = validations[key];
      let param = key === "equal" ? form[field.rules[key]] : field.rules[key];
      if (validation(value, param)) {
        let params = key === 'minLength' || key === 'maxLength' ? { tam : field.rules[key] } : null;
        return [messages[key], params];
      }
    }
  }

  return [null, null];
};

export default validate;
