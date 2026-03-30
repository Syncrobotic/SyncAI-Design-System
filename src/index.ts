import './globals.css';

/* ── shadcn/ui primitives ── */
export {
  AlertDialog as AlertDialogRoot,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction as AlertDialogActionPrimitive,
  AlertDialogCancel,
} from './components/ui/alert-dialog';

export {
  Button as ButtonPrimitive,
  buttonVariants,
} from './components/ui/button';

export {
  Breadcrumb as BreadcrumbPrimitive,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './components/ui/breadcrumb';

export { Badge as BadgePrimitive, badgeVariants } from './components/ui/badge';
export { Input as InputPrimitive, Textarea } from './components/ui/input';
export { Label } from './components/ui/label';
export { Progress as ProgressPrimitive } from './components/ui/progress';
export { Switch as SwitchPrimitive } from './components/ui/switch';

export {
  Tabs as TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './components/ui/tabs';

export {
  Tooltip as TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './components/ui/tooltip';

export { cn } from './lib/utils';

/* ── Orbie components (high-level) ── */
export {
  AlertDialog,
  type AlertDialogAction,
  type AlertDialogLayout,
  type AlertDialogProps,
} from './components/AlertDialog';
export { Breadcrumb, type BreadcrumbEntry, type BreadcrumbProps } from './components/Breadcrumb';
export { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from './components/Button';
export { Input, type InputProps, type InputState } from './components/Input';
export { Field, type FieldProps } from './components/Field';
export { Pagination, type PaginationProps } from './components/Pagination';
export { Progress, type ProgressProps } from './components/Progress';
export { Sidebar, type SidebarProps, type SidebarGroup, type SidebarItem } from './components/Sidebar';
export { Switch, type SwitchProps } from './components/Switch';
export { Tabs, type TabsProps, type TabsItem } from './components/Tabs';
export { Tooltip, type TooltipProps } from './components/Tooltip';
export {
  DatePicker,
  DatePickerCalendar,
  getCalendarGrid,
  isSameDay,
  startOfDay,
  startOfMonth,
  type CalendarCell,
  type DatePickerCalendarProps,
  type DatePickerProps,
} from './components/DatePicker';
export {
  Badge,
  type BadgeLayout,
  type BadgeProps,
  type BadgeShape,
  type BadgeTone,
} from './components/Badge';
export { Icon, type IconProps } from './components/Icon';
export {
  ORBIE_FIGMA_NODE_COLORS_BOARD,
  ORBIE_FIGMA_NODE_ICONS_PAGE,
  ORBIE_ICON_NAMES,
  ORBIE_UI_KIT_FIGMA_FILE,
  orbieIconMap,
  type OrbieIconName,
} from './icons';
