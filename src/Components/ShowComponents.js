import React, {useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";

const ShowComponents = ({children}) => {

  const location = useLocation();
  const [ShowComponents, setShowComponents] = useState(false)

  useEffect(()=>{
    if (location.pathname === '/login' || location.pathname === '/register'){
        setShowComponents(false)
    }else{
        setShowComponents(true)
    }
  }, [location])
  return (
    <div>
        {ShowComponents && children}
    </div>
  )
}

export default ShowComponents
