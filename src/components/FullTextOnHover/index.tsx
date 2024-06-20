const FullTextOnHover = ({ text }: { text: string }) => {
  return (
    <div className="group relative w-28">
      <div className="truncate ">{text}</div>
      <p
        className="absolute hidden z-10 bg-[rgba(0,0,0,0.8)] p-px px-2 group-hover:flex 
  group-hover:overflow-vissible group-hover:whitespace-normal shadow 
  w-48 rounded-lg text-white"
      >
        {text}
      </p>
    </div>
  );
};

export default FullTextOnHover;
