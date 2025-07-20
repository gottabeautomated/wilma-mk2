import React from 'react';
import { motion } from 'framer-motion';
import ElegantIcon from './ElegantIcon';
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const footerLinks = [
        { name: 'Datenschutz', icon: 'castle', href: '/datenschutz' },
        { name: 'Impressum', icon: 'calendar', href: '/impressum' },
        { name: 'AGB', icon: 'gift', href: '/agb' },
        { name: 'Kontakt', icon: 'heart', href: '/kontakt' }
    ];
    const socialLinks = [
        { name: 'Instagram', icon: 'camera', href: 'https://instagram.com/wilma_wedding' },
        { name: 'Pinterest', icon: 'sparkles', href: 'https://pinterest.com/wilma_wedding' },
        { name: 'Facebook', icon: 'heart', href: 'https://facebook.com/wilma_wedding' },
        { name: 'Email', icon: 'gift', href: 'mailto:hallo@wilma.com' }
    ];
    const features = [
        { name: 'Budget-Rechner', icon: 'calculator', description: 'Intelligente Kostenplanung' },
        { name: 'Venue-Finder', icon: 'castle', description: 'Perfekte Location finden' },
        { name: 'Gästeverwaltung', icon: 'heart', description: 'Einladungen & RSVPs' },
        { name: 'Timeline-Planer', icon: 'calendar', description: 'Detaillierte Zeitplanung' }
    ];
    return (<footer className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 border-t border-undertone mt-16">
      {/* Elegant Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Elegant Brand Section */}
          <motion.div className="lg:col-span-1" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent via-champagne to-primary-300 rounded-elegant flex items-center justify-center shadow-elegant hover:shadow-gold transition-all duration-300">
                <ElegantIcon name="rings" className="text-white" size={16}/>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-graphite">WILMA</h3>
                <p className="text-xs text-accent font-medium -mt-1">Budget Planer</p>
              </div>
            </div>
            <p className="text-accent/80 leading-relaxed font-light">
              Wir helfen Ihnen dabei, Ihre Traumhochzeit zu planen - 
              mit intelligenten Tools, persönlichen Empfehlungen und viel Liebe zum Detail.
            </p>
            <div className="mt-6 flex items-center space-x-2 text-sm text-accent/70">
              <ElegantIcon name="heart" className="text-gold" size={16}/>
              <span>Gemacht mit Leidenschaft in Österreich</span>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div className="lg:col-span-1" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
            <h4 className="text-xl font-serif font-semibold text-graphite mb-6 flex items-center">
              <ElegantIcon name="sparkles" className="text-royal mr-2" size={20}/>
              Unsere Tools
            </h4>
            <div className="space-y-4">
              {features.map((feature, index) => (<motion.div key={feature.name} className="flex items-start space-x-3 group cursor-pointer" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <div className="w-8 h-8 rounded-elegant bg-primary-100 flex items-center justify-center group-hover:bg-gold-light/20 group-hover:shadow-gold transition-all duration-300">
                    <ElegantIcon name={feature.icon} className="text-accent group-hover:text-gold transition-colors duration-300" size={14}/>
                  </div>
                  <div>
                    <h5 className="font-medium text-graphite group-hover:text-gold transition-colors duration-300">
                      {feature.name}
                    </h5>
                    <p className="text-sm text-accent/70 font-light">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="lg:col-span-1" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}>
            <h4 className="text-xl font-serif font-semibold text-graphite mb-6 flex items-center">
              <ElegantIcon name="calendar" className="text-royal mr-2" size={20}/>
              Rechtliches
            </h4>
            <div className="space-y-3">
              {footerLinks.map((link, index) => (<motion.div key={link.name} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href={link.href} className="flex items-center space-x-3 text-royal hover:text-graphite transition-all duration-300 group">
                    <ElegantIcon name={link.icon} className="group-hover:text-graphite transition-colors" size={14}/>
                    <span className="font-light">{link.name}</span>
                  </a>
                </motion.div>))}
            </div>
          </motion.div>

          {/* Contact & Social */}
          <motion.div className="lg:col-span-1" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true }}>
            <h4 className="text-xl font-serif font-semibold text-graphite mb-6 flex items-center">
              <ElegantIcon name="heart" className="text-royal mr-2" size={20}/>
              Folgen Sie uns
            </h4>
            
            {/* Social Links */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {socialLinks.map((social, index) => (<motion.a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="card-elegant text-center transition-all duration-300 hover:shadow-golden group" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} title={social.name}>
                  <ElegantIcon name={social.icon} className="text-royal group-hover:text-graphite transition-colors mx-auto mb-2" size={20}/>
                  <span className="text-xs font-medium text-royal group-hover:text-graphite transition-colors">
                    {social.name}
                  </span>
                </motion.a>))}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-accent/80">
                <ElegantIcon name="gift" className="text-royal" size={14}/>
                <span className="font-light text-sm">hallo@wilma.com</span>
              </div>
              <div className="flex items-center space-x-3 text-accent/80">
                <ElegantIcon name="calendar" className="text-royal" size={14}/>
                <span className="font-light text-sm">+43 1 234 5678</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Elegant Bottom Section */}
        <motion.div className="border-t border-undertone mt-12 pt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} viewport={{ once: true }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-accent/70 font-light">
              © {currentYear} Wilma Wedding Planning. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center space-x-2 text-sm text-accent/70">
              <span className="font-light">Entwickelt mit</span>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <ElegantIcon name="heart" className="text-royal" size={14}/>
              </motion.div>
              <span className="font-light">und</span>
              <ElegantIcon name="sparkles" className="text-royal" size={14}/>
              <span className="font-light">in Wien</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Elegant Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <motion.div className="absolute top-20 left-20" animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0]
        }} transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }}>
          <ElegantIcon name="rings" className="text-royal" size={24}/>
        </motion.div>
        <motion.div className="absolute bottom-32 right-32" animate={{
            y: [0, -12, 0],
            x: [0, 8, 0]
        }} transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
        }}>
          <ElegantIcon name="flower" className="text-moss" size={20}/>
        </motion.div>
        <motion.div className="absolute top-1/2 left-1/2" animate={{
            rotate: [0, 360]
        }} transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
        }}>
          <ElegantIcon name="sparkles" className="text-royal" size={18}/>
        </motion.div>
        <motion.div className="absolute top-40 right-1/4" animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1]
        }} transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
        }}>
          <ElegantIcon name="castle" className="text-moss" size={16}/>
        </motion.div>
      </div>
    </footer>);
};
export default Footer;
