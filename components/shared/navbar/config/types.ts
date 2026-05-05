// /components/Navbar/config/types.ts

export interface NavItem {
  label: string;
  href?: string; // optional (because dropdown may not need direct link)
  children?: {
    label: string;
    href: string;
  }[];
}

export interface NavbarConfig {
  logo: string;
  navItems: NavItem[];
  cta?: {
    label: string;
    href: string;
  };
}