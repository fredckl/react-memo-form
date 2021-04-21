import { useEffect } from "react"

const getRandomTime= () => {
  return Math.floor(Math.random() * 2000);
}

const useReady = (ref) =>{

  useEffect(() => {
    if (!ref?.current) {
      return;
    }
    ref.current.classList.add('load')
    const T = setTimeout(() => ref.current.classList.remove('load'), getRandomTime());

    return () => (clearTimeout(T));
  });
}

export default useReady;