import { ReactNode } from "react";

export function Section({ children, className = "", id }: { children: ReactNode, className?: string, id?: string }) {
  return (
    <section id={id} className={`w-full min-h-screen flex flex-col justify-center px-10 lg:px-24 border-b border-white/5 ${className}`}>
      {children}
    </section>
  );
}
