

import { useState } from 'react'
import Image from 'next/image'

export function ExpandableImage({ src, alt, width, height }) {
  const [isExpanded, setIsExpanded] = useState(false)

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
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsExpanded(false)}
        >
          <div className="absolute top-4 right-4 text-white text-sm">
            Click anywhereto close the preview
          </div>
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              src={src}
              alt={alt}
              fill
              style={{ objectFit: 'contain' }}
              className="no-rounded"
            />
          </div>
        </div>
      )}
    </>
  )
}

