export default function Background() {

  return (

    <div className="
    fixed
    inset-0
    overflow-hidden
    pointer-events-none
    -z-50
    ">

      {/* Pink Glow */}
      <div className="
      absolute
      top-[-120px]
      left-[-120px]
      w-[450px]
      h-[450px]
      bg-pink-500/20
      rounded-full
      blur-[120px]
      animate-pulse
      "></div>

      {/* Blue Glow */}
      <div className="
      absolute
      bottom-[-120px]
      right-[-120px]
      w-[450px]
      h-[450px]
      bg-blue-500/20
      rounded-full
      blur-[120px]
      animate-pulse
      "></div>

      {/* Purple Glow */}
      <div className="
      absolute
      top-[35%]
      left-[35%]
      w-[350px]
      h-[350px]
      bg-purple-500/20
      rounded-full
      blur-[120px]
      animate-pulse
      "></div>

    </div>

  );

}