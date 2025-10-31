'use client'

import PortableText from "../../shared/ui/portable-text";
import * as demo from "@/sanity/lib/demo";

export default function Hero() {
  const title = demo.title;
  const description = demo.description;

  return (
    <section className='grid h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] grid-rows-2 gap-8 p-6'>
        <div className='relative h-2/5 md:h-3/3 bg-foreground row-span-1'>
            <video 
                autoPlay 
                muted 
                loop 
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src='/video/meteor_shower_1_.webm' type='video/webm' />
            </video>
        </div>
        <div className='grid grid-cols-12 grid-rows-6 gap-y-4 gap-x-4'>
            <h1 className='col-span-12 row-start-1 md:col-span-8 text-start text-4xl md:text-5xl font-medium uppercase tracking-widest'>
            {title}
            </h1>
            <div className='col-span-12 row-start-2  md:col-span-4 md:col-start-9 md:row-start-1 text-start  font-light'>
              <PortableText
                className="prose-lg"
                value={description}
              />
            </div>
        </div>
    </section>
  )
}