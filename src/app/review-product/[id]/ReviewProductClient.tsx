"use client";

import Button from "@/components/button/Button";
import Heading from "@/components/heading/Heading";
import Loader from "@/components/loader/Loader";
import { db } from "@/firebase/firebase";
import useFetchDocument from "@/hooks/useFetchDocument";
import { selectUserID, selectUserName } from "@/redux/slice/authSlice";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import styles from "./ReviewProduct.module.scss";

const ReviewProductClient = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");

  const router = useRouter();
  const { id } = useParams();

  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  const { document: product } = useFetchDocument("products", id);

  const submitReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();

    const reviewData = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewData);
      router.push(`/product-details/${id}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <section className={styles.review}>
      <Heading title="상품평 작성하기" />
      {product === null ? (
        <Loader basic />
      ) : (
        <div>
          <p>
            <b>상품 이름:</b>
            {product.name}
          </p>
          <Image
            src={product.imageURL}
            alt={product.name}
            width={100}
            height={100}
            priority
          />
        </div>
      )}

      <div className={styles.card}>
        <form onSubmit={submitReview}>
          <label>평점: </label>
          <Rating initialValue={rate} onClick={(rate) => setRate(rate)} />

          <label>상품평</label>
          <textarea
            value={review}
            required
            onChange={(e) => setReview(e.target.value)}
            cols={30}
            rows={10}
          ></textarea>

          <Button type="submit">상품평 작성하기</Button>
        </form>
      </div>
    </section>
  );
};

export default ReviewProductClient;
