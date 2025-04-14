// 'use client';

// import { motion, AnimatePresence } from 'framer-motion';
// import { useState, useEffect } from 'react';
// import GlassSection from '../GlassSection';

// // Gallery item type definition
// interface GalleryItem {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   category: 'hackathon' | 'volunteering';
//   date: string;
// }

// // Sample gallery data - Replace with your actual images
// const galleryItems: GalleryItem[] = [
//   {
//     id: 'hack-1',
//     title: 'AI Hackathon 2024',
//     description: 'Developed an AI-powered solution for sustainable energy management',
//     image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//     category: 'hackathon',
//     date: 'March 2024'
//   },
//   {
//     id: 'hack-2',
//     title: 'CodeJam Finals',
//     description: 'Finalist in the Google CodeJam competition',
//     image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//     category: 'hackathon',
//     date: 'January 2024'
//   },
//   {
//     id: 'hack-3',
//     title: 'LLM Hack Challenge',
//     description: 'Built a specialized large language model application',
//     image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//     category: 'hackathon',
//     date: 'November 2023'
//   },
//   {
//     id: 'vol-1',
//     title: 'Tech for Good',
//     description: 'Teaching coding to underprivileged children',
//     image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//     category: 'volunteering',
//     date: 'February 2024'
//   },
//   {
//     id: 'vol-2',
//     title: 'Community Tech Support',
//     description: 'Providing technical assistance to local community members',
//     image: 'https://images.unsplash.com/photo-1577563856426-ba8d6f254c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//     category: 'volunteering',
//     date: 'December 2023'
//   },
//   {
//     id: 'vol-3',
//     title: 'Environmental Cleanup',
//     description: 'Participating in a digital waste recycling drive',
//     image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//     category: 'volunteering',
//     date: 'October 2023'
//   },
//   {
//     id: 'hack-4',
//     title: 'Web3 Hackathon',
//     description: 'Created a decentralized application for content creators',
//     image: 'https://images.unsplash.com/photo-1559650656-5d1d361ad10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//     category: 'hackathon',
//     date: 'August 2023'
//   },
//   {
//     id: 'vol-4',
//     title: 'Virtual Mentoring',
//     description: 'Mentoring students in AI and machine learning',
//     image: 'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//     category: 'volunteering',
//     date: 'July 2023'
//   }
// ];

// // Gallery component
// const Gallery: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<'all' | 'hackathon' | 'volunteering'>('all');
//   const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   // Handle resize for responsive design
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     // Initial check
//     checkIfMobile();
    
//     // Add event listener for window resize
//     window.addEventListener('resize', checkIfMobile);
    
//     // Cleanup
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

//   // Filter images based on selected category
//   const filteredItems = selectedCategory === 'all'
//     ? galleryItems
//     : galleryItems.filter(item => item.category === selectedCategory);

//   return (
//     <GlassSection id="gallery" title="Cosmic Archives">
//       <div className="space-y-6 p-2 sm:p-4">
//         {/* Category filters with cosmic styling */}
//         <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
// <motion.button
//   onClick={() => setSelectedCategory('all')}
//   className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md border font-[JetBrains Mono] text-xs sm:text-sm transition-all ${
//     selectedCategory === 'all'
//       ? 'border-[rgba(147,51,234,0.8)] bg-[rgba(147,51,234,0.2)] text-[rgba(147,51,234,0.9)]'
//       : 'border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.1)] text-[rgba(59,130,246,0.7)] hover:bg-[rgba(59,130,246,0.2)]'
//   }`}
//   whileHover={{ scale: 1.05 }}
//   whileTap={{ scale: 0.95 }}
// >
//   ALL TRANSMISSIONS
// </motion.button>
//           <motion.button
//             onClick={() => setSelectedCategory('hackathon')}
//             className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md border font-[JetBrains Mono] text-xs sm:text-sm transition-all ${
//               selectedCategory === 'hackathon'
//                 ? 'border-[rgba(147,51,234,0.8)] bg-[rgba(147,51,234,0.2)] text-[rgba(147,51,234,0.9)]'
//                 : 'border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.1)] text-[rgba(59,130,246,0.7)] hover:bg-[rgba(59,130,246,0.2)]'
//             }`}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {isMobile ? 'CODE NEXUS' : 'HACKATHON NEXUS'}
//           </motion.button>
//           <motion.button
//             onClick={() => setSelectedCategory('volunteering')}
//             className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md border font-[JetBrains Mono] text-xs sm:text-sm transition-all ${
//               selectedCategory === 'volunteering'
//                 ? 'border-[rgba(147,51,234,0.8)] bg-[rgba(147,51,234,0.2)] text-[rgba(147,51,234,0.9)]'
//                 : 'border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.1)] text-[rgba(59,130,246,0.7)] hover:bg-[rgba(59,130,246,0.2)]'
//             }`}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {isMobile ? 'STAR CORPS' : 'STELLAR OUTREACH'}
//           </motion.button>
//         </div>

