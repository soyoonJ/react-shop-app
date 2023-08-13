"use client";

import { auth } from "@/firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import InnerHeader from "../innerHeader/InnerHeader";
import styles from "./Header.module.scss";

const Header = () => {
  const pathname = usePathname();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
      } else {
        setDisplayName("");
        // 유저 정보를 리덕스 스토어에서 지우기
      }
    });
  }, []);

  const logoutUser = (e) => {
    signOut(auth)
      .then(() => {
        toast.success("로그아웃 되었습니다.");
        router.push("/");
      })
      .catch(() => {
        toast.error(error.message);
      });
  };

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/reset"
  ) {
    return null;
  }

  return (
    <header>
      <div className={styles.loginBar}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href={"/login"}>로그인</Link>
          </li>
          <li className={styles.item}>
            <Link href={"/admin/dashboard"}>관리자</Link>
          </li>
          <li className={styles.item}>
            <Link href={"/order-history"}>주문 목록</Link>
          </li>
          <li className={styles.item}>
            <Link href={"/"} onClick={logoutUser}>
              로그아웃
            </Link>
          </li>
          <li className={styles.item}>
            <Link href={"/"}>제휴 마케팅</Link>
          </li>
          <li className={styles.item}>
            <Link href={"/"}>쿠팡 플레이</Link>
          </li>
          <li className={styles.item}>
            <Link href={"/"}>고객센터</Link>
          </li>
        </ul>
      </div>

      {pathname.startsWith("/admin") ? null : <InnerHeader />}
    </header>
  );
};

export default Header;
