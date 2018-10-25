import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/lang'
import {
  saveLanguage
} from '@/utils'

Vue.use(VueI18n)

// 配置时间本地化的格式化规则，这样基本可以去掉格式化的时候依赖于moment了...
const dateTimeFormats = {
  'en': {
    mini: {
      month: 'short',
      day: 'numeric'
    },
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric'
    }
  }
}

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  dateTimeFormats: dateTimeFormats,
  messages
})

const loadedLanguages = ['en']

function setI18nLanguage (lang) {
  i18n.locale = lang
  saveLanguage(lang)
  return lang
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`).then(msg => {
        i18n.setLocaleMessage(lang, msg.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
