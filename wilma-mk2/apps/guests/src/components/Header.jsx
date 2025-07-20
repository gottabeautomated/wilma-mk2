import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Bell, User, Search, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
const Header = () => {
    const { user, currentWedding, signOut } = useAuth();
    const handleSignOut = async () => {
        await signOut();
    };
    return (<header className="bg-white border-b border-undertone px-6 py-4 shadow-elegant">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div className="flex items-center space-x-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-10 h-10 bg-royal rounded-xl flex items-center justify-center shadow-elegant">
            <Heart className="w-5 h-5 text-white"/>
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-royal">
              Wilma Gäste-Manager
            </h1>
            <p className="text-sm text-accent">
              Perfekte Sitzordnung für eure Traumhochzeit
            </p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div className="flex-1 max-w-md mx-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-accent/60"/>
            <input type="text" placeholder="Gäste suchen..." className="w-full pl-10 pr-4 py-2 bg-softrose border border-undertone rounded-lg focus:outline-none focus:ring-2 focus:ring-royal focus:border-transparent transition-all duration-200"/>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div className="flex items-center space-x-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          {/* Notifications */}
          <button className="relative p-2 text-accent hover:text-royal transition-colors duration-200">
            <Bell className="w-5 h-5"/>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-softrose">
              <div className="w-8 h-8 bg-royal rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white"/>
              </div>
              <div className="text-sm">
                <p className="font-medium text-graphite">
                  {currentWedding?.venue_name || 'Ihre Hochzeit'}
                </p>
                <p className="text-xs text-accent">
                  {user?.email}
                </p>
              </div>
            </div>
            
            {/* Logout Button */}
            <button onClick={handleSignOut} className="p-2 text-accent hover:text-royal transition-colors duration-200" title="Abmelden">
              <LogOut className="w-5 h-5"/>
            </button>
          </div>
        </motion.div>
      </div>
    </header>);
};
export default Header;
