
'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiMail } from 'react-icons/fi';
import { BookOpen, Users, Award } from 'lucide-react';
import { Star } from 'lucide-react';

// --------------------
// 3D Models (procedural)
// --------------------

// Rotating floating Book model
function BookModel({ mergePhase }: { mergePhase: number }) {
 const ref = useRef<any>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    // rotation speed reduces as mergePhase advances
    const speed = 0.6 * (1 - Math.min(mergePhase, 1) * 0.9);
    ref.current.rotation.y += delta * speed;
    ref.current.position.y = 0.18 + Math.sin(state.clock.elapsedTime * 1.4) * 0.03 - mergePhase * 0.25;
    // move towards center when merging
    ref.current.position.x = -0.9 + mergePhase * 0.9;
    ref.current.scale.setScalar(1 - mergePhase * 0.25);
  });

  return (
    <group ref={ref}>
      {/* pages */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.1, 0.14, 0.7]} />
        <meshStandardMaterial color={'#f7f7f3'} metalness={0.15} roughness={0.6} />
      </mesh>

      {/* top cover */}
      <mesh position={[0, 0.08, -0.01]} rotation={[-0.28, 0, 0]}>
        <boxGeometry args={[1.14, 0.02, 0.74]} />
        <meshStandardMaterial color={'#7c4dff'} metalness={0.7} roughness={0.18} />
      </mesh>

      {/* bottom cover */}
      <mesh position={[0, -0.08, -0.01]} rotation={[0.28, 0, 0]}>
        <boxGeometry args={[1.14, 0.02, 0.74]} />
        <meshStandardMaterial color={'#5b21b6'} metalness={0.5} roughness={0.22} />
      </mesh>

      {/* spine */}
      <mesh position={[-0.55, 0, 0]}>
        <boxGeometry args={[0.02, 0.14, 0.74]} />
        <meshStandardMaterial color={'#3b0764'} />
      </mesh>
    </group>
  );
}

// Rotating AI Sphere model (glowing)
function SphereModel({ mergePhase }: { mergePhase: number }) {
const ref = useRef<any>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.7 * delta * (1 - Math.min(mergePhase, 1) * 0.9);
    ref.current.position.y = 0.15 + Math.cos(state.clock.elapsedTime * 1.2) * 0.04 - mergePhase * 0.25;
    // move towards center when merging
    ref.current.position.x = 0.9 - mergePhase * 0.9;
    ref.current.scale.setScalar(1 - mergePhase * 0.25);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.45, 48, 48]} />
        <meshStandardMaterial emissive={'#60a5fa'} emissiveIntensity={0.85} color={'#0ea5e9'} metalness={0.5} roughness={0.2} />
      </mesh>
      {/* subtle inner core */}
      <mesh scale={[0.6, 0.6, 0.6]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={'#9beafe'} opacity={0.35} transparent />
      </mesh>
    </group>
  );
}

// Core Orb that appears when merged
function CoreOrb({ visible, intensity }: { visible: boolean; intensity: number }) {
const ref = useRef<any>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    ref.current.scale.setScalar(0.6 + intensity * 0.9);
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.45, 64, 64]} />
        <meshStandardMaterial color={'#b794f4'} emissive={'#7c4dff'} emissiveIntensity={visible ? 1.6 * intensity : 0} metalness={0.9} roughness={0.05} transparent opacity={0.95} />
      </mesh>

      {/* halo ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.65, 0.9, 64]} />
        <meshBasicMaterial color={'#b794f4'} transparent opacity={visible ? 0.18 * intensity : 0} />
      </mesh>
    </group>
  );
}

// 3D Canvas wrapper: manages mergePhase state to animate book + sphere -> core
function Hero3D({ mergeTriggered }: { mergeTriggered: boolean }) {
  // mergePhase goes from 0 => 1 over time when triggered
  const [mergePhase, setMergePhase] = useState(0);
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    if (mergeTriggered) {
      const duration = 1400; // ms
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const t = Math.min(1, elapsed / duration);
        setMergePhase(t);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    } else {
      // reverse
      const duration = 800;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const t = Math.max(0, 1 - elapsed / duration);
        setMergePhase(t);
        if (t > 0) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(raf);
  }, [mergeTriggered]);

  return (
    <div className="w-full h-[440px] md:h-[520px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 1.3, 3.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.7} position={[4, 5, 5]} />
        <pointLight intensity={0.9 * Math.min(1, 0.5 + mergePhase)} position={[0, 1.5, 2]} />

        <Suspense fallback={null}>
          <Float floatIntensity={0.9} rotationIntensity={0.3}>
            {/* Book and sphere move toward center based on mergePhase */}
            <BookModel mergePhase={mergePhase} />
            <SphereModel mergePhase={mergePhase} />
            <CoreOrb visible={mergePhase > 0.05} intensity={mergePhase} />
          </Float>

          <Environment preset="studio" />
        </Suspense>

        <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}

