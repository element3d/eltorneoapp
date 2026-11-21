import React, { useEffect, useState, useRef, useMemo, useCallback, use } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import BottomNavBar, { EPAGE_PROFILE } from './BottomNavBar';
import SERVER_BASE_URL from './AppConfig';
import authManager from './AuthManager';
import AppBar from './AppBar';
import dataManager from './DataManager';
import LeagueChip from './LeagueChip';
import UserMatchesList from './UserMatchesList';
import strings from './Strings';
import adsManager from './AdsManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './Colors';
import MatchPreviewDialog from './MatchPreviewDialog';
import NativeAdComp from './NativeAdComp';
import ProfileStats from './ProfileStat';
import ProfileHeader, { ECAREER_TAB_MATCHES, ECAREER_TAB_SQUAD } from './ProfileHeader';
import Gamepad from './Gamepad';
import GamepadMenu, { EGAME_BEATBET, EGAME_CAREER, EGAME_EFOOTBALL, EGAME_ELTORNEO, EGAME_FIREBALL, EGAME_WORLD_CUP } from './GamepadMenu';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import CareerLineupsPanel, { ECAREER_MODE_SUBS, ECAREER_MODE_VIEW } from './CareerLineupsPanel';
import CareerLineupsSaveButton from './CareerLineupsSaveButton';
import FairPlayDialog from './FairPlayDialogs';
import PlayerDialog from './PlayerDialog';
import formationManager from './FormationManager';

export const ESTAT_TOTAL = 0

