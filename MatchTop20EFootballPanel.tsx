import { Image, Text, TouchableOpacity, View } from "react-native";
import authManager from "./AuthManager";
import ProfileIcon from './assets/Profile2.svg'
import SERVER_BASE_URL from "./AppConfig";
import dataManager from "./DataManager";
import strings from "./Strings";
import { ESTAT_TOTAL, ETAB_PREDICTS } from "./ProfilePage";
import Colors from "./Colors";
import NativeAdComp from "./NativeAdComp";
import FirstIcon from "./assets/first.svg"
import AwardWhiteIcon from './assets/award_white.svg'
import AwardBlackIcon from './assets/award_black.svg'
import AwardGoldIcon from './assets/award_gold.svg'
import FirstIcon2 from './assets/first2.svg';
import EFootballPredictPointsPanel from "./EFootballPredictPointsPanel";
import { ELEAGUE_AMATEUR, ELEAGUE_LEGEND, ELEAGUE_PRO, ENEW_LEAGUE_AMATEUR, ENEW_LEAGUE_BEGINNER, ENEW_LEAGUE_LEGEND, ENEW_LEAGUE_PRO, ENEW_LEAGUE_REGULAR, ENEW_LEAGUE_SUPERSTAR } from "./Enums";
import { AmateurIcon, LegendIcon, ProIcon, RegularIcon, SuperstarIcon } from "./LevelIcons";

