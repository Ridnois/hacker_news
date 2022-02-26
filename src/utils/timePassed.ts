export const passedString = (value: number, unit: string) => {
  if (value === 1) {
    if (unit === 'hour') {
      return `An hour`
    }
    return `A ${unit}`
  }
  return `${value} ${unit}s`
}

/**
 * @description create user friendly date format
 * @argument dateString: ISO 8601 Extended format date
 * @returns string
 * @example - 3 hours ago
 * @example - 2 days ago
 * @example - 3 weeks ago
 * @example - 4 months ago
 * @example - 5 years ago
 * 
 **/
export const timePassed = (dateString: string) => {
  const givenDate = new Date(dateString);
  const actualDate = new Date();
  const passed = actualDate.getTime() - givenDate.getTime();
  
  const years = Math.floor((passed / (365 * 60 * 60 * 24 * 1000))) 
  const months = Math.floor((passed / ((365 / 12) * 24 * 60 * 60 * 1000))) 
  const weeks =  Math.floor((passed / (7 * 24 * 60 * 60 * 1000))) 
  const days =   Math.floor((passed / (24 * 60 * 60 * 1000))) 
  const hours =  Math.floor((passed / (60 * 60 * 1000))) 
  const minutes = Math.floor((passed / (60 * 1000))) 
  const seconds = Math.floor((passed / 1000)) 
  
  
  if (years > 1) {
    return passedString(years, 'year')
  } else if (months >= 1) {
    return passedString(months, 'month')
  } else if (weeks >= 1) {
    return passedString(weeks, 'week')
  } else if (days >= 1) {
    return passedString(days, 'day')
  } else if (hours >= 1) {
    return passedString(hours, 'hour')
  } else if (minutes >= 1) {
    return passedString(minutes, 'minute')
  } else if (seconds >= 1) {
    return passedString(seconds, 'second')
  }
}
