import {IVatNumberState} from "./App";

const headers = new Headers();
headers.append("accept", "application/json");

function search(data: IVatNumberState) {
    const {countryCode, vatNumber} = data;
    return fetch(`api/check-vat?countryCode=${countryCode}&vatNumber=${vatNumber}`, {
        method: "GET",
        headers,
        cache: "no-store"
    })
        .then(checkStatus)
        .then((response: Response) => response.json());
}

const checkStatus = (response: Response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.message = response.statusText;
    console.log(error);
    throw error;
};

const Http = {search};
export default Http;
