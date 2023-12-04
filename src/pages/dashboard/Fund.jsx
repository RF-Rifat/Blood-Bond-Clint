import { useState } from "react";

const CreditCardForm = () => {
  const [showBackCard, setShowBackCard] = useState(false);

  const toggleBackCard = () => {
    setShowBackCard(!showBackCard);
  };

  const hideBackCard = () => {
    setShowBackCard(false);
  };

  const showBack = () => {
    setShowBackCard(true);
  };

  return (
    <>
      {/* component */}
      <style>
        {`
          .crediCard.seeBack {
            transform: rotateY(-180deg);
          }
        `}
      </style>
      <main className="flex min-h-screen flex-col items-center justify-between p-6 lg:p-24">
        <form className="bg-white w-full max-w-3xl mx-auto px-4 lg:px-6 py-8 shadow-md rounded-md flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pr-8 lg:border-r-2 lg:border-slate-300">
            <div className="mb-4">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">
                Card number:
              </label>
              <input
                type="text"
                onClick={hideBackCard}
                className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 undefined"
                maxLength="19"
                placeholder="XXXX XXXX XXXX XXXX"
                value="1232 1312 3123 1231"
              />
            </div>
            {/* ... (other input fields) */}
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8">
            <div
              className="w-full max-w-sm h-56"
              style={{ perspective: "1000px" }}
            >
              <div
                id="creditCard"
                className={`relative crediCard cursor-pointer transition-transform duration-500 ${
                  showBackCard ? "seeBack" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
                onClick={toggleBackCard}
              >
                <div
                  className="w-full h-56 m-auto rounded-xl text-white shadow-2xl absolute"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src="https://i.ibb.co/LPLv5MD/Payment-Card-01.jpg"
                    className="relative object-cover w-full h-full rounded-xl"
                    alt="Card Front"
                  />
                  <div className="w-full px-8 absolute top-8">
                    {/* ... (front card content) */}
                  </div>
                </div>
                <div
                  className="w-full h-56 m-auto rounded-xl text-white shadow-2xl absolute"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <img
                    src="https://i.ibb.co/LPLv5MD/Payment-Card-01.jpg"
                    className="relative object-cover w-full h-full rounded-xl"
                    alt="Card Back"
                  />
                  <div className="w-full absolute top-8">
                    {/* ... (back card content) */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default CreditCardForm;
