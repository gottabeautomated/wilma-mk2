import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { budgetService } from '../lib/budgetService';
import { pdfService } from '../lib/pdfService';
import ElegantIcon from './ElegantIcon';
import Toast from './Toast';
const BudgetResults = ({ budgetData, calculationResult, onBackToForm, onRecalculate }) => {
    const [animatedValues, setAnimatedValues] = useState({});
    const [showShareModal, setShowShareModal] = useState(false);
    const [isEmailSending, setIsEmailSending] = useState(false);
    const [emailStatus, setEmailStatus] = useState('idle');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    // Debug: Log KI-Empfehlungen
    useEffect(() => {
        console.log('🔍 BudgetResults Debug - calculationResult:', calculationResult);
        console.log('📊 Recommendations:', calculationResult.recommendations);
        console.log('💰 SavingTips:', calculationResult.savingTips);
        console.log('👥 PersonalizedAdvice:', calculationResult.personalizedAdvice);
        console.log('⚠️ RiskAnalysis:', calculationResult.riskAnalysis);
    }, [calculationResult]);
    // Animate numbers on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            const animated = {};
            calculationResult.categories.forEach(category => {
                animated[category.id] = category.amount;
            });
            setAnimatedValues(animated);
        }, 500);
        return () => clearTimeout(timer);
    }, [calculationResult.categories]);
    // CountUp animation hook
    const useCountUp = (end, duration = 2000) => {
        const [count, setCount] = useState(0);
        useEffect(() => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp)
                    startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                setCount(Math.floor(progress * end));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }, [end, duration]);
        return count;
    };
    const totalBudgetAnimated = useCountUp(budgetData.totalBudget || 0);
    const guestCountAnimated = useCountUp(budgetData.guestCount || 0);
    const perGuestAnimated = useCountUp(Math.round(calculationResult.pricePerGuest || 0));
    // Elegant Wilma colors for chart
    const COLORS = [
        '#6B46C1', // royal
        '#8B5CF6', // royal-light  
        '#A78BFA', // royal/60
        '#C4B5FD', // royal/40
        '#DDD6FE', // royal/20
        '#5B21B6', // royal-dark
        '#7C3AED', // purple-600
        '#8B5A3C', // accent
        '#A16F47' // accent-light
    ];
    const showToastMessage = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
    };
    const handleSendEmail = async () => {
        setIsEmailSending(true);
        setEmailStatus('idle');
        try {
            const result = await budgetService.sendResultsEmail(budgetData, calculationResult);
            if (result.success) {
                setEmailStatus('success');
                showToastMessage('E-Mail erfolgreich versendet!', 'success');
            }
            else {
                setEmailStatus('error');
                showToastMessage('Fehler beim E-Mail-Versand', 'error');
            }
        }
        catch (error) {
            setEmailStatus('error');
            showToastMessage('Fehler beim E-Mail-Versand', 'error');
        }
        finally {
            setIsEmailSending(false);
        }
    };
    const handleExportPDF = async () => {
        try {
            await pdfService.generatePDF(budgetData, calculationResult);
            showToastMessage('PDF erfolgreich erstellt!', 'success');
        }
        catch (error) {
            console.error('PDF generation failed:', error);
            // Fallback to text export
            const content = budgetService.generatePDFContent(budgetData, calculationResult);
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `hochzeitsbudget-${budgetData.partner1Name}-${budgetData.partner2Name}.txt`;
            a.click();
            URL.revokeObjectURL(url);
            showToastMessage('Budget-Datei heruntergeladen!', 'success');
        }
    };
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Mein Hochzeitsbudget',
                text: `Unser Hochzeitsbudget: €${budgetData.totalBudget.toLocaleString()} für ${budgetData.guestCount} Gäste`,
                url: window.location.href
            });
        }
        else {
            setShowShareModal(true);
        }
    };
    const getBudgetEfficiencyColor = (efficiency) => {
        switch (efficiency) {
            case 'high': return 'text-green-600 bg-green-50 border-green-200';
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'low': return 'text-royal bg-royal/10 border-royal/20';
            default: return 'text-graphite bg-undertone border-undertone';
        }
    };
    const getBudgetEfficiencyText = (efficiency) => {
        switch (efficiency) {
            case 'high': return 'Sehr effizient';
            case 'medium': return 'Durchschnittlich';
            case 'low': return 'Luxuriös';
            default: return 'Unbekannt';
        }
    };
    const getBudgetEfficiencyIcon = (efficiency) => {
        switch (efficiency) {
            case 'high': return 'heart';
            case 'medium': return 'sparkles';
            case 'low': return 'crown';
            default: return 'star';
        }
    };
    return (<div className="section-elegant">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="w-20 h-20 mx-auto bg-gradient-to-br from-royal via-royal-light to-accent rounded-elegant flex items-center justify-center shadow-royal mb-6">
            <ElegantIcon name="heart" className="text-white" size={32}/>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl font-serif font-bold text-graphite">
            Ihr Hochzeitsbudget
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-accent font-light">
            {budgetData.partner1Name} & {budgetData.partner2Name}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center justify-center space-x-2 text-sm text-accent">
            <ElegantIcon name="calendar" size={16}/>
            <span>{budgetData.weddingDate}</span>
            <span>•</span>
            <span className="capitalize">{budgetData.weddingStyle} Stil</span>
            <span>•</span>
            <span className="capitalize">{budgetData.venueType}</span>
          </motion.div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="card-elegant text-center hover:shadow-royal transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-royal to-royal-dark rounded-elegant flex items-center justify-center">
              <ElegantIcon name="gift" className="text-white" size={20}/>
            </div>
            <div className="text-2xl font-bold text-royal mb-1">
              €{(totalBudgetAnimated || 0).toLocaleString()}
            </div>
            <div className="text-sm text-accent font-medium">Gesamtbudget</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="card-elegant text-center hover:shadow-royal transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-royal-light to-royal rounded-elegant flex items-center justify-center">
              <ElegantIcon name="users" className="text-white" size={20}/>
            </div>
            <div className="text-2xl font-bold text-royal mb-1">
              {guestCountAnimated || 0}
            </div>
            <div className="text-sm text-accent font-medium">Gäste</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="card-elegant text-center hover:shadow-royal transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-accent to-accent-dark rounded-elegant flex items-center justify-center">
              <ElegantIcon name="calculator" className="text-white" size={20}/>
            </div>
            <div className="text-2xl font-bold text-royal mb-1">
              €{(perGuestAnimated || 0)}
            </div>
            <div className="text-sm text-accent font-medium">Pro Gast</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="card-elegant text-center hover:shadow-royal transition-all duration-300">
            <div className={`w-12 h-12 mx-auto mb-4 rounded-elegant flex items-center justify-center bg-gradient-to-br ${calculationResult.budgetEfficiency === 'high' ? 'from-green-500 to-green-600' :
            calculationResult.budgetEfficiency === 'medium' ? 'from-yellow-500 to-yellow-600' :
                'from-royal to-royal-dark'}`}>
              <ElegantIcon name={getBudgetEfficiencyIcon(calculationResult.budgetEfficiency)} className="text-white" size={20}/>
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-elegant text-xs font-medium border ${getBudgetEfficiencyColor(calculationResult.budgetEfficiency)}`}>
              {getBudgetEfficiencyText(calculationResult.budgetEfficiency)}
            </div>
            <div className="text-sm text-accent font-medium mt-2">Budget-Effizienz</div>
          </motion.div>
        </div>

        {/* Budget Breakdown Chart & Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} className="card-elegant">
            <h3 className="text-xl font-serif font-semibold text-graphite mb-6 text-center">
              Budget-Verteilung
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={calculationResult.categories} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="amount" label={({ name, percentage }) => `${percentage}%`}>
                    {calculationResult.categories.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))}
                  </Pie>
                  <Tooltip formatter={(value) => [`€${value.toLocaleString()}`, 'Betrag']} labelFormatter={(label) => `Kategorie: ${label}`}/>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Categories List */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }} className="card-elegant">
            <h3 className="text-xl font-serif font-semibold text-graphite mb-6">
              Detaillierte Aufteilung
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {calculationResult.categories.map((category, index) => (<motion.div key={category.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + index * 0.1 }} className="flex items-center space-x-4 p-3 bg-gradient-to-r from-undertone to-transparent rounded-elegant hover:from-royal/5 hover:to-royal/10 transition-all duration-300">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}/>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-graphite">
                        {category.icon} {category.name}
                      </span>
                      <span className="font-bold text-royal">
                        €{(animatedValues[category.id] || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-accent">{category.description}</span>
                      <span className="text-sm text-accent font-medium">{category.percentage}%</span>
                    </div>
                  </div>
                </motion.div>))}
            </div>
          </motion.div>
        </div>

        {/* AI Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recommendations */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="card-elegant">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-royal to-royal-dark rounded-elegant flex items-center justify-center">
                <ElegantIcon name="sparkles" className="text-white" size={18}/>
              </div>
              <h3 className="text-xl font-serif font-semibold text-graphite">
                Empfehlungen
              </h3>
            </div>
            <div className="space-y-3">
              {calculationResult.recommendations.map((rec, index) => (<motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 + index * 0.1 }} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-royal/5 to-transparent rounded-elegant">
                  <ElegantIcon name="heart" className="text-royal mt-0.5" size={14}/>
                  <span className="text-sm text-graphite leading-relaxed">{rec}</span>
                </motion.div>))}
            </div>
          </motion.div>

          {/* Saving Tips */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }} className="card-elegant">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-elegant flex items-center justify-center">
                <ElegantIcon name="star" className="text-white" size={18}/>
              </div>
              <h3 className="text-xl font-serif font-semibold text-graphite">
                Spartipps
              </h3>
            </div>
            <div className="space-y-3">
              {calculationResult.savingTips.map((tip, index) => (<motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.7 + index * 0.1 }} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-green-50 to-transparent rounded-elegant">
                  <ElegantIcon name="gift" className="text-green-600 mt-0.5" size={14}/>
                  <span className="text-sm text-graphite leading-relaxed">{tip}</span>
                </motion.div>))}
            </div>
          </motion.div>
        </div>

        {/* Personalized Advice & Risk Analysis */}
        {(calculationResult.personalizedAdvice?.length > 0 || calculationResult.riskAnalysis?.length > 0) && (<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personalized Advice */}
            {calculationResult.personalizedAdvice?.length > 0 && (<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} className="card-elegant">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-dark rounded-elegant flex items-center justify-center">
                    <ElegantIcon name="users" className="text-white" size={18}/>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-graphite">
                    Persönliche Ratschläge
                  </h3>
                </div>
                <div className="space-y-3">
                  {calculationResult.personalizedAdvice.map((advice, index) => (<motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.9 + index * 0.1 }} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-accent/10 to-transparent rounded-elegant">
                      <ElegantIcon name="flower" className="text-accent mt-0.5" size={14}/>
                      <span className="text-sm text-graphite leading-relaxed">{advice}</span>
                    </motion.div>))}
                </div>
              </motion.div>)}

            {/* Risk Analysis */}
            {calculationResult.riskAnalysis?.length > 0 && (<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0 }} className="card-elegant">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-elegant flex items-center justify-center">
                    <ElegantIcon name="warning" className="text-white" size={18}/>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-graphite">
                    Risikoanalyse
                  </h3>
                </div>
                <div className="space-y-3">
                  {calculationResult.riskAnalysis.map((risk, index) => (<motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.1 + index * 0.1 }} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-orange-50 to-transparent rounded-elegant border-l-4 border-orange-200">
                      <ElegantIcon name="warning" className="text-orange-600 mt-0.5" size={14}/>
                      <span className="text-sm text-graphite leading-relaxed">{risk}</span>
                    </motion.div>))}
                </div>
              </motion.div>)}
          </div>)}

        {/* Action Buttons */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }} className="card-elegant">
          <h3 className="text-xl font-serif font-semibold text-graphite mb-6 text-center">
            Ihr Budget teilen & exportieren
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button onClick={handleExportPDF} className="btn-primary flex items-center justify-center space-x-2">
              <ElegantIcon name="download" size={18}/>
              <span>PDF Export</span>
            </button>

            <button onClick={handleSendEmail} disabled={isEmailSending} className="btn-secondary flex items-center justify-center space-x-2">
              {isEmailSending ? (<>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <ElegantIcon name="sparkles" size={18}/>
                  </motion.div>
                  <span>Sende...</span>
                </>) : (<>
                  <ElegantIcon name="mail" size={18}/>
                  <span>E-Mail senden</span>
                </>)}
            </button>

            <button onClick={handleShare} className="btn-outline flex items-center justify-center space-x-2">
              <ElegantIcon name="share" size={18}/>
              <span>Teilen</span>
            </button>

            <button onClick={onBackToForm} className="btn-outline flex items-center justify-center space-x-2">
              <ElegantIcon name="arrow-left" size={18}/>
              <span>Zurück</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Toast */}
      <Toast message={toastMessage} type={toastType} isVisible={showToast} onClose={() => setShowToast(false)}/>

      {/* Share Modal */}
      {showShareModal && (<motion.div className="fixed inset-0 bg-graphite/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setShowShareModal(false)}>
          <motion.div className="card-elegant max-w-md w-full" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-bold text-graphite">Budget teilen</h3>
              <button onClick={() => setShowShareModal(false)} className="w-8 h-8 bg-undertone hover:bg-royal/20 rounded-elegant flex items-center justify-center transition-colors">
                <ElegantIcon name="x" size={16} className="text-graphite"/>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-undertone rounded-elegant">
                <p className="text-sm text-graphite break-all">
                  {window.location.href}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                showToastMessage('Link kopiert!', 'success');
                setShowShareModal(false);
            }} className="btn-primary flex-1">
                  Link kopieren
                </button>
                <button onClick={() => setShowShareModal(false)} className="btn-outline">
                  Schließen
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>)}
    </div>);
};
export default BudgetResults;
