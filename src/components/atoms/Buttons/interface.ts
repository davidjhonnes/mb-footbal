export interface ButtonImageType {
    item: any
    onPress: (data: any) => void,
    text: string,
    imageUri?: string
}

export interface ButtonThemeType {

    color?: string,
    textColor?: string,
    text?: string,
    size?: string,
    fontSize?: string,
    type?: string,
    onPress: () => void,
    disabled?: boolean
}


export interface TypeTextButton {
    color?:string,
    size?:string,
    disabled?:boolean

}

export interface TypeButton {
    color?:string,
    size?:string,
    type?:string,
    disabled?:boolean

}