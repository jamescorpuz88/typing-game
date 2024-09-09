import { jsProblems, javaProblems, pythonProblems } from './codingProblems'

const tabItems = [{
    language: 'javascript',
    tabName: 'typing.js',
    typingProblems: jsProblems
  }, {
    language: 'java',
    tabName: 'typing.java',
    typingProblems: javaProblems
  }, {
    language: 'python',
    tabName: 'typing.py',
    typingProblems: pythonProblems
  }
]

export { tabItems }
