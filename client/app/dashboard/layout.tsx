import UserRequired from "@/components/routeGuards/UserRequired";
import { AuthProvider } from "@/providers/authentication";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <UserRequired>{children}</UserRequired>;
}
