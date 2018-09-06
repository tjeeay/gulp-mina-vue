const through = require('through2-concurrent')

const memorizer = require('./utils/memorizer')
const util = require('./utils/util')

function plugin (options) {

  function parse (file, encode, cb) {
    const { script, metadata } = memorizer.script(file)
    if (!script) {
      file.contents = null
      return cb(null, file)
    }

    file.path = util.replaceExt(file.path, '.json')

    let { config } = metadata
    config = config || Object.create({
      value: {}
    })

    const fileInfo = util.inspectFile(file)
    if (fileInfo.isApp) {
      const allPages = util.getAllPages(file)
      config.value.pages = [...new Set((config.value.pages || []).concat(allPages))]

      const { pages, homepage } = config.value

      if (homepage) {
        const index = pages.indexOf(homepage)
        if (index > -1) {
          pages.splice(index, 1)
        }
        pages.unshift(homepage)
        delete config.value.homepage
      }
    } else if (fileInfo.isComponent) {
      config.value.component = true
    }

    if (Object.keys(config.value).length === 0) {
      file.contents = null
      return cb(null, file)
    }

    file.contents = new Buffer(JSON.stringify(config.value, null, '  '))

    return cb(null, file)
  }

  return through.obj(parse)
}

module.exports = plugin
