import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-[#3D2A25] pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Main Hook Title */}
        <h1 className="text-4xl font-black tracking-tight text-[#F4EFE6] sm:text-6xl uppercase">
          Premium Brownies <br />
          <span className="text-[#A89F91]">Baked to Perfection</span>
        </h1>
        
        {/* Product Subtitle */}
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#A89F91]">
          Handcrafted treats made with rich chocolate. Formulated to be completely gluten-free and lactose-free without compromising on that fudgy texture you love.
        </p>
        
        {/* Call to Action Button */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/pedidos"
            className="rounded-full bg-[#F4EFE6] px-8 py-3.5 text-sm font-semibold text-[#3D2A25] shadow-sm hover:bg-[#F4EFE6]/90 transition-colors uppercase tracking-wider"
          >
            Order Now
          </Link>
        </div>

      </div>
    </div>
  );
}