export const config = {
  api: {
    baseUrl: 'http://elastic-app-kk-test.azurewebsites.net/api',
    announcements: '/announcements',
    announcementDetails: '/announcements/{0}',
    categories: '/categories',
    authentication: '/users/authenticate',
    registration: '/users/register'
  },
  url: {
    app: '/app',
    registration: '/registration',
    login: '/login',
    itemDetails: '/announcement-details/:id',
    records: '/records',
    itemsStore: '/items-store',
    profile: '/profile'
  }
}
