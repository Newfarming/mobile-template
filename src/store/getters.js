export default {
  topCategoriesData: state => {
    return state.categories.map(item => {
      return {
        id: item.category_id,
        name: item.name,
        bannerImageURL: item.banner_image_url,
        isActive: state.currentCategoryId > 0 ? item.category_id === state.currentCategoryId : item.category_id === state.categories[0].category_id
      }
    })
  },
  subCategoriesData: state => {
    let subs = state.categories.filter(item => {
      return item.category_id === state.currentCategoryId
    })
    if (subs && subs.length > 0) {
      return subs[0].sub_category
    } else {
      return state.categories[0] ? state.categories[0].sub_category : []
    }
  },
  topCategories: state => {
    const topCategories = [{
      category_id: 0,
      name: 'All',
      isActive: true
    }].concat(state.categories).map(item => {
      return {
        id: item.category_id,
        name: item.name,
        isActive: item.category_id === state.currentCategoryId
      }
    })
    return topCategories
  },
  isLogin: state => {
    return Boolean(state.userProfile.authorization)
  },
  // UC优惠券
  couponTheme: state => {
    return state.themes?.CouponTheme || {}
  },
  // 大促打折活动
  priceOff: state => {
    return state.themes?.PriceOff || {}
  },
  // 大促满减活动
  amountOff: state => {
    return state.themes?.AmountOff || {}
  },
  // 大促预热活动
  promotion: state => {
    return state.themes?.Promotion || {}
  },
  // 空闲时期
  blankTime: state => {
    return state.themes ? state.themes.Blank : {}
  },
  // 中东大促
  midEastPromotion: state => {
    return state.themes ? state.themes.Blank0918 : {}
  }
}
