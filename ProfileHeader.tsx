import { Text, TouchableOpacity, View } from "react-native";
import AppBar from "./AppBar";
import UserPanel from "./UserPanel";
import NativeAdComp from "./NativeAdComp";
import ProfileStats from "./ProfileStat";
import React, { useState } from "react";
import Colors from "./Colors";
import dataManager from "./DataManager";
import ProfileStatsBet from "./ProfileStatsBet";
import { EGAME_BEATBET, EGAME_CAREER, EGAME_EFOOTBALL, EGAME_ELTORNEO, EGAME_FIREBALL, EGAME_WORLD_CUP } from "./GamepadMenu";
import ProfileStatsFireball from "./ProfileStatsFireball";
import strings from "./Strings";
import ProfileStatsEFootball from "./ProfileStatsEFootball";
import ProfileAwardsPanel from "./ProfileAwardsPanel";

export const ECAREER_TAB_SQUAD = 1
export const ECAREER_TAB_MATCHES = 2

const ProfileHeader = React.memo(({ navigation, tab, onSetCareerTab, user, isMe, predictsJson, betsJson, fireballPredictsJson, eFootballPredictsJson }) => {
    const game = dataManager.getSettings().game;

    function getTitle() {
        if (game == EGAME_ELTORNEO) return 'el Torneo';
        if (game == EGAME_BEATBET) return 'Beat Bet';
        if (game == EGAME_FIREBALL) return 'Fireball';
        if (game == EGAME_CAREER) return 'Fantasy';
        if (game == EGAME_EFOOTBALL) return 'eFootball';
        if (game == EGAME_WORLD_CUP) return 'World Cup';
    }

    return <View style={{
        marginBottom: 10
    }}>
        <View style={{
            width: "100%",
            // height: 500,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.gray800,
            paddingBottom: 20
        }}>
            <AppBar navigation={navigation} title={getTitle()} showLogo={false} showSettings={isMe}/>
            <UserPanel navigation={navigation} user={user} isMe={isMe} />
        </View>

        {dataManager.getSettings().enableAds ? <View style={{
            padding: 20,
            paddingBottom: 0
        }}>
            <NativeAdComp key={'profile_ad'} forceNativeAd={true} />
        </View> : <View style={{ height: 20 }} />}

        { user?.awards?.length ? <ProfileAwardsPanel user={user} awards={user.awards}/> : null }

        {predictsJson ? <ProfileStats predictsJson={predictsJson} /> : null}
        {betsJson ? <ProfileStatsBet predictsJson={betsJson} /> : null}
        {dataManager.getSettings().game == EGAME_FIREBALL && fireballPredictsJson ? <ProfileStatsFireball predictsJson={fireballPredictsJson} /> : null}
        {dataManager.getSettings().game == EGAME_EFOOTBALL && eFootballPredictsJson ? <ProfileStatsEFootball predictsJson={eFootballPredictsJson} /> : null}

        { game == EGAME_CAREER ? <View style={{
            paddingHorizontal: 20,
            marginBottom: tab == ECAREER_TAB_MATCHES ? 5 : 0
        }}>
            <View style={{
                width: '100%',
                height: 46,
                padding: 4,
                marginBottom: 5,
                backgroundColor: Colors.selectBGColor,
                borderRadius: 23,
                flexDirection: 'row'
            }}>
                <TouchableOpacity activeOpacity={.6} onPress={() => { onSetCareerTab(ECAREER_TAB_SQUAD) }} style={{
                    flex: 1,
                    height: 38,
                    backgroundColor: tab == ECAREER_TAB_SQUAD ? Colors.selectColor : 'transparent',
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: tab == ECAREER_TAB_SQUAD ? Colors.titleColor : "#8E8E93",
                        fontFamily: 'Roboto-Bold',
                    }}>{strings.team}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.6} onPress={() => { onSetCareerTab(ECAREER_TAB_MATCHES) }} style={{
                    flex: 1,
                    height: 38,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: tab == ECAREER_TAB_MATCHES ? Colors.selectColor : 'transparent',
                    borderRadius: 30
                }}>
                    <Text style={{
                        color: tab == ECAREER_TAB_MATCHES ? Colors.titleColor : "#8E8E93",
                        fontFamily: 'Roboto-Bold',
                    }}>{strings.matches}</Text>
                </TouchableOpacity>
            </View>
        </View> : null }
    </View>
});

export default ProfileHeader;