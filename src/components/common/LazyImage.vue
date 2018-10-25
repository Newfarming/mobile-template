<template>
  <div class="lazy-content" :style="wrapStyle">
    <img class="lazy-image" :class="{'show': isOriginShow}" :src="url" alt="">
  </div>
</template>
<script>
  import lazyLoadImage from '@/assets/img/lazy_load.png'
  import {
    setObserver
  } from '@/utils'
  export default {
    props: {
      dataSrc: {
        type: String,
        default: ''
      },
      defaultImg: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 0
      },
      observeCallback: {
        type: Function,
        default: null
      }
    },
    created () {
      // 重新刷新页面默认图片值就丢了？
      if (this.defaultImg && this.index === 0) {
        this.url = this.defaultImg
      }
    },
    data () {
      return {
        url: '',
        isOriginShow: false,
        config: {
          rootMargin: '500px 0px'
        },
        wrapStyle: {
          background: `url(${lazyLoadImage})`,
          'background-size': '100%'
        }
      }
    },
    methods: {
      showImage (src) {
        this.url = src
        setTimeout(() => {
          this.wrapStyle = {}
          this.isOriginShow = true
        })
      },
      preloadImage (img) {
        // const src = img.dataset.src
        const src = this.dataSrc
        if (!src) { return }
        const image = new Image()
        image.src = src
        image.onerror = () => {
          console.log(`load image ${src} error ...`)
        }
        image.onload = () => {
          this.showImage(src)
        }
        if (image.complete) {
          this.showImage(src)
        }
      },

      initObserver () {
        setObserver(this.$el, entry => {
          // 加载图像
          this.preloadImage(entry.target)

          // 调用上层传递的回调
          if (this.observeCallback) {
            this.observeCallback(entry)
          }
        }, this.config)
      }
    },
    mounted () {
      this.initObserver()
    }
  }
</script>

<style lang="scss" scoped>
  .lazy-content {
    width: 100%;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    .lazy-image {
      max-width: 100%;
      max-height: 100%;
      transition: opacity 0.2s ease;
      opacity: 0;
      &.show {
        opacity: 1;
      }
    }
  }
</style>
