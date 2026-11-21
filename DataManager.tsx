// import adsManager from "./AdsManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SERVER_BASE_URL from "./AppConfig";
import strings from "./Strings";
import Colors from "./Colors";
import authManager from "./AuthManager";
import { AI_USER_ID } from "./TablesBeatBetPagePanel";
import { EGAME_ELTORNEO, EGAME_WORLD_CUP } from "./GamepadMenu";
import DeviceInfo from "react-native-device-info";

const BUTTON_BG_IMAGE = require('./assets/fc_chip_bg.jpg')
const BUTTON_FC27_BG_IMAGE = require('./assets/cl_btn_gr_fc27.png')
const BUTTON_FC27_BG_LARGE_IMAGE = require('./assets/cl_btn_gr_large_fc27.png')
const BUTTON_FC27_BG_LARGE2_IMAGE = require('./assets/cl_btn_gr_large2_fc27.png')

const BUTTON_BG_IMAGE_CH_LEAGUE = require('./assets/cl_btn_gr.jpg')
const BUTTON_BG_IMAGE_LALIGA = require('./assets/ll_btn_gr.png')
const BUTTON_BG_IMAGE_BUNDESLIGA = require('./assets/bl_btn_gr.png')
const BUTTON_BG_IMAGE_LIGUE1 = require('./assets/l1_btn_gr.png')
const BUTTON_BG_IMAGE_EU_LEAGUE = require('./assets/el_btn_gr.png')

const BUTTON_BG_IMAGE_LARGE = require('./assets/fc_chip_bg_large.jpg')
const BUTTON_BG_IMAGE_EXTRA_LARGE = require('./assets/fc_chip_bg_large2.jpg')

const BUTTON_BG_IMAGE_LIGUE1_LARGE = require('./assets/l1_btn_gr_large.png')
const BUTTON_BG_IMAGE_LIGUE1_EXTRA_LARGE = require('./assets/l1_btn_gr_large2.png')

const BUTTON_BG_IMAGE_CH_LEAGUE_LARGE = require('./assets/cl_btn_gr_large.jpg')
const BUTTON_BG_IMAGE_CH_LEAGUE_EXTRA_LARGE = require('./assets/cl_btn_gr_large2.jpg')

const BUTTON_BG_IMAGE_LALIGA_LARGE = require('./assets/ll_btn_gr_large.png')
const BUTTON_BG_IMAGE_LALIGA_EXTRA_LARGE = require('./assets/ll_btn_gr_large2.png')

const BUTTON_BG_IMAGE_BUNDESLIGA_LARGE = require('./assets/bl_btn_gr_large.png')
const BUTTON_BG_IMAGE_BUNDESLIGA_EXTRA_LARGE = require('./assets/bl_btn_gr_large2.png')

const BUTTON_BG_IMAGE_EU_LEAGUE_LARGE = require('./assets/el_btn_gr_large.png')
const BUTTON_BG_IMAGE_EU_LEAGUE_EXTRA_LARGE = require('./assets/el_btn_gr_large2.png')


class DataManager {
    constructor() {
        this.leagues = []
        this.firstSeasonStartYear = 2024
        this.fetchTrailers()
        authManager.getUserById(AI_USER_ID)
            .then((u) => {
                this.beatBetOfficialUser = u;
            })
            .catch(() => { })
        this.hasCareer = false;
        this.allowTransfer = true;

        this.settings = {
            showBeatBetOfficial: false,
            blockForAd: false,
            enableAds: false,
            showInAppReview: false,
            game: EGAME_ELTORNEO,
            season: '26/27',
            eFootballGamepadX: 0
        }

        this.matchSettings = {
            showBeatBet: true,
            showEFootball: true,
            showFireball: true
        }

        this.trailers = []

        AsyncStorage.multiGet(['showEFootball', 'showBeatBet', 'showFireball'], (error, items) => {
            if (!items || error || items.length < 3) return;

            const showEF = items[0][1];
            const showBB = items[1][1];
            const showFB = items[2][1];

            if (showEF == 'false') this.matchSettings.showEFootball = false;
            if (showBB == 'false') this.matchSettings.showBeatBet = false;
            if (showFB == 'false') this.matchSettings.showFireball = false;
        })
    }

