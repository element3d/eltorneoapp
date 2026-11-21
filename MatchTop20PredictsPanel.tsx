import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import authManager from "./AuthManager";
import ProfileIcon from './assets/Profile2.svg'
import SERVER_BASE_URL from "./AppConfig";
import dataManager from "./DataManager";
import strings from "./Strings";
import { ESTAT_TOTAL, ETAB_PREDICTS } from "./ProfilePage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useState } from "react";
import Colors from "./Colors";
import NativeAdComp from "./NativeAdComp";

import { ENEW_LEAGUE_AMATEUR, ENEW_LEAGUE_BEGINNER, ENEW_LEAGUE_LEGEND, ENEW_LEAGUE_PRO, ENEW_LEAGUE_REGULAR, ENEW_LEAGUE_SUPERSTAR } from "./Enums";
import { EGAME_WORLD_CUP } from "./GamepadMenu";
import { AmateurIcon, LegendIcon, ProIcon, RegularIcon, SuperstarIcon } from "./LevelIcons";

function PredictItem({ predict, match, onPress }) {
  function getBgColor(p) {
    if (p.status == 0) return Colors.predictBGColor;
    if (p.status == 1 || p.status == 5) return '#00C56619'
    if (p.status == 2) return '#FACC1519'
    if (p.status == 3) return '#FF474719'
  }

  function getSpecialPoints() {
    return match.special_match_points.split(':')
  }

  function getPoint(p) {
    const sp = getSpecialPoints()

    if (p.status == 0) return '0'
    if (p.status == 1) return match.is_special ? '+' + sp[1] : '+1'
    if (p.status == 2) return match.is_special ? '+' + sp[0] : '+3'
    if (p.status == 3) return match.is_special ? sp[2] : '-1'
    if (p.status == 4) return '-2'
    if (p.status == 5) return match.is_special ? '+' + sp[1] : '+2'
  }

  function getBorderColor(p) {
    if (p.status == 0) return Colors.titleColor;//'#8E8E93'
    if (p.status == 1 || p.status == 5) return '#00C566'
    if (p.status == 2) return '#ff7539'
    if (p.status == 3) return '#FF4747'
  }

  function renderLock(predict) {
    // if (blockForAd && (getUserPosition(predict.user) == 1 || getUserPosition(predict.user) == 2 || getUserPosition(predict.user) == 3)) return true
    return false
  }

  function getLevelIcon(user) {
    if (dataManager.getSettings().game == EGAME_WORLD_CUP) {
      return;
    }

    if (user.elTorneoLeague == ENEW_LEAGUE_LEGEND) {
      return <LegendIcon size={30} />
    }
    if (user.elTorneoLeague == ENEW_LEAGUE_PRO) {
      return <ProIcon size={30} />
    }
    if (user.elTorneoLeague == ENEW_LEAGUE_AMATEUR) {
      return <AmateurIcon size={24} />
    }
    if (user.elTorneoLeague == ENEW_LEAGUE_REGULAR) {
      return <RegularIcon size={24} />
    }
    if (user.elTorneoLeague == ENEW_LEAGUE_SUPERSTAR) {
      return <SuperstarIcon size={30} />
    }
  }

  function getBalanceColor(user) {
    if (user.balance > 0) return '#00C566'
    if (user.balance < 0) return '#FF4747'

    return '#8E8E93'
  }

  function showPlayerPoints(p) {
    // if (p.elTorneoLeague == ELEAGUE_BEGINNER) return true;

    // const me = authManager.getMeSync();
    // if (!me || me.elTorneoLeague == ELEAGUE_BEGINNER) return false;
    return false;
  }

  function getLeagueText(user) {
    if (dataManager.getSettings().game == EGAME_WORLD_CUP) {
      return 'World Cup'
    }

    let txt = "el Torneo"
    if (user.elTorneoLeague == ENEW_LEAGUE_LEGEND) txt += " (" + strings.legend
    else if (user.elTorneoLeague == ENEW_LEAGUE_SUPERSTAR) txt += " (" + strings.superstar
    else if (user.elTorneoLeague == ENEW_LEAGUE_PRO) txt += " (" + strings.pro
    else if (user.elTorneoLeague == ENEW_LEAGUE_REGULAR) txt += " (" + strings.regular
    else if (user.elTorneoLeague == ENEW_LEAGUE_AMATEUR) txt += " (" + strings.amateur
    else if (user.elTorneoLeague == ENEW_LEAGUE_BEGINNER) txt += " (" + strings.beginner
    txt += ")";
    return txt;
  }

  function getUserPoints(user) {
    if (dataManager.getSettings().game == EGAME_WORLD_CUP) {
      const pts = user.worldCupPoints;
      return pts > 0 ? user.worldCupPoints : 0;
    }

    return user.points;
  }

  function getUserPosition(user) {
    if (dataManager.getSettings().game == EGAME_WORLD_CUP) {
      return user.worldCupPosition;
    }

    return user.elTorneoPosition;
  }

  function getUserLeague(user) {
    if (user.elTorneoLeague == ENEW_LEAGUE_LEGEND)  return strings.legend
    else if (user.elTorneoLeague == ENEW_LEAGUE_SUPERSTAR) return strings.superstar
    else if (user.elTorneoLeague == ENEW_LEAGUE_PRO) return strings.pro
    else if (user.elTorneoLeague == ENEW_LEAGUE_REGULAR) return strings.regular
    else if (user.elTorneoLeague == ENEW_LEAGUE_AMATEUR) return strings.amateur
    else if (user.elTorneoLeague == ENEW_LEAGUE_BEGINNER) return strings.beginner
  }

  return <TouchableOpacity onPress={onPress} activeOpacity={.8} style={{
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
        <Text lineBreakMode='clip' numberOfLines={1} style={{
          color: Colors.titleColor,
          fontSize: 14,
          marginBottom: 0,
          fontFamily: 'NotoSansArmenian-ExtraBold'
        }}>{predict.user.name}</Text>
        {getUserPosition(predict.user) > 0 && getUserPoints(predict.user) > 0 ?
          <View style={{
            marginTop: 2
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              // marginBottom: 2,
            }}>
              <Text style={{
                fontSize: 13,
                lineHeight: 14,
                marginRight: 4,
                color: Colors.titleColor,
                fontFamily: 'Roboto-Bold'
              }}>
                #{getUserPosition(predict.user)}
              </Text>
              <Text style={{
                fontSize: 12,
                marginRight: 4,
                color: '#8E8E93',
                lineHeight: 14,
                fontFamily: 'Roboto-Bold'
              }}>
                {getLeagueText(predict.user)}
              </Text>
            </View>
            {showPlayerPoints(predict.user) ? <View style={{
              flexDirection: 'row'
            }}>
              <Text style={{
                fontSize: 12,
                lineHeight: 14,
                color: '#8E8E93',
                // fontWeight: 'bold'
                fontFamily: 'Roboto-Bold'
                // marginBottom: 10,
                // fontFamily: 'NotoSansArmenian-Bold'
              }}>
                {strings.points}: {getUserPoints(predict.user)},
              </Text>
              <View style={{
                flexDirection: 'row',
                marginLeft: 10
              }}>
                <Text style={{
                  fontSize: 12,
                  lineHeight: 14,
                  color: '#8E8E93',
                  // fontWeight: 'bold'
                  fontFamily: 'Roboto-Bold'
                  // marginBottom: 10,
                  // fontFamily: 'NotoSansArmenian-Bold'
                }}>
                  {strings.balance}:
                </Text>
                <Text style={{
                  fontSize: 12,
                  lineHeight: 14,
                  color: getBalanceColor(predict.user),
                  // fontWeight: 'bold',
                  marginLeft: 4,
                  fontFamily: 'Roboto-Bold'
                  // marginBottom: 10,
                  // fontFamily: 'NotoSansArmenian-Bold'
                }}>
                  {predict.user.balance.toFixed(2)}$
                </Text>
              </View>
            </View> : null}
          </View>
          : <Text style={{
            fontSize: 12,
            color: '#8E8E93',
            // marginBottom: 10,
            fontFamily: 'NotoSansArmenian-Bold'
          }}>
            {getUserLeague(predict.user)}
            </Text>}
      </View>
      <View style={{
        height: '100%',
        // paddingTop: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}>
        {!renderLock(predict) ? <View style={{
          // borderWidth: 1,
          backgroundColor: getBgColor(predict),
          borderColor: '#00000033',
          padding: 1,
          paddingLeft: 8,
          paddingRight: predict.status == 0 ? 8 : 3,
          borderRadius: 6,
          marginBottom: 4
        }}>
          <Text style={{
            color: getBorderColor(predict),
            // fontWeight: 'bold',
            fontFamily: 'Roboto-Bold',
            marginBottom: 1,
            fontSize: predict.status == 0 ? 14 : 12,
            // fontFamily: 'NotoSansArmenian-Bold'
          }}>{predict.team1_score} : {predict.team2_score}{predict.status == 0 ? '' : ` (${getPoint(predict)})`}</Text>
        </View> : <Icon color={Colors.titleColor} size={20} name='lock' />}
        <View style={{
          width: '100%',
          height: 30,
          alignItems: 'center',
          // justifyContent: 'center',
        }}>
          {getLevelIcon(predict.user)}
        </View>
      </View>
    </View>

  </TouchableOpacity>
}

export default function MatchTop20PredictsPanel({ top20Predicts, onUnlock, adLoaded, blockForAd, match, isMatchEnded, navigation }) {
  function onNavUser(u) {
    authManager.setActiveUser(u)

    navigation.navigate('Profile', {
      id: u.id,
      globalPage: 1,
      selectedStat: ESTAT_TOTAL,
      tab: ETAB_PREDICTS,
    });
  }

  return (
    <View style={{
      paddingBottom: 90
    }}>
      {/* {dataManager.getSettings().enableAds ? <View style={{
        marginTop: 10,
      }}>
        <NativeAdComp forceNativeAd={true} />
      </View> : null} */}
      <Text style={{
        color: '#8E8E93',
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
        marginBottom: 4,
      }}>{strings.top_20_predicts}</Text>
      {top20Predicts?.predicts.map((predict, i) => {
        return <PredictItem key={`match_predict_${i}`} match={match} predict={predict} onPress={() => { onNavUser(predict.user) }} />
      })}

      {/* {dataManager.getSettings().enableAds && dataManager.getSettings().bannerType == 2 ? <View style={{
        marginTop: 10
      }}>
        <NativeAdComp />
      </View> : null} */}

      {/* {dataManager.getSettings().enableAds ? <View style={{
              marginTop: 10
            }}>
              <NativeAdComp />
            </View> : null } */}
    </View>
  )
}