//         {/* Category description with space theme */}
//         <motion.div 
//           className="text-center mb-4 sm:mb-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           key={selectedCategory}
//           transition={{ duration: 0.5 }}
//         >
//           {selectedCategory === 'all' && (
//             <p className="text-[rgba(59,130,246,0.7)] font-[JetBrains Mono] text-xs sm:text-sm">
//             Stellar moments captured across dimensions of innovation and impact
//           </p>
//           )}
//           {selectedCategory === 'hackathon' && (
//             <p className="text-[rgba(59,130,246,0.7)] font-[JetBrains Mono] text-xs sm:text-sm">
//               Digital frontiers where code becomes cosmic architecture
//             </p>
//           )}
//           {selectedCategory === 'volunteering' && (
//             <p className="text-[rgba(59,130,246,0.7)] font-[JetBrains Mono] text-xs sm:text-sm">
//               Missions to elevate earthly communities through stellar knowledge
//             </p>
//           )}
//         </motion.div>

//         {/* Gallery grid with stagger animation */}
//         <motion.div 
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
//           initial="hidden"
//           animate="show"
//           variants={{
//             hidden: { opacity: 0 },
//             show: {
//               opacity: 1,
//               transition: {
//                 staggerChildren: 0.1
//               }
//             }
//           }}
//         >
//           <AnimatePresence mode="wait">
//             {filteredItems.map((item) => (
//               <motion.div
//                 key={item.id}
//                 layoutId={item.id}
//                 variants={{
//                   hidden: { y: 20, opacity: 0 },
//                   show: { y: 0, opacity: 1 }
//                 }}
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={isMobile ? { scale: 0.98 } : {}}
//                 className="bg-[rgba(10,10,20,0.7)] rounded-lg overflow-hidden border border-[rgba(59,130,246,0.3)] cursor-pointer group"
//                 onClick={() => setSelectedImage(item)}
//               >
//                 <div className="relative h-36 sm:h-48 overflow-hidden">
//                   <img 
//                     src={item.image} 
//                     alt={item.title} 
//                     className="w-full h-full object-cover transition-transform group-hover:scale-110" 
//                   />
//                   <div className="absolute top-2 right-2">
//                     <span className={`text-xs font-[JetBrains Mono] px-2 py-1 rounded-md ${
//                       item.category === 'hackathon' 
//                         ? 'bg-[rgba(147,51,234,0.3)] text-purple-300' 
//                         : 'bg-[rgba(59,130,246,0.3)] text-blue-300'
//                     }`}>
//                       {item.category === 'hackathon' ? 'NEXUS' : 'CORPS'}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-3 sm:p-4">
//                   <h4 className="text-[rgba(147,51,234,0.9)] font-[JetBrains Mono] text-xs sm:text-sm font-bold line-clamp-1">{item.title}</h4>
//                   <p className="text-gray-400 text-xs mt-1 line-clamp-2">{item.description}</p>
//                   <div className="mt-2 sm:mt-3 flex justify-between items-center">
//                     <span className="text-[rgba(59,130,246,0.7)] text-xs">STARDATE: {item.date}</span>
//                     <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>

