// types.ts

export interface NavItem {
    icon: string;
    label: string;
    href: string;
    badge?: number;
}

export interface NavSection {
    label: string;
    items: NavItem[];
}

export interface SidebarProps {
    activePath: string;
}

export interface AdminLayoutProps {
  children: React.ReactNode;
  activePath?: string;
}

