/*
  Parse CSV Files
*/

import LineByLineReader from 'line-by-line'

function mapCsvRow(headers, record) {
  return record.reduce((p, c, i) => {
    p[headers[i]] = c //eslint-disable-line
    return p
  }, {})
}

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

export function parseObject(path, index = 0, merge = false) {
  let headers
  const output = {}
  const parser = new LineByLineReader(path)

  parser.on('line', (line) => {
    const record = line.split(',')

    if (!headers) {
      headers = record
      return
    }

    // If there's no need to merge records
    if (!merge) {
      // Map to object by first key
      output[record[index]] = mapCsvRow(headers, record)
    }
  })

  // Return a new promise to wrap the parsing stream
  return new Promise((resolve, reject) => {
    parser.on('error', err => reject(err))
    parser.on('end', () => resolve(output))
  })
}