export default function MatchTop20EFootballPanel({ top20Predicts, match, isMatchEnded, navigation }) {
    function onNavUser(u) {
        authManager.setActiveUser(u)

        navigation.navigate('Profile', {
            id: u.id,
            globalPage: 1,
            selectedStat: ESTAT_TOTAL,
            tab: ETAB_PREDICTS,
        });
    }

    function getLeagueText(user) {
        let txt = "eFootball"
        if (user.eFootballLeague == ENEW_LEAGUE_LEGEND) txt += " (" + strings.legend
        else if (user.eFootballLeague == ENEW_LEAGUE_SUPERSTAR) txt += " (" + strings.superstar
        else if (user.eFootballLeague == ENEW_LEAGUE_PRO) txt += " (" + strings.pro
        else if (user.eFootballLeague == ENEW_LEAGUE_REGULAR) txt += " (" + strings.regular
        else if (user.eFootballLeague == ENEW_LEAGUE_AMATEUR) txt += " (" + strings.amateur
        else if (user.eFootballLeague == ENEW_LEAGUE_BEGINNER) txt += " (" + strings.beginner
        txt += ')';
        return txt;
    }

    function getAwardLeagueText(league) {
        let txt = strings.place_in_el_torneo //strings.place_in_league
        if (league == 1) txt += " (" + strings.legend
        else if (league == 2) txt += " (" + strings.pro
        else if (league == 3) txt += " (" + strings.amateur
        else if (league == 4) txt += " (" + strings.beginner

        return txt
    }

    function getAwardText(user, award, league) {

        if (award.place > 1 || award.league != 1) return getAwardLeagueText(award.league)

        return strings.winner_of_eltorneo
    }

    function getAwardIcon(user) {
        const award = user.awards[0]
        if (award.place == 1) {
            if (award.league == 1)
                return <FirstIcon style={{ marginLeft: 0 }} width={22} height={22}></FirstIcon>
            else
                return <FirstIcon2 style={{ marginLeft: 0 }} width={22} height={22}></FirstIcon2>
        }
        if (award.league == 1) return <AwardGoldIcon width={26} height={26} style={{
            // marginTop: 6,
            // marginLeft: -2
            // top: 1,
            position: 'absolute'
        }}></AwardGoldIcon>
        if (Colors.mode == 2 || Colors.mode == 3) return <AwardWhiteIcon width={26} height={26} style={{
            // marginTop: 6,
            position: 'absolute',
            // top: 1,
            // marginLeft: -2
        }}></AwardWhiteIcon>
        else return <AwardBlackIcon width={26} height={26} style={{
            // marginTop: 6,
            // top: 1,
            position: 'absolute'
            // marginLeft: -2
        }}></AwardBlackIcon>
    }

    function getStatusView(predict) {
        if (predict.status == 0) return null;
        if (predict.status == 1) {
            return <Text style={{
                fontSize: 12,
                fontFamily: 'Roboto-Bold',
                marginLeft: 4,
                color: Colors.success
            }}>({strings.win})</Text>
        }
        if (predict.status == 2) {
            return <Text style={{
                fontSize: 12,
                fontFamily: 'Roboto-Bold',
                marginLeft: 4,
                color: Colors.fail
            }}>({strings.lost})</Text>
        }
        if (predict.status == 3) {
            return <Text style={{
                fontSize: 12,
                fontFamily: 'Roboto-Bold',
                marginLeft: 4,
                color: Colors.fail
            }}>({strings.draw})</Text>
        }
    }

    function getPredict(predict) {
        if (predict.team_id == match.team1.id) {
            return match.team1.shortName
        }
        if (predict.team_id == match.team2.id) {
            return match.team2.shortName
        }
        return "";
    }

    function getLevelIcon(user) {
        if (user.eFootballLeague == ENEW_LEAGUE_LEGEND) {
            return <LegendIcon size={30} />
        }
        if (user.eFootballLeague == ENEW_LEAGUE_PRO) {
            return <ProIcon size={30} />
        }
        if (user.eFootballLeague == ENEW_LEAGUE_AMATEUR) {
            return <AmateurIcon size={24} />
        }
        if (user.eFootballLeague == ENEW_LEAGUE_REGULAR) {
            return <RegularIcon size={24} />
        }
        if (user.eFootballLeague == ENEW_LEAGUE_SUPERSTAR) {
            return <SuperstarIcon size={30} />
        }
    }

    return (
        <View style={{
            paddingBottom: 90
        }}>
            {dataManager.getSettings().enableAds ? <View style={{
                marginTop: 10,
            }}>
                <NativeAdComp forceNativeAd={true} />
            </View> : null}
            <Text style={{
                color: '#8E8E93',
                fontSize: 14,
                fontFamily: 'Roboto-Bold',
                marginBottom: 4,
            }}>{strings.top_20_predicts}</Text>
            {top20Predicts?.predicts.map((predict, i) => {
                return (<TouchableOpacity key={`match_predict_${i}`} onPress={() => { onNavUser(predict.user) }} activeOpacity={.8} style={{
                    backgroundColor: Colors.gray800,
                    borderRadius: 12,
                    marginBottom: 10,
                }}>
                    <View style={{
                        width: '100%',
                        height: 64,
                        paddingTop: 0,
                        paddingLeft: 10,
                        paddingRight: 5,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: 50,
                            height: 50,
                            overflow: 'hidden',
                            borderRadius: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 2,
                            borderColor: Colors.borderColor,
                            backgroundColor: Colors.bgColor
                        }}>
                            {predict.user.avatar.length ? <Image src={`${SERVER_BASE_URL}/${predict.user.avatar}`} style={{
                                width: 50,
                                height: 50,
                            }} /> : <ProfileIcon width={40} height={40} style={{ marginTop: 10 }} />}
                        </View>
                        <View style={{
                            flex: 1,
                            height: '100%',
                            // paddingTop: 10,
                            justifyContent: 'center',
                            // alignItems: 'center',
                            flexDirection: 'column',
                            marginLeft: 10,
                            // backgroundColor: 'red'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text lineBreakMode='clip' numberOfLines={1} style={{
                                    color: Colors.titleColor,
                                    fontSize: 14,

                                    marginBottom: 0,
                                    fontFamily: 'NotoSansArmenian-ExtraBold'
                                }}>{predict.user.name}</Text>
                            </View>

                            <View style={{
                                marginTop: 2
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#8E8E93',
                                        fontFamily: 'Roboto-Bold',
                                    }}>
                                        {getPredict(predict)}
                                    </Text>
                                    {getStatusView(predict)}
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    {predict.user.eFootballPosition > 0 ? <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 13,
                                            color: Colors.titleColor,
                                            marginRight: 4,
                                            lineHeight: 14,
                                            fontFamily: 'Roboto-Bold',
                                        }}>
                                            #{predict.user.eFootballPosition}
                                        </Text>
                                        <Text style={{
                                            fontSize: 12,
                                            color: '#8E8E93',
                                            marginRight: 4,
                                            lineHeight: 14,
                                            fontFamily: 'Roboto-Bold',
                                        }}>
                                            {getLeagueText(predict.user)}
                                        </Text></View> : null}
                                    {/* {predict.user.eFootballPoints > 0 ? <Text style={{
                                        fontSize: 12,
                                        color: '#8E8E93',
                                        fontFamily: 'NotoSansArmenian-Bold'
                                    }}>{strings.points}: {predict.user.eFootballPoints}</Text> : null} */}
                                </View>
                            </View>
                        </View>
                        <View style={{
                            height: '100%',
                            paddingTop: 5,
                            alignItems: 'center',
                        }}>
                            {predict.status > 0 ? <EFootballPredictPointsPanel match={match} predict={predict} /> : null}
                            <View style={{
                                marginTop: predict.status > 0 ? 4 : 0,
                                marginRight: predict.status > 0 ? 0 : 4,
                            }}>
                                {getLevelIcon(predict.user)}
                            </View>
                        </View>
                    </View>

                </TouchableOpacity>)
            })}

            {dataManager.getSettings().enableAds && dataManager.getSettings().bannerType == 2 ? <View style={{
                marginTop: 10
            }}>
                <NativeAdComp />
            </View> : null}

            {/* {dataManager.getSettings().enableAds ? <View style={{
              marginTop: 10
            }}>
              <NativeAdComp />
            </View> : null } */}
        </View>
    )
}