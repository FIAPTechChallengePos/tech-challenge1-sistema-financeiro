import React from "react";
// import { Aside } from "./Aside"; // Crie depois se necessário

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-200 dark:bg-blue-violet-50 flex flex-1">
        {/* <Aside className="hidden xl:block" /> */}
        <main className="flex flex-col flex-1">{children}</main>
      </div>
    </div>
  );
} 