import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgLight from "./assets/bailey-zindel-NRQV-hBF10M-unsplash.jpg";
import bgDark from "./assets/john-towner-JgOeRuGD_Y4-unsplash.jpg";


function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState({});

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setForm({ email: "", password: "", name: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.includes("@")) newErrors.email = "Invalid email.";
    if (form.password.length < 6) newErrors.password = "Min 6 characters.";
    if (!isLogin && form.name.trim().length < 2) newErrors.name = "Enter a valid name.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert(isLogin ? "Logged in!" : "Account created!");
    }
  };

  const themeStyles =
    theme === "dark"
      ? "bg-white/10 text-white border-white/30 placeholder-white/70"
      : "bg-black/10 text-black border-black/30 placeholder-black/60";

  return (
    <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center transition duration-500"
  style={{ backgroundImage: `url(${theme === "dark" ? bgDark : bgLight})` }}
>

      <motion.div
        className={`backdrop-blur-md shadow-2xl rounded-2xl px-10 py-12 w-96 border transition duration-500 ${
          theme === "dark"
            ? "bg-white/10 border-white/30 text-white"
            : "bg-white/70 border-black/20 text-black"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{isLogin ? "Login" : "Sign Up"}</h2>
          <button onClick={toggleTheme} className="text-sm underline">
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${themeStyles}`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${themeStyles}`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${themeStyles}`}
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className={`py-2 rounded-lg font-semibold transition duration-300 ${
              theme === "dark"
                ? "bg-white/20 hover:bg-white/30 text-white"
                : "bg-black/20 hover:bg-black/30 text-black"
            }`}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className={`text-sm text-center mt-6 ${theme === "dark" ? "text-white/70" : "text-black/60"}`}>
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span className="underline cursor-pointer" onClick={toggleForm}>
            {isLogin ? "Sign up" : "Log in"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default App;
