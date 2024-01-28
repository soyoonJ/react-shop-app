"use client";
import { db } from "@/firebase/firebase";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";

const useFetchDocuments = (
  collectionName: string,
  arg: [string, WhereFilterOp, string]
) => {
  const [documents, setDocuments] = useState<DocumentData>([]);
  const getDocuments = useCallback(async () => {
    const q = query(
      collection(db, collectionName),
      where(arg[0], arg[1], arg[2])
    );
    const querySnapshot = await getDocs(q);
    let documentsArray: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data(),
      };
      documentsArray.push(data);
    });

    setDocuments(documentsArray);
  }, [collectionName, arg[0], arg[1], arg[2]]); // args는 배열이기 때문에 참조하는 주소값이 달라 무한렌더링 일어나게 됨

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  return { documents };
};

export default useFetchDocuments;
