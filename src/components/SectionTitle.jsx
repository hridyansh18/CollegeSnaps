import { motion } from "framer-motion";

export default function SectionTitle({
  title,
  subtitle,
}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 50,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.8,
      }}

      viewport={{
        once: true,
      }}

      className="
      text-center
      mb-20
      "

    >

      <h1 className="
      text-5xl
      md:text-6xl
      font-extrabold
      text-white
      ">

        {title}

      </h1>

      <p className="
      text-gray-400
      mt-5
      text-lg
      ">

        {subtitle}

      </p>

    </motion.div>

  );
}