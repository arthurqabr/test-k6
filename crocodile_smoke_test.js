import http from 'k6/http'
import { check } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {   // criará uma checagem para validar se a taxa está acima de 99%
        checks: ['rate > 0.99']
    }
}

export default function(){
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/'  // definida a URL

    const res = http.get(BASE_URL);  // feito um GET na url

    check(res, {    // checa se o status code retorna 200
        'status code 200': (r) => r.status === 200
    });
}

export function handleSummary(data) {
    return {
      "./metrics/crocodile_smoke_test.html": htmlReport(data),
    };
  }