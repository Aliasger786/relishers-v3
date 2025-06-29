const About = () => {
  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🌟 About Us 🌟
      </h1>
      <section className="mb-8">
        <p className="text-lg text-gray-600 leading-relaxed text-justify">
          Welcome to our food delivery platform! We are dedicated to bringing
          you the best dining experience right to your doorstep. Whether you're
          craving a quick snack or a gourmet meal, we've got you covered with a
          wide variety of cuisines and top-notch service.
        </p>
        <img
          src="https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg"
          alt="Delicious Food"
          className="w-full max-w-lg mx-auto mt-6 rounded-lg shadow-md"
        />
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          ✨ Our Mission ✨
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed text-justify">
          Our mission is to connect people with the best local restaurants and
          provide a seamless food ordering experience. We strive to ensure that
          every meal you order is delivered fresh, fast, and with a smile.
        </p>
        <img
          src="https://www.recipeforsuccess.com/wp-content/uploads/2014/02/Cooking-for-a-Cause7.jpg"
          alt="Food Delivery"
          className="w-full max-w-lg mx-auto mt-6 rounded-lg shadow-md"
        />
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          💡 Why Choose Us? 💡
        </h2>
        <ul className="list-none space-y-3">
          <li className="text-lg text-gray-600 flex items-center">
            🚀 <span className="ml-2">Fast and reliable delivery</span>
          </li>
          <li className="text-lg text-gray-600 flex items-center">
            🍽️ <span className="ml-2">Wide variety of cuisines</span>
          </li>
          <li className="text-lg text-gray-600 flex items-center">
            💸 <span className="ml-2">Affordable prices and exclusive discounts</span>
          </li>
          <li className="text-lg text-gray-600 flex items-center">
            📞 <span className="ml-2">24/7 customer support</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
