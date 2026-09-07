import { getProfile } from "../../leetify-api.js"

const STEAM64_ID = "76561197987241891"

async function main() {
    try {
        const profile = await getProfile(STEAM64_ID)
        console.log("Leetify profile:", profile)
        updateProfile(profile)
    } catch (error) {
        console.error("Failed to load Leetify data:", error)
    }
}

function updateProfile(profile) {
    const rating = profile.rating
    const ranks = profile.ranks

    document.getElementById("profile-name").textContent = profile.name
    document.getElementById("about-name").textContent = profile.name

    document.getElementById("leetify-rating").textContent =
        formatNumber(ranks.leetify)

    document.getElementById("leetify-aim").textContent =
        formatPercent(rating.aim)

    document.getElementById("leetify-utility").textContent =
        formatPercent(rating.utility)

    document.getElementById("leetify-positioning").textContent =
        formatPercent(rating.positioning)

    document.getElementById("leetify-clutch").textContent =
        formatNumber(rating.clutch)

    document.getElementById("leetify-opening").textContent =
        formatNumber(rating.opening)

    document.getElementById("premier-rating").textContent =
        formatNumber(ranks.premier)

    document.getElementById("faceit-level").textContent =
        ranks.faceit ?? "—"

    document.getElementById("win-rate").textContent =
        formatPercent(profile.winrate * 100)

    document.getElementById("total-matches").textContent =
        profile.total_matches

    document.getElementById("first-match").textContent =
        formatDate(profile.first_match_date)
}

function formatNumber(value) {
    if (value === null || value === undefined) {
        return "—"
    }

    return Number(value).toFixed(2)
}

function formatPercent(value) {
    if (value === null || value === undefined) {
        return "—"
    }

    return `${Number(value).toFixed(1)}%`
}

function formatDate(value) {
    if (!value) {
        return "—"
    }

    return new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
}

main()
