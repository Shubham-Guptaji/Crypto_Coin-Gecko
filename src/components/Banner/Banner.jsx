import BannerImage from "../../assets/banner1.jpeg";

function Banner() {
    return (
        <div className="w-full h-[15rem] md:h-[25rem] relative">

            <img 
                src={BannerImage}
                className="h-full w-full self-stretch"
            />

            <div className="absolute top-20 left-0 right-0 mx-auto w-[15rem] sm:w-[20rem]">
                <div className="flex flex-col gap-4">

                    <div className="font-semibold text-4xl sm:text-5xl text-white">
                        Crypto Tracker
                    </div>

                    <div className="font-semibold text-sm text-white text-center">
                        Get all info regarding cryptocurrencies
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Banner;