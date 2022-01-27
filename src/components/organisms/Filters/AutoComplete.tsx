import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from "react-native"
import R from "ramda";
import TextField from '../../atoms/Field/TextField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { DropdownFilter } from './styles';

type PropsAutoComplete = {
    label: string,
    placeholder: string,
    fontSizeLabel?: number,
    colorLabel?: string,
    inputColor?: string,
    fontSizeInput?: number,
    data: []
}

const AutoComplete = ({
    label,
    placeholder,
    fontSizeLabel,
    colorLabel,
    inputColor,
    fontSizeInput,
    data,
}: PropsAutoComplete) => {

    const [text, setText] = useState("")
    const [listDataFiltered, setListDataFiltered] = useState([])

    const handleText = (t: string) => {
        setText(t)
        FilterData(t)
    }

    const FilterData = (t: string) => {
        try {
            const cloneList = R.clone(data)
            const filtered = cloneList?.filter(v => v.league?.name?.includes(t))
            setListDataFiltered(filtered)
        } catch (e) {
            console.log("erro", e)
        }
    }

    useEffect(() => {

    }, [])

    return (
        <View>
            <TextField
                fontSizeLabel={fontSizeLabel}
                colorLabel={colorLabel}
                inputColor={inputColor}
                fontSizeInput={fontSizeInput}
                label={label}
                placeholder={placeholder}
                onChangeTextInput={handleText}
            />
            {text?.length && listDataFiltered.length ?
                <DropdownFilter>
                    <View>
                        {listDataFiltered?.map(item => {
                            return (
                                <TouchableOpacity
                                    style={{ padding: 5, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}
                                >
                                    <Image source={{ uri: item?.league?.logo }} style={{ width: 30, height: 30, borderRadius: 60, marginRight: 10, borderWidth: 1 }} />
                                    <Text>{item?.league?.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </DropdownFilter>
                : null}
        </View>
    )
}

export default AutoComplete