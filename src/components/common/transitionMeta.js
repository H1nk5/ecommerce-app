const TAB_ORDER = ['/', '/category', '/cart', '/user'];

const getTabIndex = (pathname) => (
  TAB_ORDER.findIndex(path => pathname === path || (path !== '/' && pathname.startsWith(path)))
);

export function getTransitionMeta(fromPath, toPath) {
  const fromTab = getTabIndex(fromPath);
  const toTab = getTabIndex(toPath);

  if (fromTab >= 0 && toTab >= 0) {
    return { type: 'slide', direction: toTab > fromTab ? 1 : -1 };
  }
  if (fromTab >= 0 && toTab < 0) {
    return { type: 'push', direction: 1 };
  }
  if (fromTab < 0 && toTab >= 0) {
    return { type: 'push', direction: -1 };
  }
  return { type: 'push', direction: 1 };
}
