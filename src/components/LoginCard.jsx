export default function LoginCard() {
  return (
    <div className="glass p-10 rounded-3xl w-[400px]">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome Back ✨
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-4 rounded-xl bg-white/10 mb-5 outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-4 rounded-xl bg-white/10 mb-5 outline-none"
      />

      <button className="w-full bg-white text-black py-4 rounded-xl font-bold">
        Login
      </button>
    </div>
  );
}