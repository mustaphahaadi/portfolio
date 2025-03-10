// import React from "react";

const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Stephan Clark",
    position: "CEO at EarlyBird",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Sarah Johnson",
    position: "CTO at TechNova",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Michael Brown",
    position: "Product Manager at CodeCraft",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-bold text-gray-800 text-3xl md:text-4xl mb-4">
            What People Say
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Testimonials from colleagues and clients {"I've"} worked with
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.position}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {testimonial.text}
              </p>
              <div className="flex justify-end">
                <i className="fas fa-quote-right text-purple-500 text-2xl"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
