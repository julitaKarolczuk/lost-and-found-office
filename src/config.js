export const config = {
  api: {
    baseUrl: 'http://elastic-app-kk-test.azurewebsites.net/api',
    announcements: '/announcements',
    announcementDetails: '/announcements/{0}',
    categories: '/categories',
    authentication: '/users/authenticate',
    registration: '/users/register',
    items: '/items',
    item: '/items/{0}',
    divisions: '/divisions',
    user: '/users/{0}'
  },
  url: {
    app: '/app',
    registration: '/registration',
    login: '/login',
    itemDetails: '/announcement-details/:id',
    itemDetailsUrl: '/announcement-details/',
    records: '/records',
    itemsStore: '/items-store',
    profile: '/profile',
    announcements: '/announcements'
  }
}
