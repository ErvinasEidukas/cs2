const BASE_URL = "https://api-public.cs-prod.leetify.com"

async function request(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    })

    const text = await response.text()

    let data

    try {
        data = text ? JSON.parse(text) : null
    } catch {
        data = text
    }

    if (!response.ok) {
        throw new Error(
            `Leetify API ${response.status}: ${
                typeof data === "string" ?
                    data :
                    JSON.stringify(data)
            }`
        )
    }

    return data
}

export async function getProfile(steam64Id) {
    if (!steam64Id) {
        throw new Error("steam64Id is required.")
    }

    return request(
        `/v3/profile?steam64_id=${encodeURIComponent(steam64Id)}`
    )
}

export async function getProfileMatches(steam64Id) {
    if (!steam64Id) {
        throw new Error("steam64Id is required.")
    }

    return request(
        `/v3/profile/matches?steam64_id=${encodeURIComponent(steam64Id)}`
    )
}

export async function getMatch(gameId) {
    if (!gameId) {
        throw new Error("gameId is required.")
    }

    return request(`/v2/matches/${encodeURIComponent(gameId)}`)
}

export async function getMatchByDataSource(dataSource, dataSourceId) {
    if (!dataSource || !dataSourceId) {
        throw new Error("dataSource and dataSourceId are required.")
    }

    return request(
        `/v2/matches/${encodeURIComponent(dataSource)}/${encodeURIComponent(dataSourceId)}`
    )
}