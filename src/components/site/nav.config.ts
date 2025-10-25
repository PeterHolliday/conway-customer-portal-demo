export type NavLink =
  | { type: "link"; label: string; href: string }
  | { type: "group"; label: string; items: { label: string; href: string }[] };

export const NAV: NavLink[] = [
  { type: "link", label: "Home", href: "/" },
  {
    type: "group",
    label: "Orders",
    items: [
      { label: "Orders", href: "/orders" },
      { label: "Order Requests", href: "/order-requests" },
    ],
  },
  { type: "link", label: "Documents", href: "/documents" },
  { type: "link", label: "FAQ", href: "/faq" },
  { type: "link", label: "Contact Us", href: "/contact" },
];
