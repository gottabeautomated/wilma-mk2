import { useState } from 'react'
import { motion } from 'framer-motion'
import { BrainCircuit, BarChart, Heart, ArrowRight, Flame, Coffee, Zap, Moon, CheckCircle2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StressItem {
  id: string
  category: 'high' | 'medium' | 'low'
  description: string
  impact: number
  solutions: string[]
}

export function StressPlanner() {
  const [stressItems, setStressItems] = useState<StressItem[]>([
    {
      id: '1',
      category: 'high',
      description: 'Finding the perfect venue',
      impact: 9,
      solutions: [
        'Create a checklist of must-have features',
        'Visit top 3 venues before deciding',
        'Consider hiring a venue scout'
      ]
    },
    {
      id: '2',
      category: 'high',
      description: 'Managing guest list and RSVPs',
      impact: 8,
      solutions: [
        'Use a digital RSVP system',
        'Set clear RSVP deadlines',
        'Delegate follow-ups to a bridesmaid/groomsman'
      ]
    },
    {
      id: '3',
      category: 'medium',
      description: 'Coordinating with vendors',
      impact: 6,
      solutions: [
        'Create a shared calendar with all vendor meetings',
        'Prepare questions in advance',
        'Ask for references and portfolio'
      ]
    },
    {
      id: '4',
      category: 'low',
      description: 'Choosing wedding favors',
      impact: 3,
      solutions: [
        'Consider personalized but practical items',
        'Align with wedding theme',
        'Remember less is often more'
      ]
    }
  ])
  
  const [newItem, setNewItem] = useState<Partial<StressItem>>({
    category: 'medium',
    description: '',
    impact: 5,
    solutions: ['']
  })
  
  const [activeTab, setActiveTab] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [selfCareItems, setSelfCareItems] = useState<{ [key: string]: boolean }>({
    'morning-meditation': false,
    'regular-exercise': false,
    'delegate-tasks': false,
    'date-nights': false,
    'sleep-schedule': false,
    'tech-breaks': false,
  })
  
  const handleAddSolution = () => {
    setNewItem({
      ...newItem,
      solutions: [...(newItem.solutions || []), '']
    })
  }
  
  const handleSolutionChange = (index: number, value: string) => {
    const updatedSolutions = [...(newItem.solutions || [])]
    updatedSolutions[index] = value
    setNewItem({
      ...newItem,
      solutions: updatedSolutions
    })
  }
  
  const handleRemoveSolution = (index: number) => {
    const updatedSolutions = [...(newItem.solutions || [])]
    updatedSolutions.splice(index, 1)
    setNewItem({
      ...newItem,
      solutions: updatedSolutions
    })
  }
  
  const handleAddStressItem = () => {
    if (newItem.description && newItem.solutions && newItem.solutions.some(s => s.trim() !== '')) {
      const filteredSolutions = newItem.solutions.filter(s => s.trim() !== '')
      
      const stressItem: StressItem = {
        id: Math.random().toString(36).substring(7),
        category: newItem.category as 'high' | 'medium' | 'low',
        description: newItem.description,
        impact: newItem.impact || 5,
        solutions: filteredSolutions
      }
      
      setStressItems([...stressItems, stressItem])
      setNewItem({
        category: 'medium',
        description: '',
        impact: 5,
        solutions: ['']
      })
    }
  }
  
  const handleDeleteStressItem = (id: string) => {
    setStressItems(stressItems.filter(item => item.id !== id))
  }
  
  const handleToggleSelfCare = (key: string) => {
    setSelfCareItems({
      ...selfCareItems,
      [key]: !selfCareItems[key]
    })
  }
  
  const getStressColor = (category: string) => {
    switch (category) {
      case 'high':
        return 'text-red-500'
      case 'medium':
        return 'text-amber-500'
      case 'low':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }
  
  const getStressIcon = (category: string) => {
    switch (category) {
      case 'high':
        return <Flame className="h-5 w-5 text-red-500" />
      case 'medium':
        return <Coffee className="h-5 w-5 text-amber-500" />
      case 'low':
        return <Zap className="h-5 w-5 text-green-500" />
      default:
        return null
    }
  }
  
  const filteredItems = activeTab === 'all' 
    ? stressItems 
    : stressItems.filter(item => item.category === activeTab)
  
  const stressStats = {
    total: stressItems.length,
    high: stressItems.filter(item => item.category === 'high').length,
    medium: stressItems.filter(item => item.category === 'medium').length,
    low: stressItems.filter(item => item.category === 'low').length,
    avgImpact: stressItems.reduce((sum, item) => sum + item.impact, 0) / stressItems.length
  }
  
  const selfCareCompleted = Object.values(selfCareItems).filter(Boolean).length
  const selfCareTotal = Object.keys(selfCareItems).length
  
  return (
    <div className="wedding-section">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-wedding-serif font-bold mb-4">Wedding Stress Planner</h1>
          <p className="text-muted-foreground">
            Identify and manage wedding planning stressors with personalized solutions and self-care techniques.
          </p>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="wedding-card p-4 text-center">
            <p className="text-muted-foreground text-sm">Total Stressors</p>
            <p className="text-3xl font-bold">{stressStats.total}</p>
          </div>
          <div className="wedding-card p-4 text-center">
            <p className="text-muted-foreground text-sm">High Priority</p>
            <p className="text-3xl font-bold text-red-500">{stressStats.high}</p>
          </div>
          <div className="wedding-card p-4 text-center">
            <p className="text-muted-foreground text-sm">Medium Priority</p>
            <p className="text-3xl font-bold text-amber-500">{stressStats.medium}</p>
          </div>
          <div className="wedding-card p-4 text-center">
            <p className="text-muted-foreground text-sm">Low Priority</p>
            <p className="text-3xl font-bold text-green-500">{stressStats.low}</p>
          </div>
          <div className="wedding-card p-4 text-center">
            <p className="text-muted-foreground text-sm">Avg. Impact</p>
            <p className="text-3xl font-bold text-[hsl(var(--wedding-navy))]">{stressStats.avgImpact.toFixed(1)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stress Items Management */}
          <div className="md:col-span-2 space-y-6">
            <div className="wedding-card">
              <div className="flex items-center mb-6">
                <BrainCircuit className="w-6 h-6 text-[hsl(var(--wedding-rose))] mr-3" />
                <h2 className="text-2xl font-wedding-serif font-semibold">Stress Factors</h2>
              </div>
              
              <div className="flex space-x-2 mb-6">
                <Button 
                  variant={activeTab === 'all' ? 'wedding' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveTab('all')}
                >
                  All
                </Button>
                <Button 
                  variant={activeTab === 'high' ? 'wedding' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveTab('high')}
                  className="text-red-500"
                >
                  High
                </Button>
                <Button 
                  variant={activeTab === 'medium' ? 'wedding' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveTab('medium')}
                  className="text-amber-500"
                >
                  Medium
                </Button>
                <Button 
                  variant={activeTab === 'low' ? 'wedding' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveTab('low')}
                  className="text-green-500"
                >
                  Low
                </Button>
              </div>
              
              {/* Add New Stress Item Form */}
              <div className="mb-6 p-4 border border-[hsl(var(--wedding-blush))] rounded-md bg-[hsl(var(--wedding-blush)/0.1)]">
                <h3 className="font-medium mb-3">Add New Stress Factor</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      What's stressing you out?
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      placeholder="Describe your stress factor..."
                      className="w-full border-gray-200 rounded-md focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">
                      Priority Level
                    </label>
                    <select
                      id="category"
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                      className="w-full border-gray-200 rounded-md focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Impact Level: {newItem.impact}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newItem.impact}
                    onChange={(e) => setNewItem({ ...newItem, impact: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Low Impact</span>
                    <span>High Impact</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">
                      Potential Solutions
                    </label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleAddSolution}
                      className="text-xs"
                    >
                      Add Solution
                    </Button>
                  </div>
                  
                  {(newItem.solutions || []).map((solution, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={solution}
                        onChange={(e) => handleSolutionChange(index, e.target.value)}
                        placeholder="Add a solution..."
                        className="flex-1 border-gray-200 rounded-md focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
                      />
                      {(newItem.solutions || []).length > 1 && (
                        <button 
                          onClick={() => handleRemoveSolution(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <Button variant="wedding" onClick={handleAddStressItem}>
                    Add to Planner
                  </Button>
                </div>
              </div>
              
              {/* Stress Items List */}
              {filteredItems.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No stress factors in this category. Add some to start tracking!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredItems.map(item => (
                    <div 
                      key={item.id} 
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          {getStressIcon(item.category)}
                          <h3 className={`text-lg font-medium ml-2 ${getStressColor(item.category)}`}>
                            {item.description}
                          </h3>
                        </div>
                        <button 
                          onClick={() => handleDeleteStressItem(item.id)}
                          className="text-gray-400 hover:text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <span className="text-xs text-muted-foreground mr-2">Impact:</span>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full">
                          <div 
                            className={`h-1.5 rounded-full ${
                              item.impact > 7 ? 'bg-red-500' : 
                              item.impact > 4 ? 'bg-amber-500' : 
                              'bg-green-500'
                            }`}
                            style={{ width: `${item.impact * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium ml-2">{item.impact}/10</span>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-1">Solutions:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {item.solutions.map((solution, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground">
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Self-Care Tracker */}
          <div className="space-y-6">
            <div className="wedding-card">
              <div className="flex items-center mb-6">
                <Heart className="w-6 h-6 text-[hsl(var(--wedding-rose))] mr-3" />
                <h2 className="text-2xl font-wedding-serif font-semibold">Self-Care Tracker</h2>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{selfCareCompleted}/{selfCareTotal} complete</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div 
                    className="h-2 rounded-full bg-[hsl(var(--wedding-rose))]"
                    style={{ width: `${(selfCareCompleted / selfCareTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div 
                  className={`p-3 border rounded-md flex items-center justify-between ${
                    selfCareItems['morning-meditation'] 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleToggleSelfCare('morning-meditation')}
                >
                  <div className="flex items-center">
                    <Moon className="h-5 w-5 text-[hsl(var(--wedding-navy))] mr-2" />
                    <span>Morning meditation</span>
                  </div>
                  <CheckCircle2 className={`h-5 w-5 ${
                    selfCareItems['morning-meditation'] 
                      ? 'text-green-500' 
                      : 'text-gray-300'
                  }`} />
                </div>
                
                <div 
                  className={`p-3 border rounded-md flex items-center justify-between ${
                    selfCareItems['regular-exercise'] 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleToggleSelfCare('regular-exercise')}
                >
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-[hsl(var(--wedding-navy))] mr-2" />
                    <span>Regular exercise</span>
                  </div>
                  <CheckCircle2 className={`h-5 w-5 ${
                    selfCareItems['regular-exercise'] 
                      ? 'text-green-500' 
                      : 'text-gray-300'
                  }`} />
                </div>
                
                <div 
                  className={`p-3 border rounded-md flex items-center justify-between ${
                    selfCareItems['delegate-tasks'] 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleToggleSelfCare('delegate-tasks')}
                >
                  <div className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-[hsl(var(--wedding-navy))] mr-2" />
                    <span>Delegate tasks</span>
                  </div>
                  <CheckCircle2 className={`h-5 w-5 ${
                    selfCareItems['delegate-tasks'] 
                      ? 'text-green-500' 
                      : 'text-gray-300'
                  }`} />
                </div>
                
                <div 
                  className={`p-3 border rounded-md flex items-center justify-between ${
                    selfCareItems['date-nights'] 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleToggleSelfCare('date-nights')}
                >
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-[hsl(var(--wedding-navy))] mr-2" />
                    <span>Date nights (no wedding talk)</span>
                  </div>
                  <CheckCircle2 className={`h-5 w-5 ${
                    selfCareItems['date-nights'] 
                      ? 'text-green-500' 
                      : 'text-gray-300'
                  }`} />
                </div>
                
                <div 
                  className={`p-3 border rounded-md flex items-center justify-between ${
                    selfCareItems['sleep-schedule'] 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleToggleSelfCare('sleep-schedule')}
                >
                  <div className="flex items-center">
                    <Moon className="h-5 w-5 text-[hsl(var(--wedding-navy))] mr-2" />
                    <span>Maintain sleep schedule</span>
                  </div>
                  <CheckCircle2 className={`h-5 w-5 ${
                    selfCareItems['sleep-schedule'] 
                      ? 'text-green-500' 
                      : 'text-gray-300'
                  }`} />
                </div>
                
                <div 
                  className={`p-3 border rounded-md flex items-center justify-between ${
                    selfCareItems['tech-breaks'] 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleToggleSelfCare('tech-breaks')}
                >
                  <div className="flex items-center">
                    <Coffee className="h-5 w-5 text-[hsl(var(--wedding-navy))] mr-2" />
                    <span>Take tech breaks</span>
                  </div>
                  <CheckCircle2 className={`h-5 w-5 ${
                    selfCareItems['tech-breaks'] 
                      ? 'text-green-500' 
                      : 'text-gray-300'
                  }`} />
                </div>
              </div>
            </div>
            
            <div className="wedding-card">
              <div className="flex items-center mb-4">
                <BarChart className="w-6 h-6 text-[hsl(var(--wedding-rose))] mr-3" />
                <h2 className="text-xl font-wedding-serif font-semibold">Stress Breakdown</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-500 font-medium">High Priority</span>
                    <span className="text-muted-foreground">{stressStats.high} items</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div 
                      className="h-2 rounded-full bg-red-500"
                      style={{ width: `${(stressStats.high / stressStats.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-amber-500 font-medium">Medium Priority</span>
                    <span className="text-muted-foreground">{stressStats.medium} items</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div 
                      className="h-2 rounded-full bg-amber-500"
                      style={{ width: `${(stressStats.medium / stressStats.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-500 font-medium">Low Priority</span>
                    <span className="text-muted-foreground">{stressStats.low} items</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${(stressStats.low / stressStats.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="wedding" className="w-full" onClick={() => alert('Stress plan saved!')}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Stress Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
