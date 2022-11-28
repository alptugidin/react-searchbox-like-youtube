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
    onClick: (onClickData?: ISearchResult) => void
}

export interface ISearchBoxContext extends Pick<ISearchBoxProps, 'results' | 'onChange' | 'onClick'> {
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
    setBlurSB: () => void
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
    /** @branchType */
}

export interface ISearchBoxProvider {
    children: React.ReactNode
  }
