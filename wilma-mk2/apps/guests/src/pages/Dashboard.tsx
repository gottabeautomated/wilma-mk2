import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Grid3X3, 
  MapPin, 
  Sparkles, 
  CheckCircle, 
  Clock,
  AlertCircle,
  TrendingUp,
  Heart,
  Camera,
  Download,
  ChevronRight,
  Plus,
  Star,
  Gift,
  Trophy,
  UserPlus,
  Table,
  Settings
} from 'lucide-react'

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Gäste',
      value: '120',
      subtitle: 'von 150',
      icon: Users,
      color: 'royal',
      gradient: 'royal-gradient',
      change: '+12 diese Woche',
      changeType: 'positive'
    },
    {
      title: 'Tische',
      value: '12',
      subtitle: 'arrangiert',
      icon: Table,
      color: 'gold',
      gradient: 'gold-gradient',
      change: '3 neu konfiguriert',
      changeType: 'neutral'
    },
    {
      title: 'Platziert',
      value: '96',
      subtitle: 'von 120',
      icon: Heart,
      color: 'moss',
      gradient: 'moss-gradient',
      change: '+18 heute',
      changeType: 'positive'
    },
    {
      title: 'Glücksfaktor',
      value: '94%',
      subtitle: 'optimiert',
      icon: Trophy,
      color: 'accent',
      gradient: 'elegant-multi-gradient',
      change: '+2% verbessert',
      changeType: 'positive'
    }
  ]

  const recentActivities = [
    { 
      id: 1, 
      action: 'Neue Gäste hinzugefügt', 
      detail: 'Maria & Thomas Schmidt', 
      time: 'vor 2 Stunden',
      icon: UserPlus,
      color: 'royal'
    },
    { 
      id: 2, 
      action: 'Tischplan optimiert', 
      detail: 'KI-Empfehlung angewendet', 
      time: 'vor 4 Stunden',
      icon: Sparkles,
      color: 'gold'
    },
    { 
      id: 3, 
      action: 'Foto hochgeladen', 
      detail: 'Profilbild für Anna Müller', 
      time: 'vor 1 Tag',
      icon: Camera,
      color: 'moss'
    },
    { 
      id: 4, 
      action: 'Beziehung definiert', 
      detail: 'Arbeitskollegin → Enge Freundin', 
      time: 'vor 2 Tagen',
      icon: Heart,
      color: 'accent'
    }
  ]

  const quickActions = [
    { 
      title: 'Gast hinzufügen', 
      description: 'Neue Gäste zur Hochzeit einladen',
      icon: UserPlus, 
      color: 'royal',
      href: '/guests'
    },
    { 
      title: 'Tischplan optimieren', 
      description: 'KI-basierte Sitzplatz-Optimierung',
      icon: Sparkles, 
      color: 'gold',
      href: '/seating-chart'
    },
    { 
      title: 'Venue bearbeiten', 
      description: 'Raumaufteilung anpassen',
      icon: MapPin, 
      color: 'moss',
      href: '/venue-editor'
    },
    { 
      title: 'Tisch erstellen', 
      description: 'Individuelle Tischformen designen',
      icon: Plus, 
      color: 'accent',
      href: '/table-designer'
    }
  ]

  const progressData = [
    { label: 'Gastliste', progress: 80, color: 'royal' },
    { label: 'Sitzplan', progress: 65, color: 'gold' },
    { label: 'Venue-Setup', progress: 45, color: 'moss' },
    { label: 'Optimierung', progress: 94, color: 'accent' }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-serif font-bold text-graphite mb-2">
            Emma & Max
          </h1>
          <p className="text-lg text-accent font-medium">
            15. Juni 2024 • Schloss Bellevue • 120 Gäste
          </p>
          <div className="elegant-divider"></div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="card-elegant group hover:shadow-royal transition-all duration-300">
              <div className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-elegant ${stat.gradient} text-white`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    stat.changeType === 'positive' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-graphite mt-4">
                  {stat.value}
                </h3>
                <p className="text-accent text-sm mt-1">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="card-elegant">
            <div className="mb-6">
              <h3 className="text-xl font-serif text-graphite flex items-center gap-2">
                <Star className="w-5 h-5 text-gold" />
                Schnellaktionen
              </h3>
              <p className="text-accent text-sm mt-2">
                Die wichtigsten Aktionen für Ihre Hochzeitsplanung
              </p>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-elegant bg-white/50 hover:bg-white/80 transition-all duration-300 border border-undertone/30 hover:border-champagne/50 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-elegant ${action.color === 'royal' ? 'accent-royal' : 
                        action.color === 'gold' ? 'accent-gold' : 
                        action.color === 'moss' ? 'accent-moss' : 'bg-accent text-white'}`}>
                        <action.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-graphite group-hover:text-royal transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-sm text-accent mt-1">
                          {action.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-accent/50 group-hover:text-royal transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="card-elegant">
            <div className="mb-6">
              <h3 className="text-xl font-serif text-graphite flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-moss" />
                Letzte Aktivitäten
              </h3>
              <p className="text-accent text-sm mt-2">
                Ihre neuesten Änderungen im Überblick
              </p>
            </div>
            <div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-elegant bg-white/30 hover:bg-white/50 transition-all duration-200"
                  >
                    <div className={`p-1.5 rounded-elegant ${
                      activity.color === 'royal' ? 'bg-royal/10 text-royal' :
                      activity.color === 'gold' ? 'bg-gold/10 text-gold' :
                      activity.color === 'moss' ? 'bg-moss/10 text-moss' :
                      'bg-accent/10 text-accent'
                    }`}>
                      <activity.icon className="w-3 h-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-graphite">
                        {activity.action}
                      </p>
                      <p className="text-xs text-accent mt-1">
                        {activity.detail}
                      </p>
                      <p className="text-xs text-accent/70 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="card-elegant">
          <div className="mb-6">
            <h3 className="text-xl font-serif text-graphite flex items-center gap-2">
              <Gift className="w-5 h-5 text-accent" />
              Planungsfortschritt
            </h3>
            <p className="text-accent text-sm mt-2">
              Überblick über den aktuellen Stand Ihrer Hochzeitsplanung
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {progressData.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <svg className="transform -rotate-90 w-16 h-16">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        className="text-undertone"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - item.progress / 100)}`}
                        className={`${
                          item.color === 'royal' ? 'text-royal' :
                          item.color === 'gold' ? 'text-gold' :
                          item.color === 'moss' ? 'text-moss' :
                          'text-accent'
                        } transition-all duration-1000`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-graphite">
                        {item.progress}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-graphite">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard 