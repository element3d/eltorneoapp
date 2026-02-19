import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, Animated, Easing, Image } from 'react-native';
import HomeIcon from './assets/home.svg';
import HomeIconActive from './assets/home_black.svg';
import HomeIconDarkActive from './assets/home_dark.svg';

import StatsIcon from './assets/stats.svg';
import StatsActiveIcon from './assets/stats_active.svg';
import StatsActiveDarkIcon from './assets/stats_black.svg';

import CarsActiveIcon from './assets/cars_active.svg';

import MessagesIcon from './assets/messages.svg';
import MessagesActiveIcon from './assets/messages_active.svg';

import ProfileIcon from './assets/profile.svg';
import ProfileActiveIcon from './assets/profile_active.svg';
import ProfileActiveDarkIcon from './assets/profile_black.svg';

import CalendarIcon from './assets/cal.svg';
import CalendarIconActive from './assets/cal_active.svg';
import CalendarIconDarkActive from './assets/cal_dark.svg';

import GarageActiveIcon from './assets/garage_active.svg';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authManager from './AuthManager';
import SERVER_BASE_URL from './AppConfig';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { ESTAT_TOTAL, ETAB_BETS, ETAB_PREDICTS } from './ProfilePage';
import Colors from './Colors';
import dataManager from './DataManager';
import { EGAME_BEATBET, EGAME_CAREER, EGAME_ELTORNEO, EGAME_FIREBALL } from './GamepadMenu';
const Pulse = require('react-native-pulse').default;

export const EBOTTOM_NAVBAR_MODE_ADD = 0
export const EBOTTOM_NAVBAR_MODE_SAVE = 1

export const EPAGE_HOME = 0
export const EPAGE_CALENDAR = 1
export const EPAGE_TABLES = 2
export const EPAGE_PROFILE = 3


function BottomNavBar({ navigation, page, isAbsolute=false, style = {} }): JSX.Element {
  const [currentTime, setCurrentTime] = useState(new Date());
  const me = authManager.getMeSync()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date()); // Update the state with the new time
    }, 10000); // Set the interval to update every minute (60000 milliseconds)

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);


  const renderTime = () => {
    // Format the time as a string, e.g., HH:mm
    return moment(currentTime).format('HH:mm')
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  function navCalendar() {
    navigation.navigate('Calendar')
  }

  function navTables() {
    if (page == EPAGE_TABLES) return;
    let league = 1;
    let page = 1;
    if (me) {
      const game = dataManager.getSettings().game;
      if (game == EGAME_ELTORNEO && me.elTorneoLeague >= 1) {
        league = me.elTorneoLeague;
        page = Math.ceil(me.elTorneoPosition / 20);
        if (page < 1) league = 1;
      } else if (game == EGAME_BEATBET && me.beatBetLeague >= 1) { 
        league = me.beatBetLeague;
        page = Math.ceil(me.beatBetPosition / 20);
        if (page < 1) league = 1;
      } else if (game == EGAME_FIREBALL && me.fireballLeague >= 1) { 
        league = me.fireballLeague;
        page = Math.ceil(me.fireballPosition / 20);
        if (page < 1) league = 1;
      } else if (game == EGAME_CAREER && me.careerLeague >= 1) { 
        league = me.careerLeague;
        page = Math.ceil(me.careerPosition / 20);
        if (page < 1) league = 1;
      }
    }
    page = Math.max(1, page);
    navigation.navigate('Tables', {
      page: page,
      routeGame: dataManager.getSettings().game,
      league: league >= 1 ? league : 1,
      season: dataManager.getSettings()?.season ?? '25/26',
    });
  }


  function navBands() {
    // navigation.navigate({ name: 'Home', key: 'Home' })
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Home' }],
    // });

    navigation.popToTop('Home')

    // navigation.navigate('Home')
  }

  function navGarage() {
    const tab = dataManager.getSettings().game == 'beatbet' ? ETAB_BETS : ETAB_PREDICTS
    AsyncStorage.getItem('token', (err, token) => {
      if (token && authManager.getMeSync()) {
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
      navigation.push('Login')
    })
  }

  function onNavLiveMatches() {
    navigation.navigate('MatchesLive')
  }

  return (
    <View style={{
      width: '100%',
      height: 70,
      position: isAbsolute ? 'absolute' : 'relative',
      bottom: 0,
      backgroundColor: '#140516',//Colors.bottomNavBarColor,
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
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#45BAFB',
        backgroundColor: '#FF2882'
      }}>
        <Image source={require('./assets/fc_chip_bg.png')} style={{
        width: '100%',
        height: '100%',
        position: 'absolute'
      }}></Image>
        <Text style={{
          fontSize: 8,
          fontFamily: 'Roboto-Bold',
          color: 'white'
        }}>LIVE</Text>
        <Text style={{
          color: 'white',
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