// --------------------
// Helper: animated counter hook
// --------------------
function useCountUp(target: number, duration = 1500, startAt = 0) {
  const [value, setValue] = useState(startAt);
  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(1, elapsed / duration);
      const v = Math.floor(startAt + (target - startAt) * t);
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, startAt]);
  return value;
}

// --------------------
// Main Page
// --------------------
export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mergeTriggered, setMergeTriggered] = useState(false);

  // Counters values (you can fetch dynamically later)
  const students = useCountUp(25000, 1600);
  const mentors = useCountUp(200, 1300);
  const certifications = useCountUp(1200, 1400);
  const hours = useCountUp(780000, 1600); // total learning hours (display nicely)
  const countries = useCountUp(42, 1000);
  const projects = useCountUp(5400, 1400);

  const socialLinks = [
    { href: 'https://linkedin.com', icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v14H0zM8 8h4.8v1.9h.1c.7-1.2 2.4-2.5 4.9-2.5 5.2 0 6.1 3.4 6.1 7.8V22H19v-6.8c0-1.6 0-3.6-2.2-3.6-2.2 0-2.5 1.7-2.5 3.5V22H8z"/></svg>, label: 'LinkedIn' },
    { href: 'https://twitter.com', icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.92c-.7.32-1.46.53-2.26.63a3.98 3.98 0 0 0-6.79 3.63A11.36 11.36 0 0 1 3.16 4.9a3.98 3.98 0 0 0 1.23 5.31c-.58-.02-1.12-.18-1.6-.44v.04c0 1.94 1.38 3.56 3.21 3.93-.34.09-.7.13-1.07.13-.26 0-.52-.03-.77-.07.52 1.63 2.04 2.81 3.84 2.85A7.98 7.98 0 0 1 2 19.54 11.32 11.32 0 0 0 8.29 21c7.55 0 11.7-6.26 11.7-11.69v-.53A8.2 8.2 0 0 0 22 5.92z"/></svg>, label: 'Twitter' },
    { href: 'https://facebook.com', icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.4 3.3-3.4.95 0 1.96.17 1.96.17v2.15h-1.1c-1.08 0-1.42.67-1.42 1.36V12h2.42l-.39 2.9h-2.03v7A10 10 0 0 0 22 12z"/></svg>, label: 'Facebook' },
  ];

  // trigger merge automatically after a short delay for effect
  useEffect(() => {
    const t = setTimeout(() => setMergeTriggered(true), 1200);
    return () => clearTimeout(t);
  }, []);

  function RobotModel() {
  const ref = useRef<any>(null);


  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
  });

  return (
    <group ref={ref} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#dfe6ff" metalness={0.4} roughness={0.1} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.18, 1.22, 0.35]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial emissive="#00d9ff" emissiveIntensity={1.4} color="#00e4ff" />
      </mesh>
      <mesh position={[0.18, 1.22, 0.35]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial emissive="#00d9ff" emissiveIntensity={1.4} color="#00e4ff" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.5, 0.55, 1.2, 32]} />
        <meshStandardMaterial color="#e8ecff" metalness={0.3} roughness={0.3} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.7, 0.5, 0]}>
        <boxGeometry args={[0.18, 0.8, 0.18]} />
        <meshStandardMaterial color="#cfd6ff" />
      </mesh>
      <mesh position={[0.7, 0.5, 0]}>
        <boxGeometry args={[0.18, 0.8, 0.18]} />
        <meshStandardMaterial color="#cfd6ff" />
      </mesh>

      {/* Desk (hologram table) */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[2.2, 0.1, 1.2]} />
        <meshStandardMaterial color="#89c4ff" opacity={0.25} transparent />
      </mesh>
    </group>
  );
}
function KnowledgeCubes() {
  const cubes = new Array(4).fill(0);

  return (
    <group>
      {cubes.map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 2) * 1.2,
            0.6 + (i % 2) * 0.4,
            Math.cos(i * 2) * 1.0,
          ]}
          rotation={[0.4, i * 1.3, 0.2]}
        >
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#8b5cf6"
            emissiveIntensity={0.6}
            metalness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}


  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-indigo-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/50 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <Link href="#" className="flex items-center gap-3">

  <img
    src="/algo1_logo.jpg"
    alt="Algoforge Logo"
    width={42}
    height={42}
    className="rounded-full shadow-md object-cover"
  />


            <div>
              <div className="text-lg font-semibold">AlgoForge Studios</div>
              <div className="text-xs text-slate-500 -mt-1">Learning Management System</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
       
            <Link href="/login" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow">
              Login
            </Link>
          </nav>

          <button className="md:hidden text-2xl p-2" onClick={() => setIsOpen((s) => !s)} aria-label="menu">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="flex flex-col gap-2">
              <Link href="/login" className="py-2">Login</Link>
              <Link href="/contact" className="py-2">Contact</Link>
            </div>
          </div>
        )}
      </header>



      {/* HERO – ROBOT + LEARNING INTERACTION */}
