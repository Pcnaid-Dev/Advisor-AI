
import { IconType } from "./components/Icon";

interface NavItem {
  name: string;
  icon: IconType;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'Overview', icon: 'home', path: '#' },
  { name: 'Entities', icon: 'building', path: '#' },
  { name: 'Retail Locations', icon: 'store', path: '#' },
  { name: 'Projects', icon: 'folder', path: '#' },
  { name: 'Calendar', icon: 'calendar', path: '#' },
  { name: 'Chat', icon: 'chat', path: '#' },
  { name: 'Documents', icon: 'document', path: '#' },
  { name: 'Finance', icon: 'creditCard', path: '#' },
  { name: 'Automation', icon: 'sparkles', path: '#' },
];
