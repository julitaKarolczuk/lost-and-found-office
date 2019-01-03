export const config = {
  api: {
    baseUrl: 'http://elastic-app-kk-test.azurewebsites.net/api',
    announcements: '/announcements',
    announcementDetails: '/announcements/{0}',
    categories: '/categories',
    category: '/categories/{0}',
    authentication: '/users/authenticate',
    registration: '/users/register',
    items: '/items',
    item: '/items/{0}',
    divisions: '/divisions',
    division: '/divisions/{0}',
    users: '/users',
    user: '/users/{0}'
  },
  url: {
    app: '/',
    registration: '/registration',
    login: '/login',
    itemDetails: '/announcement-details/:id',
    itemDetailsUrl: '/announcement-details/',
    records: '/records',
    itemsStore: '/items-store',
    profile: '/profile',
    announcements: '/announcements',
    adminPanel: '/admin',
    adminPanelCategories: '/admin/categories',
    adminPanelItems: '/admin/items',
    adminPanelAnnouncements: '/admin/announcements',
    adminPanelUsers: '/admin/users',
    adminPanelDivisions: '/admin/divisions'
  }
}
