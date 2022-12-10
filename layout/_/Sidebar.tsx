export interface SidebarItem {
  name: string;
  to: string;
}

export interface SidebarConfig {
  [key: string]: {
    title?: string;
    items: SidebarItem[];
  };
}

export default function Sidebar({ items }: { items: SidebarConfig }) {
  return (
    <div>
      {Object.entries(items).map(([categoryName, category]) => {
        return (
          <Category
            name={category.title || categoryName}
            items={category.items}
          />
        );
      })}
    </div>
  );
}

function Category({ items, name }: { items: SidebarItem[]; name: string }) {
  return (
    <div>
      <div>{name}</div>
      <div>
        {items.map((item) => <SidebarItem name={item.name} to={item.to} />)}
      </div>
    </div>
  );
}

function SidebarItem({ name, to }: { name: string; to: string }) {
  return (
    <div>
      <a href={to}>
        {name}
      </a>
    </div>
  );
}
