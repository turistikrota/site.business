const { withTouristicUI } = require('@turistikrota/ui/config')

module.exports = withTouristicUI({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        '1/7': '14.2857143%',
      },
      height: {
        75: '18.8125rem',
        76: '19rem',
        102: '26rem',
        104: '28rem',
        106: '30rem',
      },
    },
  },
})
