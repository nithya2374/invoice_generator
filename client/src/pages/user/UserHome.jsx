// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PlusCircle, FileText, User, LayoutDashboard, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";

// Simple fade-in-up animation utility
const fadeUp = "opacity-0 translate-y-6 animate-[fadeUp_0.6s_ease-out_forwards]";

const UserHome = () => {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const [loaded, setLoaded] = useState(false);

  const hour = new Date().getHours();
  let quoteGreeting = "";
  let quoteMessage = "";

   // Pick greeting & motivational line based on time of day
   if (hour < 12) {
       quoteGreeting = "Good Morning";
       quoteMessage = "Rise and shine — make today count!";
   } else if (hour < 18) {
       quoteGreeting = "Good Afternoon";
       quoteMessage = "Keep going — every effort moves you forward.";
   } else {
       quoteGreeting = "Good Evening";
       quoteMessage = "Relax and reflect — tomorrow is another opportunity.";
    }

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <section
        className={`bg-black/60 backdrop-blur-lg border border-cyan-500 rounded-2xl p-6 shadow-lg text-white transition-all duration-500 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-bold">
          {quoteGreeting},{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {user?.name}
          </span>{" "}
          👋
        </h1>
        <p className="text-sm text-purple-500 mt-1">{today}</p>
        <p className="mt-2 text-purple-500">
          {quoteMessage}
        </p>
      </section>

      {/* Quick Access Tiles */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            to: "/user/invoices/create",
            icon: <PlusCircle size={32} />,
            label: "Create Invoice",
            colors: "from-purple-600 to-indigo-600",
          },
          {
            to: "/user/invoices/mine",
            icon: <FileText size={32} />,
            label: "View Invoices",
            colors: "from-cyan-500 to-blue-600",
          },
          {
            to: "/user/profile",
            icon: <User size={32} />,
            label: "Edit Profile",
            colors: "from-green-500 to-emerald-600",
          },
          {
            to: "/user/dashboard",
            icon: <LayoutDashboard size={32} />,
            label: "Go to Dashboard",
            colors: "from-pink-500 to-rose-600",
          },
        ].map((tile, i) => (
          <Link
            key={i}
            to={tile.to}
            style={{ animationDelay: `${0.15 * (i + 1)}s` }}
            className={`bg-gradient-to-r ${tile.colors} hover:brightness-110 p-6 rounded-2xl text-white flex flex-col items-center justify-center space-y-3 shadow-lg transform transition duration-300 hover:scale-[1.02] ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {tile.icon}
            <span className="text-lg font-semibold">{tile.label}</span>
          </Link>
        ))}
      </section>

      {/* Helpful Tip */}
      <section
        className={`bg-black/60 backdrop-blur-lg border border-purple-500 rounded-2xl p-5 flex items-start gap-4 shadow-lg transition-all duration-500 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "0.8s" }}
      >
        <Lightbulb className="text-yellow-400 mt-1" size={28} />
        <div>
          <h2 className="text-lg font-semibold text-white">Pro Tip</h2>
          <p className="text-gray-300">
            Send invoices immediately after work to get paid faster.
          </p>
        </div>
      </section>
    </div>
  );
};

export default UserHome;
