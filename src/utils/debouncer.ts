//generic debouncing wrapper fn
export function debouncer<T extends (...args: any[]) => void>(
  callback: T,
  ms: number,
) {
  //init a timerID variable, stays alive due to closure of the fn returned below
  let timerID: number;

  //return a function that clears old setTimeout and reassigns a new one
  return (...args: Parameters<T>) => {
    clearTimeout(timerID);
    timerID = setTimeout(() => callback(...args), ms);
  };
}
