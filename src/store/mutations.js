import {
  saveCountry,
  saveSymbol,
  saveLanguage,
  saveGender,
  deleteUserProfile,
  saveCartNumber,
  saveUserProfile
} from '@/utils'

import {
  findActiveCategory
} from '@/utils/common'

export default {
  updateCountryCode (state, countryCode) {
    state.countryCode = countryCode
    saveCountry(countryCode)
    // 切换国家的时候需要重置shipping的信息
    state.shippingInfo = {}
    // 切换国家重置活动信息
    state.themes = {}
  },
  updateSymbol (state, symbol) {
    state.symbol = symbol
    saveSymbol(symbol)
  },
  setLanguage (state, language) {
    state.language = language
    saveLanguage(language)
  },
  updateNavState (state, navState) {
    Object.assign(state.navState, navState)
  },
  updateGender (state, gender) {
    state.gender = gender
    saveGender(gender)
  },
  updateCountryBox (state) {
    state.isShowCountryBox = !state.isShowCountryBox
  },
  updateSearchBox (state) {
    state.isShowSearchBox = !state.isShowSearchBox
  },

  updateCategoryActive (state, categoryId) {
    state.currentCategoryId = categoryId
    state.activeSubCategory = {
      id: categoryId,
      name: 'All'
    }

    let subCategories = state.allSubCategories[categoryId]
    if (!subCategories) {
      let res = state.categories.filter(item => {
        return item.category_id === categoryId
      })
      if (res && res.length > 0) {
        subCategories = res[0].sub_category
        state.allSubCategories[categoryId] = subCategories
      }
    }
    state.currentSubCategories = subCategories
  },

  updateActiveSubCategory (state, subCategoryId) {
    state.currentSubCategories.every(item => {
      if (subCategoryId === item.category_id) {
        state.activeSubCategory = item
        return false
      }
      return true
    })
  },

  setActiveCategory (state, categoryId) {
    let categories = []
    findActiveCategory(state.categories, categoryId, categories)
    if (categories && categories.length > 0) {
      const [
        topCategory,
        subCategory = {
          id: categoryId,
          name: 'All'
        }
      ] = categories
      state.currentSubCategories = topCategory.sub_category
      state.currentCategoryId = topCategory.category_id
      if (subCategory) {
        state.activeSubCategory = subCategory
      }
    }
  },

  updateProductData (state, data) {
    state.productData = data
  },

  updateBanners (state, banners) {
    state.banners = banners
  },

  updateProductLoading (state, isLoading) {
    state.isProductLoading = isLoading
  },

  updateCategories (state, categories) {
    state.categories = categories
  },

  setUserProfile (state, userProfile) {
    if (userProfile) {
      state.userProfile = userProfile
      saveUserProfile(userProfile)
    } else {
      state.userProfile = {}
      deleteUserProfile()
    }
  },

  setMaxOrderMoney (state, maxOrderMoney) {
    state.maxOrderMoney = maxOrderMoney
  },
  setOrderInfo (state, orderInfo) {
    state.orderInfo = orderInfo
  },
  setPartnerInfo (state, partnerInfo) {
    state.partnerInfo = partnerInfo
  },
  setPhoneInfo (state, phoneInfo) {
    state.phoneInfo = phoneInfo
  },
  setOrderLines (state, orderLines) {
    state.orderLines = orderLines
  },
  setZipInfo (state, zipInfo) {
    state.zipInfo = zipInfo
  },

  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },

  setQuickPayCardInfo (state, quickPayCardInfo) {
    state.quickPayCardInfo = quickPayCardInfo
  },
  setShippingInfo (state, shippingInfo) {
    state.shippingInfo = shippingInfo
  },
  setGaProductListCount (state, count = 1, force = false) {
    if (force) {
      state.gaProductListCount = count
    } else {
      state.gaProductListCount += count
    }
  },
  setHomePosition (state, position) {
    state.homePosition = position
  },
  setDownloadAppShow (state) {
    state.isDownloadAppShow = !state.isDownloadAppShow
  },
  setCartNumber (state, num) {
    state.cartNumber = num
    saveCartNumber(state.cartNumber)
  },
  setThemes (state, themes) {
    state.themes = themes
  },
  setPayMethod (state, methodName) {
    state.currentPayMethod = methodName
  },
  setSmsCodeRestTime (state, restTime) {
    state.smsCodeRestTime = restTime
    let timer = setInterval(() => {
      state.smsCodeRestTime -= 1
      if (state.smsCodeRestTime <= 0) {
        clearInterval(timer)
        timer = null
      }
    }, 1000)
  }
}
