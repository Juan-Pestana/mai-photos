/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wFkjIpS2Y2E
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from 'next/image'
import Link from 'next/link'

export default function Component() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Albums</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <Link className="group" href="#">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              alt="Album Cover"
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              height={300}
              src="/imagePlaceholder.svg"
              style={{
                aspectRatio: '400/300',
                objectFit: 'cover',
              }}
              width={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                Summer Memories
              </h3>
              <p className="text-sm text-gray-300 line-clamp-2">
                Capture the essence of summer with this vibrant photo album.
              </p>
            </div>
          </div>
        </Link>
        <Link className="group" href="#">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              alt="Album Cover"
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              height={300}
              src="/imagePlaceholder.svg"
              style={{
                aspectRatio: '400/300',
                objectFit: 'cover',
              }}
              width={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                Autumn Splendor
              </h3>
              <p className="text-sm text-gray-300 line-clamp-2">
                Witness the breathtaking colors of fall in this stunning album.
              </p>
            </div>
          </div>
        </Link>
        <Link className="group" href="#">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              alt="Album Cover"
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              height={300}
              src="/imagePlaceholder.svg"
              style={{
                aspectRatio: '400/300',
                objectFit: 'cover',
              }}
              width={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                Winter Wonderland
              </h3>
              <p className="text-sm text-gray-300 line-clamp-2">
                Embrace the magic of winter with this captivating photo album.
              </p>
            </div>
          </div>
        </Link>
        <Link className="group" href="#">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              alt="Album Cover"
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              height={300}
              src="/imagePlaceholder.svg"
              style={{
                aspectRatio: '400/300',
                objectFit: 'cover',
              }}
              width={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                Spring Awakening
              </h3>
              <p className="text-sm text-gray-300 line-clamp-2">
                Celebrate the renewal of nature with this vibrant photo album.
              </p>
            </div>
          </div>
        </Link>
        <Link className="group" href="#">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              alt="Album Cover"
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              height={300}
              src="/imagePlaceholder.svg"
              style={{
                aspectRatio: '400/300',
                objectFit: 'cover',
              }}
              width={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                Travel Adventures
              </h3>
              <p className="text-sm text-gray-300 line-clamp-2">
                Explore the world through the lens of this captivating photo
                album.
              </p>
            </div>
          </div>
        </Link>
        <Link className="group" href="#">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              alt="Album Cover"
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              height={300}
              src="/imagePlaceholder.svg"
              style={{
                aspectRatio: '400/300',
                objectFit: 'cover',
              }}
              width={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                Family Moments
              </h3>
              <p className="text-sm text-gray-300 line-clamp-2">
                Cherish the precious memories of your loved ones in this album.
              </p>
            </div>
          </div>
        </Link>
        <Link className="group" href="#">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              alt="Album Cover"
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              height={300}
              src="/imagePlaceholder.svg"
              style={{
                aspectRatio: '400/300',
                objectFit: 'cover',
              }}
              width={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                Celebrations
              </h3>
              <p className="text-sm text-gray-300 line-clamp-2">
                Capture the joy and excitement of lifes special moments.
              </p>
            </div>
          </div>
        </Link>
        <Link className="group" href="#">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              alt="Album Cover"
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              height={300}
              src="/imagePlaceholder.svg"
              style={{
                aspectRatio: '400/300',
                objectFit: 'cover',
              }}
              width={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                Pets and Pals
              </h3>
              <p className="text-sm text-gray-300 line-clamp-2">
                Discover the joy and companionship of your furry friends.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </main>
  )
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
