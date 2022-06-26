module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 函数括号前空格
    'space-before-function-paren': ['error', 'never'],
    // 关闭 组件name名的多单词规则
    'vue/multi-word-component-names': 'off'
  }
}
