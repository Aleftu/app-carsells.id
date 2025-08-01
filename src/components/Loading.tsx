const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="w-16 h-16 border-8 border-[#2b4775] border-t-white rounded-full animate-spin mb-4"></div>
      <p className="text-xl font-bold text-[#35467e] first-letter:text-2xl">45Motor...</p>
    </div>
  );
};

export default Loading;
