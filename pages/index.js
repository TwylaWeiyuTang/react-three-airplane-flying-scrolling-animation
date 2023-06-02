import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <>
      <Head>
        <title>Flying with me</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Experience />
      </main>
    </>
  );
}
