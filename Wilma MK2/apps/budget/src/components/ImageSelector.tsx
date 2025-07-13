import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ElegantIcon from './ElegantIcon'

interface ImageOption {
  id: string
  name: string
  description?: string
  imagePath: string
  icon?: string
}

interface ImageSelectorProps {
  options: ImageOption[]
  selectedValue: string | undefined
  onSelect: (value: string) => void
  title: string
  subtitle?: string
  icon: string
  className?: string
  imageClassName?: string
  gridCols?: string
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  options,
  selectedValue,
  onSelect,
  title,
  subtitle,
  icon,
  className = '',
  imageClassName = 'aspect-[4/3]',
  gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
}) => {
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set())
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const handleImageLoad = (optionId: string) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev)
      newSet.delete(optionId)
      return newSet
    })
  }

  const handleImageError = (optionId: string) => {
    setFailedImages(prev => new Set(prev).add(optionId))
    setLoadingImages(prev => {
      const newSet = new Set(prev)
      newSet.delete(optionId)
      return newSet
    })
  }

  const handleImageLoadStart = (optionId: string) => {
    setLoadingImages(prev => new Set(prev).add(optionId))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`section-elegant ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <ElegantIcon name={icon} className="text-accent mx-auto mb-2" size={24} />
        <h3 className="text-xl font-serif font-semibold text-graphite">
          {title}
        </h3>
        <div className="elegant-divider"></div>
        {subtitle && (
          <p className="text-accent/70 text-sm mt-2 font-light">
            {subtitle}
          </p>
        )}
      </div>

      {/* Image Grid */}
      <div className={`grid ${gridCols} gap-4`}>
        {options.map((option, index) => {
          const isSelected = selectedValue === option.id
          const isLoading = loadingImages.has(option.id)
          const hasFailed = failedImages.has(option.id)

          return (
            <motion.button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                isSelected
                  ? 'ring-4 ring-accent ring-opacity-60 shadow-2xl scale-105'
                  : 'hover:shadow-xl hover:scale-102 shadow-lg'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Image Container */}
              <div className={`relative ${imageClassName} overflow-hidden bg-primary-100`}>
                {!hasFailed ? (
                  <>
                    <img
                      src={option.imagePath}
                      alt={option.name}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isSelected 
                          ? 'scale-110 brightness-110' 
                          : 'group-hover:scale-105 group-hover:brightness-105'
                      } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                      onLoadStart={() => handleImageLoadStart(option.id)}
                      onLoad={() => handleImageLoad(option.id)}
                      onError={() => handleImageError(option.id)}
                      loading="lazy"
                    />
                    
                    {/* Loading Skeleton */}
                    {isLoading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 animate-pulse">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Fallback when image fails to load */
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <div className="text-center">
                      <ElegantIcon name={option.icon || 'sparkles'} className="text-accent mx-auto mb-2" size={32} />
                      <div className="text-sm font-medium text-graphite">{option.name}</div>
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isSelected 
                    ? 'bg-accent/20' 
                    : 'bg-black/0 group-hover:bg-black/10'
                }`} />

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-3 right-3 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4">
                <h4 className="font-serif font-semibold text-white mb-1 text-left">
                  {option.name}
                </h4>
                {option.description && (
                  <p className="text-white/90 text-sm font-light leading-tight text-left">
                    {option.description}
                  </p>
                )}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/30 rounded-2xl transition-all duration-300" />
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

export default ImageSelector 