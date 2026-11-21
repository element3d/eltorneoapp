import { Image, Text, TouchableOpacity, View } from "react-native"
import Colors from "./Colors"
import SERVER_BASE_URL from "./AppConfig"
import ProfileIcon from './assets/Profile2.svg';
import strings from "./Strings";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FirstIcon from './assets/first.svg'
import FirstIcon2 from './assets/first2.svg';
import AwardWhiteIcon from './assets/award_white.svg'
import AwardBlackIcon from './assets/award_black.svg'
import AwardGoldIcon from './assets/award_gold.svg'

import LegendIcon from './assets/LegendIcon.svg'
import ProIcon from './assets/ProIcon.svg'
import AmateurIcon from './assets/AmateurIcon.svg'
import RegularIcon from './assets/RegularIcon.svg'
import SuperstarIcon from './assets/SuperstarIcon.svg'

import dataManager from "./DataManager";
import ButtonPrimary from "./ButtonPrimary";
import LinkAccountPanel from "./LinkAccountPanel";
import { EGAME_BEATBET, EGAME_CAREER, EGAME_EFOOTBALL, EGAME_ELTORNEO, EGAME_FIREBALL, EGAME_WORLD_CUP } from "./GamepadMenu";
import authManager from "./AuthManager";
import { ELEAGUE_AMATEUR, ELEAGUE_LEGEND, ELEAGUE_PRO, ENEW_LEAGUE_AMATEUR, ENEW_LEAGUE_BEGINNER, ENEW_LEAGUE_LEGEND, ENEW_LEAGUE_PRO, ENEW_LEAGUE_REGULAR, ENEW_LEAGUE_SUPERSTAR } from "./Enums";

