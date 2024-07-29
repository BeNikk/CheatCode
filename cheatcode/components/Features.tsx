"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const handleFeatureClick = (index: number) => {
    setActiveFeature(index);
  };

  const featuresData = [
    {
      title: 'Interactive Coding Challenges',
      description: 'Practice and improve your coding skills through a variety of challenges designed to test your problem-solving abilities.',
    },
    {
      title: 'AI-Powered Code Assistance',
      description: 'Receive real-time feedback, suggestions, and explanations to help you write better code more efficiently.',
    },
    {
      title: 'Personalized Learning Paths',
      description: 'Tailor your learning experience with curated paths based on your skill level, interests, and career goals.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-[#3B5998] mb-8">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            className={`border border-gray-200 rounded-lg p-6 transition-shadow duration-300 ease-in-out transform hover:scale-105 ${
              activeFeature === index ? 'border-blue-500 shadow-lg' : 'hover:shadow-md'
            }`}
            onClick={() => handleFeatureClick(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-[#3B5998] mb-2">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;