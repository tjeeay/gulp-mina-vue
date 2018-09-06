const compiler = require('vue-template-compiler')
const { transform } = require('babel-core')
const { parseConfig } = require('./babel-parser')

const _memorizer = {}
const _scripts = {}

function store (target, file, data) {
  target[file.path] = {
    data,
    mtimeMs: file.stat.mtimeMs
  }
  return data
}

function extract (target, file) {
  if (file.path in target) {
    if (target[file.path].mtimeMs === file.stat.mtimeMs) {
      return target[file.path].data
    }
  }
  return null
}

exports.access = function (file) {
  let data = extract(_memorizer, file)
  if (data) return data

  const content = String(file.contents)
  const parts = compiler.parseComponent(content)

  return store(_memorizer, file, parts)
}

function transformScript (file) {
  const { script } = exports.access(file)

  if (!script) {
    return {
      script
    }
  }

  return {
    script,
    ...transform(script.content, {
      plugins: [parseConfig]
    })
  }
}

exports.script = function (file) {
  let data = extract(_scripts, file)
  if (data) return data

  return store(_scripts, file, transformScript(file))
}
