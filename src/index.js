const { getRandomWordSync, getRandomWord } = require('word-maker')
const axios = require('axios')

console.log('It works!')

// YOUR CODE HERE

async function taskRunner(tasks) {
  if (!tasks) {
    console.log('Wrong usage, please pass array of Function objects as argument to this function.')
  }
  try {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i]
      const number = task.name && task.name[task.name.length - 1]
      console.log(`\n\nRunning Task #${number || '???'}: \n`)
      await task()
    }
  }
  catch (e) {
    console.error(e)
  }
}

function task1 () {
  for (let i = 1; i <= 100; i++) {
    const word = getRandomWordSync()
    console.log(`${i}: ${word}`)
  }
}

function task2 () {
  for (let i = 1; i <= 100; i++) {
    let word = ''
    if (i % 3 === 0) {
      word += 'Fizz'
    }
    if (i % 5 === 0) {
      word += 'Buzz'
    }
    if (!word) {
      word = getRandomWordSync()
    }
    console.log(`${i}: ${word}`)
  }
}

async function task3 () {
  for (let i = 1; i <= 100; i++) {
    let word = ''
    if (i % 3 === 0) {
      word += 'Fizz'
    }
    if (i % 5 === 0) {
      word += 'Buzz'
    }
    if (!word) {
      word = await getRandomWord()
    }
    console.log(`${i}: ${word}`)
  }
}

async function task4 (output = console.log) {
  for (let i = 1; i <= 100; i++) {
    let word = ''
    if (i % 3 === 0) {
      word += 'Fizz'
    }
    if (i % 5 === 0) {
      word += 'Buzz'
    }
    if (!word) {
      try {
        word = await getRandomWord(true)
      }
      catch {
        word = "It shouldn't break anything!"
      }
    }
    output(`${i}: ${word}`)
  }
}

async function task5 () {
  let output = ''
  await task4((str) => output += str + '\n')
  console.log('Sending output to HTTP endpoint...')
  try {
    const result = await axios.post('https://harver.free.beeceptor.com', { body: 'test' })
    if (result.status === 200) {
      console.log(`Successfully sent! Got: ${JSON.stringify(result.data)}`)
    } else {
      throw Error(`Got unexpected status code: ${result.status}`)
    }
  } catch (e) {
    console.error('Unexpected error, while trying to send result to HTTP endpoint.', e)
  }
}

taskRunner([task1, task2, task3, task4, task5])