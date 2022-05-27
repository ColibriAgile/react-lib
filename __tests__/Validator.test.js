import React from "react";
import validate from "../Validator";

test("validação de campo obrigatorio", () => {
  const formValues = {
    name: "Nome",
    sobrenome: "",
    email: null,
  }

  let [actual,] = validate(formValues, "name", { rules: { required: true } });
  expect(actual).toBe(null);

  [actual,] = validate(formValues, "sobrenome", { rules: { required: true } });
  expect(actual).toBe("erro.obrigatorio");

  [actual,] = validate(formValues, "email", { rules: { required: true } });
  expect(actual).toBe("erro.obrigatorio");

  [actual,] = validate(formValues, "sobrenome", { rules: { required: false } });
  expect(actual).toBe(null);
});

test("validação de email", () => {
  const formValues = {
    email1: "abc@gmail.com",
    email2: "abcgmail.com",
  }

  let [actual,] = validate(formValues, "email1", { rules: { email: true } });
  expect(actual).toBe(null);

  [actual,] = validate(formValues, "email2", { rules: { email: true } });
  expect(actual).toBe("erro.email");
});

test("validação de url", () => {
  const urls_validas = {
    valida1: "http://www.ncr.com",
    valida2: "https://www.ncr.com/teste",
    valida3: "ftp://ncr.com",
  }

  for (let key in urls_validas) {
    let [actual,] = validate(urls_validas, key, { rules: { url: true } });
    expect(actual).toBe(null);
  }

  const urls_invalidas = {
    invalida1: "wwwgooglecom",
    invalida2: "//www.google.com/teste",
  }

  for (let key in urls_invalidas) {
    let [actual,] = validate(urls_invalidas, key, { rules: { url: true } });
    expect(actual).toBe("erro.url");
  }
});

test("validação de tamnho do campo", () => {
  const formValues = {
    password: "123456789",
    password2: "123456789",
  }

  let [actual, params] = validate(formValues, "password", { rules: { minLength: 5 } });
  expect(actual).toBe(null);
  expect(params).toBe(null);

  [actual, params] = validate(formValues, "password", { rules: { maxLength: 5 } });
  expect(actual).toBe("erro.tam-max");
  expect(params.tam).toBe(5);

  [actual, params] = validate(formValues, "password", { rules: { minLength: 10 } });
  expect(actual).toBe("erro.tam-min");
  expect(params.tam).toBe(10);

  [actual, params] = validate(formValues, "password", { rules: { maxLength: 10 } });
  expect(actual).toBe(null);
  expect(params).toBe(null);
});

test("valida se tem numero", () => {
  const formValues = {
    password: "abc1234",
    password2: "abcdefgh",
  }

  let [actual,] = validate(formValues, "password", { rules: { hasNumber: true } });
  expect(actual).toBe(null);

  [actual,] = validate(formValues, "password2", { rules: { hasNumber: true } });
  expect(actual).toBe("erro.numero");
});

test("valida se tem letra maiuscula", () => {
  const formValues = {
    password: "abc12345",
    password2: "ABC12345",
  }

  let [actual, params] = validate(formValues, "password", { rules: { hasCapitalLetter: false } });
  expect(actual).toBe(null);
  expect(params).toBe(null);

  [actual, params] = validate(formValues, "password", { rules: { hasCapitalLetter: true } });
  expect(actual).toBe("erro.letra-maiuscula");
  expect(params).toBe(null);

  [actual, params] = validate(formValues, "password2", { rules: { hasCapitalLetter: true } });
  expect(actual).toBe(null);
  expect(params).toBe(null);
});

test("valida se tem caracter especial", () => {
  const validos = {
    a: "a!", b: "b@", c: "c#", d: "d$", e: "e%",
    f: "f^", g: "g&", h: "h*", i: "i(", j: "j)",
    k: "k-", l: "l_", m: "m+", n: "n=", o: "o{",
    p: "p}", q: "q[", r: "r]", s: "s;", t: "t:"
  }

  for (let key in validos) {
    let [actual, params] = validate(validos, key, { rules: { hasEspecialCharacter: true } });
    expect(actual).toBe(null);
    expect(params).toBe(null);
  }

  const invalido = { invalido: "abc12345" }

  let [actual, params] = validate(invalido, "invalido", { rules: { hasEspecialCharacter: true } });
  expect(actual).toBe("erro.caracter-especial");
  expect(params).toBe(null);
})

test("valida se valor igual" ,() => {
  const formValues = {
    password: "abc12345",
    confirmPassword: "abc12345",
    notEqual: "xxxx"
  }

  let [actual, ] = validate(formValues, "confirmPassword", { rules: { equal: "password" } });
  expect(actual).toBe(null);

  [actual, ] = validate(formValues, "password", { rules: { equal: "notEqual" } });
  expect(actual).toBe("erro.valor-diferente");
})

test("valida cnpj" ,() => {
  const formValues = {
    cnpjValido: "84.497.791/0001-05",
    cnpjInvalido: "abc12345"
  }

  let [actual, ] = validate(formValues, "cnpjValido", { rules: { cnpj: true } });
  expect(actual).toBe(null);

  [actual, ] = validate(formValues, "cnpjInvalido", { rules: { cnpj: true } });
  expect(actual).toBe("erro.cnpj");
})