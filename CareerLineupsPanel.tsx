import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Colors from "./Colors";
import { useCallback, useEffect, useState } from "react";
import KitImage from "./KitImage";
import dataManager from "./DataManager";
import { useFocusEffect } from "@react-navigation/native";
import PlayerTotalRowItem from "./PlayerTotalRowItem";
import strings from "./Strings";
import FairPlayDialog from "./FairPlayDialogs";
import formationManager from "./FormationManager";
import moment from "moment";

export const ECAREER_MODE_VIEW = 1
export const ECAREER_MODE_SUBS = 2

const pitch = require('./assets/pitch_ver.png')
const pitchDark = require('./assets/pitch_dark.png')


function PlayerPitchItem({ player, rowPlayers, subOut, disabled, onPlayerClick }) {
    const p = player;

    function getBorderColor() {
        if (dataManager.getHasCareer() && dataManager.getPlayerToBuy()?.apiId == player.apiId) return Colors.success;
        return subOut ? Colors.fail : Colors.borderColor
    }

    return <View
        style={{
            width: `${1 / rowPlayers.length * 100}%`,
        }}
    >
        <TouchableOpacity activeOpacity={.6} onPress={() => {
            if (disabled) return;
            onPlayerClick(p)
        }}>
            <View
                style={{
                    opacity: disabled ? 0.2 : 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 3
                }}>
                {p.matchId > 0 ? <View style={{
                    width: 6,
                    height: 6,
                    marginBottom: 3,
                    borderRadius: 10,
                    backgroundColor: Colors.success
                }}></View> : <View style={{
                    width: 6,
                    height: 6,
                    marginBottom: 3,
                }}></View>}

                {p.apiId > 0 ? <View style={{
                    borderRadius: 30,
                    backgroundColor: 'white',
                    borderWidth: 2,
                    overflow: 'hidden',
                    // objectFit: 'cover',
                    borderColor: getBorderColor()
                    // borderColor: `#${playerColor}`,
                }}>
                    <Image src={`https://media.api-sports.io/football/players/${p.apiId}.png`} style={{
                        width: 50,
                        height: 50,

                    }} />
                </View> : <KitImage isBlank width={60} height={55} isGK={p.position == 'Goalkeeper'} />}

                {p.apiId > 0 ? <Text style={{
                    fontSize: 12,
                    marginTop: 4,
                    fontFamily: 'Roboto-Bold',
                    color: Colors.titleColor,
                    textAlign: 'center'
                }}>
                    {p.name} ({dataManager.getPlayerPosShort(p.position)})
                </Text> : <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        width: 16,
                        height: 16,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.primary
                    }}>
                        <Text style={{
                            fontFamily: 'Roboto-Bold',
                            color: 'white',
                            fontSize: 15,
                            lineHeight: 16,
                            marginTop: 1
                        }}>+</Text>
                    </View>
                    <Text style={{
                        fontFamily: 'Roboto-Bold',
                        color: Colors.titleColor,
                        marginLeft: 4,
                        fontSize: 12
                    }}>({dataManager.getPlayerPosShort(p.position)})</Text>
                </View>}
            </View>
        </TouchableOpacity>
    </View>
}

