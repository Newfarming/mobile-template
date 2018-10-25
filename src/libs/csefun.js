// 匹配卡种
export function matchCard (cardNumber, cardYear, cardMonth, secureCode) {
  let verify = {
    card: false,
    date: false,
    cvv: false
  }
  let card = cardNumber.replace(/\s/g, '')

  const cardType = checkCardType(card)

  // 如果是AE卡，CVV长度改成4位
  if (cardType !== '') {
    if (cardType === 'ae') {
      document.getElementById('card_secureCode').maxLength = 4
      document.getElementById('card_secureCode').value = secureCode.substr(0, 4)
    } else {
      document.getElementById('card_secureCode').maxLength = 3
      document.getElementById('card_secureCode').value = secureCode.substr(0, 3)
    }
  }

  // 检查luhn算法
  const cardFlag = card !== '' && luhnCheck(card)
  document.getElementById('card_luhn_pass').value = cardFlag ? '1' : ''
  verify.card = cardFlag

  // 卡种
  document.getElementById('card_type').value = cardType

  // 检查安全码
  verify.cvv = checkSecureCode(secureCode, cardType)

  // 检查日期
  verify.date = checkDate(cardYear, cardMonth)

  return verify
}

// 检查日期
export function checkDate (year, month) {
  let flag = false

  // 正则表达式
  var monthRule = new RegExp('^\\d{2}$')
  var yearRule = new RegExp('^\\d{4}$')

  if (month !== '' && year !== '') {
    if (monthRule.test(month) && yearRule.test(year) && month >= 1 && month <= 12) {
      if (year.length === 2) {
        year = '20' + year
      }

      // 当前日期
      var NowDate = new Date()
      var nowyear = NowDate.getFullYear()
      var nowmonth = NowDate.getMonth() + 1

      nowmonth = nowmonth < 10 ? '0' + nowmonth : nowmonth
      var today = nowyear.toString() + nowmonth.toString()

      // 选择日期
      let selectday = year.toString() + month.toString()

      // 选择日期是否大于当前日期
      flag = selectday >= today
    }
  }
  document.getElementById('card_date_pass').value = flag ? '1' : ''
  return flag
}

// 检查安全码
export function checkSecureCode (secureCode, cardType) {
  // 正则表达式
  var cvv = new RegExp('^\\d{3}$')
  var cvv2 = new RegExp('^\\d{4}$')

  const secureCodeFlag = (cardType === 'ae' ? cvv2 : cvv).test(secureCode)
  document.getElementById('card_secureCode_pass').value = secureCodeFlag ? '1' : ''

  return secureCodeFlag
}

// luhn算法
export function luhnCheck (bankno) {
  var lastNum = bankno.substr(bankno.length - 1, 1) // 取出最后一位（与luhn进行比较）

  var first15Num = bankno.substr(0, bankno.length - 1) // 前15或18位
  var newArr = []
  for (var i = first15Num.length - 1; i > -1; i--) { // 前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1))
  }
  var arrJiShu = [] // 奇数位*2的积 <9
  var arrJiShu2 = [] // 奇数位*2的积 >9

  var arrOuShu = [] // 偶数位数组
  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 === 1) { // 奇数位
      if (parseInt(newArr[j]) * 2 < 9) {
        arrJiShu.push(parseInt(newArr[j]) * 2)
      } else {
        arrJiShu2.push(parseInt(newArr[j]) * 2)
      }
    } else {
      arrOuShu.push(newArr[j]) // 偶数位
    }
  }

  var jishuChildUnitsDigit = [] // 奇数位*2 >9 的分割之后的数组个位数
  var jishuChildTensDigit = [] // 奇数位*2 >9 的分割之后的数组十位数
  for (var h = 0; h < arrJiShu2.length; h++) {
    jishuChildUnitsDigit.push(parseInt(arrJiShu2[h]) % 10)
    jishuChildTensDigit.push(parseInt(arrJiShu2[h]) / 10)
  }

  var sumJiShu = 0 // 奇数位*2 < 9 的数组之和
  var sumOuShu = 0 // 偶数位数组之和
  var sumJiShuChild1 = 0 // 奇数位*2 >9 的分割之后的数组个位数之和
  var sumJiShuChild2 = 0 // 奇数位*2 >9 的分割之后的数组十位数之和
  var sumTotal = 0
  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m])
  }

  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n])
  }

  for (var p = 0; p < jishuChildUnitsDigit.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishuChildUnitsDigit[p])
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishuChildTensDigit[p])
  }
  // 计算总和
  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2)

  // 计算luhn值
  var k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10
  var luhn = 10 - k

  return parseInt(lastNum) === luhn
}

export function checkCardType (cardNumber) {
  let card = cardNumber.replace(/\s/g, '')

  // 卡种正则表达式
  let rule = []

  rule['visa'] = new RegExp('^4\\d{15}$')
  rule['mastercard'] = new RegExp('^(5[1-5][\\d]{2}|222[1-9]|22[3-9][\\d]|2[3-6][\\d]{2}|27[0-1][\\d]|2720)\\d{12}$')
  rule['jcb'] = new RegExp('^35(28|29|([3-8][\\d]))\\d{12}$')
  rule['maestro'] = new RegExp('^(50|(5[6-9])|(6[\\d]))\\d{10,17}$')
  rule['ae'] = new RegExp('^3[47]\\d{13}$')
  rule['aura'] = new RegExp('^5\\d{18}$')
  rule['diners'] = new RegExp('^36\\d{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}$')
  rule['discover'] = new RegExp('^6(?:011|5\\d{2})\\d{12}$')
  rule['hipercard'] = new RegExp('^(?:606282|637095|637568)\\d{10}|38\\d{14,17}$')
  rule['elo'] = new RegExp('^(?:50670[7-8]|506715|50671[7-9]|50672[0-1]|50672[4-9]|50673[0-3]|506739|50674[0-8]|50675[0-3]|50677[4-8]|50900[0-9]|50901[3-9]|50902[0-9]|50903[1-9]|50904[0-9]|50905[0-9]|50906[0-4]|50906[6-9]|50907[0-2]|50907[4-5]|636368|636297|504175|438935|40117[8-9]|45763[1-2]|457393|431274|50907[6-9]|50908[0-9]|627780)[0-9]*$')
  /* 墨西哥当地卡种 */
  rule['carnet'] = new RegExp('^(286900|502275|506(199|2(0[1-6]|1[2-578]|2[289]|3[67]|4[579]|5[01345789]|6[12359]|7[02-9]|8[0-47]|9[479])|3(0[0-79]|1[1-49]|2[039]|3[02-79]|4[0-49]|5[0-79]|6[014-79]|7[0-49]|8[023467]|9[124])|402)|606333|636379|639(388|484|559)|588772(02|66|67|68|74|84)|6046220[34])$')

  let cardType = ''

  for (let i in rule) {
    if (rule[i].test(card)) {
      cardType = i
    }
  }
  return cardType
}
