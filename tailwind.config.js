module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.tsx', './src/**/*.ts'],
  theme: {
    extend: {},
  },
  variants: {
    cursor: ['disabled'],
    opacity: ['disabled'],
    borderColor: ['focus'],
    borderWidth: ['focus'],
  },
  plugins: [],
}