export default function UserPanel({ navigation, user, isMe }) {
  const game = dataManager.getSettings().game

  function onNavEdit() {
    navigation.push("ProfileEdit")
  }

  let place = game == EGAME_BEATBET ? user.beatBetPosition : user.elTorneoPosition;
  if (game == EGAME_FIREBALL) {
    place = user.fireballPosition + (user.fireballLeague - 1) * 20;
  } else if (game == EGAME_BEATBET) {
    place = user.beatBetPosition + (user.beatBetLeague - 1) * 20;
  }
  else if (game == EGAME_CAREER) place = user.careerPosition;
  else if (game == EGAME_EFOOTBALL) place = user.eFootballPosition;
  else if (game == EGAME_WORLD_CUP) place = user.worldCupPosition

  function getLeagueText() {
    if (game == EGAME_FIREBALL) {
      let t = 'Fireball'//strings.place_in_fireball;
      // if (user.fireballLeague == 1) t += " (" + strings.legend
      // else if (user.fireballLeague == 2) t += " (" + strings.pro
      // else if (user.fireballLeague == 3) t += " (" + strings.amateur
      // else if (user.fireballLeague == 4) t += " (" + strings.beginner
      // t += ")";
      return t;
    }
    if (game == EGAME_BEATBET) {
      let t = ' Beat Bet'//strings.place_in_beat_bet;
      // if (user.beatBetLeague == 1) t += " (" + strings.legend
      // else if (user.beatBetLeague == 2) t += " (" + strings.pro
      // else if (user.beatBetLeague == 3) t += " (" + strings.amateur
      // else if (user.beatBetLeague == 4) t += " (" + strings.beginner
      // t += ")";
      return t;
    }
    if (game == EGAME_CAREER) {
      let t = 'Fantasy'//strings.place_in_fantasy;
      if (user.careerLeague == 1) t += " (" + strings.legend
      else if (user.careerLeague == 2) t += " (" + strings.pro
      else if (user.careerLeague == 3) t += " (" + strings.amateur
      else if (user.careerLeague == 4) t += " (" + strings.beginner
      t += ")";
      return t;
    }
    if (game == EGAME_EFOOTBALL) {
      let txt = 'eFootball'
      if (user.eFootballLeague == ENEW_LEAGUE_LEGEND) txt += " (" + strings.legend
      else if (user.eFootballLeague == ENEW_LEAGUE_SUPERSTAR) txt += " (" + strings.superstar
      else if (user.eFootballLeague == ENEW_LEAGUE_PRO) txt += " (" + strings.pro
      else if (user.eFootballLeague == ENEW_LEAGUE_REGULAR) txt += " (" + strings.regular
      else if (user.eFootballLeague == ENEW_LEAGUE_AMATEUR) txt += " (" + strings.amateur
      else if (user.eFootballLeague == ENEW_LEAGUE_BEGINNER) txt += " (" + strings.beginner
      txt += ")";
      return txt;
    }
    if (game == EGAME_WORLD_CUP) {
      return 'World Cup'
    }

    let txt = 'el Torneo'//strings.place_in_el_torneo
    if (user.elTorneoLeague == ENEW_LEAGUE_LEGEND) txt += " (" + strings.legend
    else if (user.elTorneoLeague == ENEW_LEAGUE_SUPERSTAR) txt += " (" + strings.superstar
    else if (user.elTorneoLeague == ENEW_LEAGUE_PRO) txt += " (" + strings.pro
    else if (user.elTorneoLeague == ENEW_LEAGUE_REGULAR) txt += " (" + strings.regular
    else if (user.elTorneoLeague == ENEW_LEAGUE_AMATEUR) txt += " (" + strings.amateur
    else if (user.elTorneoLeague == ENEW_LEAGUE_BEGINNER) txt += " (" + strings.beginner
    txt += ")";
    return txt
  }

  function getLeagueName() {
    let txt = ''
    if (user.league == 1) txt += strings.legend
    else if (user.league == 2) txt += strings.pro
    else if (user.league == 3) txt += strings.amateur
    else if (user.league == 4) txt += strings.beginner

    return txt
  }

  function getAwardLeagueText(league) {
    let txt = strings.place_in_el_torneo
    if (league == 1) txt += " (" + strings.legend + ")"
    else if (league == 2) txt += " (" + strings.pro + ")"
    else if (league == 3) txt += " (" + strings.amateur + ")"
    else if (league == 4) txt += " (" + strings.beginner + ")"

    return txt
  }

  function getBalanceColor() {
    if (user.balance > 0) return '#00C566'
    if (user.balance < 0) return '#FF4747'

    return '#8E8E93'
  }

  function getLevelIcon(user) {
    // Begginner
    // Amateur
    // Regular
    // Pro
    // Top Player
    // Superstar
    // Legend
    let league = user.elTorneoLeague;
    if (game == EGAME_EFOOTBALL) {
      league = user.eFootballLeague;
    } else if (game == EGAME_CAREER) {
      league = user.careerLeague;
    }
    if (league == ENEW_LEAGUE_LEGEND) return <LegendIcon width={46} height={46} />
    if (league == ENEW_LEAGUE_SUPERSTAR) return <SuperstarIcon width={40} height={40} />
    if (league == ENEW_LEAGUE_PRO) return <ProIcon width={46} height={46} />
    if (league == ENEW_LEAGUE_REGULAR) return <RegularIcon width={40} height={40} />
    if (league == ENEW_LEAGUE_AMATEUR) return <AmateurIcon width={40} height={40} />
  }

  function getUserElTorneoPoints() {
    if (!isMe) {
      const me = authManager.getMeSync();
      if (!me) {
        if (user.elTorneoLeague != ENEW_LEAGUE_BEGINNER) return null;
      }
      else if (me.elTorneoLeague > user.elTorneoLeague) return null;
    }
    return <Text style={{
      // marginTop: 2,
      color: '#8E8E93',
      fontSize: 14,
      lineHeight: 16,
      fontFamily: 'Roboto-Bold',
      // fontFamily: 'NotoSansArmenian-Bold'
    }}>{strings.points}:  {user.points}</Text>
  }

  function getUserEFootballPoints() {
    if (!isMe) {
      const me = authManager.getMeSync();
      if (!me) {
        if (user.eFootballLeague != ENEW_LEAGUE_BEGINNER) return null;
      }
      else if (me.eFootballLeague > user.eFootballLeague) return null;
    }
    return <Text style={{
      // marginTop: 2,
      color: '#8E8E93',
      fontSize: 14,
      lineHeight: 16,
      fontFamily: 'Roboto-Bold',
    }}>{strings.points}:  {user.eFootballPoints >= 0 ? user.eFootballPoints : 0}</Text>
  }


  if (user) {
    return (
      <View style={{
        width: '100%',
      }}>

        <View style={{
          width: '100%',
          paddingLeft: 20,
          paddingRight: 15,
          alignItems: 'center',
          // marginBottom: 20,
          // marginTop: 10,
          flexDirection: 'row'
        }}>
          {/* <View></View> */}
          <View style={{
            width: 70,
            height: 70,
            borderColor: Colors.borderColor,
            borderWidth: 2,
            backgroundColor: Colors.bgColor,
            borderRadius: 80,
            // overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <View style={{
              width: 70,
              height: 70,
              borderRadius: 80,

              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {user.avatar?.length ? <Image style={{
                width: 70,
                height: 70,
                objectFit: 'cover'
              }} src={`${SERVER_BASE_URL}/${user.avatar}`} /> : <ProfileIcon width={60} height={60} style={{ marginTop: 10 }} />}
            </View>
          </View>
          <View style={{
            marginLeft: 15,
            // backgroundColor: 'green',
            flex: 1
          }}>
            <Text numberOfLines={1} style={{
              // marginTop: 10,
              marginBottom: 2,
              color: Colors.titleColor,
              fontSize: user.name.length > 20 ? 16 : 18,
              fontFamily: 'NotoSansArmenian-Bold'
            }}>{user.name}</Text>
            {place > 0 ? <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}><Text style={{
              marginBottom: 2,
              color: Colors.titleColor,
              fontSize: 16,
              lineHeight: 18,
              marginRight: 4,
              // lineHeight: 20,
              fontFamily: 'Roboto-ExtraBold',
              // fontFamily: 'NotoSansArmenian-Bold'
            }}>
                {`#${place}`}</Text>
              <Text style={{
                marginBottom: 2,
                color: '#8E8E93',
                fontSize: 14,
                lineHeight: 18,
                fontFamily: 'Roboto-Bold',
              }}>
                {`${getLeagueText()}`}</Text></View> : null}
            {game == EGAME_ELTORNEO ? getUserElTorneoPoints() : null}
            {game == EGAME_FIREBALL ? <Text style={{
              // marginTop: 2,
              color: '#8E8E93',
              fontSize: 14,
              lineHeight: 16,
              fontFamily: 'Roboto-Bold',
              // fontFamily: 'NotoSansArmenian-Bold'
            }}>{strings.points}:  {user.fireballPoints >= 0 ? user.fireballPoints : 0}</Text> : null}
            {game == EGAME_CAREER ? <Text style={{
              // marginTop: 2,
              color: '#8E8E93',
              fontSize: 14,
              lineHeight: 16,
              fontFamily: 'Roboto-Bold',
              // fontFamily: 'NotoSansArmenian-Bold'
            }}>{strings.points}:  {user.careerPoints >= 0 ? user.careerPoints : 0}</Text> : null}
            {game == 'beatbet' ? <View style={{
              flexDirection: 'row'
            }}>
              <Text style={{
                // marginTop: 2,
                color: '#8E8E93',
                fontSize: 14,
                lineHeight: 16,
                fontFamily: 'Roboto-Bold',
                // fontFamily: 'NotoSansArmenian-Bold'
              }}>{strings.balance}:  </Text>
              <Text style={{
                // marginTop: 2,
                color: getBalanceColor(),
                fontSize: 14,
                lineHeight: 16,
                fontFamily: 'Roboto-Bold',
                // fontFamily: 'NotoSansArmenian-Bold'
              }}>{user.balance.toFixed(2)}$</Text>
            </View> : null}
            {game == EGAME_EFOOTBALL ? getUserEFootballPoints() : null}
            {game == EGAME_WORLD_CUP ? <Text style={{
              // marginTop: 2,
              color: '#8E8E93',
              fontSize: 14,
              lineHeight: 16,
              fontFamily: 'Roboto-Bold',
            }}>{strings.points}:  {user.worldCupPoints >= 0 ? user.worldCupPoints : 0}</Text> : null}
          </View>
          {game == EGAME_ELTORNEO || game == EGAME_EFOOTBALL || game == EGAME_CAREER ? <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            paddingRight: 10,
            // width: 70,
            // backgroundColor: 'red',
            justifyContent: 'center'
          }}>
            {getLevelIcon(user)}
          </View> : null}
        </View>
        {isMe && user.isGuest ? <View style={{
          // padding: 20,
          marginTop: 10,
          // backgroundColor: 'red',
          paddingBottom: 0,
          // paddingTop: 10
        }}>
          <LinkAccountPanel navigation={navigation} />
        </View> : null}
      </View>
    )
  } else {
    return (
      <View style={{
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
        flexDirection: 'row'
      }}>
        <View style={{
          width: 70,
          height: 70,
          borderColor: '#EAEDF1',
          borderWidth: 2,
          backgroundColor: '#F7F7F7',
          borderRadius: 80,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center'
        }}>

        </View>
        <View style={{
          marginLeft: 15,
          flex: 1,
          alignItems: 'flex-start'
        }}>
          <Text style={{
            // marginTop: 10,
            color: 'transparent',
            fontSize: 18,
            backgroundColor: '#F7F7F7',
            borderRadius: 10,
            fontFamily: 'NotoSansArmenian-Bold'
          }}>First Name</Text>
          <Text style={{
            marginTop: 2,
            backgroundColor: '#F7F7F7',
            borderRadius: 10,
            color: 'transparent',
            fontSize: 12,
            fontFamily: 'NotoSansArmenian-Bold'
          }}>10 Points</Text>
        </View>

      </View>
    )
  }
}
