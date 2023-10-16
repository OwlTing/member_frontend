export default function truncateText(text, options) {
  const defaultConfig = {
    firstLength: 4,
    lastLength: 4,
    separator: '...'
  }
  const config = {
    ...defaultConfig,
    ...options
  }

  const regex = new RegExp(`(^\\w{${config.firstLength}}).*(\\w{${config.lastLength}}$)`, 'g')
  return text ? text.replace(regex, `$1${config.separator}$2`) : ''
}
