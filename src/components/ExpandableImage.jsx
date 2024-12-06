import { useState, useEffect } from 'react'
import Image from 'next/image'

export function ExpandableImage({ src, alt, width, height, images, currentIndex }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50

  useEffect(() => {
    // Check if device is mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isExpanded) return

      if (e.key === 'ArrowLeft' && !isMobile) {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
      } else if (e.key === 'ArrowRight' && !isMobile) {
        setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'Escape') {
        setIsExpanded(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isExpanded, images.length, isMobile])

  const handlePrevious = (e) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  const onTouchStart = (e) => {
    if (!isMobile) return
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    if (!isMobile) return
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    }
    if (isRightSwipe) {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    }
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
          className="fixed inset-0 bg-zinc-900 flex items-center justify-center z-50 h-screen w-screen overflow-hidden touch-none"
          onClick={() => setIsExpanded(false)}
          style={{ margin: 0, padding: 0 }}
        >
          <div className="hidden md:block absolute bottom-4 left-4 text-white/50 text-xs">
            Use ← → arrows to navigate • ESC to close
          </div>

          <div className="md:hidden absolute bottom-4 left-4 text-white/50 text-xs">
            Swipe left/right to navigate • Tap to close
          </div>

          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-50"
            onClick={() => setIsExpanded(false)}
            aria-label="Close preview"
          >
            ×
          </button>
          
          {!isMobile && (
            <>
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
            </>
          )}

          <div 
            className="relative w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] flex items-center justify-center"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
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


