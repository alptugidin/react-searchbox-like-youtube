import React from 'react';
export interface ISearchBoxContext {
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
}

export interface ISvg {
    size?: string
}
