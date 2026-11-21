import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomNavBar, { EPAGE_TABLES } from './BottomNavBar';
import SERVER_BASE_URL from './AppConfig';
import dataManager from './DataManager';
import AppBar from './AppBar';
import authManager from './AuthManager';
import adsManager from './AdsManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors from './Colors';
import GamepadMenu, { EGAME_BEATBET, EGAME_CAREER, EGAME_EFOOTBALL, EGAME_ELTORNEO, EGAME_FIREBALL, EGAME_WORLD_CUP } from './GamepadMenu';
import Gamepad from './Gamepad';
import TablesElTorneoPagePanel from './TablesElTorneoPagePanel';
import TablesBeatBetPagePanel from './TablesBeatBetPagePanel';
import TablesFireballPagePanel from './TablesFireballPagePanel';
import TablesCareerPagePanel from './TablesCareerPagePanel';
import TablesEFootballPagePanel from './TablesEFootballPagePanel';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ELEAGUE_BEGINNER, ENEW_LEAGUE_BEGINNER, ENEW_LEAGUE_LEGEND } from './Enums';
import TablesWorldCupPagePanel from './TablesWorldCupPanel';


const ETABLE_GENERAL = 0
const ETABLE_SCORE = 1
const ETABLE_WINNER = 2

