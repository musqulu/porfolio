import { useState, useEffect } from 'react'
import Image from 'next/image'

export function ExpandableImage({
  src,
  alt,
  width,
  height,
  images,
  currentIndex,
  compact = false,
  previewMaxHeight = 320,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  const minSwipeDistance = 50

  useEffect(() => {
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

  const openExpanded = () => {
    setActiveIndex(currentIndex)
    setIsExpanded(true)
  }

  const previewImage = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized={compact}
      quality={compact ? 100 : undefined}
      className={
        compact
          ? 'no-rounded mx-auto max-h-full w-auto max-w-full object-contain'
          : 'no-rounded cursor-pointer'
      }
      style={compact ? { maxHeight: previewMaxHeight } : undefined}
      onClick={compact ? undefined : openExpanded}
    />
  )

  return (
    <>
      {compact ? (
        <button
          type="button"
          onClick={openExpanded}
          className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 text-left transition hover:border-zinc-200 dark:border-zinc-700/40 dark:bg-zinc-800/30 dark:hover:border-zinc-600/60"
          aria-label={`Expand image: ${alt}`}
        >
          <div
            className="flex items-center justify-center"
            style={{ maxHeight: previewMaxHeight }}
          >
            {previewImage}
          </div>
          <p className="mt-3 text-center text-xs font-medium text-zinc-500 transition group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-300">
            Click to expand
          </p>
        </button>
      ) : (
        previewImage
      )}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex h-screen w-screen touch-none items-center justify-center overflow-hidden bg-zinc-900"
          onClick={() => setIsExpanded(false)}
          style={{ margin: 0, padding: 0 }}
        >
          <div className="absolute bottom-4 left-4 hidden text-xs text-white/50 md:block">
            Use ← → arrows to navigate • ESC to close
          </div>

          <div className="absolute bottom-4 left-4 text-xs text-white/50 md:hidden">
            Swipe left/right to navigate • Tap to close
          </div>

          <button
            className="absolute right-4 top-4 z-50 text-3xl text-white transition-colors hover:text-gray-300"
            onClick={() => setIsExpanded(false)}
            aria-label="Close preview"
          >
            ×
          </button>

          {!isMobile && images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 z-50 -translate-y-1/2 p-4 text-3xl text-white transition-colors hover:text-gray-300"
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                ←
              </button>

              <button
                className="absolute right-4 top-1/2 z-50 -translate-y-1/2 p-4 text-3xl text-white transition-colors hover:text-gray-300"
                onClick={handleNext}
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}

          <div
            className="relative flex h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] items-center justify-center"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={images[activeIndex]}
              alt={`Image ${activeIndex + 1}`}
              fill
              sizes="100vw"
              quality={100}
              unoptimized
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
