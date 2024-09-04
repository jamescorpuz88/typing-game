const jsProblems = [
  {
    breadcrumbs: 'src > coding > test > HelloWorld.js',
    problem: 'function typing() {\nÆconsole.log("Hello, World!");\n}'
  },
  {
    breadcrumbs: 'src > coding > test > RandomNumber.js',
    problem: 'const a = Math.random() * (10 - 1) + 1\nconsole.log("Random number: " + a);'
  },
  {
    breadcrumbs: 'src > coding > test > Square.js',
    problem:
      'function findSquare(number) {\nÆreturn number * number;\n}\nconsole.log(findSquare(5));'
  },
  {
    breadcrumbs: 'src > coding > test > Factorial.js',
    problem:
      'function factorial(n) {\nÆif (n === 0) {\nÆÆreturn 1;\nÆ}\nÆreturn n * factorial(n - 1);\n}\nconsole.log(factorial(5));'
  },
  {
    breadcrumbs: 'src > coding > test > Palindrome.js',
    problem:
      'function isPalindrome(str) {\nÆconst reversed = str.split("").reverse().join("");\nÆreturn str === reversed;\n}\nconsole.log(isPalindrome("racecar"));'
  }
]

export { jsProblems }
