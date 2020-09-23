module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        'true-blue': '#001965',
        'light-blue': {
          darker: '#1F7EC7',
          default: '#3B97DE',
          '15': '#B1D5F2',
          '40': '#E2F0FA'
        },
        'sea-blue': {
          darker: '#00449E',
          default: '#005AD2',
          '15': '#99BDED',
          '40': '#D9E6F8',
        },
        'ocean-green': {
          darker: '#18726C',
          default: '#2A918B',
          '15': '#AAD3D1',
          '40': 'DFEFEE'
        },
        'rose-pink': {
          darker: '#DC7497',
          default: '#EEA7BF',
          '15': '#F8DCE5',
          '40': '#FCF2F5'
        },
        'sand-grey': {
          darker: '#B0A69C',
          default: '#CCC5BD',
          '15': '#EBE8E5',
          '40': '#F7F6F5'
        },
        'granite-grey': {
          darker: '#757C8A',
          default: '#939AA7',
          '15': '#D4D7DC',
          '40': '#EFF0F2'
        },
        'golden-sun': {
          lighter: '#F6D06A',
          default: '#EAAB00',
          darker: '#D09801',
        },
        'lava-red': {
          lighter: '#F29A8C',
          default: '#E6553F',
          darker: '#D0442F'
        },
        'forest-green': {
          lighter: '#74BC6C',
          default: '#3F9C35',
          darker: '#2E8924'
        }
      }
    },
  },
  variants: {
    backgroundColor: ['active', 'focus', 'group-focus', 'responsive', 'hover', 'group-hover'],
    borderColor: ['first', 'focus', 'group-focus', 'last', 'responsive', 'focus-within'],
    margin: ['first', 'last', 'responsive'],
    textColor: ['group-hover', 'hover'],
    boxShadow: ['focus', 'focus-within', 'responsive'],
    zIndex: ['focus', 'hover']
  },
  plugins: [],
}
