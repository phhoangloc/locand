'use client'
import TopPlay from "@/component/display/topPlay";
import { useState } from "react";


export default function Home() {

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ width: "75%", margin: "auto" }}>
        <TopPlay song={'/audio/The life cycle of a cup of coffee - A.J. Jacobs (128).mp3'} />
      </div>
    </div>
  )
}
