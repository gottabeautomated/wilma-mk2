import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Map, MapPin, Star, Camera, Calendar, DollarSign, Users, Umbrella, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VenueReview {
  id: string
  venue: string
  address: string
  rating: number
  image: string
  capacity: number
  priceRange: string
  availableDates: string[]
  features: string[]
  notes: string
}

export function VenueAnalyzer() {
  const [venues] = useState<VenueReview[]>([
    {
      id: '1',
      venue: 'Grand Ballroom',
      address: '123 Wedding Ave, City',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      capacity: 250,
      priceRange: '$$$',
      availableDates: ['2025-08-15', '2025-08-22', '2025-09-05'],
      features: ['Indoor', 'Outdoor', 'Catering', 'Parking'],
      notes: 'Beautiful historic venue with amazing city views.'
    },
    {
      id: '2',
      venue: 'Seaside Resort',
      address: '456 Beach Road, Coastline',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      capacity: 150,
      priceRange: '$$$$',
      availableDates: ['2025-07-11', '2025-07-25'],
      features: ['Beach', 'Accommodation', 'Catering', 'Spa'],
      notes: 'Perfect for a beach wedding with accommodation for out-of-town guests.'
    },
    {
      id: '3',
      venue: 'Garden Estate',
      address: '789 Orchard Lane, Greenville',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      capacity: 180,
      priceRange: '$$$',
      availableDates: ['2025-06-20', '2025-07-04', '2025-08-29'],
      features: ['Garden', 'Outdoor', 'Tent', 'Parking'],
      notes: 'Beautiful botanical garden setting with backup indoor space.'
    }
  ])
  
  const [selectedVenue, setSelectedVenue] = useState<VenueReview | null>(null)
  const [comparisonMode, setComparisonMode] = useState(false)
  const [comparedVenues, setComparedVenues] = useState<string[]>([])
  const [filters, setFilters] = useState({
    capacity: 0,
    priceRange: '',
    feature: ''
  })
  
  const filteredVenues = venues.filter(venue => {
    return (
      (filters.capacity === 0 || venue.capacity >= filters.capacity) &&
      (filters.priceRange === '' || venue.priceRange === filters.priceRange) &&
      (filters.feature === '' || venue.features.includes(filters.feature))
    )
  })
  
  const handleSelectVenue = (venue: VenueReview) => {
    if (comparisonMode) {
      // Toggle venue selection for comparison
      if (comparedVenues.includes(venue.id)) {
        setComparedVenues(comparedVenues.filter(id => id !== venue.id))
      } else {
        if (comparedVenues.length < 3) {
          setComparedVenues([...comparedVenues, venue.id])
        }
      }
    } else {
      setSelectedVenue(venue)
    }
  }
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: name === 'capacity' ? parseInt(value) : value })
  }
  
  const toggleComparisonMode = () => {
    setComparisonMode(!comparisonMode)
    setComparedVenues([])
    setSelectedVenue(null)
  }
  
  const venuesToCompare = venues.filter(venue => comparedVenues.includes(venue.id))
  

  return (
    <div className="wedding-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-wedding-serif font-bold mb-4">Venue Analyzer</h1>
          <p className="text-muted-foreground">
            Compare wedding venues to find the perfect location for your special day.
          </p>
        </div>
        
        {/* Filters */}
        <div className="wedding-card mb-8">
          <div className="flex items-center mb-6">
            <Building2 className="w-6 h-6 text-[hsl(var(--wedding-rose))] mr-3" />
            <h2 className="text-2xl font-wedding-serif font-semibold">Find Your Perfect Venue</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium mb-1">
                Minimum Capacity
              </label>
              <select
                id="capacity"
                name="capacity"
                value={filters.capacity}
                onChange={handleFilterChange}
                className="w-full border-gray-200 rounded-md focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
              >
                <option value={0}>Any Size</option>
                <option value={50}>50+ Guests</option>
                <option value={100}>100+ Guests</option>
                <option value={150}>150+ Guests</option>
                <option value={200}>200+ Guests</option>
                <option value={250}>250+ Guests</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium mb-1">
                Price Range
              </label>
              <select
                id="priceRange"
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                className="w-full border-gray-200 rounded-md focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
              >
                <option value="">Any Price</option>
                <option value="$">$ (Budget)</option>
                <option value="$$">$$ (Moderate)</option>
                <option value="$$$">$$$ (Premium)</option>
                <option value="$$$$">$$$$ (Luxury)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="feature" className="block text-sm font-medium mb-1">
                Key Feature
              </label>
              <select
                id="feature"
                name="feature"
                value={filters.feature}
                onChange={handleFilterChange}
                className="w-full border-gray-200 rounded-md focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
              >
                <option value="">Any Feature</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Beach">Beach</option>
                <option value="Garden">Garden</option>
                <option value="Catering">In-house Catering</option>
                <option value="Accommodation">Accommodation</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button
                variant={comparisonMode ? "wedding" : "outline"}
                onClick={toggleComparisonMode}
                className="w-full"
              >
                {comparisonMode ? 'Exit Comparison' : 'Compare Venues'}
              </Button>
            </div>
          </div>
          
          {comparisonMode && (
            <div className="mt-4 p-3 bg-[hsl(var(--wedding-blush)/0.1)] rounded-md">
              <p className="text-sm text-muted-foreground">
                <Info className="h-4 w-4 inline mr-1" />
                Select up to 3 venues to compare. {comparedVenues.length} of 3 selected.
              </p>
            </div>
          )}
        </div>
        
        {/* Venue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {filteredVenues.length === 0 ? (
            <div className="md:col-span-3 text-center py-12">
              <p className="text-muted-foreground">No venues match your criteria. Try adjusting your filters.</p>
            </div>
          ) : (
            filteredVenues.map(venue => (
              <div 
                key={venue.id} 
                className={`wedding-card p-0 overflow-hidden cursor-pointer transition-all ${
                  comparisonMode && comparedVenues.includes(venue.id) ? 'ring-2 ring-[hsl(var(--wedding-rose))]' : ''
                }`}
                onClick={() => handleSelectVenue(venue)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={venue.image} 
                    alt={venue.venue} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-white py-1 px-2 rounded-full flex items-center">
                    <Star className="h-4 w-4 text-[hsl(var(--wedding-gold))] mr-1" />
                    <span className="text-sm font-medium">{venue.rating}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-wedding-serif text-lg font-semibold mb-1">{venue.venue}</h3>
                  <p className="text-sm text-muted-foreground flex items-center mb-2">
                    <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                    {venue.address}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center p-2 bg-[hsl(var(--wedding-blush)/0.1)] rounded">
                      <Users className="h-4 w-4 mx-auto mb-1" />
                      <span className="text-xs block">{venue.capacity}</span>
                    </div>
                    <div className="text-center p-2 bg-[hsl(var(--wedding-blush)/0.1)] rounded">
                      <DollarSign className="h-4 w-4 mx-auto mb-1" />
                      <span className="text-xs block">{venue.priceRange}</span>
                    </div>
                    <div className="text-center p-2 bg-[hsl(var(--wedding-blush)/0.1)] rounded">
                      <Calendar className="h-4 w-4 mx-auto mb-1" />
                      <span className="text-xs block">{venue.availableDates.length}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {venue.features.slice(0, 3).map((feature, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-[hsl(var(--wedding-navy)/0.1)] text-[hsl(var(--wedding-navy))] py-1 px-2 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {venue.features.length > 3 && (
                      <span className="text-xs bg-[hsl(var(--wedding-navy)/0.05)] text-muted-foreground py-1 px-2 rounded-full">
                        +{venue.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Selected Venue Details */}
        {selectedVenue && !comparisonMode && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="wedding-card mb-8"
          >
            <div className="flex items-center mb-6">
              <Map className="w-6 h-6 text-[hsl(var(--wedding-rose))] mr-3" />
              <h2 className="text-2xl font-wedding-serif font-semibold">{selectedVenue.venue} Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="rounded-lg overflow-hidden mb-4">
                  <img 
                    src={selectedVenue.image} 
                    alt={selectedVenue.venue} 
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-2">About this Venue</h3>
                  <p>{selectedVenue.notes}</p>
                </div>
              </div>
              
              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border border-[hsl(var(--wedding-blush)/0.3)] rounded-md p-3">
                    <span className="text-xs text-muted-foreground block mb-1">Capacity</span>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-[hsl(var(--wedding-navy))] mr-2" />
                      <span className="text-lg font-medium">{selectedVenue.capacity} guests</span>
                    </div>
                  </div>
                  
                  <div className="border border-[hsl(var(--wedding-blush)/0.3)] rounded-md p-3">
                    <span className="text-xs text-muted-foreground block mb-1">Price Range</span>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-[hsl(var(--wedding-navy))] mr-2" />
                      <span className="text-lg font-medium">{selectedVenue.priceRange}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Available Dates</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedVenue.availableDates.map((date, index) => (
                      <div 
                        key={index} 
                        className="border border-[hsl(var(--wedding-blush)/0.3)] rounded-md p-2 text-center"
                      >
                        {new Date(date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Features & Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedVenue.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-center p-2 bg-[hsl(var(--wedding-blush)/0.1)] rounded"
                      >
                        <Umbrella className="h-4 w-4 mr-2 text-[hsl(var(--wedding-rose))]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="wedding">
                    <Camera className="mr-2 h-4 w-4" />
                    Schedule a Tour
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Comparison Table */}
        {comparisonMode && comparedVenues.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="wedding-card mb-8 overflow-x-auto"
          >
            <div className="flex items-center mb-6">
              <Building2 className="w-6 h-6 text-[hsl(var(--wedding-rose))] mr-3" />
              <h2 className="text-2xl font-wedding-serif font-semibold">Venue Comparison</h2>
            </div>
            
            <table className="min-w-full">
              <thead>
                <tr className="bg-[hsl(var(--wedding-blush)/0.1)]">
                  <th className="px-4 py-3 text-left text-sm font-medium">Feature</th>
                  {venuesToCompare.map(venue => (
                    <th key={venue.id} className="px-4 py-3 text-left text-sm font-medium">{venue.venue}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium">Location</td>
                  {venuesToCompare.map(venue => (
                    <td key={venue.id} className="px-4 py-3 text-sm">{venue.address}</td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium">Capacity</td>
                  {venuesToCompare.map(venue => (
                    <td key={venue.id} className="px-4 py-3 text-sm">{venue.capacity} guests</td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium">Price Range</td>
                  {venuesToCompare.map(venue => (
                    <td key={venue.id} className="px-4 py-3 text-sm">{venue.priceRange}</td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium">Rating</td>
                  {venuesToCompare.map(venue => (
                    <td key={venue.id} className="px-4 py-3 text-sm flex items-center">
                      <Star className="h-4 w-4 text-[hsl(var(--wedding-gold))] mr-1" />
                      {venue.rating}/5
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium">Available Dates</td>
                  {venuesToCompare.map(venue => (
                    <td key={venue.id} className="px-4 py-3 text-sm">{venue.availableDates.length} dates</td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium">Features</td>
                  {venuesToCompare.map(venue => (
                    <td key={venue.id} className="px-4 py-3 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {venue.features.map((feature, idx) => (
                          <span key={idx} className="text-xs bg-[hsl(var(--wedding-blush)/0.1)] rounded-full px-2 py-0.5">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            
            <div className="mt-6 flex justify-end">
              <Button variant="wedding">
                Generate Comparison Report
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
