"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";

import { usePathname } from "next/navigation";
import AdminAddSideBar from "./Admin/page";
import RiderAddSideBar from "./Rider/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const pathName = usePathname();
  const modifyPathName = pathName.split("/").join(" > ");
  //   console.log(pathName, modifyPathName);
  return (
    <SidebarProvider>
      {/* Sider */}
      {user && user?.role === "Admin" && <AdminAddSideBar></AdminAddSideBar>}
      {user && user?.role === "Rider" && <RiderAddSideBar></RiderAddSideBar>}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block"></BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage> TrackSy - {modifyPathName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