    init() {

        const appVersion = DeviceInfo.getVersion();       // versionName, e.g. "2.4.1"

        return fetch(`${SERVER_BASE_URL}/api/v1/settings`, {
            method: 'GET',
            headers: {
                'X-App-Version': appVersion,
            },
        })
            .then(response => response.json())
            .then(data => {
                let game = EGAME_ELTORNEO;
                let eFootballGamepadX = 0;
                if (this.settings) {
                    game = this.settings.game;
                    eFootballGamepadX = this.settings.eFootballGamepadX;
                }
                this.settings = data[0]
                this.settings.showBeatBetOfficial = false,
                    this.settings.game = game;
                this.settings.eFootballGamepadX = eFootballGamepadX;
                this.settings.blockForAd = false
                if (this.settings.newUser) {
                    this.settings.enableAds = false
                    this.settings.enableNativeAds = false
                }
                this.settings.season = '26/27';
                return this.settings

                // AsyncStorage.getItem("lastAdTime")
                // .then((time)=>{
                //     let lastAdTime;
                //     if (time) {
                //         lastAdTime = new Date(parseInt(time)); 
                //         const adDiffHours = 0//this.settings.adDiffHours
                //         const currentTime = new Date();
                //         const diffInMillis = currentTime - lastAdTime;
                //         const diffInHours = diffInMillis / 3600000; // Convert milliseconds to hours
                //         console.log(diffInHours)
                //         if (diffInHours > adDiffHours) {
                //             console.log(diffInHours)
                //             console.log("BLOCK FOR AD =========================")
                //             this.settings.blockForAd = true
                //             AsyncStorage.setItem("lastAdTime", currentTime.getTime().toString())
                //         } else {
                //             this.settings.blockForAd = false
                //         }

                //     } else {
                //         lastAdTime = new Date(Date.now() - 3600000); 
                //         AsyncStorage.setItem("lastAdTime", lastAdTime.getTime().toString())
                //         this.settings.blockForAd = false
                //     }
                // })

                // adsManager.init()
            })
            .catch(error => {

                console.error('Error fetching settings:', error)
                throw "Error"
            });
    }

    getBeatBetOfficialUser() {
        return this.beatBetOfficialUser
    }

    getTrailers() {
        return this.trailers
    }

    setMatch(m) {
        if (m.predict && (m.predict.team1_score < 0 || m.predict.team2_score < 0)) m.predict = null
        this.match = m
    }

    setTeam(team) {
        this.team = team
    }

    getMatch() {
        return this.match
    }

    getTeam() {
        return this.team
    }

    checkBlockForAd() {
        if (!this.settings.enableAds) return

        return AsyncStorage.getItem("lastAdTime")
            .then((time) => {
                if (!this.settings.enableAds || this.settings.newUser) return this.settings

                let lastAdTime;
                if (time) {
                    lastAdTime = new Date(parseInt(time));
                    const adDiffHours = this.settings.adDiffHours
                    const currentTime = new Date();
                    const diffInMillis = currentTime - lastAdTime;
                    const diffInHours = diffInMillis / 3600000;
                    if (diffInHours > adDiffHours) {
                        this.settings.blockForAd = true
                        // AsyncStorage.setItem("lastAdTime", currentTime.getTime().toString())
                    } else {
                        this.settings.blockForAd = false
                    }

                } else {
                    lastAdTime = new Date(Date.now() - 3600000);
                    AsyncStorage.setItem("lastAdTime", lastAdTime.getTime().toString())
                    this.settings.blockForAd = false
                }

                return this.settings
            })
    }

    getWeekTitleShort(week) {
        if (week.type == 0) {
            return `(${week.week})`

            //   return `${strings.matchday} ${week.week}`
        } else if (week.type == 1) {
            return '(KR)'
        } else if (week.type == 2) {
            return '(QF)'
        } else if (week.type == 3) {
            return '(SF)'
        } else if (week.type == 4) {
            return '(F)'
        } else if (week.type == 5) {
            return '(R16)'
        }
    }

    getWeekTitle(week) {
        if (week.type == 0) {
            return `${strings.matchday} ${week.week}`
        } else if (week.type == 1) {
            return 'KR Play-offs'
        } else if (week.type == 2) {
            return 'Quarter final'
        } else if (week.type == 3) {
            return 'Semi final'
        } else if (week.type == 4) {
            return 'Final'
        } else if (week.type == 5) {
            return 'Round of 16'
        } else if (week.type == 7) {
            return 'Round of 32'
        }

    }

