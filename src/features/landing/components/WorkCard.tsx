// // components/WorkCard.tsx
// import React from "react";

// interface WorkCardProps {
//   images: string[]; // accept multiple images
//   title: string;
//   description: string;
// }

// export default function WorkCard({ images, title, description }: WorkCardProps) {
//   return (
//     <div className="flex flex-col items-center text-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
//       {/* Images Row */}
//       <div className="flex  mb-4 space-x-0">
//         {images.map((img, idx) => (
//           <img
//             key={idx}
//             src={img}
//             alt={`${title}-${idx}`}
//             className="w-16 h-16 object-contain"
//           />
//         ))}
//       </div>

//       {/* Title */}
//       <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

//       {/* Description */}
//       <p className="text-sm text-gray-600 italic font-inter">{description}</p>
//     </div>
//   );
// }

// components/WorkCard.tsx
import React from "react";

interface WorkCardProps {
  prefixText?: string; // optional text before the image
  image: string;
  title: string;
  description: string;
}

export default function WorkCard({ prefixText, image, title, description }: WorkCardProps) {
  return (
    <div className="flex flex-col items-center text-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      {/* Text + Image */}
      <div className="flex items-center mb-4">
        {prefixText && (
          <span className="text-3xl font-inter font-bold text-customBlue ">
            {prefixText}
          </span>
        )}
        <img
          src={image}
          alt={title}
          className="w-16 h-16 object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 italic font-inter">{description}</p>
    </div>
  );
}

