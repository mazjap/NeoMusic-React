import Hidden from "./Hidden"

function defaultHeaders() {
    return { 
        "Authorization": `Bearer ${Hidden.appleMusicAPIKey}`,
        "Content-Type": "Application/json"
    }
}

const Api = {
    fetchCharts: async () => {
        const response = await fetch("https://api.music.apple.com/v1/catalog/us/charts?types=songs", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Hidden.appleMusicAPIKey}`
            }
        })
    
        return response.json()
    }
}

export default Api

function get(url, headers = defaultHeaders()) {
    return fetch(url, headers).then((response) => response.json())
}
function put(url, headers = defaultHeaders(), body = {}) {
    return fetch(url, headers, body).then((response) => response.json())
}
function post(url, headers = defaultHeaders(), body = {}) {
    return fetch(url, headers, body).then((response) => response.json())
}
function del(url, headers = defaultHeaders()) {
    return fetch(url, headers).then((response) => response.json())
}