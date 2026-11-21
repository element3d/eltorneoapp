import React, { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Colors from "./Colors";
import GamepadIcon from "./assets/ps5.svg";
import GamepadBlackIcon from "./assets/ps5_black.svg";

import EFootballIcon from "./assets/eFootball.svg";
import EFootballBlackIcon from "./assets/eFootball_black.svg";

import XWhiteIcon from "./assets/x_white.svg";
import XBlackIcon from "./assets/x_black.svg";

import OWhiteIcon from "./assets/o_white.svg";
import OBlackIcon from "./assets/o_black.svg";

import SWhiteIcon from "./assets/s_white.svg";
import SBlackIcon from "./assets/s_black.svg";

import TWhiteIcon from "./assets/t_white.svg";
import TBlackIcon from "./assets/t_black.svg";

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from "react-native-reanimated";
import dataManager from "./DataManager";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import SERVER_BASE_URL from "./AppConfig";
import authManager from "./AuthManager";
import strings from "./Strings";

const GAMEPAD_SIZE = 55

export default function MatchEFootballPanel({ match, eFootballPredict, setEFootballPredict, isMatchLive, isMatchEnded }) {
    const [selected, setSelected] = useState(1);
    const [positions, setPositions] = useState([]);
    const [ready, setReady] = useState(false);

    const translateX = useSharedValue(dataManager.getSettings().eFootballGamepadX);

    const moveTo = (index, internal = false) => {
        if ((isMatchLive || isMatchEnded) && !internal) return;

        if (!positions[index]) return;
        setSelected(index);

        if (!internal) {
            let teamId = -1;

            if (index == 0) {
                teamId = (match.team1.id);
            } else if (index == 2) {
                teamId = (match.team2.id);
            } else {
                teamId = (-1);
            }
            onEFootballPredict(teamId)
        }
        if (internal) {
            // 🚀 instant move (no animation)
            translateX.value = positions[index];
        } else {
            // 🎯 animated move
            translateX.value = withTiming(positions[index], {
                duration: 260,
                easing: Easing.bezier(0.22, 1, 0.36, 1),
            });
        }
    };

    useEffect(() => {
        if (eFootballPredict) {
            if (eFootballPredict.team_id == -1) return;
            if (eFootballPredict.team_id == match.team1.id)
                moveTo(0, true)
            else
                moveTo(2, true)
        }
    }, [positions])

    const onDotLayout = (event, index) => {
        const { x, width } = event.nativeEvent.layout;

        setPositions((prev) => {
            const copy = [...prev];
            copy[index] = x + width / 2 - GAMEPAD_SIZE / 2;

            // when all 3 positions are measured
            if (copy.filter(v => v !== undefined).length === 3) {
                translateX.value = copy[1]; // center dot
                dataManager.getSettings().eFootballGamepadX = copy[1];
                setReady(true);

            }

            return copy;
        });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
            ],
        };
    });

    function getDotBorderColor() {
        if (isMatchLive || isMatchEnded) return Colors.borderColor
        return dataManager.getLeaguePrimaryColor(match.league)
    }

    const renderDot = (index) => (
        <TouchableOpacity
            key={index}
            onPress={() => moveTo(index)}
            onLayout={(e) => onDotLayout(e, index)}
            style={{
                alignItems: "center",
                justifyContent: "center",
                width: index == 1 ? 40 : 45,
                height: index == 1 ? 40 : 45,
            }}
        >
            <View
                style={{
                    width: index == 1 ? 30 : 45,
                    height: index == 1 ? 30 : 45,
                    borderRadius: 30,
                    backgroundColor: Colors.mode == 1 ? '#00000011' : '#ffffff11',
                    borderWidth: index == 1 ? 0 : 2,
                    borderColor: getDotBorderColor(),
                    opacity: selected === index ? 0 : 1,
                }}
            />
        </TouchableOpacity>
    );

    const ICON_OPACITY = .3;

    function renderGamepad() {
        return Colors.mode != 1 ? <GamepadIcon width={GAMEPAD_SIZE} height={GAMEPAD_SIZE} />
            : <GamepadBlackIcon width={GAMEPAD_SIZE} height={GAMEPAD_SIZE} />
    }

    function getEFootballPoints(p) {
        let sign = '';
        if (p.points > 0) sign = '+';
        return `${sign}${p.points}`
    }

    function onEFootballPredict(tid) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': authManager.getToken()
            },
            body: JSON.stringify({
                matchId: match.id,
                teamId: tid,
            })
        };

        fetch(`${SERVER_BASE_URL}/api/v1/efootball/predict`, requestOptions)
            .then(response => {
                if (response.status == 403) {
                    return
                }
                return response.json()
            })
            .then(data => {
                const newPredict = {
                    id: data.predict_id,
                    match_id: match.id,
                    team_id: tid,
                    points: 0,
                    status: 0,
                    user_id: authManager.getMeSync()?.id
                }
                setEFootballPredict(newPredict)
                return null
            })
            .catch((e) => {
                // setProcessing(false)
            });
    }

    function renderEFootballPredictPanel() {
        if (!eFootballPredict || eFootballPredict.status < 1) return;
        let status = '';
        if (eFootballPredict.status == 1) {
            status = strings.win
        }
        if (eFootballPredict.status == 2) {
            status = strings.lost
        }
        if (eFootballPredict.status == 3) {
            status = strings.draw
        }

        return <View style={{
            height: 30,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={{
                paddingHorizontal: 10,
                borderRadius: 15,
                height: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: dataManager.getEFootballPredictBgColor(eFootballPredict, false)
            }}>
                <Text style={{
                    fontSize: 11,
                    fontFamily: 'NotoSansArmenian-Bold',
                    color: dataManager.getEFootballPredictBorderColor(eFootballPredict, false),
                }}>{status} ({eFootballPredict.points > 0 ? "+" : ""}{eFootballPredict.points})</Text>
            </View>
        </View>
    }

    return (
        <View>
            <View
                style={{
                    width: "100%",
                    backgroundColor: Colors.gray800,
                    borderRadius: 12,
                    marginBottom: 20,
                    // overflow: 'hidden',
                    // borderWidth: 1,
                    borderColor: '#564FA3'
                }}
            >
                <View
                    style={{
                        height: 110,
                        alignItems: "center",
                    }}
                >
                    {Colors.mode != 1 ? <XWhiteIcon width={20} height={20} style={{
                        position: 'absolute',
                        left: 40,
                        top: 18,
                        opacity: ICON_OPACITY
                    }} /> : <XBlackIcon width={20} height={20} style={{
                        position: 'absolute',
                        left: 40,
                        top: 18,
                        opacity: ICON_OPACITY
                    }} />}

                    {Colors.mode != 1 ? <OWhiteIcon width={20} height={20} style={{
                        position: 'absolute',
                        left: 90,
                        top: 40,
                        opacity: ICON_OPACITY
                    }} /> : <OBlackIcon width={20} height={20} style={{
                        position: 'absolute',
                        left: 90,
                        top: 40,
                        opacity: ICON_OPACITY
                    }} />}

                    {Colors.mode != 1 ? <TWhiteIcon width={20} height={20} style={{
                        position: 'absolute',
                        right: 40,
                        top: 18,
                        opacity: ICON_OPACITY
                    }} /> : <TBlackIcon width={20} height={20} style={{
                        position: 'absolute',
                        right: 40,
                        top: 18,
                        opacity: ICON_OPACITY
                    }} />}

                    {Colors.mode != 1 ? <SWhiteIcon width={20} height={20} style={{
                        position: 'absolute',
                        right: 90,
                        top: 40,
                        opacity: ICON_OPACITY
                    }} /> : <SBlackIcon width={20} height={20} style={{
                        position: 'absolute',
                        right: 90,
                        top: 40,
                        opacity: ICON_OPACITY
                    }} />}

                    {Colors.mode != 1 ? <EFootballIcon height={16} style={{
                        marginTop: 12,
                        marginBottom: 2
                    }} /> : <EFootballBlackIcon height={16} style={{
                        marginTop: 12,
                        marginBottom: 2
                    }} />}

                    {!eFootballPredict || eFootballPredict.status == 0 ? <Text
                        style={{
                            color: '#8E8E93',
                            fontSize: 8,
                            // backgroundColor: 'blue',
                            lineHeight: 10,
                            fontFamily: "NotoSansArmenian-Bold",
                        }}
                    >
                        {strings.choose_side}
                    </Text> : <View style={{
                        // height: 12
                    }}>
                        {renderEFootballPredictPanel()}

                    </View>}

                    {!eFootballPredict || eFootballPredict.status == 0 ? <View
                        style={{
                            width: "100%",
                            flex: 1,
                            paddingBottom: 6,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            position: "relative",
                        }}
                    >
                        {[0, 1, 2].map(renderDot)}

                        <Animated.View
                            style={[
                                {
                                    position: "absolute",
                                    opacity: ready ? 1 : 0, // 👈 prevents flicker
                                },
                                animatedStyle,
                            ]}
                        >
                            {renderGamepad()}
                        </Animated.View>
                    </View> : <View
                        style={{
                            width: "100%",
                            flex: 1,
                            paddingBottom: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            position: "relative",
                        }}
                    >
                        {eFootballPredict.team_id == match.team1.id ? renderGamepad() : <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: 50,
                                height: 45,
                            }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 30,
                                    backgroundColor: Colors.mode == 1 ? '#00000011' : '#ffffff11',
                                    borderWidth: 2,
                                    borderColor: getDotBorderColor(),
                                }}
                            />
                        </View>}
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: 30,
                                height: 30,
                            }}
                        >
                            <View
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 30,
                                    backgroundColor: Colors.mode == 1 ? '#00000011' : '#ffffff11',
                                }}
                            />
                        </View>
                        {eFootballPredict.team_id == match.team2.id ? renderGamepad() : <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: 50,
                                height: 45,
                            }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 30,
                                    backgroundColor: Colors.mode == 1 ? '#00000011' : '#ffffff11',
                                    borderWidth: 2,
                                    borderColor: getDotBorderColor(),
                                }}
                            />
                        </View>}
                    </View>}
                </View>
            </View>
        </View>
    );
}