    getFireballPredictBorderColor(p, isSpecial = false) {
        if (p.status == 0) return isSpecial ? 'black' : Colors.titleColor;
        if (p.status == -1 || p.status == 4) return '#FF4747';
        if (p.status == 1 || p.status == 2) return '#00C566';
        if (p.status == 3) return isSpecial ? 'gold' : '#ff7539'
    }

    getCareerPredictBorderColor(p, isSpecial = false) {
        if (p.points <= 0) return '#FF4747';
        return '#00C566';
        if (p.status == 0) return isSpecial ? 'black' : Colors.titleColor;
        if (p.status == -1 || p.status == 4) return '#FF4747';
        if (p.status == 1 || p.status == 2) return '#00C566';
        if (p.status == 3) return isSpecial ? 'gold' : '#ff7539'
    }

    getEFootballPredictBorderColor(p, isSpecial = false) {
        if (p.status == 0) return isSpecial ? 'black' : Colors.titleColor;//'#8E8E93'
        if (p.status == 1) return '#00C566'
        if (p.status == 2) return '#FF4747'
        if (p.status == 3) return '#FF4747'
    }

    getPredictBorderColor(p, isSpecial = false) {
        if (p.status == 0) return isSpecial ? 'black' : Colors.titleColor;//'#8E8E93'
        if (p.status == 1 || p.status == 5) return '#00C566'
        if (p.status == 2) return isSpecial ? 'gold' : '#ff7539'
        if (p.status == 3 || p.status == 4) return '#FF4747'
    }

    getEFootballPredictBgColor(p, isSpecial = false) {
        if (p.status == 0) return isSpecial ? 'white' : Colors.predictBGColor;//return '#F7F7F7'
        if (p.status == 1) return '#00C56619'
        if (p.status == 2) return '#FF474719'
        if (p.status == 3) return '#FF474719'
    }

    getPredictBgColor(p, isSpecial = false) {
        if (p.status == 0) return isSpecial ? 'white' : Colors.predictBGColor;//return '#F7F7F7'
        if (p.status == 1 || p.status == 5) return '#00C56619'
        if (p.status == 2) return '#FACC1519'
        if (p.status == 3 || p.status == 4) return '#FF474719'
    }

    getFireballPointsBgColor(p, isSpecial = false) {
        if (p.status == -1 || p.status == 4) return '#FF474719';
        // return isSpecial ? 'white' : Colors.predictBGColor;//return '#F7F7F7'
        // return '#FF474719'

        if (p.status == 1 || p.status == 2) return '#00C56619'
        if (p.status == 3) return '#FACC1519'
        // if (p.status == 3 || p.status == 4) return '#FF474719'
    }

    getEFootballPointsBgColor(p, isSpecial = false) {
        if (p.status != 1 && p.status != 2) return '#FF474719';
        // return isSpecial ? 'white' : Colors.predictBGColor;//return '#F7F7F7'
        // return '#FF474719'

        if (p.status == 1) return '#00C56619'
        if (p.status == 2) return '#FACC1519'
        // if (p.status == 3 || p.status == 4) return '#FF474719'
    }

    getCareerPointsBgColor(p, isSpecial = false) {
        if (p.points <= 0) return '#FF474719';
        return '#00C56619';

        if (p.status == -1 || p.status == 4) return '#FF474719';
        // return isSpecial ? 'white' : Colors.predictBGColor;//return '#F7F7F7'
        // return '#FF474719'

        if (p.status == 1 || p.status == 2) return '#00C56619'
        if (p.status == 3) return '#FACC1519'
        // if (p.status == 3 || p.status == 4) return '#FF474719'
    }

    getFireballPoints(p, isSpecial) {
        if (p.status == -1) return "0";
        if (p.status == 4) return isSpecial ? `-2` : `-1`;
        if (p.status == 1) return isSpecial ? `+${6 * p.goals}` : `+${3 * p.goals}`;
        // if (p.status == 2) return isSpecial ? '+5' : '+3';
        // if (p.status == 3) return isSpecial ? '+8' : '+5';
        return '';
    }

    getEFootballPoints(p, isSpecial) {
        if (p.status != 1 && p.status != 2) return "0";
        if (p.status == 1) return isSpecial ? '+4' : '+2';
        if (p.status == 2) return isSpecial ? '-2' : '-1';
        return '';
    }

    getFireballPredictBgColor(p, isSpecial = false) {
        // if (p.status != -1 && p.status != -4)
        return isSpecial ? 'white' : Colors.predictBGColor;//return '#F7F7F7'
        return '#FF474719'

        // if (p.status == 1 || p.status == 5) return '#00C56619'
        // if (p.status == 2) return '#FACC1519'
        // if (p.status == 3 || p.status == 4) return '#FF474719'
    }

