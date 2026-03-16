import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function AIDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex cursor-default">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
