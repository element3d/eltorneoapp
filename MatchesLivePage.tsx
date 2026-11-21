import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomNavBar, { EPAGE_CALENDAR } from './BottomNavBar';
import SERVER_BASE_URL from './AppConfig';
import AppBar from './AppBar';
import TeamItem from './TeamItem';
import dataManager from './DataManager';
import authManager from './AuthManager';
import strings from './Strings';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LiveMatchItem from './LiveMatchItem';
import Colors from './Colors';
import NativeAdComp from './NativeAdComp';
import Gamepad from './Gamepad';
import GamepadMenu, { EGAME_CAREER, EGAME_ELTORNEO } from './GamepadMenu';

function MatchesLivePage({ route }): JSX.Element {
  const navigation = useNavigation();

  const [matches, setMatches] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [playingVideo, setPlayingVideo] = useState(null)

  const [matchesReqFinished, setMatchesReqFinished] = useState(false)
  const [upcomingReqFinished, setUpcomingReqFinished] = useState(false)
  const [showGamepadMenu, setShowGamepadMenu] = useState(false)

  const backgroundStyle = {
    backgroundColor: 'white',
  };

  useEffect(() => {
    getMatches(true)
  }, [])

  useEffect(() => {
    const token = authManager.getToken();
    const me = authManager.getMeSync();
    if (token && !me) {
      authManager.getMe(token)
        ?.then((me) => {
          authManager.me = me;
        })
        .catch(() => {

        });
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      getMatches()
      const interval = setInterval(() => {
        getMatches(false)
      }, 30000);

      // Cleanup interval on focus loss or unmount
      return () => {
        clearInterval(interval)
      };

    }, [])
  );

  function onShowGamepadMenu() {
    setShowGamepadMenu(true)
  }

  function isMatchEnded(m) {
    if (m.team1_score != -1 && m.team2_score != -1) return true;
    return false;
  }

  function getMatches() {
    let game = dataManager.getSettings().game;
    if (game == EGAME_CAREER) game = EGAME_ELTORNEO;
    const url = `${SERVER_BASE_URL}/api/v1/matches/live?game=${game}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': authManager.getToken() || ''
      },
    })
      .then(response => response.json())
      .then(data => {
        setMatches(data)
        setMatchesReqFinished(true)

        if (!data.length) {
          getUpcoming()
        } else {
          // let pv = playingVideo
          // for (let i = 0; i < data.length; ++i) {
          //   if (!isMatchEnded(data[i]) && !pv && data[i].has_special_video) {
          //     setPlayingVideo(data[i].special_match_title)
          //     pv = data[i].special_match_title
          //     break
          //   }
          // }

          setUpcoming([])
          setUpcomingReqFinished(true)
        }
      })
      .catch(error => {
        getMatches()
        // setMatches([])
        // setUpcomingReqFinished(true)
        // setMatchesReqFinished(true)
      });
  }

  function getUpcoming() {
    let game = dataManager.getSettings().game;
    if (game == EGAME_CAREER) game = EGAME_ELTORNEO;
    const url = `${SERVER_BASE_URL}/api/v1/matches/upcoming?game=${game}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': authManager.getToken() || ''
      },
    })
      .then(response => response.json())
      .then(data => {
        // if (data?.length) {
        //   let pv = playingVideo
        //   for (let i = 0; i < data.length; ++i) {
        //     if (!pv && data[i].has_special_video) {
        //       setPlayingVideo(data[i].special_match_title)
        //       pv = data[i].special_match_title
        //       break
        //     }
        //   }
        // }
        setUpcoming(data)
        setUpcomingReqFinished(true)
      })
      .catch(error => {
        getUpcoming()
        // setUpcoming([])
        // setUpcomingReqFinished(true)
      });
  }

  let currentLeague = null

  function onChangeGame(game) {
    if (!authManager.getMeSync()) return

    setMatchesReqFinished(false)
    setUpcomingReqFinished(false)
    setMatches([])
    setUpcoming([])
    getMatches()
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
            paddingBottom: 60
            // minHeight: '100%'
          }}

          style={{ flex: 1 }}>

          <View style={{
            width: '100%',
            // paddingBottom: 20,
            backgroundColor: Colors.gray800
          }}>
            <AppBar navigation={navigation} showLogo={false} title={'Live'} />
          </View>



          <View style={{
            width: '100%',
            // backgroundColor: 'red',
            padding: 15,
            paddingHorizontal: 20,
            // marginTop: 10,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {!matchesReqFinished || (matchesReqFinished && !matches.length && !upcomingReqFinished) ? <ActivityIndicator color={Colors.primary} size={'large'} /> : null}
            {!matches.length && matchesReqFinished && !upcoming.length && upcomingReqFinished ? <Text style={{
              fontFamily: 'Roboto-Bold',
              color: '#8E8E93'
            }}>
              {strings.no_live_matches}
            </Text> : null}

            {matchesReqFinished && upcomingReqFinished && dataManager.getSettings().enableAds ? <View style={{
              width: '100%',
            }}>
              <NativeAdComp forceNativeAd={true} />
            </View> : null}

            {matchesReqFinished && matches.length ? <View style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              marginBottom: 15,
            }}>
              <View style={{
                width: 30,
                height: 30,
                borderRadius: 25,
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#00C566'
              }}>
                <View style={{
                  width: 16,
                  height: 16,
                  borderRadius: 10,
                  backgroundColor: '#00C566'
                }}></View>
              </View>
              <Text style={{
                // width: '100%',
                fontFamily: 'Roboto-Bold',
                fontSize: 18,
                marginLeft: 10,
                // marginBottom: 10,
                textAlign: 'left',
                color: Colors.titleColor
              }}>{strings.live_matches}</Text></View> : null}

            {matches.map((m, i) => {
              let renderLeague = false;
              if (!currentLeague || currentLeague != m.league_name) {
                currentLeague = m.league_name
                renderLeague = true;
              }
              return <View key={`match_${i}`} style={{
                width: '100%'
              }}>
                <LiveMatchItem match={m} navigation={navigation} playVideo={m.special_match_title ? playingVideo == m.special_match_title : false} />
              </View>
            })}

            {upcoming.length ? <View style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              marginBottom: 15,
            }}>
              <View style={{
                width: 30,
                height: 30,
                borderRadius: 25,
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#FF4747'
              }}>
                <View style={{
                  width: 16,
                  height: 16,
                  borderRadius: 10,
                  backgroundColor: '#FF4747'
                }}></View>
              </View>
              <Text style={{
                width: '100%',
                fontFamily: 'Roboto-Bold',
                fontSize: 18,
                marginLeft: 10,
                textAlign: 'left',
                color: Colors.titleColor
              }}>{strings.upcoming_matches}</Text></View> : null}

            {upcoming.map((m, i) => {
              let renderLeague = false;

              if (!currentLeague || currentLeague != m.league_name) {
                currentLeague = m.league_name
                renderLeague = true;
              }
              return <View key={`match_${i}`} style={{
                width: '100%'
              }}>
                <LiveMatchItem match={m} playVideo={m.special_match_title ? playingVideo == m.special_match_title : false} navigation={navigation} />
              </View>
            })}
          </View>

          {matchesReqFinished && upcomingReqFinished && dataManager.getSettings().enableAds ? <View style={{
            width: '100%',
            // marginTop: 30,
            paddingHorizontal: 20,
          }}>
            <NativeAdComp />
          </View> : null}
        </ScrollView>

        <Gamepad onShowMenu={onShowGamepadMenu} />
        <BottomNavBar navigation={navigation} />
        {showGamepadMenu ? <GamepadMenu onClose={() => setShowGamepadMenu(false)} onChangeGame={onChangeGame} /> : null}
        <View style={{
          width: '100%',
          backgroundColor: Colors.gray800,
          height: insets.bottom
        }}></View>
      </View>
    </View>
  );
}


export default MatchesLivePage;
