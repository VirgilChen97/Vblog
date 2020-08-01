import React, { useEffect, useContext } from 'react'
import Vditor from 'vditor'
import "vditor/src/assets/scss/index.scss"
import "./Editor.css"
import { useTranslation } from 'react-i18next'
import { UserContext } from '../../../App'

const e = React.createElement

const BlogEditor = ({onChange, value}) => {
  const { loginUser } = useContext(UserContext)
  const {t, i18n} = useTranslation()
  let lang = 'zh_CN'
  if(i18n.language.startsWith("en")){
    lang = 'en_US'
  }

  useEffect(() => {
    const vditor = new Vditor('vditor', {
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      input: onChange,
      placeholder: t('articleEditor.placeholder'),
      lang: lang,
      value: value,
      upload: {
        url: `${process.env.REACT_APP_API_ENDPOINT}/images`,
        max: 1024 * 1024,
        headers: {
          Authorization: loginUser.token
        },
        accept: "image/",
        multiple: false,
        fieldName: "image",
        format: parseResult
      },
      toolbar: [
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "|",
        "list",
        "ordered-list",
        "check",
        "|",
        "quote",
        "line",
        "table",
        "code",
        "inline-code",
        "|",
        "upload", 
        "|",
        "fullscreen",
        "edit-mode",
        {
            name: "more",
            toolbar: [
                "both",
                "code-theme",
                "content-theme",
                "export",
                "outline",
                "preview",
                "devtools",
                "info",
                "help",
            ],
        }],
    })
    return () => {
      vditor.destroy()
    }
  }, [])

  const parseResult = (files, responseText) => {
    let jsonResponse = JSON.parse(responseText)
    let data = {
      errFiles: [],
      succMap: {}
    }
    data.succMap[files[0].name] = `${process.env.REACT_APP_API_ENDPOINT}${jsonResponse.data.imageUrl}`
    jsonResponse.data = data
    console.log(jsonResponse)
    return JSON.stringify(jsonResponse)
  }

  return e(
    'div',
    { id: 'vditor', className: 'vditor-container' },
  )
}

export default BlogEditor