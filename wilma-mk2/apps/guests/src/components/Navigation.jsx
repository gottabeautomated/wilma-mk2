import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Users, Grid3X3, Palette, MapPin, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
const Navigation = () => {
    const { currentWedding } = useAuth();
    const [statistics, setStatistics] = useState({
        total: 0,
        confirmed: 0,
        pending: 0,
        declined: 0
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (currentWedding) {
            loadStatistics();
        }
    }, [currentWedding]);
    const loadStatistics = async () => {
        if (!currentWedding)
            return;
        try {
            setLoading(true);
            // Timeout für API-Aufruf
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000));
            const statsPromise = supabase
                .from('guests')
                .select('status')
                .eq('wedding_id', currentWedding.id)
                .then(({ data, error }) => {
                if (error)
                    throw error;
                const total = data?.length || 0;
                const confirmed = data?.filter(g => g.status === 'confirmed').length || 0;
                const pending = data?.filter(g => g.status === 'pending').length || 0;
                const declined = data?.filter(g => g.status === 'declined').length || 0;
                return { total, confirmed, pending, declined };
            });
            const stats = await Promise.race([statsPromise, timeoutPromise]);
            setStatistics(stats || {
                total: 0,
                confirmed: 0,
                pending: 0,
                declined: 0
            });
        }
        catch (error) {
            console.error('Error loading statistics:', error);
            // Fallback zu leeren Statistiken
            setStatistics({
                total: 0,
                confirmed: 0,
                pending: 0,
                declined: 0
            });
        }
        finally {
            setLoading(false);
        }
    };
    const formatDate = (dateString) => {
        if (!dateString)
            return 'Datum nicht gesetzt';
        return new Date(dateString).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    // Berechne Fortschritt basierend auf Bestätigungen
    const progressPercentage = statistics.total > 0
        ? Math.round((statistics.confirmed / statistics.total) * 100)
        : 0;
    const navigationItems = [
        {
            path: '/',
            icon: Home,
            label: 'Dashboard',
            description: 'Übersicht & Statistiken'
        },
        {
            path: '/guests',
            icon: Users,
            label: 'Gäste',
            description: 'Gäste verwalten'
        },
        {
            path: '/seating',
            icon: Grid3X3,
            label: 'Sitzordnung',
            description: 'Interaktiver Sitzplan'
        },
        {
            path: '/tables',
            icon: Palette,
            label: 'Tisch Designer',
            description: 'Tische erstellen'
        },
        {
            path: '/venue',
            icon: MapPin,
            label: 'Venue Editor',
            description: 'Location gestalten'
        },
        {
            path: '/analytics',
            icon: BarChart3,
            label: 'Analytics',
            description: 'Daten & Insights'
        },
        {
            path: '/settings',
            icon: Settings,
            label: 'Einstellungen',
            description: 'App-Konfiguration'
        }
    ];
    return (<nav className="fixed left-0 top-0 h-full w-64 bg-white border-r border-undertone shadow-elegant overflow-y-auto">
      <div className="p-6 pt-20">
        {/* Main Navigation */}
        <div className="space-y-2">
          {navigationItems.map((item, index) => (<motion.div key={item.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <NavLink to={item.path} className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive
                ? 'bg-royal text-white shadow-lg'
                : 'text-accent hover:bg-softrose hover:text-royal'}
                `}>
                <item.icon className="w-5 h-5"/>
                <div>
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </NavLink>
            </motion.div>))}
        </div>

        {/* Wedding Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }} className="mt-8 pt-8 border-t border-undertone">
          <div className="bg-softrose rounded-lg p-4 border border-champagne">
            <h4 className="font-semibold text-royal mb-2">
              {currentWedding?.venue_name || 'Ihre Hochzeit'}
            </h4>
            <div className="text-sm text-accent space-y-1">
              <p>🗓️ {formatDate(currentWedding?.wedding_date || null)}</p>
              <p>📍 {currentWedding?.venue_address || 'Ort wird bekannt gegeben'}</p>
              {loading ? (<p>👥 Laden...</p>) : (<p>👥 {statistics.total} Gäste</p>)}
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="mt-6">
          <div className="flex items-center justify-between text-sm text-accent mb-2">
            <span>Fortschritt</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-undertone rounded-full h-2">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} transition={{ duration: 1, delay: 1.4 }} className="bg-royal h-2 rounded-full"/>
          </div>
        </motion.div>
      </div>
    </nav>);
};
export default Navigation;
