import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from "react-native"
import R from "ramda";
import TextField from '../../atoms/Field/TextField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { DropdownFilter } from './styles';
import { ButtonItemWithImage } from '../../atoms/Buttons';
import { LeagueSerialized } from '../../../interface/League';

interface PropsAutoComplete  {
    value?:LeagueSerialized,
    label: string,
    placeholder: string,
    fontSizeLabel?: number,
    colorLabel?: string,
    inputColor?: string,
    fontSizeInput?: number,
    data: [],
    listenerFilter: (data: LeagueSerialized) => void
}

const AutoComplete = ({
    value,
    label,
    placeholder,
    fontSizeLabel,
    colorLabel,
    inputColor,
    fontSizeInput,
    data,
    listenerFilter
}: PropsAutoComplete) => {

    const [text, setText] = useState("")
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const [listDataFiltered, setListDataFiltered] = useState<Array<any>>([])
    const [leagueSelected, setLeagueSelected] = useState<LeagueSerialized>(null)

    const handleText = (t: string) => {
        setLeagueSelected(null)
        setText(t)
        FilterData(t)
    }

    const handlerSelectLeague = (league: LeagueSerialized) =>{
        setLeagueSelected(league)
        listenerFilter(league)
        setText(league?.league?.name)
    }
    const FilterData = (t: string) => {
        if (!t.length) {
            setListDataFiltered([])
            listenerFilter(null)
            return;
        }
        if(t.length < 3) return;
        setIsLoading(true)
        try {
            const cloneList = data
            const filtered = cloneList?.filter(v => {
                const vLower = v.league?.name?.toLowerCase()
                return vLower.includes(t.toLowerCase())
            })
            setListDataFiltered(filtered)
            setTimeout(()=>{
                setIsLoading(false)
            },300)
            
        } catch (e) {
            setIsLoading(false)
            console.error("erro", e)
        }

    }

    useEffect(() => {
        handlerSelectLeague(value)
    }, [value])
    return (
        <View style={{}}>
            <TextField
                isLoading={isLoading}
                fontSizeLabel={fontSizeLabel}
                colorLabel={colorLabel}
                inputColor={inputColor}
                fontSizeInput={fontSizeInput}
                label={label}
                placeholder={placeholder}
                onChangeTextInput={handleText}
                value={text}
                image={leagueSelected ? { uri:  leagueSelected?.league?.logo } : null}
            />
            {text?.length && listDataFiltered.length && !leagueSelected ?
                <DropdownFilter>
                        {listDataFiltered?.map((item, index) => {
                            return (
                                <ButtonItemWithImage 
                                    key={`select-league-${index}`}
                                    item={item}
                                    onPress={()=>handlerSelectLeague(item)}
                                    text={item?.league?.name}
                                    imageUri={item?.league?.logo}
                                />
                            )
                        })}
                    
                </DropdownFilter>
                : text?.length && !leagueSelected && !listDataFiltered.length ?
                    <DropdownFilter>
                        <View style={{flexDirection:"column",justifyContent:"center", alignItems:"center", alignSelf:'center', alignContent:"center", height:100}}>
                            <Text>Sorry! We can't found your league.</Text>
                        </View>
                    </DropdownFilter>
                    : null}
        </View >
    )
}

export default AutoComplete