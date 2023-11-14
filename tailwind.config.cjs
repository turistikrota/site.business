const { withTouristicUI } = require('@turistikrota/ui/config')

module.exports = withTouristicUI({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        '1/7': '14.2857143%',
      },
    },
  },
})
