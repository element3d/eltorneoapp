import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View, TouchableWithoutFeedback, Image } from "react-native";
import strings from "./Strings";
import Colors from "./Colors";
import BadIcon from './assets/semibad.svg';
import GoodIcon from './assets/good.svg';
import StarIcon from './assets/semiup.svg';
import UpIcon from './assets/up.svg';
import BottomIcon from './assets/bottom.svg';
import dataManager from "./DataManager";

export default function PlayerDialog({ player, onClose, onSell, onSubstitue }) {
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const dialogOpacity = useRef(new Animated.Value(0)).current;
    const bgOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(bgOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                damping: 50,
                stiffness: 2120,
            }),
            Animated.timing(dialogOpacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

    }, []);

    function getIcon(rating) {
        if (rating >= 8) return <UpIcon width={28} height={28} />
        if (rating < 6) return <BottomIcon width={28} height={28} />

        if (rating < 7.0) return <BadIcon width={28} height={28} />
        if (rating >= 7.0 && rating < 7.5) return <GoodIcon width={30} height={30} />
        return <StarIcon width={24} height={24} />
    }

    function isBuyDisabled() {
        if (player.matchId > 0) return true;
        if (!dataManager.getAllowTransfer()) return true;
        if (!dataManager.getHasCareer()) return false;
        if (dataManager.getPlayerToBuy() && dataManager.getPlayerToBuy().apiId == player.apiId) return false
        if (dataManager.getPlayerToSell()) return true;
        return false;
    }

    return (
        <Animated.View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: bgOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["transparent", "#00000066"],
                }),
            }}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={{ position: "absolute", width: "100%", height: "100%" }} />
            </TouchableWithoutFeedback>

            <Animated.View
                style={{
                    width: 320,
                    height: 220,
                    borderRadius: 30,
                    backgroundColor: Colors.gray800,
                    transform: [{ scale: scaleAnim }],
                    opacity: dialogOpacity,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        padding: 20,
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            marginTop: 10,
                            color: Colors.titleColor,
                            fontFamily: 'Roboto-Bold',
                            fontSize: 22,
                            lineHeight: 22,
                            // backgroundColor: 'red',
                        }}>
                        {player.name}
                    </Text>
                    <Text style={{
                        fontFamily: 'Roboto-Bold',
                        fontSize: 14,
                        lineHeight: 16,
                        marginBottom: 10,
                        color: '#8E8E93'
                    }}>{player.teamShortName}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            width: 40,
                            marginRight: 20
                        }}></View>
                        <View style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            overflow: 'hidden',
                            borderWidth: 2,
                            marginLeft: 5,
                            borderColor: Colors.borderColor
                        }}>
                            <Image style={{
                                width: 100,
                                height: 100,
                            }} src={`https://media.api-sports.io/football/players/${player.apiId}.png`}></Image>
                        </View>

                        {player.games > 0 ? <View style={{
                            width: 40,
                            marginLeft: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {getIcon(player.rating.toFixed(1))}
                            <Text style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: 24,
                                lineHeight: 24,
                                marginTop: 10,
                                color: '#8E8E93'
                            }}>
                                {player.rating.toFixed(1)}
                            </Text>
                        </View> : <View style={{
                            width: 40,
                            marginRight: 20
                        }}></View>}
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        // backgroundColor: 'red',
                        height: 55,
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            if (isBuyDisabled()) return;
                            onSell(player)
                        }}
                        style={{
                            backgroundColor: Colors.fail,
                            opacity: isBuyDisabled() ? 0.6 : 1,
                            alignItems: "center",
                            height: 30,
                            borderRadius: 20,
                            width: "40%",
                            marginRight: 10,
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontFamily: 'Roboto-Bold' }}>{strings.sell}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => onSubstitue(player)}
                        style={{
                            backgroundColor: "#FF2882",
                            alignItems: "center",
                            height: 30,
                            borderRadius: 20,
                            width: "40%",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontFamily: 'Roboto-Bold'}}>{strings.substitue}</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </Animated.View>
    );
}
