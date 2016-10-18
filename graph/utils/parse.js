/*
 * Parse CSV Files
 */

import LineByLineReader from 'line-by-line'

function mapCsvRow(headers, record) {
  return record.reduce((p, c, i) => {
    p[headers[i]] = c //eslint-disable-line
    return p
  }, {})
}

// Parse items into a list
export function parseList(path) {
  let headers
  const output = []
  const parser = new LineByLineReader(path)

  parser.on('line', (line) => {
    const record = line.split(',')

    if (!headers) {
      headers = record
      return
    }

    output.push(mapCsvRow(headers, record))
  })

  // Return a new promise to wrap the parsing stream
  return new Promise((resolve, reject) => {
    parser.on('error', err => reject(err))
    parser.on('end', () => resolve(output))
  })
}

// Parse items into an object by key
export function parseObject(path, index = 0) {
  let headers
  const output = {}
  const parser = new LineByLineReader(path)

  parser.on('line', (line) => {
    const record = line.split(',')

    if (!headers) {
      headers = record
      return
    }

    // Map to object by first key
    output[record[index]] = mapCsvRow(headers, record)
  })

  // Return a new promise to wrap the parsing stream
  return new Promise((resolve, reject) => {
    parser.on('error', err => reject(err))
    parser.on('end', () => resolve(output))
  })
}

// Parse items into a grouped objects by key
export function parseGroupedObject(path, index = 0, group = 1) {
  let headers
  const output = {}
  const parser = new LineByLineReader(path)

  parser.on('line', (line) => {
    const record = line.split(',')

    if (!headers) {
      headers = record
      return
    }

    // Make sure a group object exists
    output[record[group]] = output[record[group]] || {}

    // Map the value into the grouped object
    output[record[group]][record[index]] = mapCsvRow(headers, record)
  })

  // Return a new promise to wrap the parsing stream
  return new Promise((resolve, reject) => {
    parser.on('error', err => reject(err))
    parser.on('end', () => resolve(output))
  })
}
