import React from 'react';

export interface ISvg {
    size?: string
}

export interface ISearchResult {
    id: number
    title: string
}
export interface ISearchBoxProps {
    results: ISearchResult[]
    onChange: (onChangeData: string) => void
    onClick: (onClickData: ISearchResult) => void
    nightMode?: boolean
    sx?: {
        lightBg?: string
        darkBg?: string
    }
}

export interface ISearchBoxContext extends Pick<ISearchBoxProps,
    'results' | 'onChange' | 'onClick' | 'sx' | 'nightMode'
    > {
    isMobile: boolean
    mainRef: React.RefObject<HTMLDivElement>
    topRef: React.RefObject<HTMLDivElement>
    rightDivRef: React.RefObject<HTMLDivElement>
    middleDivRef: React.RefObject<HTMLDivElement>
    searchButtonRef: React.RefObject<HTMLButtonElement>
    backButtonRef: React.RefObject<HTMLButtonElement>
    inputRef: React.RefObject<HTMLInputElement>
    resultRef: React.RefObject<HTMLDivElement>
    boxRef: React.RefObject<HTMLDivElement>
    leftSvgRef: React.RefObject<HTMLDivElement>
    modalRef: React.RefObject<HTMLDivElement>
    setShowSB: React.Dispatch<React.SetStateAction<boolean>>
    showSB: boolean
    filteredResults: ISearchResult[]
    setFilteredResults: React.Dispatch<React.SetStateAction<ISearchResult[]>>
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    tempVal: string
    setTempVal: React.Dispatch<React.SetStateAction<string>>
    /** @branchType */
    inputSearchIconRef: React.RefObject<HTMLDivElement>
    clearButtonRef: React.RefObject<HTMLButtonElement>
    respBgRef: React.RefObject<HTMLDivElement>
    dummyInputRef: React.RefObject<HTMLDivElement>
    respSbButton: React.RefObject<HTMLButtonElement>
    showLeftSearchSvg: boolean
    setShowLeftSearchSvg: React.Dispatch<React.SetStateAction<boolean>>
    showDummyInput: boolean
    setShowDummyInput: React.Dispatch<React.SetStateAction<boolean>>
    lightBg: string
    darkBg: string
    /** @branchType */
}

export interface ISearchBoxProvider {
    children: React.ReactNode
}
