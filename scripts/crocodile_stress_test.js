/* 
API: https://test-api.k6.io/
Registration e auth: Login
  - Realizar o login com um novo usuário
Critérios:
    Stress test
        - Ramp up 5 VU em 5s
        - Carga 5 VU por 5s
        - Ramp up 50 VU em 2s
        - Carga 50 VU em 2s
        - Ramp down 0 VU em 5s
    Limites:
        - Requisição com falha inferior a 1%
*/

import http from "k6/http";
import { check, sleep } from "k6"; // sleep será definido o tempo para realizar cada requisição
import { SharedArray } from "k6/data";
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: "5s", target: 5 }, // Ramp up: duração de 5 seg e 5 usuários
    { duration: "5s", target: 5 }, // carga: duração de 5 seg e 5 usuários
    { duration: "2s", target: 50 }, // Ramp up: duração de 2 seg e 50 usuários
    { duration: "2s", target: 50 }, // carga: duração de 2 seg e 50 usuários
    { duration: "5s", target: 0 }, // Ramp down: duração de 5 seg e 0 usuários
  ],
  thresholds: {
    http_req_failed: ['rate < 0.01']
  },
}

const csvData = new SharedArray('Read data', function(){
    return papaparse.parse(open('./users.csv'), {header: true}).data;
})

export default function(){
    const BASE_URL = 'https://test-api.k6.io'
    const USER = csvData[Math.floor(Math.random() * csvData.length)].email
    const PASSWORD = 'user123'

    console.log(USER);

    const res = http.post(`${BASE_URL}/auth/token/login`, { // como é um post, é necessário passar o payload
        username: USER,
        password: PASSWORD
    });

    check(res, {
        'sucesso login': (r) => r.status === 200,
        ' Token gerado': (r) => r.json('acess') !== ''
    });

    sleep(1);

}

export function handleSummary(data) {
  return {
    "./metrics/crocodile_stress_test.html": htmlReport(data),
  };
}