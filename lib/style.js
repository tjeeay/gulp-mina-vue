const fs = require('fs')
const path = require('path')
const through = require('through2-concurrent')

const memorizer = require('./utils/memorizer')
const util = require('./utils/util')

function plugin (options) {

  function parse(file, encode, cb) {
    const { styles } = memorizer.access(file)
    if (!styles.length) {
      file.contents = null
      return cb(null, file)
    }

    file.path = util.replaceExt(file.path, '.wxss')

    const contents = styles.reduce((content, style) => {
      if (!style.src) {
        content += `/* ${file.relative.replace(/\\/g, '/')} */`
        content += style.content
        return content
      }
      
      const dir = path.dirname(file.path)
      const filePath = path.join(dir, style.src)

      content += `\n/* ${style.src} */\n`
      content += fs.readFileSync(filePath, encode)

      return `${content}\n`
    }, '')

    file.contents = new Buffer(contents)

    return cb(null, file)
  }
  

  return through.obj(parse)
}

module.exports = plugin
