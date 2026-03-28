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

import dataManager from "./DataManager";
import ButtonPrimary from "./ButtonPrimary";
import LinkAccountPanel from "./LinkAccountPanel";
import { EGAME_BEATBET, EGAME_CAREER, EGAME_FIREBALL } from "./GamepadMenu";
import authManager from "./AuthManager";

export default function UserPanel({ navigation, user, isMe }) {
  const game = dataManager.getSettings().game

  function onNavEdit() {
    navigation.push("ProfileEdit")
  }

  let place = game == EGAME_BEATBET ? user.beatBetPosition : user.elTorneoPosition;
  if (game == EGAME_FIREBALL) place = user.fireballPosition;
  else if (game == EGAME_CAREER) place = user.careerPosition;

  function getLeagueText() {
    if (game == EGAME_FIREBALL) {
      let t = 'Fireball'//strings.place_in_fireball;
      if (user.fireballLeague == 1) t += " (" + strings.legend
      else if (user.fireballLeague == 2) t += " (" + strings.pro
      else if (user.fireballLeague == 3) t += " (" + strings.amateur
      else if (user.fireballLeague == 4) t += " (" + strings.beginner
      t += ")";
      return t;
    }
    if (game == EGAME_BEATBET) {
      let t = ' Beat Bet'//strings.place_in_beat_bet;
      if (user.beatBetLeague == 1) t += " (" + strings.legend
      else if (user.beatBetLeague == 2) t += " (" + strings.pro
      else if (user.beatBetLeague == 3) t += " (" + strings.amateur
      else if (user.beatBetLeague == 4) t += " (" + strings.beginner
      t += ")";
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

    let txt = 'el Torneo'//strings.place_in_el_torneo
    if (user.elTorneoLeague == 1) txt += " (" + strings.legend
    else if (user.elTorneoLeague == 2) txt += " (" + strings.pro
    else if (user.elTorneoLeague == 3) txt += " (" + strings.amateur
    else if (user.elTorneoLeague == 4) txt += " (" + strings.beginner
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

  function getAwardText(award, league) {

    if (award.place > 1 || league != 1) return getAwardLeagueText(league)

    return strings.winner_of_eltorneo
  }

  function getAwardIcon(user, award) {
    if (award.place == 1) {
      if (award.league == 1)
        return <FirstIcon style={{ marginLeft: 0 }} width={20} height={20}></FirstIcon>
      else
        return <FirstIcon2 style={{ marginLeft: 0, marginRight: -3 }} width={20} height={20}></FirstIcon2>
    }
    if (award.league == 1) return <AwardGoldIcon width={26} height={26} style={{
      // top: 1,
      position: 'absolute'
    }}></AwardGoldIcon>
    if (Colors.mode == 2) return <AwardWhiteIcon width={26} height={26} style={{
      // top: 1,
      position: 'absolute'
    }}></AwardWhiteIcon>
    else return <AwardBlackIcon width={26} height={26} style={{
      // top: 1,
      position: 'absolute'
    }}></AwardBlackIcon>
  }

  function getAward(award) {
    return <View key={`award_${award.place}`} style={{
      // width: 200,
      height: 30,
      marginLeft: -5,
      // marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: 'red'
    }}>
      {/* {award.place > 1 ?  */}
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        // backgroundColor: 'red'
      }}>
        {getAwardIcon(user, award)}
        {award.place > 1 ? <Text style={{
          fontWeight: 900,
          // fontFamily: 'Poppins-Bold',
          // top:  award.place < 10 ? 2 : 4,
          fontSize: award.place < 10 ? 14 : 12,
          color: award.league == 1 ? '#FF9100' : Colors.titleColor,
          position: 'absolute'
        }}>{award.place}</Text> : null}
      </View>
      {/* : null} */}

      {/* { award.place == 1 && user.league == 1 ? <FirstIcon width={20} height={20}></FirstIcon> : null } */}
      <Text style={{
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
        color: '#8E8E93',
        marginLeft: 3
      }}>{getAwardText(award, award.league)}</Text>
    </View>
  }

  if (user) {
    return (
      <View style={{
        width: '100%'
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
            {game == 'eltorneo' ? <Text style={{
              // marginTop: 2,
              color: '#8E8E93',
              fontSize: 14,
              lineHeight: 16,
              fontFamily: 'Roboto-Bold',
              // fontFamily: 'NotoSansArmenian-Bold'
            }}>{strings.points}:  {user.points}</Text> : null}
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
          </View>
          {/* <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: 70,
            // backgroundColor: 'red',
            justifyContent: 'center'
          }}>
            <Text style={{
              // position: 'absolute',
              fontSize: 32,
              color: Colors.titleColor,
              fontFamily: 'Roboto-ExtraBold'
            }}>{user.points}</Text>
            <Text style={{
              fontSize: 12,
              lineHeight: 20,
              marginTop: -6
            }}>{strings.points}</Text>
          </View> */}
          {/* {isMe ? <TouchableOpacity activeOpacity={.6} onPress={onNavEdit} style={{
            width: 50,
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 50,
            flexDirection: 'row'
            // backgroundColor: 'red'
          }}>
            <Icon name="settings" size={24} color={'#8E8E93'}></Icon>
            <Icon name='chevron-right' size={20} color={'#8E8E93'}></Icon>
          </TouchableOpacity> : null} */}
        </View>
        {user.awards?.length ? <View style={{
          padding: 20,
          paddingBottom: 0,
          paddingTop: 10
        }}>
          <Text style={{
            fontSize: 18,
            color: Colors.titleColor,
            fontFamily: 'Roboto-Bold',
          }}>{strings.awards}</Text>

          {user.awards.map((award) => {
            return getAward(award)
          })}

          {isMe && user.isGuest ? <LinkAccountPanel navigation={navigation} /> : null}
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
