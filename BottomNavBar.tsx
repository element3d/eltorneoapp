import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, Animated, Easing, Image } from 'react-native';
import HomeIcon from './assets/home.svg';
import HomeIconActive from './assets/home_black.svg';
import HomeIconDarkActive from './assets/home_dark.svg';

import StatsIcon from './assets/stats.svg';
import StatsActiveIcon from './assets/stats_active.svg';
import StatsActiveDarkIcon from './assets/stats_black.svg';

import ProfileIcon from './assets/profile.svg';
import ProfileActiveIcon from './assets/profile_active.svg';
import ProfileActiveDarkIcon from './assets/profile_black.svg';

import CalendarIcon from './assets/cal.svg';
import CalendarIconActive from './assets/cal_active.svg';
import CalendarIconDarkActive from './assets/cal_dark.svg';

import AsyncStorage from '@react-native-async-storage/async-storage';
import authManager from './AuthManager';

import moment from 'moment';
import { ESTAT_TOTAL, ETAB_BETS, ETAB_PREDICTS } from './ProfilePage';
import Colors from './Colors';
import dataManager from './DataManager';
import { EGAME_BEATBET, EGAME_CAREER, EGAME_EFOOTBALL, EGAME_ELTORNEO, EGAME_FIREBALL } from './GamepadMenu';
import { useIsFocused } from '@react-navigation/native';
import { ENEW_LEAGUE_BEGINNER } from './Enums';

export const EBOTTOM_NAVBAR_MODE_ADD = 0
export const EBOTTOM_NAVBAR_MODE_SAVE = 1

export const EPAGE_HOME = 0
export const EPAGE_CALENDAR = 1
export const EPAGE_TABLES = 2
export const EPAGE_PROFILE = 3


