import seechange from './'
import test from 'tape'

test('see-change', t => {
  var a = 1
  var b = 1
  var c = 1

  const change = seechange([
    () => a,
    () => b,
    () => c
  ])

  t.equal(false, change(), 'defaults to not changed')
  a++
  t.equal(true, change(), 'returns true when changed')
  t.equal(false, change(), 'returns false if not changed next time')
  b++
  c++
  t.equal(true, change(), 'returns true on two values changed')
  t.equal(false, change(), 'but still false afterwards')
  t.equal(false, change(), 'and again, just in case')

  t.end()
})

test('see-change.array', t => {
  const data = [1, 1, 1]
  const change = seechange.array(data)

  t.equal(false, change(), 'defaults to not changed')
  data[0]++
  t.equal(true, change(), 'returns true when changed')
  t.equal(false, change(), 'returns false if not changed next time')
  data[1]++
  data[2]++
  t.equal(true, change(), 'returns true on two values changed')
  t.equal(false, change(), 'but still false afterwards')
  t.equal(false, change(), 'and again, just in case')

  data.push(1)
  t.equal(true, change(), 'changes when length changes')
  t.equal(false, change(), 'but still false afterwards')
  t.equal(false, change(), 'and again, just in case')

  data.splice(2, 2)
  t.equal(true, change(), 'changes when length changes')
  t.equal(false, change(), 'but still false afterwards')
  t.equal(false, change(), 'and again, just in case')

  var a = 1
  var b = 1
  var c = 1

  const change2 = seechange([
    () => a,
    () => b,
    () => c,
    change
  ])

  t.equal(false, change2(), 'still defaults to not changed')
  data[0]++
  t.equal(true, change2(), 'detects array changes')
  t.equal(false, change2(), 'but not a second time')
  t.equal(false, change2(), 'or a third')
  a++
  b++
  c++
  t.equal(true, change2(), 'detects array changes')
  t.equal(false, change2(), 'but not a second time')
  t.equal(false, change2(), 'or a third')
  b++
  c++
  data.push(1)
  t.equal(true, change2(), 'detects array changes')
  t.equal(false, change2(), 'but not a second time')
  t.equal(false, change2(), 'or a third')

  t.end()
})
