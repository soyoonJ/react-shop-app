"use client";
import styles from "./NavbarProvider.module.scss";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import React from "react";

const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {isAdmin ? (
        <div className={styles.admin}>
          <div className={styles.navbar}>
            <Navbar />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default NavbarProvider;