function TablesPage({ route }): JSX.Element {
  const navigation = useNavigation();

  const { page, league, season, routeGame } = route.params;
  const [table, setTable] = useState([])
  const [numUsers, setNumUsers] = useState(0);
  const [blockForAd, setBlockForAd] = useState(dataManager.getSettings()?.blockForAd)
  const [adLoaded, setAdLoaded] = useState(false)
  const [tableLoading, setTableLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [me, setMe] = useState(authManager.getMeSync())
  // const [myLeague, setMyLeague] = useState(season == '26/27' && me?.elTorneoLeague ? me.elTorneoLeague : 1)
  const [showGamepadMenu, setShowGamepadMenu] = useState(false)
  // const [gameState, setGameState] = useState(dataManager.getSettings().game)
  const gameState = routeGame;
  const backgroundStyle = {
    backgroundColor: Colors.gray800,
  };

  // useEffect(() => {
  //   // getTableByPoints()
  //   setGameState(dataManager.getSettings().game)
  // }, [])

  // useEffect(() => {
  //   getTableByPoints()
  //   setTableLoading(true)
  // }, [league])

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

  useEffect(() => {
    if (gameState == EGAME_ELTORNEO) {
      getTableByPoints()
      setTableLoading(true)
    } else if (gameState == EGAME_BEATBET) {
      getBeatBetTableByBalance()
      setTableLoading(true)
    } else if (gameState == EGAME_FIREBALL) {
      getFireballTableByPoints();
      setTableLoading(true)
    } else if (gameState == EGAME_CAREER) {
      getCareerTableByPoints();
      setTableLoading(true)
    } else if (gameState == EGAME_EFOOTBALL) {
      getEFootballTableByPoints();
      setTableLoading(true)
    } else if (gameState == EGAME_WORLD_CUP) {
      getWorldCupTableByPoints();
      setTableLoading(true)
    }
  }, [gameState])

  useFocusEffect(
    React.useCallback(() => {
      // if (authManager.getMeSync()) {
      //   setMyLeague(authManager.getMeSync().league)
      //   setMe(authManager.getMeSync())
      // }
      if (!adLoaded && !adsManager.isLoaded()) return setBlockForAd(false)

      setBlockForAd(dataManager.getSettings()?.blockForAd)

      return () => {

      };
    }, [])
  );

  useEffect(() => {
    if (!dataManager.getSettings()) return
    if (!dataManager.getSettings().enableAds || !dataManager.getSettings().blockForAd) return
    if (adsManager.isLoaded()) {
      setAdLoaded(true)
    } else {
      adsManager.loadAd()
      const unsub = adsManager.addLoadedListener(() => {
        unsub()
        setAdLoaded(true)
      })
    }
  }, [])

  function getElTorneoTable() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`${SERVER_BASE_URL}/api/v3/table/eltorneo?page=${page}&league=${league}&season=${season}`, requestOptions)
      .then(response => {
        if (response.status == 200)
          return response.json()

        setTableLoading(false)
        return null
      })
      .then(data => {
        setTableLoading(false)
        setTable(data)
      });
  }

  function getTableByPoints() {
    getElTorneoTable()
    return;
    if (season == '25/26') {
      getElTorneoTable()
      return;
    }
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`${SERVER_BASE_URL}/api/v1/table/points?page=${page}&league=${league}&season=${season}`, requestOptions)
      .then(response => {
        if (response.status == 200)
          return response.json()

        setTableLoading(false)
        return null
      })
      .then(data => {
        setTableLoading(false)
        setTable(data)
      });
  }

  function getBeatBetTableByBalance() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`${SERVER_BASE_URL}/api/v3/beat_bet_table?page=${page}&league=${league}&season=${season}`, requestOptions)
      .then(response => {
        if (response.status == 200)
          return response.json()

        setTableLoading(false)
        return null
      })
      .then(data => {
        setTableLoading(false)
        setTable(data.table)
        setNumUsers(data.numUsers)
      });
  }

  function getFireballTableByPoints() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`${SERVER_BASE_URL}/api/v3/fireball_table?page=${page}&league=${league}&season=${season}`, requestOptions)
      .then(response => {
        if (response.status == 200)
          return response.json()

        setTableLoading(false)
        return null
      })
      .then(data => {
        setTableLoading(false)
        setTable(data.table)
        setNumUsers(data.numUsers)
      });
  }

  function getCareerTableByPoints() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`${SERVER_BASE_URL}/api/v2/career_table?page=${page}&league=${league}&season=${season}`, requestOptions)
      .then(response => {
        if (response.status == 200)
          return response.json()

        setTableLoading(false)
        return null
      })
      .then(data => {
        setTableLoading(false)
        setTable(data.table)
        setNumUsers(data.numUsers)
      });
  }

  function getEFootballTableByPoints() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`${SERVER_BASE_URL}/api/v2/efootball_table?page=${page}&league=${league}&season=${season}`, requestOptions)
      .then(response => {
        if (response.status == 200)
          return response.json()

        setTableLoading(false)
        return null
      })
      .then(data => {
        setTableLoading(false)
        setTable(data.table)
        setNumUsers(data.numUsers)
      });
  }

  function getWorldCupTableByPoints() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`${SERVER_BASE_URL}/api/v2/world_cup_table?page=${page}&league=${league}&season=${season}`, requestOptions)
      .then(response => {
        if (response.status == 200)
          return response.json()

        setTableLoading(false)
        return null
      })
      .then(data => {
        setTableLoading(false)
        setTable(data.table)
        setNumUsers(data.numUsers)
      });
  }

  function onUnlock() {
    adsManager.showAd()

    const successUnsub = adsManager.addSuccessListener(() => {
      successUnsub()
      adsManager.setIsLoaded(false)
      setBlockForAd(false)
      AsyncStorage.setItem("lastAdTime", (new Date()).getTime().toString())
      dataManager.getSettings().blockForAd = false
    })

    const closeUnsub = adsManager.addCloseListener(() => {
      closeUnsub()
      adsManager.setIsLoaded(false)
      adsManager.loadAd()

      setAdLoaded(false)
      const unsub = adsManager.addLoadedListener(() => {
        unsub()
        setAdLoaded(true)
      })
    })
  }

  const onRefresh = () => {
    setRefreshing(false);
    if (blockForAd) return;
    if (gameState == EGAME_ELTORNEO) {
      getTableByPoints();
    } else if (gameState == EGAME_BEATBET) {
      getBeatBetTableByBalance();
    } else if (gameState == EGAME_FIREBALL) {
      getFireballTableByPoints();
    } else if (gameState == EGAME_CAREER) {
      getCareerTableByPoints();
    } else if (gameState == EGAME_EFOOTBALL) {
      getEFootballTableByPoints();
    } else if (gameState == EGAME_WORLD_CUP) {
      getWorldCupTableByPoints();
    }
    setTableLoading(true);
  };

  function setSeason(s) {
    let league = ENEW_LEAGUE_LEGEND;
    if (s == '26/27' && me) {
      const game = dataManager.getSettings().game;
      if (game == EGAME_ELTORNEO)
        league = me.elTorneoLeague > 0 ? me.elTorneoLeague : ENEW_LEAGUE_BEGINNER
      else if (game == EGAME_EFOOTBALL)
        league = me.eFootballLeague > 0 ? me.eFootballLeague : ENEW_LEAGUE_BEGINNER
    }
    navigation.push('Tables', {
      page: 1,
      routeGame: routeGame,
      league: league,
      season: s,
      key: `1_${league}_${s}`
    });
  }

  function onShowGamepadMenu() {
    setShowGamepadMenu(true)
  }

  function onChangeGame(game) {
    let league = ENEW_LEAGUE_BEGINNER;

    if (me) {
      if (game == EGAME_ELTORNEO && me.elTorneoLeague > 0) league = me.elTorneoLeague;
      if (game == EGAME_EFOOTBALL && me.eFootballLeague > 0) league = me.eFootballLeague;
    }
    navigation.dispatch(state => {
      const routes = state.routes.filter(r => r.name !== 'Tables');

      return CommonActions.reset({
        ...state,
        routes: [
          ...routes,
          {
            name: 'Tables',
            params: { page: 1, routeGame: game, league: league, season: '26/27' },
            key: `${1}_1_26_27`
          },
        ],
        index: routes.length, // point to the new Tables screen
      });
    });
  }

  useFocusEffect(useCallback(() => {
    if (gameState != dataManager.getSettings().game) {
      onChangeGame(dataManager.getSettings().game)
    }
  }, [gameState]))

  function onPrev() {
    let newPage = page - 1;
    let newLeague = league;
    // if (gameState != EGAME_BEATBET && gameState != EGAME_FIREBALL && gameState != EGAME_WORLD_CUP) {
    //   if (league < 4) {
    //     newPage = 1;
    //     newLeague = league - 1;
    //   }
    // }

    navigation.push('Tables', {
      page: newPage,
      routeGame: dataManager.getSettings().game,
      league: newLeague,
      season,
    });
  }

  function onNext() {
    let newPage = page + 1;
    let newLeague = league;
    // if (gameState != EGAME_BEATBET && gameState != EGAME_FIREBALL && gameState != EGAME_WORLD_CUP) {
    //   if (league < 4) {
    //     newPage = 1;
    //     newLeague = league + 1;
    //   }
    // }

    navigation.push('Tables', {
      page: newPage,
      routeGame: dataManager.getSettings().game,
      league: newLeague,
      season,
    });
  }

  const showPrev = page != 1
  const showNext = table?.length >= 20

  function getTitle() {
    if (gameState == EGAME_ELTORNEO)
      return 'el Torneo'
    if (gameState == EGAME_BEATBET)
      return 'Beat Bet'
    if (gameState == EGAME_FIREBALL)
      return 'Fireball'
    if (gameState == EGAME_CAREER)
      return 'Fantasy'
    if (gameState == EGAME_EFOOTBALL)
      return 'eFootball'
    if (gameState == EGAME_WORLD_CUP)
      return 'World Cup'
  }

  function onNavFirstPage() {
    if (page == 1) return
    let newLeague = league;
    if (gameState == EGAME_FIREBALL || gameState == EGAME_BEATBET || gameState == EGAME_WORLD_CUP) {
      newLeague = 1;
    }
    navigation.push('Tables', {
      page: 1,
      league: newLeague,
      routeGame: gameState,
      season: season,
    });
  }

  function showUpButton() {
    if (gameState == EGAME_BEATBET || gameState == EGAME_FIREBALL || gameState == EGAME_WORLD_CUP) {
      if (1 == page) return false;
      return true;
    }
    // if (league != ENEW_LEAGUE_BEGINNER) return false;
    // let myPage = -1;
    // if (gameState == EGAME_ELTORNEO) {
    //   myPage = Math.ceil((me.elTorneoPosition) / 20);
    // } else if (gameState == EGAME_EFOOTBALL) {
    //   myPage = Math.ceil((me.eFootballPosition) / 20);
    // }

    if (1 == page) return false;

    return true;
  }

  const insets = useSafeAreaInsets();
  return (
    <View style={{
      flex: 1, backgroundColor: Colors.bgColor,
    }}>

      <View style={{ flex: 1, backgroundColor: Colors.gray800 }}>
        <StatusBar
          barStyle={Colors.statusBar}
          backgroundColor={backgroundStyle.backgroundColor}
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
              paddingBottom: 80
              // minHeight: '100%'
            }}
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

            <View style={{
              width: '100%',
              // paddingBottom: 10,
              backgroundColor: Colors.gray800
            }}>
              <AppBar navigation={navigation} title={getTitle()} showLogo={false} />
            </View>

            {gameState == EGAME_ELTORNEO ? <TablesElTorneoPagePanel
              navigation={navigation}
              me={me}
              table={table}
              tableLoading={tableLoading}
              page={page}
              season={season}
              setSeason={setSeason}
              league={league}
              showPrev={showPrev}
              showNext={showNext}
              onNext={onNext}
              onPrev={onPrev}
              blockForAd={blockForAd}
              onUnlock={onUnlock}
              adLoaded={adLoaded} />
              : null}
            {gameState == EGAME_BEATBET ? <TablesBeatBetPagePanel
              navigation={navigation}
              me={me}
              table={table}
              numUsers={numUsers}
              tableLoading={tableLoading}
              page={page}
              season={season}
              setSeason={setSeason}
              league={league}
              showPrev={showPrev}
              showNext={showNext}
              onNext={onNext}
              onPrev={onPrev}
              blockForAd={blockForAd}
              onUnlock={onUnlock}
              adLoaded={adLoaded} /> : null}
            {gameState == EGAME_FIREBALL ? <TablesFireballPagePanel
              navigation={navigation}
              me={me}
              table={table}
              numUsers={numUsers}
              tableLoading={tableLoading}
              page={page}
              season={season}
              setSeason={setSeason}
              league={league}
              showPrev={showPrev}
              showNext={showNext}
              onNext={onNext}
              onPrev={onPrev}
              blockForAd={blockForAd}
              onUnlock={onUnlock}
              adLoaded={adLoaded} /> : null}

            {gameState == EGAME_CAREER ? <TablesCareerPagePanel
              navigation={navigation}
              me={me}
              table={table}
              numUsers={numUsers}
              tableLoading={tableLoading}
              page={page}
              season={season}
              setSeason={setSeason}
              league={league}
              showPrev={showPrev}
              showNext={showNext}
              onNext={onNext}
              onPrev={onPrev}
              blockForAd={blockForAd}
              onUnlock={onUnlock}
              adLoaded={adLoaded} /> : null}

            {gameState == EGAME_EFOOTBALL ? <TablesEFootballPagePanel
              navigation={navigation}
              me={me}
              table={table}
              numUsers={numUsers}
              tableLoading={tableLoading}
              page={page}
              season={season}
              setSeason={setSeason}
              league={league}
              showPrev={showPrev}
              showNext={showNext}
              onNext={onNext}
              onPrev={onPrev}
              blockForAd={blockForAd}
              onUnlock={onUnlock}
              adLoaded={adLoaded} /> : null}

            {gameState == EGAME_WORLD_CUP ? <TablesWorldCupPagePanel
              navigation={navigation}
              me={me}
              table={table}
              numUsers={numUsers}
              tableLoading={tableLoading}
              page={page}
              season={season}
              setSeason={setSeason}
              league={league}
              showPrev={showPrev}
              showNext={showNext}
              onNext={onNext}
              onPrev={onPrev}
              blockForAd={blockForAd}
              onUnlock={onUnlock}
              adLoaded={adLoaded} /> : null}


          </ScrollView>
          {showUpButton() ? <TouchableOpacity onPress={onNavFirstPage} activeOpacity={.8} style={{
            width: 50,
            height: 50,
            bottom: 90 + insets.bottom,
            right: 80,
            position: 'absolute',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: Colors.borderColor,
            borderWidth: 2,
            backgroundColor: Colors.gray800
          }}>
            <Icon name='arrow-up' size={22} color={Colors.titleColor}></Icon>
          </TouchableOpacity> : null}
          <Gamepad onShowMenu={onShowGamepadMenu} />
          <BottomNavBar page={EPAGE_TABLES} navigation={navigation} />
          {showGamepadMenu ? <GamepadMenu onClose={() => setShowGamepadMenu(false)} onChangeGame={onChangeGame} /> : null}
          <View style={{
            width: '100%',
            backgroundColor: Colors.gray800,
            height: insets.bottom
          }}></View>
        </View>
      </View>
    </View>
  );
}

export default TablesPage;
