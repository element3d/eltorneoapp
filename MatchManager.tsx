class MatchManager {
    constructor() {

    }

    isMatchLive(match) {
        if (match?.date < new Date().getTime() && (match?.team1_score < 0 || match?.team2_score < 0)) return true

        return false
    }

    isMatchEnded(match) {
        return match?.team1_score >= 0 && match?.team2_score >= 0
    }
}

const matchManager = new MatchManager()
export default matchManager;