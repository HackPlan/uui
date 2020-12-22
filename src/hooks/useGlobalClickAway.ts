import { useCallback, useEffect } from "react"
import { useClickAway } from "react-use"

export function useGlobalClickAway(active: boolean, elementRef: any, onClickAway?: (event: Event) => void) {
  const activateElement = useCallback((element: any) => {
    let foundIndex = -1
    do {
      foundIndex = GlobalActiveElements.findIndex((i) => i === element)
      if (foundIndex !== -1) GlobalActiveElements.splice(foundIndex, 1)
    } while (foundIndex !== -1);
    GlobalActiveElements.push(element)
  }, [])

  const deactivateElement = useCallback((element: any) => {
    const foundIndex = GlobalActiveElements.findIndex((i) => i === element)
    if (foundIndex === -1) return
    GlobalActiveElements.splice(foundIndex, Number.MAX_SAFE_INTEGER);
  }, [])

  const isCurrentActiveElement = useCallback((element: any) => {
    return (GlobalActiveElements.length > 0 && GlobalActiveElements[GlobalActiveElements.length-1] === element)
  }, [])

  useEffect(() => {
    if (!elementRef.current) return;
    if (active) {
      activateElement(elementRef.current)
    } else {
      deactivateElement(elementRef.current)
    }
  }, [activateElement, deactivateElement, active, elementRef])


  useClickAway(elementRef, (event) => {
    if (active) {
      if (elementRef.current && !isCurrentActiveElement(elementRef.current)) return;
      setImmediate(() => {
        onClickAway && onClickAway(event)
      })
    }
  })
}

const GlobalActiveElements: any[] = [];