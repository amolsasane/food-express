const Shimmer = () => {
  return (
    <div className="mx-[1rem] lg:mx-[10rem]">
      <div className="flex justify-between my-[2rem]">
        <div className="flex">
          <div className="bg-neutral-400/50 w-[10rem] md:w-[15rem] h-6 md:h-8 shimmer rounded-2xl"></div>
          <div className="bg-neutral-400/50 w-[3rem] h-6 md:h-8 mx-2 shimmer rounded-2xl"></div>
        </div>
        <div className="flex">
          <div className="bg-neutral-400/50 w-[2rem] md:w-[4rem] h-6 md:h-8 mx-2 shimmer rounded-2xl"></div>
          <div className="bg-neutral-400/50 w-[2rem] md:w-[4rem] h-6 md:h-8 mx-2 shimmer rounded-2xl"></div>
        </div>
      </div>

      <div className="shimmer-circles mb-6 md:mb-10 flex w-full content-center">
        <div className="shimmer-circle-outline w-[8rem] md:w-[10rem] h-[8rem] md:h-[10rem] md:mr-6 mr-4 p-4 rounded-full bg-neutral-100">
          <div className="shimmer-circle w-[6rem] md:w-[8rem] h-[6rem] md:h-[8rem] p-4 rounded-full bg-neutral-400/50 shimmer"></div>
        </div>
        <div className="shimmer-circle-outline w-[8rem] md:w-[10rem] h-[8rem] md:h-[10rem] md:mx-6 mx-4 p-4 rounded-full bg-neutral-100">
          <div className="shimmer-circle  w-[6rem] md:w-[8rem] h-[6rem] md:h-[8rem] p-4 rounded-full bg-neutral-400/50 shimmer"></div>
        </div>
        <div className="shimmer-circle-outline w-[8rem] md:w-[10rem] h-[8rem] md:h-[10rem] md:mx-6 mx-4 p-4 rounded-full bg-neutral-100">
          <div className="shimmer-circle  w-[6rem] md:w-[8rem] h-[6rem] md:h-[8rem] p-4 rounded-full bg-neutral-400/50 shimmer"></div>
        </div>
        <div className="shimmer-circle-outline w-[8rem] md:w-[10rem] h-[8rem] md:h-[10rem] md:mx-6 mx-4 p-4 rounded-full bg-neutral-100">
          <div className="shimmer-circle  w-[6rem] md:w-[8rem] h-[6rem] md:h-[8rem] p-4 rounded-full bg-neutral-400/50 shimmer"></div>
        </div>
        <div className="shimmer-circle-outline w-[8rem] md:w-[10rem] h-[8rem] md:h-[10rem] md:mx-6 mx-4 p-4 rounded-full bg-neutral-100">
          <div className="shimmer-circle w-[6rem] md:w-[8rem] h-[6rem] md:h-[8rem] p-4 rounded-full bg-neutral-400/50 shimmer"></div>
        </div>
        <div className="shimmer-circle-outline w-[8rem] md:w-[10rem] h-[8rem] md:h-[10rem] md:mx-6 mx-4 p-4 rounded-full bg-neutral-100">
          <div className="shimmer-circle  w-[6rem] md:w-[8rem] h-[6rem] md:h-[8rem] p-4 rounded-full bg-neutral-400/50 shimmer"></div>
        </div>
      </div>

      <div className="w-full h-1 mb-10 bg-neutral-100"></div>

      <div className="button-list flex justify-center mb-10">
        <div className="bg-neutral-400/50 w-[7rem] h-6 md:h-12 mr-6 shimmer rounded-full"></div>
        <div className="bg-neutral-400/50 w-[7rem] h-6 md:h-12 mx-6 shimmer rounded-full"></div>
        <div className="bg-neutral-400/50 w-[10rem] h-6 md:h-12 mx-6 shimmer rounded-full"></div>
        <div className="bg-neutral-400/50 w-[7rem] h-6 md:h-12 mx-6 shimmer rounded-full"></div>
        <div className="bg-neutral-400/50 w-[8rem] h-6 md:h-12 mx-6 shimmer rounded-full hidden md:block"></div>
        <div className="bg-neutral-400/50 w-[15rem] h-12 mx-6 shimmer rounded-full hidden md:block"></div>
      </div>

      <div className="flex justify-center mx-auto mb-10">
        <div className="shimmer-card mr-6 flex flex-col bg-neutral-100 w-44 md:w-56 h-64 rounded-xl p-4 gap-4">
          <div className="bg-neutral-400/50 w-full h-32 shimmer rounded-md"></div>
          <div className="flex flex-col gap-2">
            <div className="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div className="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div className="bg-neutral-400/50 w-3/4 h-4 shimmer rounded-md"></div>
            <div className="bg-neutral-400/50 w-2/4 h-4 shimmer rounded-md"></div>
          </div>
        </div>
        <div className="shimmer-card mx-6 flex flex-col bg-neutral-100 w-44 md:w-56 h-64 rounded-xl p-4 gap-4">
          <div className="bg-neutral-400/50 w-full h-32 shimmer rounded-md"></div>
          <div className="flex flex-col gap-2">
            <div className="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div className="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div className="bg-neutral-400/50 w-3/4 h-4 shimmer rounded-md"></div>
            <div className="bg-neutral-400/50 w-2/4 h-4 shimmer rounded-md"></div>
          </div>
        </div>
        <div className="shimmer-card hidden mx-6 lg:flex flex-col bg-neutral-100 w-56 h-64 rounded-xl p-4 gap-4">
          <div className="bg-neutral-400/50 w-full h-32 shimmer rounded-md"></div>
          <div className="flex flex-col gap-2">
            <div className="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div className="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div className="bg-neutral-400/50 w-3/4 h-4 shimmer rounded-md"></div>
            <div className="bg-neutral-400/50 w-2/4 h-4 shimmer rounded-md"></div>
          </div>
        </div>
        <div className="shimmer-card hidden mx-6 lg:flex flex-col bg-neutral-100 w-56 h-64 rounded-xl p-4 gap-4">
          <div className="bg-neutral-400/50 w-full h-32 shimmer rounded-md"></div>
          <div className="flex flex-col gap-2">
            <div className="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div className="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div className="bg-neutral-400/50 w-3/4 h-4 shimmer rounded-md"></div>
            <div className="bg-neutral-400/50 w-2/4 h-4 shimmer rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
