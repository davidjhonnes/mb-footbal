import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {CommonActions} from "@react-navigation/native"
import {getLeagues} from '../../infra/api/leagues/leagues-services';
import Loader from '../../components/molecules/loader';
import {setLeaguesAction} from '../../infra/redux/actions/leagues';
import { ROUTERS } from '../../config/routes';

const PreLoader = ({setLeagues, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [leagueParams, setLeagueParams] = useState<LeagueParams>({});

  const presetData = async () => {
    try {
      await getDataLeague();
      redirectToHome()
    } catch (e) {
        
    }
  };

  const redirectToHome = () => {
      navigation.dispatch(
        CommonActions.reset({
            index:0,
            routes:[{name:ROUTERS.Home}]
        })
      )
  }
  const getDataLeague = async () => {
    try {
      const list = await getLeagues(leagueParams);
      const {response} = list.data;
      setLeagues(response);
    
    } catch (e) {
      console.log('erro =>', e);
    }
  };

  useEffect(() => {
    presetData();
  }, []);

  return <Loader />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(64, 83, 247)',
  },
  lottie: {
    width: 250,
    height: 250,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    setLeagues: leagues => dispatch(setLeaguesAction(leagues)),
  };
};

const mapStateToProps = state => {
  return {
    leagues: state.leagues,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreLoader);
