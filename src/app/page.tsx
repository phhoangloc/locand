"use client"
import { useEffect, useState } from "react";
import Cover from "@/components/home/cover";
import Template from "@/components/home/template"
import { ApiItem } from "@/api/client";
import Header from "@/components/home/header";


export default function Home() {

  return (

    <div>
      <Header />
      <Cover />
      <Template />
    </div>
  );
}
