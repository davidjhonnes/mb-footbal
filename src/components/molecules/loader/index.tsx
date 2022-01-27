import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import { getLeagues } from '../../../infra/leagues/leagues-services';


const PreLoader = (props: any) => {

    const [loading, setLoading] = useState(false)
    const [listLeagues, setListLeagues] = useState([])
    const [leagueParams,setLeagueParams] = useState<LeagueParams>({})

    const presetData = async () => {
        try{
           await getDataLeague()
        }catch(e){

        }
    }

    
    const getDataLeague = async () => {
        const list = await getLeagues(leagueParams)
        console.log("getData, ",list.data)
        const {response} = list.data
        setListLeagues(response)
    }
    

    useEffect(()=>{
        presetData()
    },[])


    return (
        <View style={styles.container}>
            <AnimatedLoader
                visible={true}
                overlayColor="#fff"
                source={require("./file-loading.json")}
                animationStyle={styles.lottie}
                speed={1}
            >
                <Text style={{ color: "#888888", fontSize: 16, marginTop: 10 }}>Carregando</Text>
            </AnimatedLoader>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(64, 83, 247)'
    },
    lottie: {
        width: 250,
        height: 250
    }
});

export default PreLoader