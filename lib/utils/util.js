const path = require('path')
const glob = require('glob')

exports.replaceExt = function (filePath, ext) {
  if (typeof filePath !== 'string') {
    return filePath
  }

  if (filePath.length === 0) {
    return filePath
  }

  const dir = path.dirname(filePath)
  const oldExt = path.extname(filePath)
  const fileName = `${path.basename(filePath, oldExt)}${ext}`

  return path.join(dir, fileName)
}

exports.inspectFile = function (file) {
  const info = {
    isApp: /^app/i.test(file.relative),
    isPage: /^page/i.test(file.relative),
    isComponent: /^component/i.test(file.relative),
  }

  if (info.isPage) {
    info.$route = file.relative.replace(/.vue$/, '').replace(/\\/g, '/')
  }

  return info
}

exports.getAllPages = function (file) {
  const pattern = path.join(file.base, 'pages', '**/*.vue')
  return glob.sync(pattern).map(page => path.relative(file.base, page).replace(/.vue$/, '').replace(/\\/g, '/'))
}
