import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const useArticle = (articleId) => {
  // i18n support
  const {t} = useTranslation()
  const [id, setId] = useState(null)
  const [title, setTitle] = useState(t('articleEditor.untitledArticle'))
  const [state, setState] = useState(0)
  const [user, setUser] = useState(null)
	const [tag, setTag] = useState("")
	const [category, setCategory] = useState("")
  const [mdContent, setMdContent] = useState(null)
  const [createDate, setCreateDate] = useState(new Date())
  const [lastModifiedDate, setLastModifiedDate] = useState(new Date())

  const [send, ,loading, , error] = useRequest()

  useEffect(() => {
    if(articleId !== undefined){
      send(null, `/articles/${articleId}`, "GET", null, (article)=>{
        setId(article.id)
        setTitle(article.title)
        setState(article.state)
        setUser(article.user)
        let tagNames = []
        for(let tag of article.tags){
          tagNames.push(tag.tagName)
        }
        setTag(tagNames.join(', '))

        if (article.category){
          setCategory(article.category.categoryName)
        }
        setMdContent(article.mdContent)
        setCreateDate(article.createDate)
        setLastModifiedDate(article.lastModifiedDate)
      })
    }else{
      setMdContent("")
    }
  }, [articleId])
  
  return [
    // article entity
    {id, title, state, user, tag, category,mdContent, createDate, lastModifiedDate},
    // id, user, create date, modified date is not allowed to be modified by user
    {setTitle, setState, setTag, setCategory, setMdContent},
    loading, 
    error
  ]
}

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const get = async (userId, username) => {
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
  return [get, userInfo, setUserInfo, loading, error]
}

const useRequest = () => {
  const [jsonResponse, setJsonResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const send = async (jsonData, url, method, token, successCallback, errorCallback) => {
    let init = {
      method: method,
    }

    if(jsonData !== null){
      init.body = JSON.stringify(jsonData)
    }

    if(token !== null){
      init.headers = {
        "Content-Type": "application/json",
        "Authorization": token
      }
    }
      
    let request = new Request(`${process.env.REACT_APP_API_ENDPOINT}${url}`, init)
    let responseBody = null

    setLoading(true)
    try {
      let response = await fetch(request)
      responseBody = await response.json()
      if (response.status >= 400) {
        setError(responseBody.code)
        if(errorCallback !== undefined){
          errorCallback(error)
        }
        setLoading(false)
        return
      }
      setJsonResponse(responseBody.data)
      setSuccess(true)
      setTimeout(()=>setSuccess(false), 3000)
      if (successCallback !== undefined) {
        successCallback(responseBody.data)
      }
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  return [send, jsonResponse, loading, success, error]
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export { useRequest, useUserInfo, useArticle, useQuery }