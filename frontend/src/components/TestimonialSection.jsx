// import React from "react";

const testimonials = [
  {
    text: "Haadi is one of the very best young guys that worked with me at IRID. He doesn't talk much but always ready to learn",
    name: "Prof. Smart A. Sarpong",
    position: "Director, IRID-KsTU",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    text: "Haadi is a cool guy. Though he is not technically good than me. But the rare thing about him is that he is always ready to learn and improve himself. He is a great team player and always brings positive energy to the team.",
    name: "Hope Nelson Decardi",
    position: "Co-Fouder ReStartDigital",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    text: "Haadi is a dedicated and hardworking individual. He always strives to deliver the best results and is not afraid to take on challenges.",
    name: "Madam Diana Owusu",
    position: "Register, IRID-KsTU",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-orange-50 to-white"
    >
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
