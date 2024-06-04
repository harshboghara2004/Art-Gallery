import Image from "next/image";
import about from "@/public/assets/about.jpeg";

const links = [
  { name: "Open roles", href: "#" },
  { name: "Internship program", href: "#" },
  { name: "Our values", href: "#" },
  { name: "Meet our leadership", href: "#" },
];
const stats = [
  { name: "Offices worldwide", value: "12" },
  { name: "Full-time colleagues", value: "300+" },
  { name: "Hours per week", value: "40" },
  { name: "Paid time off", value: "Unlimited" },
];

export default function Example() {
  return (
    <main className="relative isolate w-full h-full  py-24 sm:py-32 flex justify-center">
      <Image
        src={about}
        alt=""
        className="inset-0 -z-10 h-80 w-80 ml-auto object-cover object-right md:object-center rounded-3xl"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
            About us
          </h2>
          <p className="mt-6 text-lg leading-8 text-black">
            An Art Gallery application showcasing diverse artworks from various
            artists, offering users a platform to explore, appreciate, and
            engage with art.
          </p>
        </div>
        {/* <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-black sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-16 grid gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-black">
                  {stat.name}
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-black">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div> */}
      </div>
    </main>
  );
}
