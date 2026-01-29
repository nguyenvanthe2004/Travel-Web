export interface CustomDropZoneProps {
  value?: string | null;
  onChange: (url: string) => void;
  onRemove: () => void;
  className?: string;
  maxSize?: number;
  accept?: string;
  disabled?: boolean;
  label?: string;
  description?: string;
  previewUrl?: string;
}

export interface TableColumn<T> {
  key: string;
  title: string;
  headerClassName?: string;
  cellClassName?: string;
  render: (row: T) => React.ReactNode;
  hideOnMobile?: boolean;
}
export interface CustomTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyText?: string;
  className?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export interface NavItemData {
  key: string;
  label: string;
  icon: string;
  path: string;
}

export interface NavItemProps {
  item: NavItemData;
  onClick: (path: string) => void;
}