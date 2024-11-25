import { useState, useEffect } from 'react'
import Image from 'next/image'

export function ExpandableImage({ src, alt, width, height }) {
  const [isExpanded, setIsExpanded] = useState(false)

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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 h-[100vh]"
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
          <div className="relative w-screen h-[100vh] flex items-center justify-center">
            <Image
              src={src}
              alt={alt}
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


