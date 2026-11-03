import { NavLink, Outlet } from 'react-router'

const tabs = [
  { to: '/', label: 'Calculator' },
  { to: '/today', label: 'Today' },
  { to: '/history', label: 'History' },
  { to: '/settings', label: 'Settings' },
]

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* The current page appears here */}
      <Outlet />

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 border-t border-gray-200 bg-white"
      >
        <ul className="mx-auto flex max-w-md">
          {tabs.map((tab) => (
            <li key={tab.to} className="flex-1">
              <NavLink
                to={tab.to}
                end
                className={({ isActive }) =>
                  'block border-t-2 py-3 text-center text-sm font-medium ' +
                  (isActive
                    ? 'border-emerald-700 text-emerald-800'
                    : 'border-transparent text-gray-600 hover:text-gray-900')
                }
              >
                {tab.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Layout