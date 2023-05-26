import React, {useContext, useEffect, useMemo, useState} from 'react';
import {getArrayByRange} from "../utils";
import {DOTS} from "../constants";
import {LanguageContext} from "../contexts";
import rus from '../locales/rus.locale.json';
import eng from '../locales/eng.locale.json';


export function usePagination({total, limit, currentPage}) {
  const totalPageCount = Math.ceil(total / limit);

  const range = useMemo(() => {
    if (totalPageCount <= 4) {
      return getArrayByRange(1, totalPageCount);
    }

    if (currentPage < 3) {
      let leftRange = getArrayByRange(1, 3);
      return [...leftRange, DOTS, totalPageCount];
    }

    if (currentPage < 4) {
      let leftRange = getArrayByRange(1, 4);
      return [...leftRange, DOTS, totalPageCount];
    }

    if (currentPage === totalPageCount || currentPage === totalPageCount - 1) {
      let rightRange = getArrayByRange(totalPageCount - 3, totalPageCount);
      return [1, DOTS, ...rightRange];
    }

    const leftSiblingIndex = currentPage - 1;
    const rightSiblingIndex = currentPage + 1;

    return [1, DOTS, leftSiblingIndex, currentPage, rightSiblingIndex, DOTS, totalPageCount];
  }, [total, limit, currentPage]);

  return range;
}

export function useLanguage() {
  const {language, setLanguage} = useContext(LanguageContext)
  const [translation, setTranslation] = useState(null)

  function switchLanguage() {
    setLanguage(prevState => prevState === "rus" ? "eng" : "rus")
  }

  function t(key) {
    if (translation) {
      return translation[key]
    }
  }

  useEffect(() => {
    const json = language === "rus" ? rus : eng

    setTranslation(json)
  }, [language]);

  return {language, t, switchLanguage}
}