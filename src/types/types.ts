export interface Widget {
  id: string;
  title: string;
  content: string;
  footer: string;
}

export interface WidgetProps {
  title: string;
  content: React.ReactNode;
  footer?: string;
  isEditing?: boolean;
  deleteWidget?: () => void;
}
