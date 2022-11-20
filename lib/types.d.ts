import React from 'react';
export interface ISearchBoxContext {
    isMobile: boolean
    mainRef: React.RefObject<HTMLDivElement>
    setShowSB: React.Dispatch<React.SetStateAction<boolean>>
    showSB: boolean
}
