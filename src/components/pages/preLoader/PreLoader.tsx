import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { CommonActions } from "@react-navigation/native"
import { getLeagues } from '../../../infra/api/leagues/leagues-services';
import Loader from '../../molecules/loader';
import { setLeaguesAction, setSelectedLeagueAction } from '../../../infra/redux/actions/leagues';
import { ROUTERS } from '../../../config/routes';
import { LeagueParams } from '../../../infra/api/leagues/interface';
import AsyncStorage from '@react-native-community/async-storage';
import { LeagueSerialized } from '../../../interface/League';
import { setSelectedSeasonAction } from '../../../infra/redux/actions/seasons';

const PreLoader = ({ 
    setStoreLeagues, 
    navigation,
    setSelectedLeagueStore,
    setSelectedSeasonsStore }) => {

    const dispatch = useDispatch()
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
                index: 0,
                routes: [{ name: ROUTERS.Home }]
            })
        )
    }
    const getDataLeague = async () => {
        let stateFromAsyncStorage: any = await AsyncStorage.getItem('state');
        stateFromAsyncStorage = JSON.parse(stateFromAsyncStorage)
        try {
            if(stateFromAsyncStorage && stateFromAsyncStorage?.leagues?.leagues?.length){
                if(stateFromAsyncStorage.leagues) setStoreLeagues(stateFromAsyncStorage.leagues.leagues);
                if(stateFromAsyncStorage.leagues.leagueSelected) setSelectedLeagueStore(stateFromAsyncStorage.leagues.leagueSelected);
                if(stateFromAsyncStorage.seasons?.seasonSelected) setSelectedSeasonsStore(stateFromAsyncStorage.seasons?.seasonSelected)
                // if(stateFromAsyncStorage.selectedSeasons) setStoreLeagues(stateFromAsyncStorage.selectedSeasons);

                
            }else{
                const list = await getLeagues(leagueParams);
                const { response } = list.data;
                setStoreLeagues(response);
            }
            

        } catch (e) {
            console.error('erro =>', e);
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
        setStoreLeagues: leagues => dispatch(setLeaguesAction(leagues)),
        setSelectedLeagueStore: league => dispatch(setSelectedLeagueAction(league)),
        setSelectedSeasonsStore: season => dispatch(setSelectedSeasonAction(season)),
    };
};

const mapStateToProps = state => {
    return {
        leagues: state.leagues,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreLoader);