<section className="relative overflow-hidden">
  {/* BACKGROUND SHAPES */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute -left-28 -top-40 w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-purple-300 to-indigo-300 opacity-40 blur-3xl"></div>
    <div className="absolute right-[-120px] bottom-[-120px] w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-cyan-200 to-blue-200 opacity-30 blur-3xl"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-24">
    <div className="grid lg:grid-cols-2 gap-10 items-center">

      {/* LEFT — TITLE + TEXT */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
        >
           Where <span className="text-slate-800">Learning</span> meets <span className="text-slate-800">Intelligence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mt-6 max-w-xl text-lg text-slate-700"
        >
                         AlgoForge combines expert-led content, live mentorship, and AI-driven assessments — all inside a beautiful learning experience. 
                         Watch knowledge and technology combine into one powerful core.
        </motion.p>


  

        <div className="mt-6 flex gap-4">
          <Link
            href="/login"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium shadow-lg"
          >
            Get Started
          </Link>
       
        </div>
      </div>

      {/* RIGHT — 3D ROBOT + LEARNING HOLOGRAM */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative"
      >
        <div className="w-full h-[440px] md:h-[520px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight intensity={1.2} position={[4, 6, 3]} />

            <Suspense fallback={null}>
              <Float floatIntensity={0.8} rotationIntensity={0.2}>
                {/* ROBOT */}
                <RobotModel />

                {/* FLOATING KNOWLEDGE CUBES */}
                <KnowledgeCubes />
              </Float>

              <Environment preset="city" />
            </Suspense>

            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
          </Canvas>
        </div>

     
      </motion.div>
    </div>
  </div>
</section>


      {/* Features section (enhanced + expanded) */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-purple-700 mb-10">
            Why Choose AlgoForge LMS?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: BookOpen, title: "Expert-Led Content", desc: "Engaging video lectures, real-world projects and mentor-led cohorts." },
              { icon: Users, title: "Collaborative Community", desc: "Peer reviews, group projects, and live mentor sessions." },
              { icon: Award, title: "Verified Certifications", desc: "Industry-recognized certificates & portfolio-ready projects." },
              { icon: BookOpen, title: "AI-Powered Assessments", desc: "Adaptive quizzes, instant feedback and personalised paths." },
              { icon: Users, title: "Real Projects", desc: "Build production-grade projects and showcase them." },
              { icon: Award, title: "Placement Support", desc: "Interview prep, resume reviews and hiring pipelines." },
            ].map((f, i) => (
              <motion.div key={i} className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition" whileHover={{ scale: 1.04 }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.6 }}>
                <f.icon className="w-12 h-12 text-purple-600 mx-auto" />
                <h3 className="mt-4 text-2xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-gray-500">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section (larger and animated when in viewport) */}
      <section className="py-20 text-center bg-gradient-to-r from-blue-50 to-purple-50">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-gray-800 mb-10">
          Our Impact in Numbers
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
          {[
            { label: "Students", value: `${Math.floor(students / 1000)}K+` },
            { label: "Mentors", value: `${mentors}+` },
            { label: "Certifications", value: `${certifications}+` },
            { label: "Learning Hours", value: `${Math.floor(hours / 1000).toLocaleString()}K+` },
          ].map((stat, i) => (
            <motion.div key={i} className="p-6 bg-white/70 rounded-2xl shadow-md hover:shadow-xl" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, duration: 0.7 }}>
              <p className="text-3xl font-bold text-purple-600">{stat.value}</p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>




{/* steps to enroll */}

<section className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
      How Our LMS Works
    </h2>

    <div className="grid md:grid-cols-4 gap-10">
      {[
        {
          step: "01",
          title: "Login",
          desc: "Login into account using secure institutional."
        },
        {
          step: "02",
          title: "Choose Your Course",
          desc: " personalized learning tracks and modules."
        },
        {
          step: "03",
          title: "Start Learning",
          desc: "Access videos, notes, assignments, and interactive tools."
        },
        {
          step: "04",
          title: "Track & Improve",
          desc: "Get analytics, insights, and milestone certificates."
        }
      ].map((s, i) => (
        <div key={i} className="text-center p-8 bg-gray-50 rounded-2xl shadow">
          <p className="text-4xl font-bold text-purple-600 mb-4">{s.step}</p>
          <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
          <p className="text-gray-600">{s.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* vision and mission */}

      <section className="py-24 bg-gradient-to-r from-purple-50 to-blue-50">
  <div className="max-w-5xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-purple-700 mb-8">Our Vision & Mission </h2>
    <p className="text-gray-700 text-lg leading-relaxed mb-12">
      Our goal is simple yet powerful — to redefine how learners interact with knowledge.
      We combine human-centered design, advanced analytics, and AI-first technologies
      to create a learning experience that is intuitive, engaging, and 
      built for the future of education.
    </p>
    <p className="text-gray-700 text-lg leading-relaxed">
      To build an intelligent learning ecosystem where students, educators, and 
      institutions connect seamlessly.  
      A future where education is accessible, personalized, measurable, and truly impactful.
    </p>
  </div>
</section>



      {/* Testimonials */}
      <section className="py-20 bg-white text-center">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-purple-700 mb-10">
          What Our Learners Say
        </motion.h2>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 justify-center">
          {[
            { name: "Aarav Mehta", feedback: "The best learning platform! The UI is beautiful and interactive.", rating: 5 },
            { name: "Sana Kapoor", feedback: "I love the animations and community-driven experience.", rating: 4 },
            { name: "Riya Sharma", feedback: "Certifications helped me land a new role — mentors were great!", rating: 5 },
          ].map((t, i) => (
            <motion.div key={i} className="p-6 bg-purple-50 rounded-2xl shadow-lg flex-1 hover:shadow-2xl" whileHover={{ scale: 1.03 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <p className="text-gray-700 italic mb-4">“{t.feedback}”</p>
              <div className="flex justify-center mb-2">
                {Array(t.rating).fill(0).map((_, j) => (<Star key={j} className="w-5 h-5 text-yellow-400" />))}
              </div>
              <p className="font-semibold text-purple-700">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-400 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm">&copy; {new Date().getFullYear()} Algoforge Studios. All Rights Reserved.</div>

            <div className="flex items-center gap-6">
              <div className="flex space-x-4">
                {socialLinks.map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} className="hover:opacity-90">
                    <span className="text-white opacity-95">{link.icon}</span>
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="text-lg" />
                <a href="mailto:enquiry@algoforgestudios.com" className="text-white">enquiry@algoforgestudios.com</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