    getBetString(bet) {
        if (bet == "w1") return "W1"
        if (bet == "w2") return "W2"
        if (bet == "x") return "X"
        if (bet == "x1") return "1X"
        if (bet == "x12") return "12"
        if (bet == "x2") return "2X"
        return ""
    }

    getBetStatusValue(b, isSpecial = false, aiUser = false) {
        if (b.status == 0) return `${b.amount.toFixed(1)}$`
        if (b.status == 2) return isSpecial && !aiUser ? '0.0$' : `-${b.amount.toFixed(1)}$`
        if (b.status == 1) return `+${(b.odd * b.amount).toFixed(2)}$`
    }

    getBetStatusColor(p, isSpecial = false) {
        if (p.status == 0) return isSpecial ? 'black' : Colors.titleColor//'#8E8E93'
        if (p.status == 1) return '#00C566'
        if (p.status == 2) return '#FF4747'
    }

    getSettings() {
        return this.settings
    }

    setLeagues(leagues) {
        this.leagues = leagues
    }

    getLeagues() {
        return this.leagues
    }

    getSeasons() {
        const seasons = [];
        const today = new Date();
        const currentYear = today.getFullYear();
        const seasonCutoff = new Date(currentYear, 7, 1); // August 1st of the current year (month is 0-indexed)

        // Determine the correct year to use as the current season's start year
        const effectiveYear = today >= seasonCutoff ? currentYear : currentYear - 1;

        for (let i = this.firstSeasonStartYear; i <= effectiveYear; ++i) {
            let nextYearShort = (i + 1) % 100; // Get the last two digits of the next year
            seasons.push(`${i}/${nextYearShort.toString().padStart(2, '0')}`); // Format as "YYYY/YY"
        }
        return seasons;
    }

    getTable() {
        return this.table
    }

    getPredictValue(predict) {
        if (predict.status == 4) return ''
        return ` ${predict.team1_score} : ${predict.team2_score}`
    }

    getPredictTitle(p) {
        if (p.status == 4) return strings.missing_prediction
        if (p.status == 0) return strings.prediction
        if (p.status == 1) {
            if (p.team1_score == p.team2_score) return strings.draw_predicted
            return strings.winner_predicted
        }
        if (p.status == 5) {
            if (p.team1_score == p.team2_score) return strings.draw_predicted
            return strings.diff_predicted
        }
        if (p.status == 2) return strings.score_predicted
        if (p.status == 3) return strings.prediction_was_failed
    }

    getSpecialMatch() {
        this.specialMatch
    }

