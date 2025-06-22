import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Plus, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

export function TimelineGenerator() {
  const [weddingDate, setWeddingDate] = useState<string>('')
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    { id: '1', title: 'Ceremony', time: '14:00', description: 'Exchange vows' },
    { id: '2', title: 'Cocktail Hour', time: '15:00', description: 'Drinks and appetizers' },
    { id: '3', title: 'Reception', time: '16:00', description: 'Dinner and dancing' },
    { id: '4', title: 'Cake Cutting', time: '19:00', description: 'Cut the wedding cake' },
    { id: '5', title: 'Farewell', time: '22:00', description: 'Send-off' },
  ])
  const [newItem, setNewItem] = useState<Partial<TimelineItem>>({ title: '', time: '', description: '' })
  const [isAddingItem, setIsAddingItem] = useState(false)

  interface TimelineItem {
    id: string
    title: string
    time: string
    description: string
  }

  const handleWeddingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeddingDate(e.target.value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewItem(prev => ({ ...prev, [name]: value }))
  }

  const addTimelineItem = () => {
    if (newItem.title && newItem.time) {
      const newTimelineItem: TimelineItem = {
        id: Math.random().toString(36).substring(7),
        title: newItem.title,
        time: newItem.time,
        description: newItem.description || '',
      }
      
      setTimelineItems(prev => [...prev, newTimelineItem])
      setNewItem({ title: '', time: '', description: '' })
      setIsAddingItem(false)
    }
  }

  const removeTimelineItem = (id: string) => {
    setTimelineItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="wedding-section">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-wedding-serif font-bold mb-4">Wedding Day Timeline</h1>
          <p className="text-muted-foreground">
            Create a personalized timeline for your special day to keep everything running smoothly.
          </p>
        </div>
        
        <div className="wedding-card mb-8">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-[hsl(var(--wedding-rose))] mr-3" />
            <h2 className="text-2xl font-wedding-serif font-semibold">Wedding Date</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="weddingDate" className="block text-sm font-medium mb-1">
                Select Your Wedding Date
              </label>
              <input
                type="date"
                id="weddingDate"
                value={weddingDate}
                onChange={handleWeddingDateChange}
                className="w-full border-gray-200 rounded-md shadow-sm focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
              />
            </div>
            
            <div className="flex-1">
              <div className="block text-sm font-medium mb-1">Preview</div>
              <div className="h-10 flex items-center border border-transparent px-3 bg-[hsl(var(--wedding-blush)/0.1)] rounded-md">
                {weddingDate ? (
                  <span className="font-medium">{formatDate(weddingDate)}</span>
                ) : (
                  <span className="text-muted-foreground">Select a date to preview</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="wedding-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-[hsl(var(--wedding-rose))] mr-3" />
              <h2 className="text-2xl font-wedding-serif font-semibold">Day-of Schedule</h2>
            </div>
            
            {!isAddingItem && (
              <Button 
                variant="soft" 
                size="sm" 
                onClick={() => setIsAddingItem(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            )}
          </div>
          
          {isAddingItem && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 border border-[hsl(var(--wedding-blush))] rounded-md bg-[hsl(var(--wedding-blush)/0.1)]"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Add New Timeline Item</h3>
                <button
                  onClick={() => setIsAddingItem(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newItem.title}
                    onChange={handleInputChange}
                    placeholder="e.g., First Dance"
                    className="w-full border-gray-200 rounded-md shadow-sm focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={newItem.time}
                    onChange={handleInputChange}
                    className="w-full border-gray-200 rounded-md shadow-sm focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the event"
                  className="w-full border-gray-200 rounded-md shadow-sm focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsAddingItem(false)}>
                  Cancel
                </Button>
                <Button variant="wedding" size="sm" onClick={addTimelineItem}>
                  <Check className="h-4 w-4 mr-1" />
                  Add to Timeline
                </Button>
              </div>
            </motion.div>
          )}
          
          <div className="space-y-6">
            {timelineItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">
                No timeline items yet. Add some events to create your schedule!
              </p>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[hsl(var(--wedding-blush))]"></div>
                
                {timelineItems
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((item, index) => (
                    <div key={item.id} className="relative flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="h-12 w-12 rounded-full bg-[hsl(var(--wedding-rose))] text-white flex items-center justify-center">
                          {item.time}
                        </div>
                      </div>
                      
                      <div className="flex-1 p-4 border border-[hsl(var(--wedding-blush)/0.3)] rounded-md bg-white shadow-sm">
                        <div className="flex justify-between items-center">
                          <h3 className="font-wedding-serif font-semibold text-lg">{item.title}</h3>
                          <button
                            onClick={() => removeTimelineItem(item.id)}
                            className="text-muted-foreground hover:text-[hsl(var(--wedding-rose))]"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {item.description && (
                          <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button variant="wedding">
              Save Timeline
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
