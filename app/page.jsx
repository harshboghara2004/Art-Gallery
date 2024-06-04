
import Link from "next/link";

export default function Example() {
  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Show your Latest Arts to our Community.{" "}
          <Link href="/share" className="font-semibold text-indigo-600">
            <span className="absolute inset-0" aria-hidden="true" />
            know more <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Discover Art. <br /> Connect with Creativity.
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Embark on a journey through creativity. Explore a curated collection
          of diverse artworks, delve into the stories behind each masterpiece,
          and join a vibrant community of art enthusiasts and creators. Uncover
          inspiration at every click.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="arts"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Browse Arts
          </Link>
          <Link
            href="/about"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            About Us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// {
//   "title": "Sunset Over the Mountains", 
//   "artist": "Jane Doe",
//   "yearCreated": 2021,
//   "medium": "Oil on Canvas",
//   "description": "A beautiful depiction of a sunset over the mountains, capturing the vibrant colors of the evening sky.",
//   "image": "https://example.com/images/art1.jpg",
//   "location": {
//     "gallery": "Modern Art Gallery",
//     "city": "New York",
//     "country": "USA"
//   },
//   "price": 5000, // in USD
//   "availability": "For Sale",
//   "reviews": [
//     {
//       "user": "John Smith",
//       "rating": 4.5,
//       "comment": "Absolutely stunning piece of art!"
//     },
//     {
//       "user": "Emily Johnon",
//       "rating": 5,
//       "comment": "The colors are so vibrant and the details are exquisite."
//     }
//   ],
//   "tags": ["sunset", "mountains", "oil painting", "nature"]
// }
