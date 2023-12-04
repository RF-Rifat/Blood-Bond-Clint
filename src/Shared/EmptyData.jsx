const EmptyData = () => {
  return (
    <>
      <div className="container mx-auto my-8 space-y-10">
        <h1 className="text-center font-bold text-3xl my-10 text-accent-content">
          Empty Data Collection
        </h1>
        <div className="max-w-4xl mx-auto px-10 py-4 grid place-items-center">
          <div className="">
            <tr>
              <td className="w-full text-center mx-auto py-12" colSpan="5">
                <img
                  className="w-32 h-32 mx-auto"
                  src="https://res.cloudinary.com/daqsjyrgg/image/upload/v1690261234/di7tvpnzsesyo7vvsrq4.svg"
                  alt="image empty states"
                />
                <p className="text-accent-content font-medium text-lg text-center">
                  No product data available.
                </p>
                <p className="text-accent-content text-center">
                  You can Access this route after login.
                </p>
              </td>
            </tr>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyData;
