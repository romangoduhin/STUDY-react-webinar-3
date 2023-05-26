import React from 'react';
import { useMemo } from 'react';
import {getArrayByRange} from "../utils";
import {DOTS} from "../constants";

export function usePagination ({total, limit, currentPage}) {
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
      let rightRange = getArrayByRange(totalPageCount - 3 , totalPageCount);
      return [1, DOTS, ...rightRange];
    }

    const leftSiblingIndex = currentPage - 1;
    const rightSiblingIndex = currentPage + 1;

    return [1, DOTS, leftSiblingIndex, currentPage, rightSiblingIndex, DOTS, totalPageCount];
  }, [total, limit, currentPage]);

  return range;
}