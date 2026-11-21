import { Text, View } from "react-native";
import dataManager from "./DataManager";
import authManager from "./AuthManager";
import Colors from "./Colors";
import AmateurIcon from './assets/AmateurIcon.svg'
import RegularIcon from './assets/RegularIcon.svg'
import ProIcon from './assets/ProIcon.svg'
import SuperstarIcon from './assets/SuperstarIcon.svg'
import LegendIcon from './assets/LegendIcon.svg'

import strings from "./Strings";
import { ENEW_LEAGUE_AMATEUR, ENEW_LEAGUE_BEGINNER, ENEW_LEAGUE_PRO, ENEW_LEAGUE_REGULAR, ENEW_LEAGUE_SUPERSTAR } from "./Enums";

export default function LeaguePromotionPanel({ league, points }) {
    function getIcon() {
        if (league < 1 || league == ENEW_LEAGUE_BEGINNER) return <AmateurIcon width={44} height={44} style={{
            marginLeft: 10
        }}></AmateurIcon>

        if (league == ENEW_LEAGUE_AMATEUR) return <RegularIcon width={44} height={44} style={{
            marginLeft: 10
        }}></RegularIcon>

        if (league == ENEW_LEAGUE_REGULAR) return <ProIcon width={48} height={44} style={{
            marginLeft: 10
        }}></ProIcon>

        if (league == ENEW_LEAGUE_PRO) return <SuperstarIcon width={44} height={40} style={{
            marginLeft: 10
        }}></SuperstarIcon>

        if (league == ENEW_LEAGUE_SUPERSTAR) return <LegendIcon width={44} height={40} style={{
            marginLeft: 10
        }}></LegendIcon>
    }

    function getNextLeague() {
        if (league < 1 || league == ENEW_LEAGUE_BEGINNER) return strings.amateur;
        if (league == ENEW_LEAGUE_AMATEUR) return strings.regular;
        if (league == ENEW_LEAGUE_REGULAR) return strings.pro;
        if (league == ENEW_LEAGUE_PRO) return strings.superstar;
        if (league == ENEW_LEAGUE_SUPERSTAR) return strings.legend;

        return strings.amateur;
    }

    function getPoints() {
        if (league < 1 || league == ENEW_LEAGUE_BEGINNER) return 20;
        if (league == ENEW_LEAGUE_AMATEUR) return 30;
        if (league == ENEW_LEAGUE_REGULAR) return 40;
        if (league == ENEW_LEAGUE_PRO) return 50;
        if (league == ENEW_LEAGUE_SUPERSTAR) return 60;

        return 20;
    }

    return <View style={{
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        flexDirection: 'row'
    }}>
        <View style={{
            width: '100%',
            flexShrink: 1,
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <View style={{
                width: '100%',
                flexShrink: 1,
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <View style={{
                    width: `${points / getPoints() * 100}%`,
                    maxWidth: '100%',
                    minWidth: 10,
                    backgroundColor: Colors.primary2,
                    height: 10,
                    flexShrink: 1,
                    borderRadius: 10,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                }}></View>
                <View style={{
                    width: `${(1 - points / getPoints()) * 100}%`,
                    flexShrink: 1,
                    backgroundColor: Colors.borderColor,
                    height: 10,
                    borderRadius: 10,
                    marginLeft: 5,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                }}></View>
            </View>
            <View style={{
                width: '100%',
                marginTop: 6,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: 14,
                    color: Colors.titleColor,
                }}>{strings.points}: {points}/{getPoints()}</Text>
                <Text style={{
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold'
                }}>{getNextLeague()}</Text>
            </View>
        </View>
        {getIcon()}
    </View>
}