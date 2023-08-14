import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
  params,
  children,
}: {
  params: { storeId: string };
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("sing-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });
  if (!store) {
    redirect("/");
  }
  return (
    <>
      <p>This is nav bar</p>
      {children}
    </>
  );
}
