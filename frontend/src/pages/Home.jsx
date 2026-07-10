import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LoginModal from "../components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { Coins, Code2, Smartphone, Rocket, Sparkles, PenLine, Wand2, ArrowRight } from "lucide-react";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const highlights = [
    {
      title: "AI Generated Code",
      desc: "Describe the site in plain words. GenWeb.ai writes clean, semantic code behind it.",
      icon: Code2,
    },
    {
      title: "Fully Responsive Layouts",
      desc: "Every layout adapts from a phone to a widescreen monitor, with no extra prompting.",
      icon: Smartphone,
    },
    {
      title: "Production Ready Output",
      desc: "Deploy straight from the editor, or copy the code into your own project.",
      icon: Rocket,
    },
  ];

  const steps = [
    {
      title: "Describe your site",
      desc: "Tell GenWeb.ai what you're building and who it's for, in a sentence or two.",
      icon: PenLine,
    },
    {
      title: "Watch it generate",
      desc: "The AI drafts a complete, responsive layout in seconds, ready to preview live.",
      icon: Wand2,
    },
    {
      title: "Deploy in one click",
      desc: "Ship it to a live URL, or open the editor to fine-tune anything by hand.",
      icon: Rocket,
    },
  ];

  const [openLogin, setOpenLogin] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);
  const [websites, setWebsites] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mouse-reactive background aura. Updates a CSS custom property directly
  // on the node ref, instead of React state, so it stays smooth on every
  // mousemove without triggering re-renders.
  const auraRef = useRef(null);
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!auraRef.current) return;
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;
      auraRef.current.style.setProperty("--aura-x", `${xPercent}%`);
      auraRef.current.style.setProperty("--aura-y", `${yPercent}%`);
    };
    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setOpenProfile(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userData) return;
    const handleGetAllWebsites = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/website/get-all`, {
          withCredentials: true,
        });
        setWebsites(result.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetAllWebsites();
  }, [userData]);

  return (
    <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden">
      {/* Mouse-reactive aura, sits behind all content */}
      <div
        ref={auraRef}
        className="pointer-events-none fixed inset-0 z-0 transition-[background] duration-300 ease-out"
        style={{
          background:
            "radial-gradient(600px circle at var(--aura-x, 50%) var(--aura-y, 30%), rgba(129,90,238,0.16), rgba(59,130,246,0.08) 40%, transparent 70%)",
        }}
      />
      {/* Faint static grid so the aura has something to glow across */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-semibold">GenWeb.ai</div>
          <div className="flex items-center gap-5">
            <div
              className="hidden md:inline text-sm text-zinc-500 hover:text-white
                    cursor-pointer"
              onClick={() => navigate("/pricing")}
            >
              Pricing
            </div>
            {userData && (
              <div
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10
                    text-sm cursor-pointer hover:bg-white/10 transition"
                onClick={() => navigate("/pricing")}
              >
                <Coins size={14} className="text-yellow-400" />
                <span className="text-zinc-300 ">Credits</span>
                <span>{userData.credits}</span>
                <span className="font-semibold">+</span>
              </div>
            )}

            {!userData ? (
              <button
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm"
                onClick={() => setOpenLogin(true)}
              >
                Get Started
              </button>
            ) : (
              <div className="relative">
                <button
                  className="flex items-center"
                  onClick={() => setOpenProfile(!openProfile)}
                >
                  <img
                    src={
                      userData.avatar ||
                      `https://ui-avatars.com/api/?name=${userData.name}`
                    }
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full border border-white/20
                    object-cover"
                  />
                </button>
                <AnimatePresence>
                  {openProfile && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl
                                overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="test-sm font-medium truncate">
                            {userData.name}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">
                            {userData.email}{" "}
                          </p>
                        </div>

                        <button
                          className="md:hidden w-full px-4 py-3 flex
                                    items-center gap-2 text-sm border-b border-white/10 
                                    hover:bg-white/5"
                        >
                          <Coins size={14} className="text-yellow-400" />
                          <span className="text-zinc-300 ">Credits</span>
                          <span>{userData.credits}</span>
                          <span className="font-semibold">+</span>
                        </button>

                        <button
                          className="w-full px-4 py-3 text-left text-sm hover:bg-white/5"
                          onClick={() => navigate("/dashboard")}
                        >
                          Dashboard
                        </button>
                        <button
                          className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5"
                          onClick={handleLogOut}
                        >
                          {" "}
                          Logout
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <section className="relative z-10 pt-44 pb-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 mb-6"
        >
          <Sparkles size={12} className="text-purple-400" />
          Describe it once, ship it in minutes
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Build Stunning Websites <br />
          <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            With AI{" "}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg"
        >
          Describe your idea and let AI generate a modern, responsive ,
          production-ready website.
        </motion.p>

        <button
          className="px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105
         transition mt-12"
          onClick={() => (userData ? navigate("/dashboard") : setOpenLogin(true))}
        >
          {userData ? "Go to dashboard" : "Get Started"}
        </button>
      </section>

      {!userData && (
        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl bg-white/5 border border-white/10 p-8 hover:border-purple-400/30 hover:bg-white/[0.07] transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-400/10 border border-purple-400/20 flex items-center justify-center mb-5 group-hover:bg-purple-400/20 transition">
                    <Icon size={18} className="text-purple-300" />
                  </div>
                  <h1 className="text-xl font-semibold mb-3">{h.title}</h1>
                  <p className="text-sm text-zinc-400">{h.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* How it works — a real 3-step sequence, so numbering earns its place */}
      {!userData && (
        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Three steps between an idea and a live website.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative rounded-2xl bg-white/5 border border-white/10 p-8"
                >
                  <span className="text-xs font-mono text-zinc-600">
                    0{i + 1}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-blue-400/10 border border-blue-400/20 flex items-center justify-center my-4">
                    <Icon size={18} className="text-blue-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-zinc-400">{s.desc}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight
                      size={18}
                      className="hidden md:block absolute top-1/2 -right-5 -translate-y-1/2 text-zinc-700"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {userData && websites?.length > 0 && (
        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
          <h3 className="text-2xl font-semibold mb-6">Your Websites</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {websites.slice(0, 3).map((w, i) => (
              <motion.div
                key={w._id}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/editor/${w._id}`)}
                className="cursor-pointer rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
              >
                <div className="h-40 bg-black">
                  <iframe
                    srcDoc={w.latestCode}
                    className="w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold line-clamp-2">
                    {w.title}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Last Updated {""}
                    {new Date(w.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <footer className="relative z-10 border-t border-white/10 py-10 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} GenWeb.ai
      </footer>
      {openLogin && (
        <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      )}
    </div>
  );
}

export default Home;
