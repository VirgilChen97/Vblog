import { useState, useEffect } from 'react'
import JwtUtil from '../../util/JwtUtil'

const useUserInfo = (userId, username) => {
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true)
      try {
        let response = null
        if (userId !== undefined) {
          response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}`)
        } else {
          response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users?username=${username}`)
        }
        if (response.status >= 400) {
          setError(response.status)
        } else {
          let ownerInfo = await response.json()
          setUserInfo(ownerInfo.data)
        }
      } catch (e) {
        setError(true)
      }
      setLoading(false)
    }
    fetchUserInfo()
  }, [userId])

  return [userInfo, setUserInfo, loading, error]
}

const useRequest = () => {
  const [jsonResponse, setJsonResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)


  const send = async (jsonData, url, method, token, callBack) => {
    let init = {
      method: method,
    }

    if(jsonData !== null){
      init.body = JSON.stringify(jsonData)
    }

    if(token !== null){
      init.headers = {
        'Content-Type': "application/json",
        "Authorization": token
      }
    }
      
    let request = new Request(`${process.env.REACT_APP_API_ENDPOINT}${url}`, init)

    setLoading(true)
    try {
      let response = await fetch(request)
      if (response.status >= 400) {
        setError(response.status)
      }
      setJsonResponse(await response.json())
    } catch (e) {
      setError(true)
    }

    setLoading(false)
    setSuccess(true)

    if (callBack !== undefined) {
      callBack()
    }
  }

  return [send, jsonResponse, loading, success, error]
}

export { useRequest, useUserInfo }