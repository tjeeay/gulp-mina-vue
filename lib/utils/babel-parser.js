const generate = require('babel-generator').default
const babelon = require('babelon')

const traverseConfigVisitor = {
  Property: function (path) {
    const k = path.node.key.name || path.node.key.value
    if (k !== 'config') {
      return
    }
    path.stop()

    const { metadata } = path.hub.file
    const { code } = generate(path.node.value, {}, '')
    metadata.config = { code, node: path.node.value, value: babelon.eval(code) }

    path.remove()
  }
}

const configVisitor = {
  ExportDefaultDeclaration: function (path) {
    path.traverse(traverseConfigVisitor)
  }
}

function parseConfig (babel) {
  return {
    visitor: configVisitor
  }
}

exports.parseConfig = parseConfig
