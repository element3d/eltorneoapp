import { ActivityIndicator, BackHandler, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "./Colors";
import AppBar from "./AppBar";
import strings from "./Strings";
import BottomNavBar from "./BottomNavBar";
import dataManager from "./DataManager";
import LeagueChip from "./LeagueChip";
import { useEffect, useState } from "react";
import SERVER_BASE_URL from "./AppConfig";
import PlayerTotalRowItem from "./PlayerTotalRowItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const EVIEW_TEAMS = 1
const EVIEW_PLAYERS = 2

export default function CareerLeaguesPage({ }): JSX.Element {
    const navigation = useNavigation();

    const [selectedLeague, setSelectedLeague] = useState(dataManager.getLeagues()[0]);
    const [table, setTable] = useState()
    const [team, setTeam] = useState()
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState(EVIEW_TEAMS);

    const currentPlayer = dataManager.getCareerCurrentPlayer();

    useEffect(() => {
        getTable()
    }, [selectedLeague])

    useEffect(() => {
        const backAction = () => {
            if (view == EVIEW_PLAYERS) {
                setView(EVIEW_TEAMS);
                setTeam(null)
                setPlayers(null);
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [view]);

    function onLeaguePress(l) {
        setSelectedLeague(l);
        setView(EVIEW_TEAMS);
        setPlayers(null);
    }

    function getPlayers(team) {
        setLoading(true);
        let positions = '';
        if (currentPlayer.grid == "sub-1gk") {
            positions = "GK";
        } else if (currentPlayer.grid == "sub-2df") {
            positions = "DF";
        } else if (currentPlayer.grid == "sub-3mf") {
            positions = "MF";
        } else if (currentPlayer.grid == "sub-4at") {
            positions = "FW";
        } else if (currentPlayer.position == "Defender") {
            positions = "DF";
        } else if (currentPlayer.position == "Goalkeeper") {
            positions = "GK"
        } else if (currentPlayer.position == "Midfielder"/* && (currentPlayer.grid[0] == 3)*/) {
            positions = "MF";
        } else if (/*currentPlayer.grid[0] == 4 ||*/ currentPlayer.position == "Attacker") {
            positions = "FW";
        }

        fetch(`${SERVER_BASE_URL}/api/v1/team/players?team_id=${team.team.id}&position=${positions}`, {
            method: 'GET',
            // headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data?.players) {
                    setLoading(false);
                    setPlayers(data.players);
                }
            })
            .catch(error => {
                console.error('Error fetching players:', error)
            });
    }

    function getTable() {
        setLoading(true);
        fetch(`${SERVER_BASE_URL}/api/v1/league/table?league_id=${selectedLeague.id}&league_index=${0}`, {
            method: 'GET',
            // headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                setTable(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching table:', error)
            });
    }

    function onNavTeam(t) {
        setTeam(t)
    }

    useEffect(() => {
        if (!team) return;
        setView(EVIEW_PLAYERS);
        getPlayers(team)
    }, [team])

    let currentPos = 1

    function renderTable() {
        const myPlayers = dataManager.getCareerPlayers();

        function teamPicked(t) {
            if (!myPlayers) return false;

            let count = 0;
            for (let i = 0; i < myPlayers.length; ++i) {
                const myPlayer = myPlayers[i];
                if (myPlayer.apiId <= 0) continue;

                if (myPlayer.teamId == t.team.id) ++count;
            }

            return count >= 3;
        }

        return <View style={{
            width: '100%',
            marginTop: 20,
            // paddingHorizontal: 10,
            // backgroundColor: 'blue',
            alignItems: 'center'
        }}>
            <View style={{
                paddingLeft: 20,
                paddingRight: 20,
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

            {table?.map((team, index) => {
                const picked = teamPicked(team);

                function onTeamClick() {
                    if (!picked)
                        onNavTeam(team)
                }

                return <TouchableOpacity key={team.team.name} activeOpacity={.6} onPress={onTeamClick} style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    opacity: picked ? 0.5 : 1
                }}>
                    <View style={{
                        width: '100%',
                        height: 52,
                        // backgroundColor: 'red',
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
                            <Image src={`${SERVER_BASE_URL}/data/teams/150x150/${encodeURIComponent(team.team.name.replace(/ö/g, 'o'))}.png`} style={{
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
        </View>
    }

    function onPlayerClick(p) {
        const grid = currentPlayer.grid;
        const apiId = currentPlayer.apiId;
        const start11 = currentPlayer.start11;
        const players = dataManager.getCareerPlayers()

        for (let i = 0; i < players.length; ++i) {
            if (players[i].apiId == apiId && players[i].grid == grid) {
                players[i] = p;
                players[i].grid = grid;
                players[i].start11 = start11;
                players[i].selected = false;
                players[i].teamShortName = team.team.short_name;
                dataManager.setCareerCurrentPlayer(p)
                dataManager.getCareerCurrentPlayer().grid = grid;
                dataManager.getCareerCurrentPlayer().start11 = start11;
                dataManager.getCareerCurrentPlayer().teamShortName = team.team.short_name;
                break;
            }
        }

        if (dataManager.getPlayerToSell()) {
            if (dataManager.getPlayerToSell().apiId == p.apiId) {
                dataManager.setPlayerToBuy(null);
                dataManager.setPlayerToSell(null);
            } else {
                dataManager.setPlayerToBuy(p);
            }
        } else {
            dataManager.setPlayerToBuy(p);
        }
        navigation.goBack();
    }

    function getPlayersPosition(player) {
        if (player.position == "Attacker") return strings.attackers;
        if (player.position == "Midfielder") return strings.midfielders;
        if (player.position == "Defender") return strings.defenders;
        if (player.position == "Goalkeeper") return strings.goalkeepers;
    }

    let currentPlayerPosition = null;
    let isFirstPositionItem = true;

    function renderPositionItem(isFirst, p) {
        if (isFirst) {
            return <View style={{
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center'
            }}>
                <Image src={`${SERVER_BASE_URL}/data/teams/150x150/${encodeURIComponent(team.team.name.replace(/ö/g, 'o'))}.png`} style={{
                    width: 40,
                    height: 40,
                    marginRight: 10,
                }}></Image>
                <View style={{
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        fontSize: 14,
                        lineHeight: 14,
                        marginBottom: -2
                    }}>{team.team.name}</Text>
                    <Text style={{
                        fontFamily: 'Roboto-Bold',
                        // marginBottom: 4,
                        fontSize: 14,
                        color: '#8E8E93'
                    }}>{getPlayersPosition(p)}</Text>
                </View>
            </View>
        }
        return <Text style={{
            fontFamily: 'Roboto-Bold',
            marginBottom: 4,
            fontSize: 16,
            marginTop: 10,
            color: '#8E8E93'
        }}>{getPlayersPosition(p)}</Text>
    }

    function renderPlayers() {
        const myPlayers = dataManager.getCareerPlayers();

        function playerPicked(p) {
            if (!myPlayers) return false;

            for (let i = 0; i < myPlayers.length; ++i) {
                const myPlayer = myPlayers[i];
                if (myPlayer.apiId <= 0) continue;
                if (myPlayer.apiId == p.apiId) return true;
            }

            return false;
        }

        return <View style={{
            padding: 20
        }}>
            {players.map((p) => {
                if (playerPicked(p)) return;
                let renderPosition = false;
                if (p.position != currentPlayerPosition) {
                    renderPosition = true;
                    currentPlayerPosition = p.position;
                }
                const isFirst = isFirstPositionItem;
                isFirstPositionItem = false;
                return <View key={`player_${p.number}_${p.name}`}>
                    {renderPosition ? renderPositionItem(isFirst, p) : null}
                    <PlayerTotalRowItem player1={p} team={team} onClick={onPlayerClick} />
                </View>
            })}
        </View>
    }

    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.gray800 }}>
            <StatusBar
                barStyle={Colors.statusBar}
                backgroundColor={Colors.gray800}
            />

            <View style={{ flex: 1, backgroundColor: Colors.bgColor }}>
                <View style={{
                    width: '100%',
                    backgroundColor: Colors.gray800,
                    height: insets.top
                }}></View>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{
                        // minHeight: '100%'
                    }}
                    style={{ flex: 1 }}>

                    <View style={{
                        width: '100%',
                        paddingBottom: 20,
                        backgroundColor: Colors.gray800
                    }}>
                        <AppBar navigation={navigation} title={"Fantasy"} showLogo={false} />

                        <ScrollView
                            horizontal={true}
                            contentInsetAdjustmentBehavior="automatic"
                            contentContainerStyle={{
                                // width: '100%',
                                height: 70,
                                // marginBottom: 5,
                                paddingLeft: 5,
                                paddingRight: 8,
                                // backgroundColor: 'green',
                                alignItems: 'center',
                            }}
                            showsHorizontalScrollIndicator={false}
                        >

                            {dataManager.getLeagues().map((l, i) => {
                                if (!l.is_main) return
                                return (<LeagueChip compact={true} key={`league_${i}`} league={l} selected={l == selectedLeague} onPress={() => { onLeaguePress(l) }} />)
                            })}
                        </ScrollView>
                    </View>

                    {loading ? <ActivityIndicator color={'#FF2882'} size="large" style={{
                        marginTop: 20
                    }} /> : null}
                    {!loading && view == EVIEW_TEAMS && table && !players?.length ? renderTable() : null}
                    {!loading && players?.length ? renderPlayers() : null}

                </ScrollView>
                <BottomNavBar navigation={navigation} />
                <View style={{
                    width: '100%',
                    backgroundColor: Colors.gray800,
                    height: insets.bottom
                }}></View>
            </View>

        </View>
    );
}