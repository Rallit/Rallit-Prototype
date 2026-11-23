import { NavLink } from "react-router";

type BottomNavItemProps = {
  label: string;
  href: string;
  icon: string;
  activeIcon: string;
};

export function BottomNavItem({
  label,
  href,
  icon,
  activeIcon,
}: BottomNavItemProps) {
  return (
    <NavLink
      to={href}
      end
      className={({ isActive }) =>
        `typography-caption-r-medium flex w-16 shrink-0 flex-col items-center justify-center gap-micro py-inset-medium text-center no-underline ${isActive ? "text-fg-neutral-default" : "text-fg-neutral-subtle"}`
      }
    >
      {({ isActive }) => (
        <>
          <span className="grid size-6 place-items-center">
            <img src={isActive ? activeIcon : icon} alt="" className="block" />
          </span>
          {label}
        </>
      )}
    </NavLink>
  );
}
