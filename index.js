const createFilter = require('rollup-pluginutils').createFilter
const MagicString = require('magic-string')

function removeSteal (options = {}) {
  const { include, exclude, sourceMap, pattern, sourcemap } = options

  const filter = createFilter(include, exclude)

  return {
    name: 'removeSteal',
    transform (source, id) {
      if (!filter(id)) return
      let map
      const code = source.replace(/(\/\/\!?steal-remove-start)[\s\S]*?(\/\/\!?steal-remove-end)/g, '')
      
      if (sourceMap !== false && sourcemap !== false) {
        const magicString = new MagicString(code)
        map = magicString.generateMap({ hires: true })
      }

      return { code, map }
    }
  }
}

module.exports = removeSteal
