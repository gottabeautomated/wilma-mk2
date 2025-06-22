import { useState } from 'react'
import { Calendar, BarChart2, Briefcase, Users, Clock, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'budget' | 'guests'>('overview')
  
  // Mock data
  const upcomingTasks = [
    { id: 1, name: 'Book photographer', dueDate: '2 days', priority: 'high' },
    { id: 2, name: 'Order wedding cake samples', dueDate: '5 days', priority: 'medium' },
    { id: 3, name: 'Send invitations', dueDate: '1 week', priority: 'high' },
    { id: 4, name: 'Final dress fitting', dueDate: '2 weeks', priority: 'medium' }
  ]
  
  const budgetSummary = {
    total: 25000,
    spent: 12350,
    remaining: 12650,
    categories: [
      { name: 'Venue', percentage: 40, amount: 10000, spent: 8000 },
      { name: 'Catering', percentage: 25, amount: 6250, spent: 2500 },
      { name: 'Attire', percentage: 10, amount: 2500, spent: 1000 },
      { name: 'Photography', percentage: 10, amount: 2500, spent: 0 },
      { name: 'Decorations', percentage: 5, amount: 1250, spent: 500 },
      { name: 'Entertainment', percentage: 5, amount: 1250, spent: 350 },
      { name: 'Miscellaneous', percentage: 5, amount: 1250, spent: 0 }
    ]
  }
  
  const guestSummary = {
    total: 120,
    confirmed: 68,
    declined: 12,
    pending: 40
  }
  
  const timelineSummary = {
    daysUntilWedding: 120,
    completedTasks: 34,
    totalTasks: 78,
    upcomingMilestones: [
      { name: 'Send Invitations', daysAway: 7 },
      { name: 'Finalize Menu', daysAway: 14 },
      { name: 'Book Honeymoon', daysAway: 21 }
    ]
  }
  
  return (
    <div className="wedding-section">
      <div className="wedding-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-wedding-serif font-bold mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">
              Your wedding is in <span className="font-medium text-[hsl(var(--wedding-navy))]">{timelineSummary.daysUntilWedding} days</span>. Here's your planning overview.
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            <Button variant="outline" size="sm" asChild>
              <a href="#settings">
                Settings
              </a>
            </Button>
            <Button variant="wedding" size="sm">
              Save Progress
            </Button>
          </div>
        </div>
        
        {/* Dashboard Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-6 border-b">
          <button
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'overview' 
                ? 'text-[hsl(var(--wedding-navy))] border-b-2 border-[hsl(var(--wedding-rose))]' 
                : 'text-muted-foreground hover:text-[hsl(var(--wedding-navy))]'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'timeline' 
                ? 'text-[hsl(var(--wedding-navy))] border-b-2 border-[hsl(var(--wedding-rose))]' 
                : 'text-muted-foreground hover:text-[hsl(var(--wedding-navy))]'
            }`}
            onClick={() => setActiveTab('timeline')}
          >
            Timeline
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'budget' 
                ? 'text-[hsl(var(--wedding-navy))] border-b-2 border-[hsl(var(--wedding-rose))]' 
                : 'text-muted-foreground hover:text-[hsl(var(--wedding-navy))]'
            }`}
            onClick={() => setActiveTab('budget')}
          >
            Budget
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'guests' 
                ? 'text-[hsl(var(--wedding-navy))] border-b-2 border-[hsl(var(--wedding-rose))]' 
                : 'text-muted-foreground hover:text-[hsl(var(--wedding-navy))]'
            }`}
            onClick={() => setActiveTab('guests')}
          >
            Guest List
          </button>
        </div>
        
        {/* Dashboard Content */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="wedding-card"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Days Until Wedding</p>
                    <h3 className="text-3xl font-bold text-[hsl(var(--wedding-navy))]">{timelineSummary.daysUntilWedding}</h3>
                    <p className="text-sm text-muted-foreground mt-1">June 20, 2025</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--wedding-blush)/0.2)] flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-[hsl(var(--wedding-rose))]" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="wedding-card"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Budget Remaining</p>
                    <h3 className="text-3xl font-bold text-[hsl(var(--wedding-navy))]">${budgetSummary.remaining.toLocaleString()}</h3>
                    <p className="text-sm text-muted-foreground mt-1">${budgetSummary.spent.toLocaleString()} spent</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--wedding-blush)/0.2)] flex items-center justify-center">
                    <BarChart2 className="h-5 w-5 text-[hsl(var(--wedding-rose))]" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="wedding-card"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Guest Responses</p>
                    <h3 className="text-3xl font-bold text-[hsl(var(--wedding-navy))]">{guestSummary.confirmed} / {guestSummary.total}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{guestSummary.pending} pending</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--wedding-blush)/0.2)] flex items-center justify-center">
                    <Users className="h-5 w-5 text-[hsl(var(--wedding-rose))]" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="wedding-card"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tasks Completed</p>
                    <h3 className="text-3xl font-bold text-[hsl(var(--wedding-navy))]">{timelineSummary.completedTasks} / {timelineSummary.totalTasks}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{Math.round((timelineSummary.completedTasks / timelineSummary.totalTasks) * 100)}% complete</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--wedding-blush)/0.2)] flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-[hsl(var(--wedding-rose))]" />
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Tasks */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="wedding-card lg:col-span-2"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-wedding-serif font-semibold">Upcoming Tasks</h3>
                  <Button variant="outline" size="sm" asChild>
                    <a href="#all-tasks">View All</a>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div 
                      key={task.id}
                      className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-3 ${
                          task.priority === 'high' ? 'bg-red-500' : 
                          task.priority === 'medium' ? 'bg-amber-500' : 
                          'bg-green-500'
                        }`} />
                        <span className="font-medium">{task.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground mr-4">Due in {task.dueDate}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Budget Overview */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="wedding-card"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-wedding-serif font-semibold">Budget Overview</h3>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/budget-calculator">Details</a>
                  </Button>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Total Budget</span>
                    <span className="font-medium">${budgetSummary.total.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div 
                      className="h-2 rounded-full bg-[hsl(var(--wedding-rose))]"
                      style={{ width: `${(budgetSummary.spent / budgetSummary.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-muted-foreground">
                      ${budgetSummary.spent.toLocaleString()} spent ({Math.round((budgetSummary.spent / budgetSummary.total) * 100)}%)
                    </span>
                    <span className="text-muted-foreground">
                      ${budgetSummary.remaining.toLocaleString()} left
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {budgetSummary.categories.slice(0, 4).map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{category.name}</span>
                        <span className="font-medium">
                          ${category.spent.toLocaleString()} / ${category.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full">
                        <div 
                          className="h-1.5 rounded-full bg-[hsl(var(--wedding-rose))]"
                          style={{ width: `${(category.spent / category.amount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
        
        {activeTab === 'timeline' && (
          <div className="p-6 text-center">
            <p className="text-muted-foreground">Timeline view - detailed content to be implemented</p>
          </div>
        )}
        
        {activeTab === 'budget' && (
          <div className="p-6 text-center">
            <p className="text-muted-foreground">Budget view - detailed content to be implemented</p>
          </div>
        )}
        
        {activeTab === 'guests' && (
          <div className="p-6 text-center">
            <p className="text-muted-foreground">Guest list view - detailed content to be implemented</p>
          </div>
        )}
      </div>
    </div>
  )
}
