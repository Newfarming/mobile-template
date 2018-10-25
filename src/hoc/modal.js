import Modal from '@/components/plugins/modal/Modal'

export default (Comp, data) => ({
  components: {
    Comp,
    Modal
  },
  render (createElement, context) {
    // const slots = Object.keys(this.$slots)
    //   .reduce((arr, key) => {
    //     return arr.concat(this.$slots[key])
    //   }, [])
    // console.log('slots ==>', slots)
    return createElement(Modal, {}, [createElement(Comp, data)])
  }
})
