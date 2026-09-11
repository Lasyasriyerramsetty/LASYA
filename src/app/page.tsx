"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RecruiterMode from "@/components/RecruiterMode";
import EasterEgg from "@/components/EasterEgg";
import ScrollProgress from "@/components/motion/ScrollProgress";
import LinkCueProvider from "@/components/motion/LinkCue";
import { easeOut } from "@/lib/motion";

const Divider = () => (
  <motion.div
    className="divider"
    style={{ margin: "0 48px" }}
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.7, ease: easeOut }}
  />
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [recruiter, setRecruiter] = useState(false);
  const handleLoaded = useCallback(() => setLoading(false), []);

  return (
    <LinkCueProvider>
      <CustomCursor />
      <ScrollProgress />
      <AnimatePresence>{loading && <Loader onDone={handleLoaded} />}</AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <div className="ambient-wash" aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />
          <Nav onRecruiterMode={() => setRecruiter(true)} />
          <main>
            <Hero />
            <Divider />
            <Projects />
            <Divider />
            <Skills />
            <Divider />
            <Journey />
            <Divider />
            <About />
            <Divider />
            <Contact />
          </main>
          <Footer />
          <EasterEgg />

          <AnimatePresence>
            {recruiter && <RecruiterMode onClose={() => setRecruiter(false)} />}
          </AnimatePresence>
        </motion.div>
      )}
    </LinkCueProvider>
  );
}
