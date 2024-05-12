'use client'
import PhotoAlbum, { Photo } from 'react-photo-album'
import NextJsImage from '@/components/nextJsImage'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Download from 'yet-another-react-lightbox/plugins/download'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import { useState } from 'react'

interface IphotoGallery {
  photos: Photo[]
}

function PhotoGallery({ photos }: IphotoGallery) {
  const [index, setIndex] = useState(-1)
  return (
    <main className="my-8 mx-auto max-w-screen-xl h-full">
      <PhotoAlbum
        photos={photos}
        layout="rows"
        defaultContainerWidth={1280}
        renderPhoto={NextJsImage}
        targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
        sizes={{
          size: 'calc(100vw - 40px)',
          sizes: [
            { viewport: '(max-width: 299px)', size: 'calc(100vw - 10px)' },
            { viewport: '(max-width: 599px)', size: 'calc(100vw - 200px)' },
            { viewport: '(max-width: 1199px)', size: 'calc(100vw - 400px)' },
          ],
        }}
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Zoom, Download]}
      />
    </main>
  )
}

export default PhotoGallery
