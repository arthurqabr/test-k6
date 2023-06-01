/* 
API: https://test-api.k6.io/
Registration e auth: Registro
  - Realizar o registro de um novo usuário
Critérios:
    Performance test
        - Carga 10 VU por 10s
    Limites:
        - Requisição com falha inferior a 1%
        - Duração da requisição p(95) < 500
        - Requisição com sucesso superior a 95%
*/

import http from "k6/http";
import { check, sleep } from "k6"; // sleep será definido o tempo para realizar cada requisição
import { SharedArray } from "k6/data";

export const options = {
  stages: [
    { duration: "10s", target: 10 }, // carga única: duração de 10 seg e 10 usuários
  ],
  thresholds: {
    checks: ['rate > 0.95'],
    http_req_failed: ['rate < 0.01'],
    http_req_duration: ['p(95) < 500'],
  },
};

export default function(){
    const BASE_URL = 'https://test-api.k6.io'
    const USER = `${Math.random()}@mail.com`
    const PASSWORD = 'user123'

    console.log(USER + PASSWORD);

    const res = http.post(`${BASE_URL}/user/register`, { // como é um post, é necessário passar o payload
        username: USER,
        first_name: 'Crocodilo',
        last_name: 'Dundee',
        email: USER,
        password: PASSWORD
    });

    check(res, {
        'sucesso ao registrar': (r) => r.status === 201
    });

    sleep(1);

}