/*
Public API: https://test-api.k6.io/public/crocodiles
    - Buscar crocodilo por ID
Critérios:
    Performance Test:
        - Ramp up 10 VU em 10s
        - Carga 10 VU por 10s
        - Ramp down 0 VU em 10s
    Limites:
        - Requisição com sucesso > 95%
        - Tempo requisição p(90) < 200
*/

import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data"; // para realizar a leitura de mais itens
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: "10s", target: 10 }, // primeira carga: duração de 10 seg e 10 usuários
    { duration: "10s", target: 10 }, // segunda carga: duração de 10 seg e 10 usuários
    { duration: "10s", target: 0 }, // terceira carga (ramp down): duração de 10 seg e 0 usuários
  ],
  thresholds: {
    // criará uma checagem para validar se a taxa está acima de 95%
    checks: ["rate > 0.95"],
    http_req_duration: ["p(95) < 200"],
  },
};

const data = new SharedArray("Json read", function () {
  return JSON.parse(open("./data.json")).crocodiles;
});

export default function () {
  // const BASE_URL = "https://test-api.k6.io/public/crocodiles/1"; // definido o ID, onde só existe um cadastrado com ID = 1
  
  const crocodile = data[Math.floor(Math.random() * data.length)].id; // dessa forma, é possível pegar qualquer ID de forma aleatória para considerar a consistência dos dados
  console.log(crocodile)
  const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodile}`; // será preenchido com o valor da variavel crocodile

  const res = http.get(BASE_URL); // feito um GET na url

  check(res, {
    // checa se o status code retorna 200
    "status code 200": (r) => r.status === 200,
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "./metrics/crocodile_load_test.html": htmlReport(data),
  };
}
