import { formatTime } from "@/utils/day";
import React from "react";
import { Rating } from "react-simple-star-rating";
import styles from "./ProductReviewItem.module.scss";

const ProductReviewItem = ({ rate, review, reviewDate, userName }) => {
  return (
    <div className={styles.review}>
      <p className={styles.writer}>
        {userName} <span>님의 상품평</span>
      </p>
      <Rating initialValue={rate} readonly size={25} />
      <p className={styles.content}>{review}</p>
      <p className={styles.date}>
        {/* {Intl.DateTimeFormat().format(new Date(reviewDate))} */}
        {formatTime(reviewDate)}
      </p>
    </div>
  );
};

export default ProductReviewItem;
