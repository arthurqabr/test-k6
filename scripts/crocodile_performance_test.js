/* 
API: https://test-api.k6.io/
Private API
  - Buscando todos os crocodilos
Critérios:
    Performance
        - 100 VU por 10s
    Limites:
        - Requisição com falha inferior a 1%
        - Duração da requisição p(95) < 250
*/

import http from 'k6/http'
import { check, sleep } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 100,
    duration: '10s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 250']
    }
}
const BASE_URL = 'https://test-api.k6.io'

// função para buscar o token de login do usuário, retornar o valor na variável e aplicar no default
export function setup(){            
    const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
        username: '0.637181904065864@mail.com',
        password: 'user123'
    });
    
    const token = loginRes.json('access');
    return token;
}

export default function(token){
    

    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const res = http.get(`${BASE_URL}/my/crocodiles`, params);  // feito um GET na url passando os parâmetros definidos acima

    check(res, {    // checa se o status code retorna 200
        'status code 200': (r) => r.status === 200
    });
}

export function handleSummary(data) {
    return {
      "./metrics/crocodile_performance_test.html": htmlReport(data),
    };
  }