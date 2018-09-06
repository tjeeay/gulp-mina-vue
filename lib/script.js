const fs = require('fs')
const path = require('path')
const through = require('through2-concurrent')

const memorizer = require('./utils/memorizer')
const util = require('./utils/util')

function plugin (options) {

  function parse (file, encode, cb) {
    const { script, code } = memorizer.script(file)
    if (!script) {
      file.contents = null
      return cb(null, file)
    }

    file.path = util.replaceExt(file.path, '.js')

    if (!script.src) {
      file.contents = new Buffer(code)
      return cb(null, file)
    }
    
    const dir = path.dirname(file.path)
    const filePath = path.join(dir, script.src)

    return fs.readFile(filePath, (err, buff) => {
      file.contents = buff
      cb(err, file)
    })
  }

  return through.obj(parse)
}

module.exports = plugin
