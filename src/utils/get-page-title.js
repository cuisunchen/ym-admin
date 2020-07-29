import defaultSettings from '@/settings'

const title = defaultSettings.title || '今日友米'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
