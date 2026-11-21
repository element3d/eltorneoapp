import { Image, Text, TouchableOpacity, View } from "react-native"
import strings from "./Strings"
import SERVER_BASE_URL from "./AppConfig"
import dataManager from "./DataManager"
import Colors from "./Colors"
import NativeAdComp from "./NativeAdComp"

export default function MatchTablePanel({ navigation, match, table }) {
    let currentGroup = 0
    let currentPos = 1
    let currentPosGroup2 = 1

    function getLeague() {
        return dataManager.getLeagues().find(league => league.id === match.league);
    }

    function getGroupName(lid, lindex, index) {
        let word = ''
        if (lid == 7) {
            if (lindex == 0) word = "A"
            if (lindex == 1) word = "B"
            if (lindex == 2) word = "C"
            if (lindex == 3) word = "D"

            return `${word}${index + 1}`
        } else if (lid == 16) {
            switch (index) {
                case 0:
                    return "A";
                case 1:
                    return "B";
                case 2:
                    return "C";
                case 3:
                    return "D";
                case 4:
                    return "E";
                case 5:
                    return "F";
                case 6:
                    return "G";
                case 7:
                    return "H";
            }
        } else if (lid == 24) {
            switch (index) {
                case 0:
                    return "A";
                case 1:
                    return "B";
                case 2:
                    return "C";
                case 3:
                    return "D";
                case 4:
                    return "E";
                case 5:
                    return "F";
                case 6:
                    return "G";
                case 7:
                    return "H";
                case 8:
                    return "I";
                case 9:
                    return "J";
                case 10:
                    return "K";
                case 11:
                    return "L";
            }
        }

    }

    function onNavTeam(team) {
        team.leagueName = match.leagueName
        team.leagueCountry = ''
        team.leagueId = match.league
        team.name = team.team.name
        team.venue = team.team.venue
        team.id = team.team.id
        dataManager.setTeam(team)
        navigation.navigate('Team', {
            id: team.id,
        });
    }

    return (
        <View style={{
            width: '100%',
            marginTop: 20,
            paddingBottom: 90,
            // backgroundColor: 'blue',
            alignItems: 'center'
        }}>

            <View style={{
                // paddingLeft: 15,
                // paddingRight: 15,
            }}>
                <View style={{
                    width: '100%',
                    height: 52,
                    backgroundColor: Colors.gray800,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        width: 50,
                        color: Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        textAlign: 'center'
                    }}>Pos</Text>
                    <Text style={{
                        // width: '90%',
                        flex: 1,
                        color: Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        paddingLeft: 10
                    }}>{strings.team}</Text>
                    <Text style={{
                        width: 40,
                        color: Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        textAlign: 'center',
                    }}>Mp</Text>
                    <Text style={{
                        width: 40,
                        color: Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        textAlign: 'center',
                    }}>Gd</Text>
                    <Text style={{
                        width: 40,
                        color: Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        textAlign: 'center',
                    }}>{"Pts"}</Text>
                </View>
            </View>

            {match.team2.group_index != match.team1.group_index ? <Text style={{
                fontFamily: 'Roboto-Bold',
                fontSize: 16,
                marginBottom: 8,
                color: Colors.titleColor,
                marginLeft: 15,
                marginTop: 20,
                width: '100%'
            }}>Group {getGroupName(getLeague().id, 0, match.team1.group_index)}</Text> : null}

            {table?.map((team, index) => {

                if (team.group_index != match.team1.group_index) return
                let renderGroupName = false

                if ((getLeague().num_leagues > 1 || getLeague().id == 16) && (index == 0 || team.group_index != currentGroup)) {
                    currentGroup = team.group_index
                    renderGroupName = true
                    currentPos = 1
                }

                return <TouchableOpacity onPress={() => { onNavTeam(team) }} activeOpacity={.6} key={team.team.name} style={{
                    // backgroundColor: 'red',
                    // paddingLeft: 15,
                    // paddingRight: 15,
                }}>
                    {renderGroupName ? <Text style={{
                        fontFamily: 'Roboto-Bold',
                        fontSize: 16,
                        marginBottom: 4,
                        color: Colors.titleColor,
                        // marginLeft: 15,
                        marginTop: 20
                    }}>{strings.group} {getGroupName(getLeague().id, team.league_index, team.group_index)}</Text> : null}
                    <View style={{
                        width: '100%',
                        height: 52,
                        backgroundColor: team.team.id == match.team1.id || team.team.id == match.team2.id ? Colors.gray800 : 'transparent',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            width: 50,
                            color: Colors.titleColor,
                            fontSize: 16,
                            fontFamily: 'Roboto-Bold',
                            textAlign: 'center',
                            // backgroundColor: 'red'
                        }}>
                            {currentPos++}
                        </Text>
                        <View style={{
                            flex: 1,
                            // paddingLeft: 5,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image src={`${SERVER_BASE_URL}/data/teams/150x150/${team.team.name.replace(/ö/g, 'o')}.png`} style={{
                                width: 30,
                                height: 30,
                                // marginLeft: 5>
                            }}></Image>
                            <Text style={{
                                color: Colors.titleColor,
                                fontFamily: 'Roboto-Bold',
                                marginLeft: 10
                            }}>
                                {team.team.short_name}
                            </Text>
                        </View>
                        <Text style={{
                            width: 40,
                            textAlign: 'center',
                            color: Colors.titleColor,
                            fontFamily: 'Roboto-Bold',
                        }}>
                            {team.matches_played}
                        </Text>
                        <Text style={{
                            width: 40,
                            textAlign: 'center',
                            color: Colors.titleColor,
                            fontFamily: 'Roboto-Bold',
                        }}>
                            {team.goal_difference}
                        </Text>
                        <Text style={{
                            textAlign: 'center',
                            width: 40,
                            color: Colors.titleColor,
                            fontFamily: 'Roboto-Bold',
                        }}>
                            {team.points}
                        </Text>
                    </View>
                </TouchableOpacity>
            })}

            {match.team2.group_index != match.team1.group_index ? <Text style={{
                fontFamily: 'Roboto-Bold',
                fontSize: 16,
                marginBottom: 8,
                color: Colors.titleColor,
                marginLeft: 15,
                marginTop: 20,
                width: '100%'
            }}>Group {getGroupName(getLeague().id, 0, match.team2.group_index)}</Text> : null}

            {table?.map((team, index) => {

                if (team.group_index != match.team2.group_index || match.team2.group_index == match.team1.group_index) return
                let renderGroupName = false

                if ((getLeague().num_leagues > 1 || getLeague().id == 16) && (index == 0 || team.group_index != currentGroup)) {
                    currentGroup = team.group_index
                    renderGroupName = true
                    currentPosGroup2 = 1
                }

                return <TouchableOpacity onPress={() => { onNavTeam(team) }} activeOpacity={.6} key={team.team.name} style={{
                    // backgroundColor: 'red',
                    // paddingLeft: 15,
                    // paddingRight: 15,
                }}>
                    {renderGroupName ? <Text style={{
                        fontFamily: 'Roboto-Bold',
                        fontSize: 16,
                        marginBottom: 4,
                        color: Colors.titleColor,
                        // marginLeft: 15,
                        marginTop: 20
                    }}>{strings.group} {getGroupName(getLeague().id, team.league_index, team.group_index)}</Text> : null}
                    <View style={{
                        width: '100%',
                        height: 52,
                        backgroundColor: team.team.id == match.team1.id || team.team.id == match.team2.id ? Colors.gray800 : 'transparent',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            width: 50,
                            color: Colors.titleColor,
                            fontSize: 16,
                            fontFamily: 'Roboto-Bold',
                            textAlign: 'center',
                            // backgroundColor: 'red'
                        }}>
                            {currentPosGroup2++}
                        </Text>
                        <View style={{
                            flex: 1,
                            // paddingLeft: 5,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image src={`${SERVER_BASE_URL}/data/teams/150x150/${team.team.name.replace(/ö/g, 'o')}.png`} style={{
                                width: 30,
                                height: 30,
                                // marginLeft: 5>
                            }}></Image>
                            <Text style={{
                                color: Colors.titleColor,
                                fontFamily: 'Roboto-Bold',
                                marginLeft: 10
                            }}>
                                {team.team.short_name}
                            </Text>
                        </View>
                        <Text style={{
                            width: 40,
                            textAlign: 'center',
                            color: Colors.titleColor,
                            fontFamily: 'Roboto-Bold',
                        }}>
                            {team.matches_played}
                        </Text>
                        <Text style={{
                            width: 40,
                            textAlign: 'center',
                            color: Colors.titleColor,
                            fontFamily: 'Roboto-Bold',
                        }}>
                            {team.goal_difference}
                        </Text>
                        <Text style={{
                            textAlign: 'center',
                            width: 40,
                            color: Colors.titleColor,
                            fontFamily: 'Roboto-Bold',
                        }}>
                            {team.points}
                        </Text>
                    </View>
                </TouchableOpacity>
            })}

            <View style={{
                height: 20
            }}></View>


            {dataManager.getSettings().enableAds ? <View style={{
                width: '100%',
                marginTop: 20
            }}>
                <NativeAdComp />
            </View> : null}
        </View>
    )
}