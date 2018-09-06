const fs = require('fs')
const path = require('path')
const through = require('through2-concurrent')

const memorizer = require('./utils/memorizer')
const util = require('./utils/util')

function plugin (options) {

  function parse(file, encode, cb) {
    const { template } = memorizer.access(file)
    if (!template) {
      file.contents = null
      return cb(null, file)
    }

    file.path = util.replaceExt(file.path, '.wxml')

    if (!template.src) {
      file.contents = new Buffer(template.content)
      return cb(null, file)
    }
    
    const dir = path.dirname(file.path)
    const filePath = path.join(dir, template.src)

    return fs.readFile(filePath, (err, buff) => {
      file.contents = buff
      cb(err, file)
    })
  }
  
  return through.obj(parse)
}

module.exports = plugin
