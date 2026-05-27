import { useState, useEffect } from 'react';

const messages = [
  'Envío gratis en compras mayores a $1,200 MXN',
  'Cada Trapito llega en caja de regalo lista para sorprender',
  'Diseñado y bordado a mano en México',
];

export const AnnouncementBar = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-oliva text-crema h-9 flex items-center justify-center overflow-hidden">
      <p
        className="text-xs font-inter font-medium tracking-wide text-center px-4 transition-all duration-400"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        {messages[current]}
      </p>
    </div>
  );
};