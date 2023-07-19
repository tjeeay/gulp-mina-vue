module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false, //
  singleQuote: true, //
  quoteProps: 'as-needed',
  trailingComma: 'all', // for better git history
  bracketSpacing: true,
  arrowParens: 'avoid', // avoid (default): Omit parens when possible. Example: x => x
  htmlWhitespaceSensitivity: 'ignore', // for better format
  endOfLine: 'lf', // windows users: git config core.autocrlf false --global
}
