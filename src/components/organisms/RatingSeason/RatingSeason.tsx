import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { responsiveFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native"
import { getStandingsByLeagueSeason } from '../../../infra/api/standings/standings-services';
import { Standing } from '../../../interface/Standing';
import { Team } from '../../../interface/Team';
import { FontSize } from '../../../theme/theme';
import { ButtonTheme } from '../../atoms/Buttons';
import { ROUTERS } from '../../../config/routes';


const RatingSeason = ({
    jumpTo,
    position,
    route: {
        stadingsResponse,
        leagueId,
        season
    }
}) => {
    const navigation = useNavigation()
    const [standings, setStandings] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [currentStanding, setCurrentStanding] = useState<Standing>(null);
    // Head Table
    const [tableHead] = useState(['Rank', 'Team', 'Points', 'Goals diff', "Played", "Wins", "Draw", "Losses"])
    //Width columns table
    const widthArr = [50, 180, 70, 90, 60, 50, 50, 60]

    const handleNavToDetails = (team: Team) => {
        setCurrentStanding(null)
        setModalVisible(false)
        navigation.navigate(
            ROUTERS.TeamDetails.toString() as never,
            {
                dataTeam: team,
                leagueId,
                season
            } as never
        )

    }

    useEffect(() => {
        setIsLoading(true)
        if (stadingsResponse) {
            setStandings(stadingsResponse)
            setIsLoading(false)
        }
    }, [leagueId, stadingsResponse])


    const handleClickItem = (item, shwModal) => {
        setCurrentStanding(item)
        setModalVisible(shwModal)
    }

    const viewLogoTeam = (uri, nameTeam) => {
        return (
            <View style={styles.viewLogoTeam}>
                <Image
                    source={{ uri }}
                    style={{ width: 15, height: 15 }}
                    resizeMode={"contain"}
                />
                <Text style={styles.text}>{nameTeam}</Text>
            </View>
        )
    }

    const renderItem = (itemList) => {
        const styleOb = { ...styles.text, ...styles.row }
        return (
            <View>
                <View style={styles.boxGroupName}>
                    <Text style={styles.textGroupName}>{itemList?.item[0]?.group}</Text>
                </View>
                <ScrollView
                    horizontal={true}
                    style={{ paddingVertical: 10 }}
                >

                    <Table borderStyle={styles.borderTable}>
                        <Row
                            data={tableHead}
                            style={styles.head}
                            textStyle={[styles.text, styles.textHead]}
                            widthArr={widthArr}
                        />
                        {itemList.item?.map((item, index) => {
                            const obj = [
                                item.rank.toString(),
                                viewLogoTeam(item?.team?.logo, item?.team?.name),
                                item.points.toString(),
                                item.goalsDiff.toString(),
                                item.all?.played.toString(),
                                item.all?.win,
                                item.all?.draw,
                                item.all?.lose

                            ]

                            return (
                                <TouchableOpacity
                                    key={`${item.team.id}-${index}`}
                                    onPress={() => handleClickItem(item, true)}
                                >
                                    <Rows data={[obj]} textStyle={styleOb} widthArr={widthArr} />
                                </TouchableOpacity>
                            )
                        })}
                    </Table>
                </ScrollView>
            </View>)

    }
    return (
        <View style={styles.container}>
            {isLoading ?
                <View style={styles.flexCenter}>
                    <ActivityIndicator color={"rgba(87, 87, 87, 0.8)"} size={"large"} animating={true} style={{ marginBottom: 20 }} />
                    <Text>Loading Data...</Text>
                </View>
                : standings.length ?
                    <FlatList
                        horizontal={false}
                        data={standings[0]?.league?.standings}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    :
                    <View style={styles.flexCenter}>
                        <Icon
                            name="database" size={responsiveFontSize(4.8)}
                            color={"#888888"}
                        />
                        <Text style={{ fontSize: responsiveFontSize(2.8) }}>Data not founded</Text>
                    </View>}

            {modalVisible &&
                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            handleClickItem(null, false);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.contentTeam}>
                                    <Image
                                        source={{ uri: currentStanding?.team?.logo }}
                                        style={{ flex: 1, width: 100, height: 100 }}
                                        resizeMode={"contain"}
                                    />
                                    <View style={styles.infoTeam}>
                                        <Text style={styles.titleModal}>{currentStanding?.team?.name} - {currentStanding?.points}pts </Text>
                                        <Text style={styles.subTitleModal}>{currentStanding?.group} - {currentStanding?.points}pts </Text>
                                        <Text style={styles.textStrong}>Home</Text>
                                        <View style={styles.boxGray}>
                                            <Text style={styles.modalText}>Played: {currentStanding?.home?.played}</Text>
                                            <Text style={styles.modalText}>Wins: {currentStanding?.home?.win}</Text>
                                            <Text style={styles.modalText}>Draws: {currentStanding?.home?.draw}</Text>
                                            <Text style={styles.modalText}>Defeats: {currentStanding?.home?.lose}</Text>
                                        </View>
                                        <Text style={styles.textStrong}>Away Home</Text>
                                        <View style={styles.boxGray}>
                                            <Text style={styles.modalText}>Played: {currentStanding?.away?.played}</Text>
                                            <Text style={styles.modalText}>Wins: {currentStanding?.away?.win}</Text>
                                            <Text style={styles.modalText}>Draws: {currentStanding?.away?.draw}</Text>
                                            <Text style={styles.modalText}>Defeats: {currentStanding?.away?.lose}</Text>
                                        </View>
                                        <Text style={styles.textStrong}>All Played</Text>
                                        <View style={styles.boxGray}>
                                            <Text style={styles.modalText}>Played: {currentStanding?.all?.played}</Text>
                                            <Text style={styles.modalText}>Wins: {currentStanding?.all?.win}</Text>
                                            <Text style={styles.modalText}>Draws: {currentStanding?.all?.draw}</Text>
                                            <Text style={styles.modalText}>Defeats: {currentStanding?.all?.lose}</Text>
                                        </View>

                                    </View>
                                </View>
                                <View style={styles.boxButton}>


                                    <ButtonTheme
                                        size={"Medium"}
                                        text={"Close"}
                                        color={"BlackHighlight"}
                                        fontSize={"FontMedium"}
                                        onPress={() => handleClickItem(null, false)}
                                    />
                                    <ButtonTheme
                                        size={"Medium"}
                                        text={"Team Details"}
                                        color={"Green"}
                                        fontSize={"FontMedium"}
                                        onPress={() => handleNavToDetails(currentStanding?.team)}

                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>

                </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    head: { height: 40, width: "auto", backgroundColor: '#f1f8ff' },
    row: {},
    textHead: { fontWeight: 'bold' },
    text: { margin: 6, fontSize: 12, textAlign: 'center' },
    viewLogoTeam: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        alignContent: 'center',
        margin: 6
    },
    boxGroupName: {
        paddingTop: 10,
        borderBottomColor: "#000000",
        borderBottomWidth: 4
    },
    textGroupName: {
        paddingLeft: 10,
        fontSize: responsiveFontSize(1.8),
        fontWeight: '700',
        color: "#000000",
        borderBottomColor: "yellow",
        borderBottomWidth: 4
    },
    borderTable: {
        borderWidth: 2,
        borderColor: '#c8e1ff'
    },
    flexCenter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    contentTeam: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "flex-start",
    },
    infoTeam: {
        flex: 3,
        paddingLeft: 10,
        paddingBottom: 15
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: "rgba(0, 0, 0, 0.7)"
    },
    boxGray: {
        padding: 3,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f0f0ed",
        marginBottom: 6
    },
    textStrong: {
        fontWeight: '700'
    },
    boxButton: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    modalView: {
        margin: 20,
        width: responsiveScreenWidth(90),
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: responsiveFontSize(1.4),
        color: "#000000",
        textAlign: "left"
    },
    titleModal: {
        fontSize: responsiveFontSize(2.5),
        marginBottom: 0,
        textAlign: "left",
        color: "#000000"
    },
    subTitleModal: {
        fontSize: responsiveFontSize(1.3),
        marginBottom: 10,
        fontWeight: "500",
        textAlign: "left",
        color: "#8c8c66"
    }
});

export default RatingSeason