    fetchSpecialMatch(lang, token) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': token || ''
            },
        };

        return fetch(`${SERVER_BASE_URL}/api/v1/matches/special?lang=${lang}`, requestOptions)
            .then(response => {
                if (response.status == 200)
                    return response.json()
                return null
            })
            .then(data => {
                if (!data || !Object.keys(data).length) return null
                this.specialMatch = data

                return this.specialMatch
            })
            .catch(() => {

            });
    }

    fetchTrailers() {
        fetch(`${SERVER_BASE_URL}/api/v1/trailers`, {
            method: 'GET',
            // headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                this.trailers = data
            })
            .catch((e) => {

            })
    }

    setPendingPredict(p) {
        this.pendingPredict = p
    }

    getPendingPredict() {
        return this.pendingPredict
    }

    getImageCacheTime() {
        if (!this.imageCacheTime) {
            const date = new Date();

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            this.imageCacheTime = `?timestamp=${year}-${month}-${day}`;
        }

        return this.imageCacheTime;
    }

    getLangs() {
        if (this.langs) return this.langs;

        this.langs = {
            "en": "English",
            "es": "Español",
            "ru": "Русский",
            "fr": "Français",
            "it": "Italiano",
            "pt": "Português",
            "de": "Deutsch",
            "hr": "Hrvatski",
        }
        return this.langs;
    }

    setCareerPlayers(players) {
        if (this.careerPlayers) {
            this.careerPlayers.players = players;
            return
        } else {
            this.careerPlayers = {
                players: players,
                currentPlayer: null
            }
        }
    }

    setPlayerToSell(p) {
        this.playerToSell = p;
    }

    getPlayerToSell() {
        return this.playerToSell;
    }

    setPlayerToBuy(p) {
        this.playerToBuy = p;
    }

    getPlayerToBuy() {
        return this.playerToBuy;
    }

    setCareerCurrentPlayer(player) {
        if (this.careerPlayers) {
            this.careerPlayers.currentPlayer = player;
            return
        } else {
            this.careerPlayers = {
                players: [],
                currentPlayer: player
            }
        }
    }

    getCareerPlayers() {
        return this.careerPlayers?.players;
    }

    getCareerCurrentPlayer() {
        return this.careerPlayers?.currentPlayer;
    }

    getTranslatedPlayerPosition(pos) {
        if (pos == "Goalkeeper") return strings.goalkeeper;
        if (pos == "Defender") return strings.defender;
        if (pos == "Midfielder") return strings.midfielder;
        if (pos == "Attacker") return strings.forward;
    }

    getPlayerPosShort(pos) {
        if (pos == 'Goalkeeper') return "GK";
        if (pos == 'Defender') return "DF";
        if (pos == 'Midfielder') return "MF";
        if (pos == 'Attacker') return "FW";
    }

    setHasCareer(has) {
        this.hasCareer = has;
    }

    getHasCareer() {
        return this.hasCareer;
    }

    setAllowTransfer(allow) {
        this.allowTransfer = allow;
    }

    getAllowTransfer() {
        return this.allowTransfer;
    }

    getButtonGradientFC27(league) {
        return BUTTON_FC27_BG_IMAGE;
    }

    getButtonGradient(league) {
        if (league == 6) return BUTTON_BG_IMAGE_LIGUE1;
        if (league == 5) return BUTTON_BG_IMAGE_BUNDESLIGA;
        if (league == 3) return BUTTON_BG_IMAGE_LALIGA;
        if (league == 1) return BUTTON_BG_IMAGE_CH_LEAGUE;
        if (league == 14) return BUTTON_BG_IMAGE_EU_LEAGUE;

        return BUTTON_BG_IMAGE;
    }

    getButtonGradientLargeFC27(league) {
        return BUTTON_FC27_BG_LARGE_IMAGE;
    }

    getButtonGradientLarge2FC27(league) {
        return BUTTON_FC27_BG_LARGE_IMAGE;
    }

    getButtonGradientExtraLargeFC27(league) {
        return BUTTON_FC27_BG_LARGE2_IMAGE;
    }

    getButtonGradientLarge(league) {
        if (league == 6) return BUTTON_BG_IMAGE_LIGUE1_LARGE
        if (league == 5) return BUTTON_BG_IMAGE_BUNDESLIGA_LARGE;
        if (league == 3) return BUTTON_BG_IMAGE_LALIGA_LARGE;
        if (league == 1) return BUTTON_BG_IMAGE_CH_LEAGUE_LARGE;
        if (league == 14) return BUTTON_BG_IMAGE_EU_LEAGUE_LARGE;

        return BUTTON_BG_IMAGE_LARGE;
    }

    getButtonGradientExtraLarge(league) {
        if (league == 6) return BUTTON_BG_IMAGE_LIGUE1_EXTRA_LARGE
        if (league == 5) return BUTTON_BG_IMAGE_BUNDESLIGA_EXTRA_LARGE;
        if (league == 3) return BUTTON_BG_IMAGE_LALIGA_EXTRA_LARGE;
        if (league == 1) return BUTTON_BG_IMAGE_CH_LEAGUE_EXTRA_LARGE;
        if (league == 14) return BUTTON_BG_IMAGE_EU_LEAGUE_EXTRA_LARGE;

        return BUTTON_BG_IMAGE_EXTRA_LARGE;
    }

    getBannerBackColor() {
        if (Colors.mode != 3 && Colors.mode != 4) {
            return '#37003C'
        }
        return '#181818'
    }

    getLeaguePrimaryColor(league) {
        if (Colors.mode != 3 && Colors.mode != 4) return Colors.primary

        if (league == 1) {
            return "#FF51A2"
        }
        if (league == 14) {
            return "#FF6900"
        }
        if (league == 2) {
            return "#05F0FF"
        }
        if (league == 3) {
            return "#A66FFE"
        }
        if (league == 5) {
            return "#C32B33"
        }
        if (league == 6) {
            return "#FF7FDE"
        }

        return Colors.primary
    }

    getMatchSettings() {
        return this.matchSettings;
    }
}

const dataManager = new DataManager()
export default dataManager