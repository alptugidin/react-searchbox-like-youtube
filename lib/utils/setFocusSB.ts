import { ISearchBoxContext } from '../types';

export const setFocusSB = (cx: ISearchBoxContext): void => {
  if (cx.isMobile) {
    const setClasses = new Promise((resolve, reject) => {
      cx.setShowSB(true);
      cx.mainRef.current?.classList.add('!absolute', 'left-0', 'right-0', 'w-full', 'top-0', 'bg-white');
      cx.topRef.current?.classList.add('custom-box-shadow', 'justify-evenly');
      cx.inputRef.current?.classList.add('bg-gray-100');
      cx.searchButtonRef.current?.classList.add('bg-gray-100', 'rounded-r-full');
      cx.backButtonRef.current?.classList.remove('hidden');
      cx.backButtonRef.current?.classList.add('flex');
      cx.rightDivRef.current?.classList.remove('hidden');
      cx.middleDivRef.current?.classList.add('basis-9/12');
      resolve(true);
    });
    void setClasses.then(() => cx.inputRef.current?.focus());
  }
};
