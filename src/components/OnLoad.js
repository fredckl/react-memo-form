import React from 'react'
import useReady from '../hooks/useReady';

const OnLoad = () => {
  const {isReady} = useReady(false);
  console.log('remremremrem')
  if (isReady) return null;
  return (
    <div>
      Chargement en cours...
    </div>
  )
}

export default OnLoad
