import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    try {
        console.log("fetcing requiest..,")
        const data = axiosInstance({
            method: `${method}`,
            url: `${url}`,
            data: bodyData ? bodyData : null,
            headers: headers ? headers : null,
            params: params ? params : null,
        });
        return data
    }
    catch (e) {
        console.log(e.message)
    }
}