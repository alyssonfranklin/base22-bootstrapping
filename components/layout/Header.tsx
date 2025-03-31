import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <Link href="/">Organization Portal</Link>
      </div>
      
      <div className="header-actions">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
        </div>
        
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="user-menu-button">
              <Avatar.Root className="avatar-root">
                <Avatar.Fallback className="avatar-fallback">US</Avatar.Fallback>
              </Avatar.Root>
            </button>
          </DropdownMenu.Trigger>
          
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="dropdown-content" sideOffset={5}>
              <DropdownMenu.Item className="dropdown-item">
                <Link href="/profile">Profile</Link>
              </DropdownMenu.Item>
              
              <DropdownMenu.Item className="dropdown-item">
                <Link href="/settings">Settings</Link>
              </DropdownMenu.Item>
              
              <DropdownMenu.Separator className="dropdown-separator" />
              
              <DropdownMenu.Item className="dropdown-item">
                <button className="logout-button">Logout</button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
