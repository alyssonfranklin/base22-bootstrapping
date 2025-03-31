import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useNavigation } from '@/lib/context/NavigationContext';

type MenuItem = {
  title: string;
  link?: string;
  items?: { title: string; link: string }[];
};

const menuItems: MenuItem[] = [
  {
    title: 'My Workspace',
    items: [
      { title: 'Dashboard', link: '/workspace/dashboard' },
      { title: 'Calendar', link: '/workspace/calendar' },
      { title: 'Tasks', link: '/workspace/tasks' },
      { title: 'Documents', link: '/workspace/documents' },
    ],
  },
  {
    title: 'Life & Career',
    items: [
      { title: 'Benefits', link: '/life-career/benefits' },
      { title: 'Training', link: '/life-career/training' },
      { title: 'Development', link: '/life-career/development' },
      { title: 'Well-being', link: '/life-career/wellbeing' },
    ],
  },
  {
    title: 'Self Service',
    items: [
      { title: 'Time Off', link: '/self-service/time-off' },
      { title: 'Expenses', link: '/self-service/expenses' },
      { title: 'Pay Information', link: '/self-service/pay' },
      { title: 'Personal Info', link: '/self-service/personal' },
    ],
  },
  {
    title: 'Explore',
    items: [
      { title: 'Company Directory', link: '/explore/directory' },
      { title: 'Departments', link: '/explore/departments' },
      { title: 'Locations', link: '/explore/locations' },
      { title: 'Knowledge Base', link: '/explore/knowledge' },
    ],
  },
  {
    title: 'News Feed',
    link: '/news',
    items: [
      { title: 'Announcements', link: '/news/announcements' },
      { title: 'Company Updates', link: '/news/updates' },
      { title: 'Events', link: '/news/events' },
      { title: 'Newsletter', link: '/news/newsletter' },
    ],
  },
];

export default function MainNavigation() {
  const { activeSection, setActiveSection, currentPage } = useNavigation();
  
  const handleMenuToggle = (menuTitle: string) => {
    setActiveSection(activeSection === menuTitle ? null : menuTitle);
  };
  
  return (
    <nav className="main-navigation-container">
      <div className="main-navigation">
        <NavigationMenu.Root orientation="horizontal" className="nav-root">
          <NavigationMenu.List className="nav-list-horizontal">
            {menuItems.map((item) => (
              <NavigationMenu.Item key={item.title} className="nav-item-horizontal">
                {item.items ? (
                  <DropdownMenu.Root open={activeSection === item.title} onOpenChange={() => handleMenuToggle(item.title)}>
                    <DropdownMenu.Trigger className="nav-dropdown-trigger">
                      {item.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`dropdown-arrow ${activeSection === item.title ? 'open' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </DropdownMenu.Trigger>
                    
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content className="nav-dropdown-content" sideOffset={4}>
                        {item.items.map((subItem) => (
                          <DropdownMenu.Item key={subItem.title} className="nav-dropdown-item">
                            <Link href={subItem.link}>{subItem.title}</Link>
                          </DropdownMenu.Item>
                        ))}
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                ) : (
                  <Link href={item.link || '/'} className="nav-link-horizontal">
                    {item.title}
                  </Link>
                )}
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
      
      <div className="breadcrumb-container">
        <div className="breadcrumbs">
          {currentPage.breadcrumbs.map((crumb, index) => (
            <span key={crumb.href}>
              {index > 0 && <span className="breadcrumb-separator">/</span>}
              {index === currentPage.breadcrumbs.length - 1 ? (
                <span className="breadcrumb-item current">{crumb.title}</span>
              ) : (
                <Link href={crumb.href} className="breadcrumb-item">
                  {crumb.title}
                </Link>
              )}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}