function BottomNavBar({ navigation, page, league, isAbsolute = false, style = {} }): JSX.Element {
  const [currentTime, setCurrentTime] = useState(new Date());
  const me = authManager.getMeSync()

  const isFocused = useIsFocused();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date()); // Update the state with the new time
    }, 10000); // Set the interval to update every minute (60000 milliseconds)

    return () => {
      clearInterval(timer)
    }; // Clean up the interval on component unmount
  }, [isFocused]);


  const renderTime = () => {
    // Format the time as a string, e.g., HH:mm
    return moment(currentTime).format('HH:mm')
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  function navCalendar() {
    const state = navigation.getState();
    const routes = state.routes;

    const index = routes.findIndex(r => r.name === 'Calendar');

    if (index !== -1) {
      // Screen exists → go back to it
      const currentIndex = state.index;
      const count = currentIndex - index;
      console
      if (count > 0) {
        navigation.pop(count);
      }
      return;
    }

    navigation.navigate('Calendar');
  }

  function navTables() {
    if (page == EPAGE_TABLES) return;
    let league = -1;
    let tablesPage = 1;
    if (me) {
      const game = dataManager.getSettings().game;
      if (game == EGAME_ELTORNEO && me.elTorneoLeague >= 1) {
        league = me.elTorneoLeague;
        // tablesPage = Math.ceil(me.elTorneoPosition / 20);
        if (tablesPage < 1) league = 1;
      } else if (game == EGAME_EFOOTBALL && me.eFootballLeague >= 1) {
        league = me.eFootballLeague;
        // tablesPage = Math.ceil(me.elTorneoPosition / 20);
        if (tablesPage < 1) league = 1;
      } else if (game == EGAME_BEATBET && me.beatBetLeague >= 1) {
        league = me.beatBetLeague;
        tablesPage = Math.ceil(me.beatBetPosition / 20);
        if (tablesPage < 1) league = 1;
      } else if (game == EGAME_FIREBALL && me.fireballLeague >= 1) {
        league = me.fireballLeague;
        tablesPage = Math.ceil(me.fireballPosition / 20);
        if (tablesPage < 1) league = 1;
      } else if (game == EGAME_CAREER && me.careerLeague >= 1) {
        league = me.careerLeague;
        tablesPage = Math.ceil(me.careerPosition / 20);
        if (tablesPage) league = 1;
      }
    }
    tablesPage = Math.max(1, tablesPage);

    navigation.navigate('Tables', {
      page: tablesPage,
      routeGame: dataManager.getSettings().game,
      league: league >= 1 ? league : ENEW_LEAGUE_BEGINNER,
      season: dataManager.getSettings()?.season ?? '26/27',
    });
  }


  function navBands() {
    navigation.popToTop()
  }

  function navGarage() {
    const tab = dataManager.getSettings().game == 'beatbet' ? ETAB_BETS : ETAB_PREDICTS
    const me = authManager.getMeSync();
    AsyncStorage.getItem('token', (err, token) => {
      if (token && me) {
        authManager.setActiveUser(authManager.getMeSync())

        navigation.push('Profile', {
          id: authManager.getMeSync().id,
          globalPage: 1,
          routeSelectedLeague: -1,
          selectedStat: ESTAT_TOTAL,
          tab: tab,
        });
        return
      }
      if (token && !me) {
        authManager.getMe(token)
          ?.then((me) => {
            authManager.me = me;
            authManager.setActiveUser(authManager.getMeSync())

            navigation.push('Profile', {
              id: authManager.getMeSync().id,
              globalPage: 1,
              routeSelectedLeague: -1,
              selectedStat: ESTAT_TOTAL,
              tab: tab,
            });
          })
          .catch(() => {

          });
        return;
      }
      navigation.push('Login')
    })
  }

  function onNavLiveMatches() {
    const state = navigation.getState();
    const routes = state.routes;

    const index = routes.findIndex(r => r.name === 'MatchesLive');

    if (index !== -1) {
      // Screen exists → go back to it
      const currentIndex = state.index;
      const count = currentIndex - index;
      console
      if (count > 0) {
        navigation.pop(count);
      }
      return;
    }

    navigation.navigate('MatchesLive');
  }

  function getActiveColor() {
    if (league == 6 && Colors.mode == 3) {
      return '#FF7FDE';
    }

    if (league == 1 && Colors.mode == 3) {
      return '#FF51A2';
    }

    if (Colors.mode == 3 && league == 5) {
      return '#C32B33';
    }

    if (Colors.mode == 3 && league == 2) {
      return '#05F0FF';
    }
    if (Colors.mode == 3 && league == 3) {
      return '#A66FFE';
    }
    if (Colors.mode == 3 && league == 14) {
      return "#FF6900"
    }

    return Colors.primary2
  }

  return (
    <View style={{
      width: '100%',
      height: 70,
      position: isAbsolute ? 'absolute' : 'relative',
      bottom: 0,
      backgroundColor: Colors.bottomNavBarColor,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    }}>
      {page == EPAGE_HOME ?
        <TouchableWithoutFeedback>
          <View style={{
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {Colors.mode == 1 ? <HomeIconActive width={40} /> : <HomeIconDarkActive width={40} />}
            <View style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: getActiveColor()
            }}></View>
          </View>
        </TouchableWithoutFeedback> :
        <TouchableWithoutFeedback onPress={navBands}>
          <View style={{
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <HomeIcon width={40} />
          </View>
        </TouchableWithoutFeedback>}

      {page == EPAGE_CALENDAR ?
        <TouchableWithoutFeedback>
          <View style={{
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {Colors.mode == 1 ? <CalendarIconActive width={40} /> : <CalendarIconDarkActive width={40} />}
            <View style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: getActiveColor()
            }}></View>
          </View>
        </TouchableWithoutFeedback>
        :
        <TouchableWithoutFeedback onPress={navCalendar}>
          <View style={{
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <CalendarIcon width={40} />
          </View>
        </TouchableWithoutFeedback>}

      <TouchableOpacity activeOpacity={.8} onPress={onNavLiveMatches} style={{
        width: 60,
        height: 55,
        borderRadius: Colors.mode == 4 ? 10 : 16,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: Colors.mode == 3 ? 1 : 0,
        borderColor: Colors.gradientBorderColor,
        backgroundColor: Colors.primary
      }}>
        {Colors.mode == 3 ? <Image source={dataManager.getButtonGradient(league)} style={{
          width: '100%',
          height: '100%',
          position: 'absolute'
        }} /> : null}
         {Colors.mode == 4 ? <Image source={dataManager.getButtonGradientFC27(league)} style={{
          width: '100%',
          height: '100%',
          position: 'absolute'
        }} /> : null}
        <Text style={{
          fontSize: 8,
          fontFamily: 'Roboto-Bold',
          color: Colors.mode == 4 || (Colors.mode == 3 && league == 6) ? 'black' : 'white',
        }}>LIVE</Text>
        <Text style={{
          color: Colors.mode == 4 || (Colors.mode == 3 && league == 6) ? 'black' : 'white',
          fontSize: 22,
          fontFamily: 'digital-7',
          textAlign: 'center',
          marginBottom: 8,
        }}>{renderTime()}</Text>

      </TouchableOpacity>

      {page == EPAGE_TABLES ?
        <TouchableWithoutFeedback onPress={navTables}>
          <View style={{
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>

            {Colors.mode == 1 ? <StatsActiveIcon width={40} /> : <StatsActiveDarkIcon width={40} />}
            <View style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: getActiveColor()
            }}></View>
          </View>
        </TouchableWithoutFeedback>
        :
        <TouchableWithoutFeedback onPress={navTables}>
          <View style={{
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <StatsIcon width={28} />
          </View>
        </TouchableWithoutFeedback>}





      {page == EPAGE_PROFILE ?
        <TouchableWithoutFeedback>
          <View style={{
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>

            {Colors.mode == 1 ? <ProfileActiveIcon width={40} /> : <ProfileActiveDarkIcon width={40} />}
            <View style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: getActiveColor()
            }}></View>
          </View>
        </TouchableWithoutFeedback> :
        <TouchableWithoutFeedback onPress={navGarage}>
          <View style={{
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <ProfileIcon width={24} />
          </View>
        </TouchableWithoutFeedback>
      }
    </View>
  );
}

export default BottomNavBar;
