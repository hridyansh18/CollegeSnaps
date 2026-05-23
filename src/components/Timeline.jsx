export default function Timeline() {

  const memories = [
    {
      year: "2023",
      title: "Freshers Party 🎉",
      desc: "The beginning of unforgettable friendships.",
    },

    {
      year: "2024",
      title: "College Trip 🚌",
      desc: "Crazy moments and late-night memories.",
    },

    {
      year: "2025",
      title: "Farewell ✨",
      desc: "Emotional ending of a beautiful journey.",
    },
  ];

  return (
    <div className="py-24 px-6">

      <h1 className="text-5xl font-bold text-center text-white mb-20">
        Memory Timeline ⏳
      </h1>

      <div className="max-w-4xl mx-auto">

        {memories.map((item, index) => (

          <div
            key={index}
            className="border-l-4 border-pink-500 pl-8 mb-16 relative"
          >

            <div className="w-5 h-5 bg-pink-500 rounded-full absolute -left-[11px] top-2"></div>

            <h2 className="text-pink-400 text-xl font-bold">
              {item.year}
            </h2>

            <h1 className="text-3xl font-bold text-white mt-2">
              {item.title}
            </h1>

            <p className="text-gray-400 mt-3">
              {item.desc}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}