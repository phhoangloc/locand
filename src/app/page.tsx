"use client"
import { use, useEffect, useState } from "react";
import Cover from "@/components/home/cover";
import Template from "@/components/home/template"
import { ApiItem } from "@/api/client";
import Header from "@/components/home/header";
import Parallax from "@/components/home/parallax";


export default function Home() {
  const [data, setData] = useState<any[]>([])

  const getItem = async () => {
    const result = await ApiItem({ archive: "blog" })
    if (result.success) {
      setData(result.data)
    } else {
      setData([])
    }
  }
  useEffect(() => {
    getItem()
  }, [])
  return (
    <div className="">
      <Header />
      <Parallax data={data} />
    </div>
  );
}
