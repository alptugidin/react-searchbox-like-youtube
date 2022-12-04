import React from 'react';

export interface ISvg {
    size?: string
}

export interface ISearchResult {
    id: number
    title: string
}
export interface ISearchBoxProps {
    results: ISearchResult[] | undefined
    onChange: (onChangeData: string) => void
    onClick: (onClickData: ISearchResult) => void
    onSearch: (onSearchData: string | ISearchResult) => void
    nightMode?: boolean
    sx?: {
        lightBg?: string
        darkBg?: string
    }
}

export interface ISearchBoxContext extends Pick<ISearchBoxProps,
    'results' | 'onChange' | 'onClick' | 'sx' | 'nightMode' | 'onSearch'
    > {
    refs: {
        main: React.RefObject<HTMLDivElement>
        input: React.RefObject<HTMLInputElement>
        result: React.RefObject<HTMLDivElement>
        respBg: React.RefObject<HTMLDivElement>
        inputSearchIcon: React.RefObject<HTMLDivElement>
        clearButton: React.RefObject<HTMLButtonElement>
        dummyInput: React.RefObject<HTMLDivElement>
        respSbButton: React.RefObject<HTMLButtonElement>
    }
    setShowSB: React.Dispatch<React.SetStateAction<boolean>>
    showSB: boolean
    filteredResults: ISearchResult[]
    setFilteredResults: React.Dispatch<React.SetStateAction<ISearchResult[]>>
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    tempVal: string
    setTempVal: React.Dispatch<React.SetStateAction<string>>
    showLeftSearchSvg: boolean
    setShowLeftSearchSvg: React.Dispatch<React.SetStateAction<boolean>>
    showDummyInput: boolean
    setShowDummyInput: React.Dispatch<React.SetStateAction<boolean>>
    lightBg: string
    darkBg: string
    arr: ISearchResult[] | undefined
    setArr: React.Dispatch<React.SetStateAction<ISearchResult[] | undefined>>
    active: number
    setActive: React.Dispatch<React.SetStateAction<number>>
}

export interface ISearchBoxProvider {
    children: React.ReactNode
}
