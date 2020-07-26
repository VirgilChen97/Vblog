import React, { useEffect } from 'react'
import Vditor from 'vditor'
import "vditor/src/assets/scss/index.scss"
import "./Editor.css"
import { useTranslation } from 'react-i18next'

const e = React.createElement

const BlogEditor = ({onChange, value, className}) => {
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
      value: value
    })
    return () => {
      vditor.destroy()
    }
  }, [])

  return e(
    'div',
    { id: 'vditor', className: 'vditor-container' },
  )
}

export default BlogEditor