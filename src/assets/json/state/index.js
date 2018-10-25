const countryCodes = [
  'ae',
  'au',
  'bd',
  'bh',
  'br',
  'ca',
  'eg',
  'es',
  'fr',
  'gb',
  'id',
  'il',
  'in',
  'kw',
  'lb',
  'lk',
  'mx',
  'my',
  'om',
  'ph',
  'qa',
  'sa',
  'sg',
  'th',
  'us',
  'vn'
]

function getStates () {
  return countryCodes.reduce((map, code) => {
    map[code] = require(`@/assets/json/state/${code}.json`)
    return map
  }, {})
}

const states = getStates()

export default states
