const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
      <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  );
};

export default BackgroundPattern;