//         {/* Empty state when no items match filter */}
//         {filteredItems.length === 0 && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-6 sm:py-12"
//           >
//             <p className="text-[rgba(59,130,246,0.7)] font-[JetBrains Mono] text-sm">No transmissions detected in this sector.</p>
//           </motion.div>
//         )}

//         {/* Modal with space theme enhancements */}
//         <AnimatePresence>
//           {selectedImage && (
//             <motion.div 
//               className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-90 backdrop-blur-sm"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={(e) => {
//                 if (e.target === e.currentTarget) {
//                   setSelectedImage(null);
//                 }
//               }}
//             >
//               <motion.div 
//                 layoutId={selectedImage.id}
//                 className="bg-[rgba(10,10,30,0.95)] rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
//               >
//                 <div className="p-3 sm:p-4 border-b border-[rgba(59,130,246,0.3)] flex items-center justify-between">
//                   <div className="flex items-center">
//                     <span className="text-xl sm:text-2xl mr-2">
//                       {selectedImage.category === 'hackathon' ? '💻' : '🤝'}
//                     </span>
//                     <h2 className="text-base sm:text-xl font-[JetBrains Mono] text-[rgba(147,51,234,1)] truncate max-w-[180px] sm:max-w-[400px]">
//                       {selectedImage.title}
//                     </h2>
//                   </div>
//                   <button
//                     className="flex items-center px-2 sm:px-3 py-1 bg-[rgba(59,130,246,0.2)] text-[var(--starry-white)] rounded hover:bg-[rgba(59,130,246,0.4)] transition-colors"
//                     onClick={() => setSelectedImage(null)}
//                     aria-label="Close transmission"
//                   >
//                     <span className="text-xs sm:text-sm mr-1 sm:mr-2">×</span>
//                     <span className="font-[JetBrains Mono] text-xs sm:text-sm">CLOSE</span>
//                   </button>
//                 </div>

//                 <div className="relative overflow-auto flex-grow">
//                   <img 
//                     src={selectedImage.image} 
//                     alt={selectedImage.title} 
//                     className="w-full h-[30vh] sm:h-[50vh] object-cover sm:object-contain"
//                   />
//                   <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[rgba(10,10,30,0.7)]"></div>
//                 </div>

//                 <div className="p-3 sm:p-4">
//                   <h3 className="text-[rgba(147,51,234,0.9)] font-[JetBrains Mono] text-base sm:text-lg mb-1 sm:mb-2">{selectedImage.title}</h3>
//                   <p className="text-[var(--starry-white)] mb-3 sm:mb-4 text-sm sm:text-base">{selectedImage.description}</p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-[rgba(59,130,246,0.7)] text-xs sm:text-sm font-[JetBrains Mono]">STARDATE: {selectedImage.date}</span>
//                     <span className={`text-xs font-[JetBrains Mono] px-2 py-1 rounded-md ${
//                       selectedImage.category === 'hackathon' 
//                         ? 'bg-[rgba(147,51,234,0.3)] text-purple-300' 
//                         : 'bg-[rgba(59,130,246,0.3)] text-blue-300'
//                     }`}>
//                       {selectedImage.category === 'hackathon' ? 'CODE NEXUS' : 'STAR CORPS'}
//                     </span>
//                   </div>
//                   <div className="mt-3 sm:mt-4 text-center">
//                     <p className="text-xs text-[rgba(59,130,246,0.5)] font-[JetBrains Mono]">QUANTUM TRANSMISSION #{selectedImage.id}</p>
//                   </div>
//                 </div>

//                 {/* Decorative elements */}
//                 <div className="absolute -top-1 left-5 right-5 sm:left-10 sm:right-10 h-[2px] bg-blue-500 opacity-70"></div>
//                 <div className="absolute -bottom-1 left-5 right-5 sm:left-10 sm:right-10 h-[2px] bg-purple-500 opacity-70"></div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </GlassSection>
//   );
// };

// export default Gallery;