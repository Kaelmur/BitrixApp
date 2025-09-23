import { Control, FieldValues, Path } from "react-hook-form";

type SortKey = "name" | "status" | "completed";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
}

interface Employee {
  name: string;
  email: string;
  avatar: string;
}

interface Payment {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "unpaid" | "processing";
  employee: Employee;
  completed: number;
}

interface SortConfig {
  key: SortKey;
  direction: "asc" | "desc";
}

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

interface Props<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: string;
  endAdornment?: React.ReactNode;
}

interface PasswordFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
}

interface Deal {
  ID: string;
  TITLE: string;
  DATE_CREATE: string;
  STAGE_ID: string;
  CONTACT_ID: string;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
}

type ProfileFormProps = {
  user: UserProfile;
};

interface JwtPayload {
  id: number;
  email: string;
  name: string;
}

interface RepeatOrderDeal {
  TITLE: string;
  STAGE_ID: string;
  CONTACT_ID: string | number;
}
