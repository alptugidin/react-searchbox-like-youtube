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
    onChange: (onChangeData?: string) => void
}

export interface ISearchBoxContext extends Pick<ISearchBoxProps, 'results' | 'onChange'> {
    isMobile: boolean
    mainRef: React.RefObject<HTMLDivElement>
    topRef: React.RefObject<HTMLDivElement>
    rightDivRef: React.RefObject<HTMLDivElement>
    middleDivRef: React.RefObject<HTMLDivElement>
    searchButtonRef: React.RefObject<HMLTButtonElement>
    backButtonRef: React.RefObject<HMLTButtonElement>
    inputRef: React.RefObject<HTMLInputElement>
    setShowSB: React.Dispatch<React.SetStateAction<boolean>>
    showSB: boolean
    setBlurSB: () => void
    filteredResults: ISearchResult[]
    setFilteredResults: React.Dispatch<React.SetStateAction<ISearchResult[]>>
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}
