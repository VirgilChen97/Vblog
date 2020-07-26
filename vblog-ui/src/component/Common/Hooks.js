import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const useArticle = (articleId) => {
  // i18n support
  const {t} = useTranslation()

  /** Response Data structures
    private Long id;
    private String title;
    private int state;
    UserInfoResponse user;
    private List<Tag> tags;
    private Category category;
    private String mdContent;
    private Date createDate;
    private Date lastModifiedDate;
   */
  const [id, setId] = useState(null)
  const [title, setTitle] = useState(t('articleEditor.untitledArticle'))
  const [state, setState] = useState(0)
  const [user, setUser] = useState(null)
	const [tag, setTag] = useState("")
	const [category, setCategory] = useState("")
  const [mdContent, setMdContent] = useState(null)
  const [createDate, setCreateDate] = useState(new Date())
  const [lastModifiedDate, setLastModifiedDate] = useState(new Date())

  const [send, , loading, success, error] = useRequest()

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
    let responseBody = null

    setLoading(true)
    try {
      let response = await fetch(request)
      if (response.status >= 400) {
        setError(response.status)
      }
      responseBody = await response.json()
      setJsonResponse(responseBody.data)
    } catch (e) {
      setError(true)
    }

    setLoading(false)
    setSuccess(true)

    if (callBack !== undefined) {
      callBack(responseBody.data)
    }
  }

  return [send, jsonResponse, loading, success, error]
}

export { useRequest, useUserInfo, useArticle }