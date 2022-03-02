import { timePassed } from '../utils';
// If we use system date test will break itselves after certain time
jest
  .useFakeTimers()
  .setSystemTime(new Date('2022-02-24').getTime());

describe('Friendly dale', () => {
  it('Handle seconds', () => {
    const expected = '30 seconds';
    const result = timePassed('2022-02-23T23:59:30.000Z');
    expect(result).toEqual(expected);
  })
  
  it('Handle one hour', () => {
    const expected = 'An hour'
    const result = timePassed('2022-02-23T23:00:00.000z')
    expect(result).toEqual(expected);
  })
  it('Handle minutes', () => {
    const expected = '5 minutes'
    const result = timePassed('2022-02-23T23:55:00.000Z')
    expect(result).toEqual(expected)
  })
  
  it('Handle hours', () => {
    const expected = '4 hours'
    const result = timePassed('2022-02-23T20:00:00.000Z')
    expect(result).toEqual(expected)
  })
  
  it('Handle days', () => {
    const expected = '3 days'
    const result = timePassed('2022-02-21')
    expect(result).toEqual(expected)
  })
  it('Handle weeks', () => {
    const expected = '2 weeks'
    const result = timePassed('2022-02-10')
    expect(result).toEqual(expected)
  })
  it('Handle months', () => {
    const expected = '3 months'
    const result = timePassed('2021-11-24')
    expect(result).toEqual(expected)
  })
  it('Handle years', () => {
    const expected = '3 years'
    const result = timePassed('2019-02-21')
    expect(result).toEqual(expected)
  })
})

