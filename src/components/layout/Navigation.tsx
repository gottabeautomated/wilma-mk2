import { NavLink } from 'react-router-dom'

export function Navigation() {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Dashboard', path: '/dashboard' },
  ]
  
  return (
    <nav className="flex md:flex-row flex-col md:space-x-6 md:space-y-0 space-y-4">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `text-sm font-medium transition-colors hover:text-[hsl(var(--wedding-rose))] ${
              isActive 
                ? 'text-[hsl(var(--wedding-rose))]' 
                : 'text-muted-foreground'
            }`
          }
          end={item.path === '/'}
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  )
}
