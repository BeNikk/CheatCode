"use client";
import { useState } from 'react';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const handleFeatureClick = (index:number) => {
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
          <div
            key={index}
            className={`border border-gray-200 rounded-lg p-6 hover:shadow-md ${
              activeFeature === index ? 'border-blue-500' : ''
            }`}
            onClick={() => handleFeatureClick(index)}
          >
             
            <h3 className="text-xl font-semibold text-[#3B5998] mb-2">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
