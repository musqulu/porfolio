import { useState, useEffect } from 'react'
import Image from 'next/image'

export function ExpandableImage({ src, alt, width, height, images, currentIndex }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(currentIndex)

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isExpanded])

  const handlePrevious = (e) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="no-rounded cursor-pointer"
        onClick={() => setIsExpanded(true)}
      />
      {isExpanded && (
        <div
          className="fixed inset-0 bg-zinc-900/95 flex items-center justify-center z-50 h-[100vh]"
          onClick={() => setIsExpanded(false)}
          style={{ margin: 0, padding: 0 }}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-50"
            onClick={() => setIsExpanded(false)}
            aria-label="Close preview"
          >
            ×
          </button>
          
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors z-50 p-4"
            onClick={handlePrevious}
            aria-label="Previous image"
          >
            ←
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors z-50 p-4"
            onClick={handleNext}
            aria-label="Next image"
          >
            →
          </button>

          <div className="relative w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] flex items-center justify-center">
            <Image
              src={images[activeIndex]}
              alt={`Image ${activeIndex + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              className="no-rounded"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}


