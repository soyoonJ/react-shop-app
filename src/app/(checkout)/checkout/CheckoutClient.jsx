// https://docs.tosspayments.com/reference/js-sdk
"use client";
import React, { FormEvent } from "react";
import styles from "./Checkout.module.scss";
import Heading from "@/components/heading/Heading";
import CheckoutForm from "@/components/checkoutForm/CheckoutForm";
import Button from "@/components/button/Button";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "@/redux/slice/cartSlice";
import { toast } from "react-toastify";
import { selectEmail, selectUserID } from "@/redux/slice/authSlice";
import { selectShippingAddress } from "@/redux/slice/checkoutSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

const CheckoutClient = () => {
  const userID = useSelector(selectUserID);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const userEmail = useSelector(selectEmail);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tossPayment = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
    );

    tossPayment
      .requestPayment("카드", {
        amount: cartTotalAmount,
        orderId: Math.random().toString(36).slice(2),
        orderName: "주문",
      })
      .then(async function (data) {
        // 결제 승인 API
        const { orderId, paymentKey, amount } = data;
        const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

        const url = "https://api.tosspayments.com/v1/payments/confirm";
        const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString(
          "base64"
        );

        const confirmResponse = await fetch(url, {
          method: "post",
          body: JSON.stringify({
            amount,
            orderId,
            paymentKey,
          }),
          headers: {
            Authorization: `Basic ${basicToken}`,
            "Content-Type": "application/json",
          },
        }).then((response) => response.json());

        console.log("confirmResponse", confirmResponse);

        const today = new Date();
        const date = today.toDateString();
        const time = today.toLocaleDateString();

        const orderData = {
          userID,
          userEmail,
          orderDate: date,
          orderTime: time,
          orderAmount: amount,
          orderStatus: "주문수락",
          cartItems,
          shippingAddress,
          createdAt: Timestamp.now().toDate(),
        };

        await addDoc(collection(db, "orders"), orderData);
        dispatch(CLEAR_CART());

        router.push(`/checkout-success?orderId=${orderId}`);
      })
      .catch((error) => {
        if (error.code === "USER_CANCEL") {
          // 결제 고객이 결제창을 닫았을 때
          toast.error("결제창이 닫아졌습니다.");
        } else if (error.code === "INVALID_CARD_COMPANY") {
          // 유효하지 않은 카드 코드에 대한 에러 처리
        }
      });
  };

  return (
    <section>
      <div className={styles.checkout}>
        <Heading title="주문하기" />
        <form onSubmit={handleSubmit}>
          <div className={styles.card}>
            <CheckoutForm />
          </div>
          <div>
            <Button type="submit">토스를 이용해서 결제하기</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutClient;
