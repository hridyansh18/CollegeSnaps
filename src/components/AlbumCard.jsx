import { motion } from "framer-motion";

export default function AlbumCard({ title, image }) {

  return (

    <motion.div

      whileHover={{
        scale: 1.05,
        rotate: 2,
        y: -10,
      }}

      transition={{
        duration: 0.3,
      }}

      className="
      w-full
      glass
      rounded-3xl
      overflow-hidden
      album-shadow
      cursor-pointer
      border border-white/10
      "

    >

      <img
        src={image}
        alt=""
        className="
        h-72
        w-full
        object-cover
        "
      />

      <div className="p-5">

        <h1 className="
        text-2xl
        font-bold
        text-white
        ">
          {title}
        </h1>

        <p className="
        text-gray-400
        mt-2
        ">
          Beautiful college memories ✨
        </p>

      </div>

    </motion.div>

  );
}