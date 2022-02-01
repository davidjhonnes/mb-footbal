import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import { PaperSelect } from 'react-native-paper-select';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';



const PickerMultiple = ({
    list,
    selectedItems,
    value,
    disabled,
    onSelectItems,
    textLabel,
    fieldLabel,
    keyValue,
}) => {

    // ...

    const [items, setItems] = useState({
        value: value != undefined ? value : "",
        list: list,
        selectedList: selectedItems,
        error: '',
    });

    useEffect(() => {


        const temp = list.map((item, index) => {
            item.value = item[keyValue]?.toString()
            item._id = index
            return item
        })
        setItems({
            value: value != undefined ? value : "",
            list: temp,
            selectedList: selectedItems,
            error: '',
        })
    }, [list, selectedItems, value])


    return (
        <View>
            <Text style={{fontWeight: '700', fontSize: responsiveFontSize(1.8), marginBottom: 8, color:"#000000"}}>{textLabel}</Text>
            <PaperSelect
                label={fieldLabel}
                value={items.value}
                onSelection={(valueSel: any) => {
                    setItems({
                        ...items,
                        value: valueSel.text,
                        selectedList: valueSel.selectedList,
                        error: '',
                    });
                    onSelectItems(valueSel.text, valueSel?.selectedList)
                }}
                arrayList={[...items.list]}
                selectedArrayList={items.selectedList}
                errorText={items.error}
                multiEnable={true}
                textInputMode="flat"
                checkboxColor="green"
                checkboxLabelStyle={{ color: '#000000', fontWeight: '700' }}
                searchStyle={{ iconColor: 'green' }}
            />
        </View>
    )

}

export default PickerMultiple