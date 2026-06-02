export const Hero = ({ text }: { text: string }) => {
  return (
    <section className="relative bg-[#282828] overflow-hidden">
      <div className="absolute right-20 bottom-10">
        <div className="hidden lg:flex items-center gap-4">
          <img
            src="/images/logo-pycon-2026-light.png"
            alt="PyCon ID 2026"
            className="h-12"
          />
          <img
            src="/images/logo-python-id-no-text.png"
            alt="Python ID"
            className="h-10"
          />
        </div>
      </div>
      {/* Decorative Ellipse */}
      <div className="absolute right-0 top-[21px] w-[522px] h-[522px] rounded-full border-[75px] border-[#909090] opacity-20" />

      {/* Accent decorations */}
      <div className="absolute -left-5 -top-5 opacity-50"></div>
      <div className="container mx-auto px-6 lg:px-12 pt-[120px] pb-16 lg:pt-[160px] lg:pb-24 relative z-10">
        <div className="flex justify-between items-start">
          <h1 className="text-[#F1F2F3] text-4xl md:text-5xl lg:text-[60px] font-bold font-sans tracking-tight max-w-[600px]">
            {text}
          </h1>
        </div>
      </div>
    </section>
  );
};
