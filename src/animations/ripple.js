// class RippleEffect {
//   constructor (element) {
//     this.element = element
//     this.element.addEventListener('click', this.onRippleEffect.bind(this), false)
//   }

//   onRippleEffect (e) {
//     // const target = this.element
//     let target = e.target
//     let classList = Array.from(target.classList)
//     while (!classList.includes('ripple-effect')) {
//       target = target.parentNode
//       classList = Array.from(target.classList)
//     }
//     console.log(e)
//     let rect = target.getBoundingClientRect()
//     let ripple = target.querySelector('.ripple')
//     if (!ripple) {
//       ripple = document.createElement('span')
//       ripple.className = 'ripple'
//       ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
//       target.appendChild(ripple)
//     }
//     ripple.classList.remove('show')
//     let top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop
//     let left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft
//     ripple.style.top = top + 'px'
//     ripple.style.left = left + 'px'
//     ripple.classList.add('show')
//   }
// }

// export default RippleEffect
/**
 * 这样实现的水波纹效果感觉会非常影响性能...
 * 递归的调用dom元素进行节点是否有.ripple-effect类名
 * @param {*} e
 */
export default function onRippleEffect (e) {
  let target = e.target
  let classList = Array.from(target.classList)
  while (!classList.includes('ripple-effect')) {
    if (target.nodeName === 'BODY') {
      return false
    }
    target = target.parentNode
    classList = Array.from(target.classList)
  }
  let rect = target.getBoundingClientRect()
  let ripple = target.querySelector('.ripple')
  if (!ripple) {
    ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
    target.appendChild(ripple)
  }
  ripple.classList.remove('show')
  let top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop
  let left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft
  ripple.style.top = top + 'px'
  ripple.style.left = left + 'px'
  ripple.classList.add('show')
  return false
}
