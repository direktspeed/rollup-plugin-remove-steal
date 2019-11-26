const createFilter = require('rollup-pluginutils').createFilter
const MagicString = require('magic-string')

function removeSteal (options = {}) {
  const { include, exclude, sourceMap, pattern, sourcemap } = options

  const filter = createFilter(include, exclude)

  return {
    name: 'removeSteal',
    transform (source, id) {
      if (!filter(id)) return
      const defaultPattern = new RegExp(`(\/\/\!steal-remove-start)[\s\S]*(\/\/\!steal-remove-end)`, 'g')
      let map
      const code = source.replace(pattern || defaultPattern, '')

      if (sourceMap !== false && sourcemap !== false) {
        const magicString = new MagicString(code)
        map = magicString.generateMap({ hires: true })
      }

      return { code, map }
    }
  }
}

module.exports = removeSteal
