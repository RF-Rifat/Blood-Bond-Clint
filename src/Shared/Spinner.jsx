const Spinner = () => {
  return (
    <>
      <div className="grid h-96 w-full place-items-center">
        <div className="flex flex-row space-x-4">
          <div className="w-12 h-12 rounded-full animate-spin border border-dashed border-cyan-500 border-t-transparent"></div>

          <div className="w-12 h-12 rounded-full animate-spin border-2 border-dashed border-indigo-500 border-t-transparent"></div>

          <div className="w-12 h-12 rounded-full animate-spin border-4 border-dashed border-pink-500 border-t-transparent"></div>

          <div className="w-12 h-12 rounded-full animate-spin border-8 border-dashed border-green-500 border-t-transparent"></div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
