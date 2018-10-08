const generate = require('babel-generator').default
const babelon = require('babelon')
const t = require('babel-types')

const traverseVisitor = {
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

const $routeKey = '$route'

function parseScript (options) {
  const fileInfo = options.fileInfo
  return function parseScriptPlugin (babel) {
    return {
      visitor: {
        ExportDefaultDeclaration: function (path) {
          path.traverse(traverseVisitor)

          // set $route property for page
          if (!fileInfo.isPage) {
            return
          }

          const opts = path.node.declaration.arguments[0]
          if (!t.isObjectExpression(opts)) {
            return
          }

          const hasRoute = opts.properties.some(p => t.isIdentifier(p.key, { name: $routeKey }))
          if (!hasRoute) {
            const $routeProperty = t.objectProperty(t.identifier($routeKey), t.stringLiteral(fileInfo.$route))
            opts.properties.unshift($routeProperty)
          }
        }
      }
    }
  }
}

exports.parseScript = parseScript
