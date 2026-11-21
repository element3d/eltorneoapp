import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

import CarsPage from './CarsPage';

import 'react-native-screens';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';

import MatchPage from './MatchPage';
import ProfilePage from './ProfilePage';
import CalendarPage from './CalendarPage';
import TablesPage from './TablesPage';
import ProfileEditPage from './ProfileEditPage';
import MatchesLivePage from './MatchesLivePage';
import strings from './Strings';
import LangPage from './LangPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Colors from './Colors';
import AwardsInfoPage from './AwardsInfoPage';
import MoveToLeaguePage from './MoveToLeaguePage';
import RegisterPage from './RegisterPage';
import BeatBetPage from './BeatBet';
import SelectLeaguePage from './SelectLeaguePage';
import TrailersPage from './TrailersPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TeamPage from './TeamPage';
import LinkAccountPage from './LinkAccountPage';
import { getAnalytics, logEvent } from '@react-native-firebase/analytics';
import authManager from './AuthManager';
import BeatBetInfoPage from './BeatBetInfoPage';
import FireballInfoPage from './FireballInfoPage';
import CareerLeaguesPage from './CareerLeaguesPage';
import FormationPage from './FormationPage';
import FantasyInfoPage from './FantasyInfoPage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BeatBetOfficialPage from './BeatBetOfficialPage';
import EFootballInfoPage from './EFootballInfoPage';
import { AI_USER_ID } from './TablesBeatBetPagePanel';
import MatchSettingsPage from './MatchSettingsPage';
import WorldCupInfoPage from './WorldCupInfoPage';

// import { createDrawerNavigator } from '@react-navigation/drawer';

// import { RewardedAd, TestIds, AdEventType, RewardedAdEventType } from 'react-native-google-mobile-ads';

// const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-7041403371220271/3023099910';
// const rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
// });

const Stack = createStackNavigator();

function App(): JSX.Element {

  useEffect(() => {
    changeNavigationBarColor(Colors.bottomNavBarColor, true);  // Change to your desired color
  }, []);

  useEffect(() => {
    const me = authManager.getMeSync()
    if (me && (me.id == 1 || me.id == AI_USER_ID)) {
      return;
    }

    const analytics = getAnalytics();
    const m = Colors.mode
    let theme = "Light";
    if (m == 2) theme = "Dark";
    if (m == 3) theme = "FC26";

    logEvent(analytics, 'AppVisitTheme', {
      theme: theme,
    });
  }, []);

  useEffect(() => {
    requestNotificationPermission();

    AsyncStorage.getItem("lang")
      .then((l) => {
        if (!l) return
        strings.setLanguage(l)
      })
  }, [])

  async function requestNotificationPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
          // Proceed with setting up push notifications
        } else {
          console.log('Notification permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: Colors.bgColor }}>

      <SafeAreaProvider style={{ backgroundColor: Colors.bgColor }}>

        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }}
          options={{
            cardStyle: { backgroundColor: Colors.bgColor },
          }}
          onStateChange={() => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

            if (previousRouteName !== currentRouteName) {
              logEvent(getAnalytics(), 'screen_view', {
                firebase_screen: currentRouteName,
                firebase_screen_class: currentRouteName,
              });
            }
            routeNameRef.current = currentRouteName;
          }}>

          <Stack.Navigator initialRouteName={"Home"} screenOptions={{
            headerShown: false, // This hides the header,
            animation: 'none',
          }}>
            <Stack.Screen name="Home" component={CarsPage} />
            <Stack.Screen name="Calendar" component={CalendarPage} />
            <Stack.Screen name="Tables" component={TablesPage} />
            <Stack.Screen name="Match" component={MatchPage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="ProfileEdit" component={ProfileEditPage} />
            <Stack.Screen name="MatchesLive" component={MatchesLivePage} />
            <Stack.Screen name="Langs" component={LangPage} />
            <Stack.Screen name="AwardsInfo" component={AwardsInfoPage} />
            <Stack.Screen name="MoveToLeague" component={MoveToLeaguePage} />
            <Stack.Screen name="BeatBet" component={BeatBetPage} />
            <Stack.Screen name="SelectLeague" component={SelectLeaguePage} />
            <Stack.Screen name="Trailers" component={TrailersPage} />
            <Stack.Screen name="Team" component={TeamPage} />
            <Stack.Screen name="LinkAccount" component={LinkAccountPage} />
            <Stack.Screen name="BeatBetInfo" component={BeatBetInfoPage} />
            <Stack.Screen name="FireballInfo" component={FireballInfoPage} />
            <Stack.Screen name="EFootballInfo" component={EFootballInfoPage} />
            <Stack.Screen name="WorldCupInfo" component={WorldCupInfoPage} />

            <Stack.Screen name="CareerLeagues" component={CareerLeaguesPage} />
            <Stack.Screen name="Formation" component={FormationPage} />
            <Stack.Screen name="FantasyInfo" component={FantasyInfoPage} />

            <Stack.Screen name="BeatBetOfficial" component={BeatBetOfficialPage} />
            <Stack.Screen name="MatchSettings" component={MatchSettingsPage} />

          </Stack.Navigator>

        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
