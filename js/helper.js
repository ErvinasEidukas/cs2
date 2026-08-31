export function setCookie(name, value, days = 365) {
    const expires = new Date()

    expires.setTime(
        expires.getTime() + days * 24 * 60 * 60 * 1000
    )

    document.cookie =
        `${name}=${encodeURIComponent(value)};` +
        `expires=${expires.toUTCString()};` +
        "path=/"
}

export function getCookie(name) {
    const cookies = document.cookie.split(";")

    for (const cookie of cookies) {
        const [key, ...valueParts] = cookie.trim().split("=")

        if (key === name) {
            return decodeURIComponent(valueParts.join("="))
        }
    }

    return null
}
