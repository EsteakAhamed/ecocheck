// client/src/pages/Consultancy.jsx
import {
  RiShieldFlashLine,
  RiServerLine,
  RiPieChart2Line,
  RiArrowRightUpLine,
} from "react-icons/ri";

const SERVICES = [
  {
    icon: RiShieldFlashLine,
    title: "Full Website Audits",
    desc: "We scan your entire website to find hidden bloat, oversized images, and slow-loading elements that are costing you visitors and wasting energy.",
  },
  {
    icon: RiServerLine,
    title: "Green Hosting Migration",
    desc: "We help you seamlessly move your website and data over to modern, high-performance servers that are entirely powered by clean, renewable energy.",
  },
  {
    icon: RiPieChart2Line,
    title: "Sustainability Certification",
    desc: "We create official, easy-to-read reports that prove your website meets international eco-friendly standards for your company's sustainability goals.",
  },
];

const Consultancy = () => {
  return (
    <main className="flex-1 w-full page-fade-in bg-base-100 text-base-content py-16 px-4 md:px-8 transition-colors duration-200">
      <div className="max-w-5xl mx-auto">
        {/* BRAND IDENTITY BANNER */}
        <div className="border-l-4 border-[#ff6600] pl-6 mb-16 mt-6">
          <span className="text-xs font-mono text-[#ff6600] uppercase tracking-widest block mb-2">
            Expert Optimization Services
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-base-content leading-none">
            Make Your Website Faster and Greener
          </h1>
          <p className="text-sm sm:text-base text-base-content/60 mt-4 max-w-2xl leading-relaxed">
            Partner with{" "}
            <span className="text-base-content font-bold border-b-2 border-[#ff6600]/40">
              Dragon Digitals
            </span>{" "}
            to clean up your code, speed up your page load times, and reduce
            your carbon footprint. We build eco-friendly websites that look
            great, run smoothly, and load instantly for your visitors.
          </p>
        </div>

        {/* RECTANGULAR GEOMETRIC SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-base-content/10 bg-base-200/30 mb-16 rounded-none">
          {SERVICES.map(({ title, desc, icon: Icon }, idx) => (
            <div
              key={idx}
              className="p-8 border-b md:border-b-0 md:border-r last:border-r-0 border-base-content/10 hover:bg-base-200/70 transition-colors duration-200 flex flex-col justify-between group rounded-none"
            >
              <div>
                {/* Adaptive Accent Box */}
                <div className="w-10 h-10 bg-[#ff6600]/10 border border-[#ff6600]/20 flex items-center justify-center text-[#ff6600] mb-6 group-hover:bg-[#ff6600] group-hover:text-black transition-all duration-300">
                  <Icon size={20} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-base-content mb-3">
                  {title}
                </h3>
                <p className="text-xs text-base-content/60 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* HIGH-CONTRAST ACTION BOX */}
        <div className="border-2 border-[#ff6600] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-base-200/40 rounded-none">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono text-[#ff6600] uppercase tracking-widest block mb-1">
              Get In Touch With Our Team
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-base-content mb-3">
              Ready to build a faster, eco-friendly website?
            </h2>
            <p className="text-xs text-base-content/60 leading-relaxed">
              Our team is currently accepting website optimization contracts.
              Let's take a look at your current digital setup, get rid of
              unnecessary clutter, and lower your overall environmental impact.
            </p>
          </div>

          <a
            href="mailto:ceo@dragondigitals.com"
            className="w-full md:w-auto bg-[#ff6600] hover:bg-[#ff7711] text-black font-black uppercase tracking-widest text-xs px-8 py-4 transition-colors duration-150 flex items-center justify-center gap-2 rounded-none whitespace-nowrap self-stretch md:self-auto shadow-sm"
          >
            <span>Book a Website Audit</span>
            <RiArrowRightUpLine size={16} className="text-black" />
          </a>
        </div>
      </div>
    </main>
  );
};

export default Consultancy;
