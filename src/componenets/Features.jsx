import React from "react";
import { BsShieldLock } from "react-icons/bs";
import { FaShoppingCart, FaTags } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const Features = () => {
  const features = [
    {
      icon: <FaShoppingCart className="text-red-400 text-4xl" />,
      title: "Free Delivery",
      description:
        "Get your order delivered at no extra cost, fast and hassle-free.",
    },
    {
      icon: <MdVerified className="text-red-400 text-4xl" />,
      title: "Quality Assurance",
      description:
        "We ensure the quality of our products and services to meet your expectations.",
    },
    {
      icon: <FaTags className="text-red-400 text-4xl" />,
      title: "Best Offers",
      description:
        "We offer the best offers on our products and services to give you the best value for your money.",
    },
    {
      icon: <BsShieldLock className="text-red-400 text-4xl" />,
      title: "100% Secure Payment",
      description:
        "We use secure payment systems to ensure the safety of your payment information.",
    },
  ];

  return (
    <section className="px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center gap-4 p-6 shadow-md rounded-lg hover:shadow-lg transition duration-300"
          >
            {feature.icon}
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