function ProfilePage({ route }): JSX.Element {
  const navigation = useNavigation();

  const { id, routeGame } = route.params;
  const { globalPage } = route.params;

  const { routeSelectedLeague } = route.params;

  let isMe = !id;
  const [page, setPage] = useState((globalPage - 1) * 5 + 1)
  const [predictsJson, setPredictsJson] = useState(null)

  const [predicts, setPredicts] = useState([])
  const [betsJson, setBetsJson] = useState(null)
  const [fireballPredictsJson, setFireballPredictsJson] = useState()
  const [careerPredictsJson, setCareerPredictsJson] = useState()
  const [eFootballPredictsJson, setEFootballPredictsJson] = useState()

  const [bets, setBets] = useState([])
  const [fireballPredicts, setFireballPredicts] = useState([])
  const [careerPredicts, setCareerPredicts] = useState([])
  const [eFootballPredicts, setEFootballPredicts] = useState([])

  const [selectedLeague, setSelectedLeague] = useState(null)
  const [stats, setStats] = useState(null)
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(true);

  const [hasNext, setHasNext] = useState(false)
  const [showGamepadMenu, setShowGamepadMenu] = useState(false)
  if (authManager.getMeSync()?.id == authManager.getActiveUser()?.id) isMe = true;
  const user = isMe ? authManager.getMeSync() : authManager.getActiveUser()
  const place = 0
  const [blockForAd, setBlockForAd] = useState(place <= 3 && place >= 1 && dataManager.getSettings()?.blockForAd && !isMe)
  const [adLoaded, setAdLoaded] = useState(false)
  const [showMatchPreview, setShowMatchPreview] = useState(false)
  const [previewMatch, setPreviewMatch] = useState(null)

  const [isLineupsSaveEnabled, setIsLineupsSaveEnabled] = useState(false);
  const [players, setPlayers] = useState([]);
  const [formation, setFormation] = useState();
  const [career, setCareer] = useState();
  const [isShowPlayerDialog, setIsShowPlayerDialog] = useState(false);
  const [playerDialogPlayer, setPlayerDialogPlayer] = useState();
  const [careerMode, setCareerMode] = useState(ECAREER_MODE_VIEW);
  const [careerSubOutPlayer, setCareerSubOutPlayer] = useState();
  const [careerTab, setCareerTab] = useState(ECAREER_TAB_SQUAD);
  const [refreshing, setRefreshing] = useState(false)

  // const [game, setGame] = useState(dataManager.getSettings().game)
  const gameState = dataManager.getSettings().game;//routeGame;

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
    if (!dataManager.getSettings()) return
    if (!dataManager.getSettings().enableAds || !dataManager.getSettings().blockForAd) return

    if (adsManager.isLoaded()) {
      setAdLoaded(true)
    } else {
      setBlockForAd(false)
      adsManager.loadAd()
      const unsub = adsManager.addLoadedListener(() => {
        unsub()
        setAdLoaded(true)
      })
    }
  }, [])

  useEffect(() => {
    const g = dataManager.getSettings().game;
    if (g == EGAME_ELTORNEO)
      getPredicts();
    else if (g == EGAME_BEATBET)
      getBets();
    else if (g == EGAME_FIREBALL)
      getFireballPredicts();
    else if (g == EGAME_CAREER) {
      if (careerTab == ECAREER_TAB_SQUAD) {
        getCareer();
      }
      getCareerPredicts();
    }
    else if (g == EGAME_EFOOTBALL) {
      getEFootballPredicts();
    }
    else if (g == EGAME_WORLD_CUP) {
      getWorldCupPredicts();
    }
  }, [page]);


  // useEffect(() => {
  //   const g = dataManager.getSettings().game;
  //   if (g == EGAME_CAREER) {
  //     getCareer();
  //   }
  // }, [])

  // useEffect(() => {
  //   if (careerTab == ECAREER_TAB_SQUAD) return;
  //     getCareerPredicts();
  // }, [careerTab])

  useEffect(() => {
    if (careerMode == ECAREER_MODE_VIEW) {
      setCareerSubOutPlayer(null);
    }
  }, [careerMode])


  useEffect(() => {
    if (!players.length) return;
    // if (loading) return;
    if (!formation) return;
    // if (formation == formationManager.getFormation()) return;
    // formationManager.setFormation(formation)

    players.sort((a, b) => a.grid.localeCompare(b.grid));

    if (formation == '5-4-1') {
      formationManager.changeFormation541(players);
    } else if (formation == '5-3-2') {
      formationManager.changeFormation532(players);
    } else if (formation == '4-5-1') {
      formationManager.changeFormation451(players);
    } else if (formation == '4-4-2') {
      formationManager.changeFormation442(players);
    } else if (formation == '4-3-3') {
      formationManager.changeFormation433(players);
    } else if (formation == '4-2-3-1') {
      formationManager.changeFormation4231(players);
    } else if (formation == '3-5-2') {
      formationManager.changeFormation352(players);
    } else if (formation == '3-4-3') {
      formationManager.changeFormation343(players);
    }

    for (let i = 0; i < players.length; ++i) {
      const player = { ...players[i] };
      if (!player.start11) continue;

      // Other in defenders
      if (player.grid[0] == '2' && player.position != 'Defender') {
        for (let s = 0; s < players.length; s++) {
          const sub = { ...players[s] };
          if (sub.start11 && sub.grid[0] != '2' && sub.position == 'Defender') {

          }
          else if (sub.start11) continue;
          if (sub.position == "Defender") {
            const subGrid = sub.grid;
            players[i] = { ...sub };
            players[s] = { ...player };
            players[i].grid = player.grid;
            players[i].start11 = true;
            let subPos = '';
            if (!sub.start11) {
              if (player.position == 'Goalkeeper') subPos = 'sub-1gk';
              if (player.position == 'Midfielder') subPos = 'sub-3mf';
              if (player.position == 'Attacker') subPos = 'sub-4at';
              players[s].grid = subPos;
              players[s].start11 = false;
            } else {
              players[s].grid = subGrid;
              players[s].start11 = true;
            }
            break;
          }
        }
      }

      // Other in midfielders
      if (player.grid[0] == '3' && player.position != 'Midfielder') {
        let found = false;
        for (let s = 0; s < players.length; s++) {
          const sub = { ...players[s] };
          if (sub.start11 && sub.grid[0] != '3' && sub.position == 'Midfielder') {

          }
          else if (sub.start11) continue;

          if (sub.position == "Midfielder" || sub.grid == "sub-3mf") {
            const subGrid = sub.grid;
            players[i] = { ...sub };
            players[s] = { ...player };
            players[i].grid = player.grid;
            players[i].start11 = true;
            let subPos = '';
            if (!sub.start11) {
              if (player.position == 'Goalkeeper') subPos = 'sub-1gk';
              if (player.position == 'Defender') subPos = 'sub-2df';
              if (player.position == 'Attacker') subPos = 'sub-4at';
              players[s].grid = subPos;
              players[s].start11 = false;
            } else {
              players[s].grid = subGrid;
              players[s].start11 = true;
            }
            found = true;
            break;
          }
        }
      }

      // Other in attacker
      if (player.grid[0] == '4' && player.position != 'Attacker') {
        for (let s = 0; s < players.length; s++) {
          const sub = { ...players[s] };
          const subGrid = sub.grid;
          if (sub.start11 && sub.grid[0] != '4' && sub.position == 'Attacker') {

          }
          else if (sub.start11) continue;
          if (sub.position == "Attacker") {
            players[i] = { ...sub };
            players[s] = { ...player };
            players[i].grid = player.grid;
            players[i].start11 = true;
            let subPos = '';
            if (!sub.start11) {
              if (player.position == 'Goalkeeper') subPos = 'sub-1gk';
              if (player.position == 'Defender') subPos = 'sub-2df';
              if (player.position == 'Midfielder') subPos = 'sub-3mf';
              players[s].grid = subPos;
              players[s].start11 = false;
            } else {
              players[s].grid = subGrid;
              players[s].start11 = true;
            }
            break;
          }
        }
      }

    }

    players.sort((a, b) => a.grid.localeCompare(b.grid));
    setPlayers([...players])

  }, [formation]);

  function onCloseMatchPreview() {
    setShowMatchPreview(false)
  }

  function onClosePlayerDialog() {
    setIsShowPlayerDialog(false);
  }

  function onSellPlayer(p) {
    setIsShowPlayerDialog(false);
    for (let i = 0; i < players.length; ++i) {
      if (players[i].apiId == p.apiId) {
        if (!dataManager.getPlayerToSell())
          dataManager.setPlayerToSell({ ...p });
        players[i].apiId = -1 * Date.now();
        // dataManager.setCareerPlayers(players);

        setPlayers([...players]);
        return;
      }
    }
  }

  function onSubstituePlayer(p) {
    setCareerMode(ECAREER_MODE_SUBS);
    setCareerSubOutPlayer(p);
    setIsShowPlayerDialog(false);
  }

  function onShowGamepadMenu() {
    setShowGamepadMenu(true)
  }

  function onShowMatchPreview(match) {
    match.isTeaser = false
    setShowMatchPreview(true)
    setPreviewMatch(match)
  }

  function onShowMatchTrailer(match) {
    match.isTeaser = true
    setShowMatchPreview(true)
    setPreviewMatch(match)
  }

  function onShowPlayerDialog(player) {
    setIsShowPlayerDialog(true);
    setPlayerDialogPlayer(player);
  }

  useFocusEffect(useCallback(() => {
    if (!isMe) return;
    if (formation == formationManager.getFormation()) return;

    setFormation(formationManager.getFormation());
    formationManager.setFormation(null);

    setCareerMode(ECAREER_MODE_SUBS);
    setCareerSubOutPlayer(null);
  }, []))

  useFocusEffect(useCallback(() => {
    if (gameState != dataManager.getSettings().game) {
      onChangeGame(dataManager.getSettings().game)
    }
  }, [gameState]))

  function onChangeGame(game) {
    navigation.dispatch(state => {
      const routes = state.routes.filter(r => r.name !== 'Profile');

      return CommonActions.reset({
        ...state,
        routes: [
          ...routes,
          {
            name: 'Profile',
            params: {
              id: isMe ? null : user.id,
              globalPage: 1,
              routeSelectedLeague: -1,
              selectedStat: ESTAT_TOTAL,
            },
            key: `profile_${user.id}_${game}`
          },
        ],
        index: routes.length, // point to the new Tables screen
      });
    });
  }

  function getBets() {
    if (!user) return

    setLoading(true)
    fetch(`${SERVER_BASE_URL}/api/v1/user/bets?page=${page}&user_id=${user.id}&league_id=${routeSelectedLeague ? routeSelectedLeague : -1}`, {
      method: 'GET',
      headers: {
        // 'Authentication': authManager.getToken()
      },
    })
      .then(response => response.json())
      .then(data => {

        if (data.bets.length <= 0) {
          setBetsJson(data)

          setLoading(false)
          // setHasMore(false)
          // setHasNext(false)

          return
        } else if (data.bets.length < 20) {
          // setHasMore(false)
          // setHasNext(false)
          setLoading(false)
        }

        // setLoading(false)
        setBets((prevBets) => [...prevBets, ...data.bets])
        setBetsJson(data)
        if (page % 5 == 0 && data.bets.length >= 20) {
          // setHasNext(true)
          setLoading(false)
        }
      })
      .catch(error => {
        setLoading(false)
        // setHasMore(false)
        // setHasNext(false)
        console.error('Error fetching leagues:', error)
      });
  }

  function getPredicts() {
    if (!user) return

    setLoading(true)
    fetch(`${SERVER_BASE_URL}/api/v1/user/predicts?page=${page}&user_id=${user.id}&league_id=${routeSelectedLeague ? routeSelectedLeague : -1}`, {
      method: 'GET',
      headers: {
        // 'Authentication': authManager.getToken()
      },
    })
      .then(response => response.json())
      .then(data => {

        if (data.predicts.length <= 0) {
          setPredictsJson(data)

          setLoading(false)
          // setHasMore(false)
          // setHasNext(false)

          return
        } else if (data.predicts.length < 20) {
          // setHasMore(false)
          // setHasNext(false)
          setLoading(false)
        }

        // setLoading(false)
        setPredicts((prevPredicts) => [...prevPredicts, ...data.predicts])
        setPredictsJson(data)
        if (page % 5 == 0 && data.predicts.length >= 20) {
          // setHasNext(true)
          setLoading(false)
        }
      })
      .catch(error => {
        setLoading(false)
        // setHasMore(false)
        // setHasNext(false)
        console.error('Error fetching leagues:', error)
      });
  }

  function getWorldCupPredicts() {
    if (!user) return

    setLoading(true)
    fetch(`${SERVER_BASE_URL}/api/v1/user/world_cup?page=${page}&user_id=${user.id}&league_id=${routeSelectedLeague ? routeSelectedLeague : -1}`, {
      method: 'GET',
      headers: {
        // 'Authentication': authManager.getToken()
      },
    })
      .then(response => response.json())
      .then(data => {

        if (data.predicts.length <= 0) {
          setPredictsJson(data)

          setLoading(false)
          // setHasMore(false)
          // setHasNext(false)

          return
        } else if (data.predicts.length < 20) {
          // setHasMore(false)
          // setHasNext(false)
          setLoading(false)
        }

        // setLoading(false)
        setPredicts((prevPredicts) => [...prevPredicts, ...data.predicts])
        setPredictsJson(data)
        if (page % 5 == 0 && data.predicts.length >= 20) {
          // setHasNext(true)
          setLoading(false)
        }
      })
      .catch(error => {
        setLoading(false)
        // setHasMore(false)
        // setHasNext(false)
        console.error('Error fetching leagues:', error)
      });
  }

  function getFireballPredicts() {
    if (!user) return

    setLoading(true)
    fetch(`${SERVER_BASE_URL}/api/v1/user/fireball?page=${page}&user_id=${user.id}&league_id=${routeSelectedLeague ? routeSelectedLeague : -1}`, {
      method: 'GET',
      headers: {
        // 'Authentication': authManager.getToken()
      },
    })
      .then(response => response.json())
      .then(data => {

        if (data.predicts.length <= 0) {
          setFireballPredictsJson(data)

          setLoading(false)
          // setHasMore(false)
          // setHasNext(false)

          return
        } else if (data.predicts.length < 20) {
          // setHasMore(false)
          // setHasNext(false)
          setLoading(false)
        }

        // setLoading(false)
        setFireballPredicts((prevBets) => [...prevBets, ...data.predicts])
        setFireballPredictsJson(data)
        if (page % 5 == 0 && data.predicts.length >= 20) {
          // setHasNext(true)
          setLoading(false)
        }
      })
      .catch(error => {
        setLoading(false)
        // setHasMore(false)
        // setHasNext(false)
        console.error('Error fetching leagues:', error)
      });
  }

  function getEFootballPredicts() {
    if (!user) return

    setLoading(true)
    fetch(`${SERVER_BASE_URL}/api/v1/user/efootball?page=${page}&user_id=${user.id}&league_id=${routeSelectedLeague ? routeSelectedLeague : -1}`, {
      method: 'GET',
      headers: {
        // 'Authentication': authManager.getToken()
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.predicts.length <= 0) {
          setEFootballPredictsJson(data)
          setLoading(false)
          return
        } else if (data.predicts.length < 20) {
          setLoading(false)
        }

        setEFootballPredicts((prevBets) => [...prevBets, ...data.predicts])
        setEFootballPredictsJson(data)
        if (page % 5 == 0 && data.predicts.length >= 20) {
          setLoading(false)
        }
      })
      .catch(error => {
        setLoading(false)
        console.error('Error fetching eFootball predicts:', error)
      });
  }

  function getCareerPredicts(clear = false) {
    if (!user) return

    setLoading(true)
    fetch(`${SERVER_BASE_URL}/api/v1/user/career?page=${page}&user_id=${user.id}&league_id=${routeSelectedLeague ? routeSelectedLeague : -1}`, {
      method: 'GET',
      headers: {
        // 'Authentication': authManager.getToken()
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.predicts.length <= 0) {
          setCareerPredictsJson(data)

          setLoading(false)
          // setHasMore(false)
          // setHasNext(false)

          return
        } else if (data.predicts.length <= 20) {
          // setHasMore(false)
          // setHasNext(false)
          setLoading(false)
        }

        // setLoading(false)
        if (clear) setCareerPredicts(data.predicts)
        else setCareerPredicts((prevBets) => [...prevBets, ...data.predicts])

        setCareerPredictsJson(data)
        if (page % 5 == 0 && data.predicts.length >= 20) {
          // setHasNext(true)
          setLoading(false)
        }
      })
      .catch(error => {
        setLoading(false)
        // setHasMore(false)
        // setHasNext(false)
        console.error('Error fetching leagues:', error)
      });
  }

  function getCareer() {
    if (!user) return

    setLoadingPlayers(true)
    fetch(`${SERVER_BASE_URL}/api/v1/career/players?user_id=${user.id}`, {
      method: 'GET',
      headers: {
        'Authentication': authManager.getToken() ?? ""
      },
    })
      .then(response => {
        if (response.status != 200) {
          setTimeout(() => {
            setLoadingPlayers(false);
          }, 200)
          return;
        }
        return response.json()
      })
      .then(data => {
        if (!data) {
          return;
        }
        if (data.players.length > 0) {
          setPlayers(data.players)
          setCareer(data)
          setFormation(data.formation);
          if (isMe) {
            dataManager.setHasCareer(true);
            const now = Date.now();
            const diffMs = data.nextTransferTs - now;

            if (diffMs <= 0 || data.numTransfers <= 0) {
              dataManager.setAllowTransfer(true);
            } else {
              dataManager.setAllowTransfer(false);
            }
          }
          // formationManager.setFormation(data.formation);
          // dataManager.setCareerPlayers(data.players)
        }

        setLoadingPlayers(false)
        // setLoading(false)
        // if (data.predicts.length <= 0) {
        //   setFireballPredictsJson(data)

        //   setLoading(false)
        //   // setHasMore(false)
        //   // setHasNext(false)

        //   return
        // } else if (data.predicts.length < 20) {
        //   // setHasMore(false)
        //   // setHasNext(false)
        //   setLoading(false)
        // }

        // // setLoading(false)
        // setFireballPredicts((prevBets) => [...prevBets, ...data.predicts])
        // setFireballPredictsJson(data)
        // if (page % 5 == 0 && data.predicts.length >= 20) {
        //   // setHasNext(true)
        //   setLoading(false)
        // }
      })
      .catch(error => {
        // setLoading(false)
        // setHasMore(false)
        // setHasNext(false)
        setLoadingPlayers(false);
        console.error('Error fetching leagues:', error)
      });
  }

  function onSetCareerTab(tab) {
    setCareerTab(tab);
    if (!players.length) return;

    // setLoading(true)
    setLoadingPlayers(true);
    setTimeout(() => {
      setLoadingPlayers(false);
      // setLoading(false)
    }, 200)
  }

  const renderTopPart = useMemo(() => (
    <ProfileHeader navigation={navigation}
      user={user}
      isMe={isMe}
      tab={careerTab}
      onSetCareerTab={onSetCareerTab}
      betsJson={betsJson}
      fireballPredictsJson={fireballPredictsJson}
      predictsJson={predictsJson}
      eFootballPredictsJson={eFootballPredictsJson}
    />

  ), [navigation, user, isMe, predictsJson, betsJson, fireballPredictsJson, eFootballPredictsJson, careerTab]);

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

  function showList() {
    const game = dataManager.getSettings().game;
    if (game == EGAME_BEATBET) {
      if (bets.length && betsJson) return true
    }
    if (game == EGAME_ELTORNEO || game == EGAME_WORLD_CUP) {
      if (predicts.length && predictsJson) return true;
    }
    if (game == EGAME_FIREBALL) {
      if (fireballPredicts.length && fireballPredictsJson) return true;
    }
    if (game == EGAME_CAREER && careerTab == ECAREER_TAB_MATCHES && careerPredictsJson && careerPredicts.length) {
      return true;
    }
    if (game == EGAME_EFOOTBALL) {
      if (eFootballPredicts.length && eFootballPredictsJson) return true;
    }

    return false;
  }

  function getListPredicts() {
    if (gameState == EGAME_ELTORNEO || gameState == EGAME_WORLD_CUP) return predicts;
    if (gameState == EGAME_BEATBET) return bets;
    if (gameState == EGAME_FIREBALL) return fireballPredicts;
    if (gameState == EGAME_CAREER) return careerPredicts;
    if (gameState == EGAME_EFOOTBALL) return eFootballPredicts;
  }

  function getListTotalPredicts() {
    if (gameState == EGAME_ELTORNEO || gameState == EGAME_WORLD_CUP) return predictsJson.allPredicts;
    if (gameState == EGAME_BEATBET) return betsJson.allBets;
    if (gameState == EGAME_FIREBALL) return fireballPredictsJson.allPredicts;
    if (gameState == EGAME_CAREER) return careerPredictsJson.allPredicts;
    if (gameState == EGAME_EFOOTBALL) return eFootballPredictsJson.allPredicts;
  }

  function onSaveCareerLineups() {
    let hasTransfer = !dataManager.getAllowTransfer() ? 1 : 0;
    let didTransfer = 0;
    if (dataManager.getPlayerToBuy() && dataManager.getPlayerToSell()) {
      if (dataManager.getPlayerToBuy().apiId == dataManager.getPlayerToSell().apiId) {
      } else {
        hasTransfer = 1;
        didTransfer = 1;
      }
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': authManager.getToken()
      },
      body: JSON.stringify({
        formation: formation,
        hasTransfer: hasTransfer,
        players: players
      })
    };

    fetch(`${SERVER_BASE_URL}/api/v1/career/save`, requestOptions)
      .then(response => {
        if (response.status == 201) {
          dataManager.pendingFantasy = null;
          onRefresh();
          // dataManager.setAllowTransfer(!didTransfer);
        }
      })
      .catch((e) => {
        console.log(e)
      });

  }

  const onRefresh = () => {
    if (!isMe) return;
    setRefreshing(false);
    if (dataManager.getSettings().game == EGAME_CAREER) {
      if (careerTab == ECAREER_TAB_SQUAD) {
        getCareer();
      }
      getCareerPredicts(true);
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.gray800 }}>

      <StatusBar
        barStyle={Colors.statusBar}
        backgroundColor={Colors.gray800}
      />

      <View style={{
        flex: 1,
        height: '100%',
        alignItems: 'center',
        // justifyContent: 'space-between',
        minHeight: '100%',
        backgroundColor: Colors.bgColor
      }}>
        <View style={{
          width: '100%',
          backgroundColor: Colors.gray800,
          height: insets.top
        }}></View>

        {gameState == EGAME_CAREER && careerTab == ECAREER_TAB_SQUAD ? <View style={{
          width: '100%',
          flex: 1,
        }}>
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
            <ProfileHeader navigation={navigation}
              user={user}
              isMe={isMe}
              tab={careerTab}
              onSetCareerTab={onSetCareerTab}
              betsJson={betsJson}
              fireballPredictsJson={fireballPredictsJson}
              predictsJson={predictsJson}
              eFootballPredictsJson={eFootballPredictsJson}
            />
            {!loadingPlayers ?
              <CareerLineupsPanel
                navigation={navigation}
                isMe={isMe}
                user={user}
                formation={formation}
                setFormation={setFormation}
                onShowPlayerDialog={onShowPlayerDialog}
                career={career}
                players={players}
                setPlayers={setPlayers}
                careerMode={careerMode}
                setCareerMode={setCareerMode}
                careerSubOutPlayer={careerSubOutPlayer}
                setIsLineupsSaveEnabled={setIsLineupsSaveEnabled} /> :
              <ActivityIndicator color={Colors.primary} size="large" />
            }
          </ScrollView>
        </View> : null}

        {!showList() && gameState != EGAME_CAREER ?
          <View style={{
            width: '100%',
            flex: 1,
          }}>
            <ProfileHeader navigation={navigation}
              user={user}
              isMe={isMe}
              tab={careerTab}
              onSetCareerTab={onSetCareerTab}
              betsJson={betsJson}
              fireballPredictsJson={fireballPredictsJson}
              predictsJson={predictsJson}
              eFootballPredictsJson={eFootballPredictsJson}
            />
            {!blockForAd ? <View style={{
              flex: 1,
              height: 200,
              // backgroundColor: 'red',
              paddingTop: 0
            }}>
              {loading ? <ActivityIndicator color={Colors.primary} size="large" /> : <Text style={{
                color: '#8E8E93',
                fontSize: 14,
                fontFamily: 'Roboto-Bold',
                alignSelf: 'center'
              }}>{gameState == EGAME_BEATBET ? strings.no_bets : strings.no_predicts}</Text>}
            </View> : <View style={{
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red'
            }}>
              <TouchableOpacity onPress={onUnlock} activeOpacity={.8} style={{
                paddingLeft: 20,
                paddingRight: 20,
                height: 24,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                backgroundColor: '#FF2882'
              }} >
                <Text style={{
                  color: 'white',
                  fontFamily: 'Roboto-Bold',
                  fontSize: 12,
                }}>{strings.see_predictions}</Text>
                {adLoaded ? <Icon name='play-circle-filled' size={18} color='white' style={{
                  marginLeft: 4
                }} /> : <ActivityIndicator size={'small'} color={'white'} style={{
                  marginLeft: 6
                }} />}
              </TouchableOpacity>
            </View>}
          </View> : null}
        {showList() ? <UserMatchesList navigation={navigation} loading={loading} globalPage={globalPage} hasNext={hasNext} hasMore={hasMore} page={page} setPage={setPage} renderTopPart={renderTopPart} user={user} id={id} predicts={getListPredicts()} totalPredicts={getListTotalPredicts()} selectedLeague={selectedLeague} onShowMatchPreview={onShowMatchPreview} onShowMatchTrailer={onShowMatchTrailer} />
          : null}
        {gameState == EGAME_CAREER && careerTab == ECAREER_TAB_MATCHES && !careerPredicts.length ? <View style={{
          width: '100%',
          flex: 1
        }}>
          <ProfileHeader navigation={navigation}
            user={user}
            isMe={isMe}
            tab={careerTab}
            onSetCareerTab={onSetCareerTab}
          />
          <View style={{
            flex: 1,
            width: '100%',
          }}>
            {loading || loadingPlayers ? <ActivityIndicator color={Colors.primary} size="large" /> : <Text style={{
              color: '#8E8E93',
              fontSize: 14,
              fontFamily: 'Roboto-Bold',
              alignSelf: 'center'
            }}>{strings.no_matches_found}</Text>}
          </View>
        </View> : null}


        {gameState == EGAME_CAREER && careerTab == ECAREER_TAB_SQUAD && isMe ? <CareerLineupsSaveButton enabled={isLineupsSaveEnabled} onSave={onSaveCareerLineups} /> : null}
        <Gamepad onShowMenu={onShowGamepadMenu} />
        <BottomNavBar page={isMe ? EPAGE_PROFILE : null} navigation={navigation} />
        {showGamepadMenu ? <GamepadMenu onClose={() => setShowGamepadMenu(false)} onChangeGame={onChangeGame} /> : null}
        <View style={{
          width: '100%',
          backgroundColor: Colors.gray800,
          height: insets.bottom
        }}></View>
      </View>
      {showMatchPreview ? <MatchPreviewDialog onClose={onCloseMatchPreview} match={previewMatch} /> : null}
      {isShowPlayerDialog ? <PlayerDialog player={playerDialogPlayer} onClose={onClosePlayerDialog} onSell={onSellPlayer} onSubstitue={onSubstituePlayer} /> : null}

    </View>
  );
}

export default ProfilePage;
