import { Payment } from "@/types";
import {
  FiHome,
  FiUser,
  FiShoppingBag,
  FiCreditCard,
  FiVideo,
} from "react-icons/fi";

export const navItems = [
  { href: "/", label: "Дашборд", icon: FiHome },
  { href: "/profile", label: "Профиль", icon: FiUser },
  { href: "/orders", label: "Заказы", icon: FiShoppingBag },
  { href: "/payments", label: "Платежи", icon: FiCreditCard },
  { href: "/stream", label: "Трансляция", icon: FiVideo },
];

export const payments: Payment[] = [
  {
    id: "321312321",
    date: "16.03.2025",
    amount: "15,000 тг",
    status: "unpaid",
    employee: {
      name: "Иван Иванов",
      email: "ivan@example.com",
      avatar: "/assets/images/profile.svg",
    },
    completed: 0,
  },
  {
    id: "321312322",
    date: "16.03.2025",
    amount: "15,000 тг",
    status: "paid",
    employee: {
      name: "Мария Петрова",
      email: "maria@example.com",
      avatar: "/assets/images/profile.svg",
    },
    completed: 100,
  },
  {
    id: "321312323",
    date: "16.03.2025",
    amount: "15,000 тг",
    status: "processing",
    employee: {
      name: "Алексей Сидоров",
      email: "alex@example.com",
      avatar: "/assets/images/profile.svg",
    },
    completed: 50,
  },
  {
    id: "321312324",
    date: "16.03.2025",
    amount: "15,000 тг",
    status: "paid",
    employee: {
      name: "Ольга Смирнова",
      email: "olga@example.com",
      avatar: "/assets/images/profile.svg",
    },
    completed: 100,
  },
  {
    id: "321312325",
    date: "16.03.2025",
    amount: "15,000 тг",
    status: "processing",
    employee: {
      name: "Дмитрий Кузнецов",
      email: "dmitry@example.com",
      avatar: "/assets/images/profile.svg",
    },
    completed: 30,
  },
];
