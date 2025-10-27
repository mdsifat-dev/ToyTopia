import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import toysData from "../data/toys.json";

const Home = () => {
  const [popularToys, setPopularToys] = useState([]);

  useEffect(() => {
    setPopularToys(toysData.slice(0, 6));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="mb-12">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div
              className="hero min-h-screen"
              style={{
                backgroundImage:
                  "url(https://i.ibb.co.com/pBLFZKXw/photo-1731005546210-fafd4c76ec0f-ixlib-rb-4-1.jpg)",
              }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">
                    Welcome to ToyTopia
                  </h1>
                  <p className="mb-5">
                    Discover amazing toys for your children from local sellers
                  </p>
                  <button className="btn btn-primary">Explore Now</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="hero min-h-screen"
              style={{
                backgroundImage:
                  "url(https://i.ibb.co.com/C5R4DFCT/photo-1713641797626-51012074842e-ixlib-rb-4-1.jpg)",
              }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">Quality Toys</h1>
                  <p className="mb-5">
                    Only the best toys from trusted local sellers
                  </p>
                  <button className="btn btn-secondary">Shop Now</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="hero min-h-screen"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)",
              }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">Safe & Fun</h1>
                  <p className="mb-5">
                    Ensuring safe and educational toys for all ages
                  </p>
                  <button className="btn btn-accent">Learn More</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Popular Toys Section */}
      <section className=" Popular container mx-auto px-4 mb-12">
        <h2 className="text-4xl font-bold text-center mb-8">Popular Toys</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {popularToys.map((toy) => (
            <div
              key={toy.toyId}
              to={`/toy/${toy.toyId}`}
              className="card bg-base-100 border border-gray-300 shadow-xl hover:scale-105 transition-transform"
            >
              <figure className="px-4 pt-4">
                <img
                  src={toy.pictureURL}
                  alt={toy.toyName}
                  className="rounded-xl h-48 w-full object-contain"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{toy.toyName}</h3>
                <div className="flex justify-between items-center">
                  <div className="badge badge-primary font-bold">
                    ${toy.price}
                  </div>
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1">{toy.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Stock: {toy.availableQuantity}
                </p>
                <p className="text-sm line-clamp-2">{toy.description}</p>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/toy/${toy.toyId}`}
                    className="btn btn-primary btn-sm"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Sections */}
      <section className="bg-primary text-primary-content py-12 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose ToyTopia?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p>Quick and reliable delivery from local sellers</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p>All toys are verified for quality and safety</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-2">Support Local</h3>
              <p>Help local businesses in your community</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-12">
        <div className="hero bg-base-200 rounded-lg">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold">Join Our Community</h2>
              <p className="py-6">
                Become part of the ToyTopia family and discover the joy of local
                toy shopping
              </p>
              <Link to="/register" className="btn btn-primary">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
