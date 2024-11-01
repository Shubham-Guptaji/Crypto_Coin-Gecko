import { useState } from "react";
import { fetchCoinData } from "../../services/fetchCoinData";
import { useQuery } from "react-query";
// import { CurrencyContext } from "../../context/CurrencyContext";
import currencyStore from "../../state/store";
import { useNavigate } from "react-router-dom";
import PageLoader from "../PageLoader/PageLoader";
function CoinTable() {
  const { currency } = currencyStore();

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery(
    ["coins", page, currency],
    () => fetchCoinData(page, currency),
    {
      // retry: 2,
      // retryDelay: 1000,
      cacheTime: 1000 * 60 * 2,
      staleTime: 1000 * 60 * 2,
    }
  );

  function handleCoinRedirect(id) {
    navigate(`/details/${id}`);
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    // <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto">
    //     <div className="w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold items-center justify-center">
    //         {/* Header of the table */}
    //         <div className="basis-[35%]">
    //             Coin
    //         </div>
    //         <div  className="basis-[25%]">
    //             Price
    //         </div>
    //         <div  className="basis-[20%]">
    //             24h change
    //         </div>
    //         <div  className="basis-[20%]">
    //             Market Cap
    //         </div>
    //     </div>

    //     <div className="flex flex-col w-[80vw] mx-auto">
    //         {isLoading && <div>Loading...</div>}
    //         {data && data.map((coin) => {
    //             return (
    //                 <div onClick={() => handleCoinRedirect(coin.id)} key={coin.id} className="w-full bg-transparent text-white flex py-4 px-2 font-semibold items-center justify-between cursor-pointer">
    //                     <div className="flex items-center justify-start gap-3 basis-[35%]">

    //                         <div className="w-[5rem] h-[5rem]">
    //                             <img src={coin.image} className="w-full h-full" loading="lazy"/>
    //                         </div>

    //                         <div className="flex flex-col">
    //                             <div className="text-3xl">{coin.name}</div>
    //                             <div className="text-xl">{coin.symbol}</div>
    //                         </div>

    //                     </div>

    //                     <div className="basis-[25%]">
    //                         {coin.current_price}
    //                     </div>
    //                     <div className="basis-[20%]">
    //                         {coin.price_change_24h}
    //                     </div>
    //                     <div className="basis-[20%]">
    //                         {coin.market_cap}
    //                     </div>
    //                 </div>
    //             );
    //         })}
    //     </div>

    //     <div className="flex gap-4 justify-center items-center">
    //         <button
    //             disabled={page === 1}
    //             onClick={() => setPage(page-1)}
    //             className="btn btn-primary btn-wide text-white text-2xl"
    //         >
    //             Prev
    //         </button>
    //         <button
    //             onClick={() => setPage(page+1)}
    //             className="btn btn-secondary btn-wide text-white text-2xl"
    //         >
    //             Next
    //         </button>
    //     </div>
    // </div>

    // modified table
    <>
      <div className="my-5 flex flex-col items-center justify-center gap-2 lg:gap-5 w-[95vw] md:w-[90vw] lg:w-[80vw] mx-auto overflow-x-scroll">
        <div className="w-full bg-yellow-400 text-black flex py-4 px-2 md:px-2 mx-auto font-semibold items-center justify-start md:justify-center min-w-[625px]">
          {/* Header of the table */}
          <div className="basis-[35%]">Coin</div>
          <div className="basis-[25%]">Price</div>
          <div className="basis-[20%]">24h change</div>
          <div className="basis-[20%]">Market Cap</div>
        </div>

        <div className="w-full flex flex-col  md:w-[90vw] lg:w-[80vw] mx-auto min-w-[625px]">
          {isLoading && <div>Loading...</div>}
          {data &&
            data.map((coin) => {
              return (
                <div
                  onClick={() => handleCoinRedirect(coin.id)}
                  key={coin.id}
                  className="w-full bg-transparent text-white flex py-3 lg:py-4 px-2 font-semibold items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center justify-start gap-3 basis-[35%]">
                    <div className="w-[60px] h-[60px] md:w-[5rem] md:h-[5rem]">
                      <img
                        src={coin.image}
                        className="w-full h-full"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="text-2xl lg:text-3xl me-2 [word-break:break-all]">
                        {coin.name}
                      </div>
                      <div className="text-xl">{coin.symbol}</div>
                    </div>
                  </div>

                  <div className="basis-[25%]">
                    {coin.current_price.toFixed(5)}
                  </div>
                  <div className="basis-[20%]">
                    {coin.price_change_24h.toFixed(5)}
                  </div>
                  <div className="basis-[20%]">{coin.market_cap}</div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="flex gap-6 md:gap-4 justify-center mx-auto items-center my-6 max-w-[90vw] ">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary md:btn-wide btn-lg text-white text-lg md:text-2xl"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="btn btn-secondary md:btn-wide btn-lg text-white text-lg md:text-2xl"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default CoinTable;
