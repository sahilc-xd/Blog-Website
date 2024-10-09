// import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
export function Quote(): any {
  return (
    <>
      <LampContainer>
        {/* <div className="absolute h-auto place-content-center">MEDIUM</div> */}
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className=" bg-gradient-to-br from-slate-200 to-slate-100 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl mt-8">
          <div className="flex justify-center">
            <div className="max-w-lg  ">
              <div className=" text-3xl font-bold">
                "The customer support I received was exceptional. The support
                team went above and beyond to address my concerns"
              </div>
              <div className="max-w-md text-right text-xl font-semibold ">
                Julies Winfield
              </div>
              <div className=" max-w-md  text-right text-sm font-light text-slate-400 ">
                CEO | Acne Corp
              </div>
            </div>
          </div>
        </motion.h1>
      </LampContainer>
    </>
  );
}
