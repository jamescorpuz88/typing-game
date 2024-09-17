const jsProblems = [
  {
    breadcrumbs: 'src > coding > js_problems > HelloWorld.js',
    problem: 'function typing() {\nÆconsole.log("Hello, World!");\n}'
  },
  {
    breadcrumbs: 'src > coding > js_problems > RandomNumber.js',
    problem: 'const a = Math.random() * (10 - 1) + 1\nconsole.log("Random number: " + a);'
  },
  {
    breadcrumbs: 'src > coding > js_problems > Square.js',
    problem:
      'function findSquare(number) {\nÆreturn number * number;\n}\nconsole.log(findSquare(5));'
  },
  {
    breadcrumbs: 'src > coding > js_problems > Factorial.js',
    problem:
      'function factorial(n) {\nÆif (n === 0) {\nÆÆreturn 1;\nÆ}\nÆreturn n * factorial(n - 1);\n}\nconsole.log(factorial(5));'
  },
  {
    breadcrumbs: 'src > coding > js_problems > Palindrome.js',
    problem:
      'function isPalindrome(str) {\nÆconst reversed = str.split("").reverse().join("");\nÆreturn str === reversed;\n}\nconsole.log(isPalindrome("racecar"));'
  }
]

const javaProblems = [
  {
    breadcrumbs: 'src > coding > java_problems > HelloWorld.java',
    problem:
      'public class HelloWorld {\nÆpublic static void main(String[] args) {\nÆÆSystem.out.println("Hello, World!");\nÆ}\n}'
  },
  {
    breadcrumbs: 'src > coding > java_problems > RandomNumber.java',
    problem:
      'import java.util.Random;\npublic class RandomNumber {\nÆpublic static void main(String[] args) {\nÆÆRandom rand = new Random();\nÆÆint a = rand.nextInt(10) + 1;\nÆÆSystem.out.println("Random number: " + a);\nÆ}\n}'
  }
]

const pythonProblems = [
  {
    breadcrumbs: 'src > coding > python_problems > HelloWorld.py',
    problem: 'print("Hello, World!")'
  },
  {
    breadcrumbs: 'src > coding > python_problems > RandomNumber.py',
    problem: 'import random\na = random.randint(1, 10)\nprint("Random number: " + str(a))'
  },
  {
    breadcrumbs: 'src > coding > python_problems > Square.py',
    problem: 'def find_square(number):\nÆreturn number * number\nprint(find_square(5))'
  },
  {
    breadcrumbs: 'src > coding > python_problems > Factorial.py',
    problem:
      'def factorial(n):\nÆif n == 0:\nÆÆreturn 1\nÆreturn n * factorial(n - 1)\nprint(factorial(5))'
  },
  {
    breadcrumbs: 'src > coding > python_problems > Palindrome.py',
    problem:
      'def is_palindrome(str):\nÆreversed = str[::-1]\nÆreturn str == reversed\nprint(is_palindrome("racecar"))'
  }
]

export { jsProblems, javaProblems, pythonProblems }
