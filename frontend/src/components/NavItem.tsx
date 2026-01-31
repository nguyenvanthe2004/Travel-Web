import { NavLink } from "react-router-dom";

interface NavItemData {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface NavItemProps {
  item: NavItemData;
  onClick: (path: string) => void;
}

const NavItem = ({ item, onClick }: NavItemProps) => {
  return (
    <NavLink
      to={item.path}
      onClick={() => onClick?.(item.path)}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors
        ${
          isActive
            ? "bg-[#0F8FA0] text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className="material-symbols-outlined text-xl">
            {item.icon}
          </span>
          <span
            className={`text-sm ${
              isActive ? "font-semibold" : "font-medium"
            }`}
          >
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default NavItem;