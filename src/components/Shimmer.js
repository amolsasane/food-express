const Shimmer = () => {
  return (
    <div className="mx-[10rem]">
      <div className="flex justify-between my-[2rem]">
        <div className="flex">
          <div class="bg-neutral-400/50 w-[15rem] h-8 shimmer rounded-2xl"></div>
          <div class="bg-neutral-400/50 w-[3rem] h-8 mx-2 shimmer rounded-2xl"></div>
        </div>
        <div className="flex">
          <div class="bg-neutral-400/50 w-[4rem] h-8 mx-2 shimmer rounded-2xl"></div>
          <div class="bg-neutral-400/50 w-[4rem] h-8 mx-2 shimmer rounded-2xl"></div>
        </div>
      </div>

      <div className="shimmer-circles mb-10 flex w-full content-center">
        <div className="shimmer-circle-outline w-[10rem] h-[10rem] mr-6 p-4 rounded-full bg-neutral-100">
          <div className="shimmer-circle w-[8rem] h-[8rem] p-4 rounded-full bg-neutral-400/50 shimmer"></div>
        </div>
        <div className="shimmer-circle-outline w-[10rem] h-[10rem] mx-6 p-4 rounded-full bg-neutral-100">
          <div className="shimmer-circle w-[8rem] h-[8rem] p-4 rounded-full bg-neutral-400/50 shimmer"></div>
        </div>
        <div className="shimmer-circle-outline w-[10rem] h-[10rem] mx-6 p-4 rounded-full bg-neutral-100">
          <div className="shimmer-circle w-[8rem] h-[8rem] p-4 rounded-full bg-neutral-400/50 shimmer"></div>
        </div>
        <div className="shimmer-circle-outline w-[10rem] h-[10rem] mx-6 p-4 rounded-full bg-neutral-100">
          <div className="shimmer-circle w-[8rem] h-[8rem] p-4 rounded-full bg-neutral-400/50 shimmer"></div>
        </div>
        <div className="shimmer-circle-outline w-[10rem] h-[10rem] mx-6 p-4 rounded-full bg-neutral-100">
          <div className="shimmer-circle w-[8rem] h-[8rem] p-4 rounded-full bg-neutral-400/50 shimmer"></div>
        </div>
        <div className="shimmer-circle-outline w-[10rem] h-[10rem] mx-6 p-4 rounded-full bg-neutral-100">
          <div className="shimmer-circle w-[8rem] h-[8rem] p-4 rounded-full bg-neutral-400/50 shimmer"></div>
        </div>
      </div>

      <div className="w-full h-1 mb-10 bg-neutral-100"></div>

      <div className="button-list flex justify-center mb-10">
        <div class="bg-neutral-400/50 w-[6rem] h-12 mr-6 shimmer rounded-full"></div>
        <div class="bg-neutral-400/50 w-[7rem] h-12 mx-6 shimmer rounded-full"></div>
        <div class="bg-neutral-400/50 w-[10rem] h-12 mx-6 shimmer rounded-full"></div>
        <div class="bg-neutral-400/50 w-[7rem] h-12 mx-6 shimmer rounded-full"></div>
        <div class="bg-neutral-400/50 w-[8rem] h-12 mx-6 shimmer rounded-full"></div>
        <div class="bg-neutral-400/50 w-[15rem] h-12 mx-6 shimmer rounded-full"></div>
      </div>

      <div className="flex justify-center mx-auto">
        <div class="shimmer-card mr-6 flex flex-col bg-neutral-100 w-56 h-64 rounded-xl p-4 gap-4">
          <div class="bg-neutral-400/50 w-full h-32 shimmer rounded-md"></div>
          <div class="flex flex-col gap-2">
            <div class="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div class="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div class="bg-neutral-400/50 w-3/4 h-4 shimmer rounded-md"></div>
            <div class="bg-neutral-400/50 w-2/4 h-4 shimmer rounded-md"></div>
          </div>
        </div>
        <div class="shimmer-card mx-6 flex flex-col bg-neutral-100 w-56 h-64 rounded-xl p-4 gap-4">
          <div class="bg-neutral-400/50 w-full h-32 shimmer rounded-md"></div>
          <div class="flex flex-col gap-2">
            <div class="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div class="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div class="bg-neutral-400/50 w-3/4 h-4 shimmer rounded-md"></div>
            <div class="bg-neutral-400/50 w-2/4 h-4 shimmer rounded-md"></div>
          </div>
        </div>
        <div class="shimmer-card mx-6 flex flex-col bg-neutral-100 w-56 h-64 rounded-xl p-4 gap-4">
          <div class="bg-neutral-400/50 w-full h-32 shimmer rounded-md"></div>
          <div class="flex flex-col gap-2">
            <div class="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div class="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div class="bg-neutral-400/50 w-3/4 h-4 shimmer rounded-md"></div>
            <div class="bg-neutral-400/50 w-2/4 h-4 shimmer rounded-md"></div>
          </div>
        </div>
        <div class="shimmer-card mx-6 flex flex-col bg-neutral-100 w-56 h-64 rounded-xl p-4 gap-4">
          <div class="bg-neutral-400/50 w-full h-32 shimmer rounded-md"></div>
          <div class="flex flex-col gap-2">
            <div class="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div class="bg-neutral-400/50 w-full h-4 shimmer rounded-md"></div>
            <div class="bg-neutral-400/50 w-3/4 h-4 shimmer rounded-md"></div>
            <div class="bg-neutral-400/50 w-2/4 h-4 shimmer rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
