export function createPagesNumbers(
  productsPagesCount:number,
  currentPage: number) {
    const pagesNumbers: number[] = [];
    if (productsPagesCount > 10) {
      if (currentPage > 5) {
        const lastElementNumber = 
          currentPage + 4 < productsPagesCount 
          ? currentPage + 4 
          : productsPagesCount;
        for (let i = currentPage - 4; i <= lastElementNumber; i++) {
          pagesNumbers.push(i);
        }
      } else {
        for (let i = 1; i <= 10; i++) {
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