'use client'
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import messages from "@/src/messages.json"
import AutoPlay from "embla-carousel-autoplay"

const Home = () => {
  return(
    <>
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 h-full w-full bg-white text-black mt-2">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl text-base">Dive into the world of Anonymous Conversation</h1>
        <p className="mt-3 md-mt-4 text-base md:text-lg">Explore Mystery Message - where your 
          
          identity reamain a secret</p>
      </section>
      <Carousel 
      plugins={[AutoPlay({delay:2000})]}
      className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          messages.map((message , index) => (
            <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardHeader>{message.title}</CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-lg font-semibold">{message.content}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          ))
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </main>
    <footer className="text-center p-4 md:p-6"> @ 2026 Mystery Message. All rights reserved</footer>
    </>

  )
}

export default Home