export function createPagesNumbers(
  productsPagesCount:number,
  currentPage: number) {
    const pagesNumbers: number[] = [];
    const maxPageNumberButtons = 10;
    const pageNumberButtonsSeparator = 5;
    const maxButtonsCountNearSeparator = 4;
    
    if (productsPagesCount > maxPageNumberButtons) {
      if (currentPage > pageNumberButtonsSeparator) {
        const lastElementNumber = 
          currentPage + maxButtonsCountNearSeparator < productsPagesCount 
            ? currentPage + maxButtonsCountNearSeparator 
            : productsPagesCount;
          
        for (let i = currentPage - maxButtonsCountNearSeparator; i <= lastElementNumber; i++) {
          pagesNumbers.push(i);
        }
      } else {
        for (let i = 1; i <= maxPageNumberButtons; i++) {
          pagesNumbers.push(i);
          if(i === productsPagesCount) break;
        }
      }
    } else {
      for (let i = 1; i <= productsPagesCount; i++) {
        pagesNumbers.push(i);
      }
    }
    return pagesNumbers;
}