export default function CareerLineupsPanel({ navigation,
    isMe,
    user,
    career,
    formation,
    setFormation,
    players,
    setPlayers,
    careerMode,
    setCareerMode,
    careerSubOutPlayer,
    setIsLineupsSaveEnabled,
    onShowPlayerDialog }) {

    const pitchImage = Colors.mode == 1 ? pitch : pitchDark

    useEffect(() => {
        dataManager.setPlayerToSell(null);
        dataManager.setPlayerToBuy(null);

        if (career) return;
        if (!isMe) return;
        if (players.length) return;
        if (dataManager.pendingFantasy) {
            setPlayers(dataManager.pendingFantasy.players)
            setFormation(dataManager.pendingFantasy.formation)
            return;
        }

        const formation = [{
            apiId: -1,
            grid: "1:1",
            start11: true,
            position: 'Goalkeeper',
        },

        // Defenders (4)
        { apiId: -2, grid: "2:1", start11: true, position: "Defender" },
        { apiId: -3, grid: "2:2", start11: true, position: "Defender" },
        { apiId: -4, grid: "2:3", start11: true, position: "Defender" },
        { apiId: -5, grid: "2:4", start11: true, position: "Defender" },

        // Defensive Midfielders (2)
        { apiId: -6, grid: "3:1", start11: true, position: "Midfielder" },
        { apiId: -7, grid: "3:2", start11: true, position: "Midfielder" },
        { apiId: -8, grid: "3:3", start11: true, position: "Midfielder" },

        // Striker (1)
        { apiId: -9, grid: "4:1", start11: true, position: "Attacker" },
        { apiId: -10, grid: "4:2", start11: true, position: "Attacker" },
        { apiId: -11, grid: "4:3", start11: true, position: "Attacker" },

        { apiId: -12, grid: "sub-1gk", position: 'Goalkeeper', start11: false },
        { apiId: -13, grid: "sub-2df", position: 'Defender', start11: false },
        { apiId: -14, grid: "sub-3mf", position: 'Midfielder', start11: false },
        { apiId: -15, grid: "sub-3mf", position: 'Midfielder', start11: false },


        ];
        setPlayers(formation)
        setFormation('4-3-3');


        // dataManager.setCareerPlayers(formation);
    }, [career])

    useEffect(() => {
        return () => {
            if (isMe && !career) {
                dataManager.pendingFantasy = {
                    players: players,
                    formation: formation
                }
            }
        }
    })

    function checkIsSaveEnabled() {
        for (let i = 0; i < players.length; ++i) {
            if (players[i].apiId <= 0) return false;
        }

        return true;
    }

    useFocusEffect(useCallback(() => {
        const pl = dataManager.getCareerPlayers()
        if (!pl) return;
        setPlayers([...pl]);
        dataManager.setCareerCurrentPlayer(null);
        dataManager.setCareerPlayers(null);
        // if (career) dataManager.setCareerPlayers(null);
    }, []))

    useEffect(() => {
        if (!players) return;

        setIsLineupsSaveEnabled(checkIsSaveEnabled());
    }, [players])

    function getPlayerSubGrid(player) {
        if (player.position == 'Attacker') return "sub-4at";
        if (player.position == 'Midfielder') return "sub-3mf";
        if (player.position == 'Defender') return "sub-2df";
        if (player.position == 'Goalkeeper') return "sub-1gk";
    }

    function onPlayerClick(p) {
        if (!isMe) return;

        if (p.apiId == careerSubOutPlayer?.apiId) {
            setCareerMode(ECAREER_MODE_VIEW);
            return;
        }

        if (careerSubOutPlayer) {
            const inPlayer = { ...p };
            const outPlayer = { ...careerSubOutPlayer };

            const inIndex = players.findIndex(pl => pl.apiId === inPlayer.apiId);
            const outIndex = players.findIndex(pl => pl.apiId === outPlayer.apiId);

            const updatedPlayers = [...players];

            // Incoming player takes outgoing player’s spot
            updatedPlayers[outIndex] = {
                ...inPlayer,
                grid: outPlayer.grid.startsWith('sub') ? getPlayerSubGrid(outPlayer) : outPlayer.grid,
                start11: outPlayer.start11,
            };

            // Outgoing player moves to incoming player’s old spot
            updatedPlayers[inIndex] = {
                ...outPlayer,
                grid: inPlayer.grid.startsWith('sub') ? getPlayerSubGrid(inPlayer) : inPlayer.grid,
                start11: inPlayer.start11,
            };

            setCareerMode(ECAREER_MODE_VIEW);
            setPlayers(updatedPlayers);

            // dataManager.setCareerPlayers(updatedPlayers);
            return;
        }

        if (/*career && */p.apiId > 0) {
            onShowPlayerDialog(p);
            return;
        }

        p.selected = true;
        dataManager.setCareerCurrentPlayer(p);
        dataManager.setCareerPlayers(players);

        navigation.push('CareerLeagues');
    }

    function isPlayerDisabledForSub(outPlayer, inPlayer) {
        if (!outPlayer) return false;

        if (outPlayer.matchId > 0 && !inPlayer.start11 && inPlayer.apiId != outPlayer.apiId) {
            return true;
        }
        if (!outPlayer.start11 && outPlayer.matchId > 0 && inPlayer.apiId != outPlayer.apiId) {
            return true;
        }
        if (!inPlayer.start11 && inPlayer.matchId > 0 && inPlayer.apiId != outPlayer.apiId) {
            return true;
        }
        if (inPlayer.matchId > 0 && !outPlayer.start11 && inPlayer.apiId != outPlayer.apiId) {
            return true;
        }

        const pos = outPlayer.position;
        if (pos == 'Attacker') {
            if (inPlayer.position == 'Attacker') return false;
            // if (inPlayer.grid.startsWith('sub')) {
            //     if (inPlayer.position == 'Midfielder') return false;
            // }
            // if (inPlayer.position == 'Midfielder' && (inPlayer.grid[0] == '4' || inPlayer.grid[0] == '5')) {
            //     return false
            // }
        } else if (pos == 'Midfielder') {
            if (outPlayer.grid[0] == '3') {
                if (inPlayer.position == 'Midfielder') return false;
            } else {
                if (inPlayer.position == 'Midfielder' /*|| inPlayer.position == 'Attacker'*/) return false;
            }
        } else if (pos == 'Defender') {
            if (pos == inPlayer.position) return false
        } else if (pos == 'Goalkeeper') {
            if (pos == inPlayer.position) return false
        }

        return true;
    }

    function renderPitchSubs() {
        function getSubsPlayers() {
            const rowPlayers = []
            for (let i = 0; i < players.length; ++i) {
                if (!players[i].start11) rowPlayers.push(players[i]);
            }
            return rowPlayers;
        }

        const rowPlayers = getSubsPlayers();

        return rowPlayers.map(p => {
            return <PlayerPitchItem key={`sub-p-${p.apiId}-${p.name}`} disabled={isPlayerDisabledForSub(careerSubOutPlayer, p)} player={p} rowPlayers={rowPlayers} subOut={p.apiId == careerSubOutPlayer?.apiId} onPlayerClick={onPlayerClick} />
        })
    }

    function renderLeftTeam(formation) {
        const rows = ['1'].concat(formation.split('-'));

        function getRowPlayers(apiRow) {
            return (players || [])
                .filter(p => {
                    const [r] = p.grid.split(':').map(Number);
                    return r === apiRow;
                })
                .sort((a, b) => {
                    const [, ca] = a.grid.split(':').map(Number);
                    const [, cb] = b.grid.split(':').map(Number);
                    return ca - cb;
                });
        }

        return (
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '95%',
                    flex: 1,
                }}
            >
                {rows
                    .slice()
                    .reverse()
                    .map((count, idx) => {
                        const apiRow = rows.length - idx;
                        const rowPlayers = getRowPlayers(apiRow);

                        return (
                            <View key={`row-${apiRow}`} style={{ width: '100%', alignItems: 'center' }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        // flex: 1,
                                        justifyContent: 'space-around',
                                        // alignItems: 'center',
                                        // backgroundColor: 'green',
                                        width: '100%',
                                    }}
                                >
                                    {rowPlayers.map(p => {
                                        return <PlayerPitchItem key={`p-${p.grid}-${p.apiId}-${user.id}`} disabled={isPlayerDisabledForSub(careerSubOutPlayer, p)} player={p} rowPlayers={rowPlayers} subOut={p.apiId == careerSubOutPlayer?.apiId} onPlayerClick={onPlayerClick} />
                                    })}
                                </View>
                            </View>
                        );
                    })}
            </View>
        );
    }

    function onNavFormation() {
        if (!isMe) return;

        formationManager.setFormation(formation);
        navigation.push('Formation');
    }

    if (!players.length) {
        return;
    }

    function hasStart11Player() {
        for (let i = 0; i < players.length; ++i) {
            if (players[i].start11 && players[i].apiId > 0) return true;
        }

        return false;
    }

    function hasSubPlayer() {
        for (let i = 0; i < players.length; ++i) {
            if (!players[i].start11 && players[i].apiId > 0) return true;
        }

        return false;
    }

    function getDate(matchDate) {
        const today = moment().startOf('day');
        const tomorrow = moment().add(1, 'day').startOf('day');

        if (moment(matchDate).isSame(today, 'day')) {
            return strings.today.toLowerCase();
        } else if (moment(matchDate).isSame(tomorrow, 'day')) {
            return strings.tomorrow.toLowerCase();
        } else {
            return `${moment(matchDate).format('DD')} ${strings[moment(matchDate).format('MMM').toLowerCase()]} ${moment(career.nextTransferTs).format('YYYY')}`;
        }
    }

    function getNextTransferMsg() {
        return strings.next_transfer + ' ' + getDate(career.nextTransferTs);
    }

    return <View style={{
        width: '100%',
        paddingHorizontal: 20,
    }}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            justifyContent: 'space-between'
        }}>
            <Text style={{
                fontFamily: 'Roboto-Bold',
                fontSize: 16,
                color: '#8E8E93'
            }}>{strings.formation}</Text>
            <TouchableOpacity onPress={onNavFormation} activeOpacity={.8} style={{
                height: 22,
                // paddingHorizontal: 12,
                borderRadius: 15,
                alignItems: 'center',
                overflow: 'hidden',
                justifyContent: 'center',
                backgroundColor: Colors.primary,
                borderWidth: Colors.mode == 3 ? 1 : 0,
                borderColor: Colors.gradientBorderColor
            }}>
                <Image source={dataManager.getButtonGradientLarge()} style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute'
                }} />
                <Text style={{
                    letterSpacing: 4,
                    marginLeft: 12,
                    marginRight: 12,
                    fontFamily: 'Roboto-Bold',
                    color: 'white'
                }}>
                    {formation}
                </Text>
            </TouchableOpacity>
        </View>

        {isMe ? <View style={{
            width: '100%',
            // paddingHorizontal: 20,
            marginBottom: 10,
            marginTop: 5,
        }}>
            <View style={{
                width: '100%',
                borderRadius: 12,
                padding: 10,
                // borderWidth: 1,
                // borderColor: '#FF4747',
                // marginBottom: 5,
                paddingHorizontal: 10,
                backgroundColor: '#FF474719'
            }}>
                <Text style={{
                    fontSize: 16,
                    fontFamily: 'Roboto-Bold',
                    color: '#FF4747',
                    marginBottom: 4
                }}>{strings.attention_quest}</Text>
                <Text style={{
                    color: Colors.titleColor
                }}>{strings.fantasy_msg}</Text>

                {!dataManager.getAllowTransfer() && career ? <Text style={{
                    marginTop: 4,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>{getNextTransferMsg()}</Text> : null}
            </View>
        </View> : null}

        <ImageBackground
            source={pitchImage}
            style={{
                flexDirection: 'row',
                width: '100%',
                aspectRatio: 1 / 1.8,
                alignItems: 'flex-end',
                paddingBottom: 12,
                justifyContent: 'center'
            }}
            resizeMode="contain"
        >
            <View style={{
                width: '100%',
                height: '90%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                {players?.length ? renderLeftTeam(formation) : null}
            </View>
        </ImageBackground>

        <View style={{
            width: '100%',
            paddingVertical: 20,
            flexDirection: 'row'
        }}>
            {players?.length ? renderPitchSubs() : null}
        </View>

        {hasStart11Player() ? <Text style={{
            fontFamily: 'Roboto-Bold',
            marginBottom: 4,
            fontSize: 16,
            marginTop: 10,
            color: '#8E8E93'
        }}>{strings.starting_lineup}</Text> : null}

        <View>
            {players?.map((p) => {
                if (!p.start11 || p.apiId <= 0) return;
                const team = {
                    playersReady: false
                }
                return <PlayerTotalRowItem key={p.name} player1={p} team={team} subOut={p.apiId == careerSubOutPlayer?.apiId} disabled={isPlayerDisabledForSub(careerSubOutPlayer, p)} onClick={onPlayerClick} />
            })}
        </View>

        <View>
            {hasSubPlayer() ? <Text style={{
                fontFamily: 'Roboto-Bold',
                marginBottom: 4,
                fontSize: 16,
                marginTop: 10,
                color: '#8E8E93'
            }}>{strings.substitutes}</Text> : null}
            {players?.map((p) => {
                if (p.start11 || p.apiId <= 0) return;
                const team = {
                    playersReady: false
                }
                return <PlayerTotalRowItem key={p.name} player1={p} team={team} subOut={p.apiId == careerSubOutPlayer?.apiId} disabled={isPlayerDisabledForSub(careerSubOutPlayer, p)} onClick={onPlayerClick} />
            })}
        </View>
    </View>
}