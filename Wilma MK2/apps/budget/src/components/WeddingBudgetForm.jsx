import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeddingForm } from '../hooks/useWeddingForm';
import ProgressStepper from './ProgressStepper';
import BasicsForm from './forms/BasicsForm';
import DetailsForm from './forms/DetailsForm';
import StyleForm from './forms/StyleForm';
import PrioritiesForm from './forms/PrioritiesForm';
import ElegantIcon from './ElegantIcon';
import { budgetService } from '../lib/budgetService';
import { consentService } from '../lib/consentService';
import Toast from './Toast';
import { ConsentModal } from './ConsentModal';
import BudgetResults from './BudgetResults';
const WeddingBudgetForm = ({ onFormComplete }) => {
    const { currentStep, formData, validationErrors, isCalculating, updateStepData, nextStep, prevStep, goToStep, submitForm, getCompletionPercentage, isStepCompleted, FORM_STEPS } = useWeddingForm();
    const [calculationResult, setCalculationResult] = useState(null);
    const [showConsentModal, setShowConsentModal] = useState(false);
    const [toast, setToast] = useState(null);
    const handleStepChange = (data) => {
        const stepKey = getStepKey(currentStep);
        updateStepData(stepKey, data);
    };
    const getStepKey = (step) => {
        switch (step) {
            case 1: return 'basics';
            case 2: return 'details';
            case 3: return 'style';
            case 4: return 'priorities';
            default: return 'basics';
        }
    };
    const showToast = (message, type = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 5000);
    };
    const handleSubmit = async () => {
        if (!isStepCompleted(currentStep)) {
            showToast('Bitte füllen Sie alle erforderlichen Felder aus', 'error');
            return;
        }
        // Prüfe zunächst Consent-Status
        const consentStatus = await consentService.hasValidConsent(formData.basics?.email || '');
        if (!consentStatus.hasConsent || !consentStatus.isVerified) {
            // Zeige Consent-Modal wenn kein gültiges Consent vorhanden
            setShowConsentModal(true);
            return;
        }
        if (consentStatus.hasOptedOut) {
            showToast('Sie haben der Datenverarbeitung widersprochen. Bitte kontaktieren Sie uns.', 'error');
            return;
        }
        // Starte Budget-Berechnung
        await performBudgetCalculation();
    };
    const convertFormDataToBudgetData = (formData) => {
        const { basics, details, style, priorities } = formData;
        return {
            // Basics
            partner1Name: basics?.partner1Name || '',
            partner2Name: basics?.partner2Name || '',
            weddingDate: basics?.weddingDate ? new Date(basics.weddingDate).toISOString().split('T')[0] : '',
            guestCount: basics?.guestCount || 0,
            email: basics?.email || '',
            phone: basics?.phone,
            relationshipLength: basics?.relationshipLength?.toString(),
            // Details
            totalBudget: details?.totalBudget || 0,
            weddingLocation: details?.weddingLocation || '',
            venueType: details?.venueType || 'hotel',
            budgetFlexibility: details?.budgetFlexibility || 'medium',
            budgetSource: details?.budgetSource,
            // Style
            weddingStyle: style?.weddingStyle || 'elegant',
            colorScheme: style?.colorScheme,
            season: style?.season || 'summer',
            timeOfDay: style?.timeOfDay,
            formalityLevel: style?.formalityLevel,
            culturalTraditions: style?.culturalTraditions,
            specialRequirements: style?.specialRequirements?.join(', '),
            // Priorities
            topPriorities: priorities?.topPriorities,
            mustHaves: priorities?.mustHaves,
            niceToHaves: priorities?.niceToHaves,
            dealBreakers: priorities?.dealBreakers,
            inspirationSources: priorities?.inspirationSources
        };
    };
    const performBudgetCalculation = async () => {
        // setIsCalculating wird aus useWeddingForm verwendet
        try {
            console.log('🎯 Starte Budget-Berechnung mit Daten:', formData);
            // Konvertiere WeddingFormData zu BudgetData
            const budgetData = convertFormDataToBudgetData(formData);
            console.log('🔄 Konvertierte Budget-Daten:', budgetData);
            const result = await budgetService.calculateBudget(budgetData);
            setCalculationResult(result);
            showToast('Budget-Analyse erfolgreich erstellt!', 'success');
            if (onFormComplete) {
                onFormComplete(budgetData);
            }
        }
        catch (error) {
            console.error('Fehler bei Budget-Berechnung:', error);
            showToast('Fehler bei der Budget-Berechnung. Bitte versuchen Sie es erneut.', 'error');
        }
        finally {
            // setIsCalculating wird aus useWeddingForm verwendet
        }
    };
    const handleConsentGiven = async (consentData) => {
        try {
            const result = await consentService.saveInitialConsent(consentData);
            if (result.success) {
                setShowConsentModal(false);
                showToast(result.message, 'success');
                // Hinweis auf E-Mail-Verifizierung
                showToast('Bitte bestätigen Sie Ihre E-Mail-Adresse. Prüfen Sie Ihr Postfach.', 'info');
                // TODO: In Produktionsumgebung sollte hier auf E-Mail-Bestätigung gewartet werden
                // Für Demo-Zwecke: Direkt Budget-Berechnung starten
                setTimeout(async () => {
                    await performBudgetCalculation();
                }, 2000);
            }
            else {
                showToast(result.message, 'error');
            }
        }
        catch (error) {
            console.error('Fehler beim Consent-Speichern:', error);
            showToast('Fehler beim Speichern der Einverständniserklärung', 'error');
        }
    };
    const handleConsentDeclined = () => {
        setShowConsentModal(false);
        showToast('Ohne Einverständnis können wir keine Budget-Analyse erstellen.', 'info');
    };
    const renderCurrentStep = () => {
        const stepKey = getStepKey(currentStep);
        const stepData = formData[stepKey] || {};
        const stepErrors = validationErrors[stepKey] || {};
        switch (currentStep) {
            case 1:
                return (<BasicsForm data={stepData} errors={stepErrors} onChange={handleStepChange}/>);
            case 2:
                return (<DetailsForm data={stepData} errors={stepErrors} onChange={handleStepChange}/>);
            case 3:
                return (<StyleForm data={stepData} errors={stepErrors} onChange={handleStepChange}/>);
            case 4:
                return (<PrioritiesForm data={stepData} errors={stepErrors} onChange={handleStepChange}/>);
            default:
                return null;
        }
    };
    const completedSteps = FORM_STEPS
        .filter((_, index) => isStepCompleted(index + 1))
        .map(step => step.id);
    if (calculationResult) {
        return (<div className="min-h-screen bg-gray-50">
        <BudgetResults calculationResult={calculationResult} budgetData={convertFormDataToBudgetData(formData)}/>
        {toast && (<Toast message={toast.message} type={toast.type} isVisible={true} onClose={() => setToast(null)}/>)}
      </div>);
    }
    return (<div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-200">
      {/* Elegant Background Elements */}
      <div className="floating-elements">
        <div className="elegant-element">
          <ElegantIcon name="rings" size={32} className="text-royal"/>
        </div>
        <div className="elegant-element">
          <ElegantIcon name="flower" size={28} className="text-gold"/>
        </div>
        <div className="elegant-element">
          <ElegantIcon name="heart" size={24} className="text-moss"/>
        </div>
        <div className="elegant-element">
          <ElegantIcon name="sparkles" size={20} className="text-royal"/>
        </div>
        <div className="elegant-element">
          <ElegantIcon name="castle" size={36} className="text-gold"/>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Elegant Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-graphite mb-4">
            WILMA
          </h1>
          <div className="elegant-divider"></div>
          <p className="text-xl text-accent max-w-2xl mx-auto font-light">
            Ihr persönlicher Hochzeitsbudget-Planer mit intelligenten Empfehlungen
          </p>
          <div className="mt-8 flex justify-center">
            <div className="section-elegant inline-flex items-center px-6 py-3">
              <ElegantIcon name="sparkles" className="text-accent mr-2" size={16}/>
              <span className="text-sm font-medium text-graphite">
                {getCompletionPercentage()}% abgeschlossen
              </span>
            </div>
          </div>
        </motion.div>

        {/* Progress Stepper */}
        <ProgressStepper steps={FORM_STEPS} currentStep={currentStep} completedSteps={completedSteps} onStepClick={goToStep}/>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="mb-12">
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>

        {/* Elegant Navigation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex justify-between items-center max-w-2xl mx-auto">
          {/* Previous Button */}
          <motion.button onClick={prevStep} disabled={currentStep === 1} className={`px-8 py-4 rounded-elegant font-medium transition-all ${currentStep === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-graphite border-2 border-undertone hover:border-accent hover:bg-primary-100'}`} whileHover={currentStep > 1 ? { scale: 1.02 } : {}} whileTap={currentStep > 1 ? { scale: 0.98 } : {}}>
            ← Zurück
          </motion.button>

          {/* Step Indicator */}
          <div className="text-center">
            <div className="text-sm text-accent mb-2 font-medium">
              Schritt {currentStep} von {FORM_STEPS.length}
            </div>
            <div className="flex space-x-2">
              {FORM_STEPS.map((step) => (<div key={step.id} className={`w-3 h-3 rounded-full transition-all duration-300 ${step.id === currentStep
                ? 'bg-royal scale-125 shadow-royal'
                : completedSteps.includes(step.id)
                    ? 'bg-royal-light'
                    : 'bg-undertone'}`}/>))}
            </div>
          </div>

          {/* Next/Submit Button */}
          {currentStep < FORM_STEPS.length ? (<motion.button onClick={nextStep} className="px-8 py-4 bg-royal text-white rounded-elegant font-medium transition-all shadow-royal hover:bg-royal-dark hover:shadow-royal-lg" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Weiter →
            </motion.button>) : (<motion.button onClick={handleSubmit} disabled={isCalculating} className={`px-8 py-4 rounded-elegant font-medium transition-all shadow-elegant ${isCalculating
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-royal text-white hover:bg-royal-dark hover:shadow-royal-lg'}`} whileHover={!isCalculating ? { scale: 1.02 } : {}} whileTap={!isCalculating ? { scale: 0.98 } : {}}>
              {isCalculating ? (<div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"/>
                  <span>Berechnung läuft...</span>
                </div>) : (<div className="flex items-center space-x-2">
                  <span>Budget berechnen</span>
                  <ElegantIcon name="sparkles" size={16} className="text-white"/>
                </div>)}
            </motion.button>)}
        </motion.div>

        {/* Elegant Tips Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-16 max-w-4xl mx-auto">
          <div className="section-elegant">
            <div className="text-center mb-8">
              <ElegantIcon name="sparkles" className="text-accent mx-auto mb-4" size={32}/>
              <h3 className="text-2xl font-serif font-bold text-graphite mb-2">
                Wilmas Expertise
              </h3>
              <div className="elegant-divider"></div>
              <p className="text-accent font-light">
                Professionelle Ratschläge für Ihren aktuellen Planungsschritt
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentStepTips().map((tip, index) => (<motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }} className="card-elegant hover:shadow-golden transition-all duration-300">
                  <div className="text-center mb-4">
                    <ElegantIcon name={tip.iconName} className="text-accent mx-auto mb-2" size={24}/>
                  </div>
                  <h4 className="font-serif font-semibold text-graphite mb-2 text-center">
                    {tip.title}
                  </h4>
                  <p className="text-sm text-accent/80 text-center leading-relaxed">
                    {tip.description}
                  </p>
                </motion.div>))}
            </div>
          </div>
        </motion.div>

        {/* Save Progress Notice */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center mt-8 text-sm text-accent/60">
          <div className="flex items-center justify-center space-x-2">
            <ElegantIcon name="heart" size={16}/>
            <span>Ihre Eingaben werden automatisch gespeichert</span>
          </div>
        </motion.div>
      </div>

      {/* DSGVO Consent Modal */}
      <ConsentModal isOpen={showConsentModal} email={formData.basics?.email || ''} onConsentGiven={handleConsentGiven} onDecline={handleConsentDeclined}/>

      {/* Toast Notifications */}
      {toast && (<Toast message={toast.message} type={toast.type} isVisible={true} onClose={() => setToast(null)}/>)}
    </div>);
    function getCurrentStepTips() {
        switch (currentStep) {
            case 1:
                return [
                    {
                        iconName: 'calendar',
                        title: 'Hochzeitsdatum',
                        description: 'Berücksichtigen Sie Feiertage und Ferienzeiten - diese können die Preise erheblich beeinflussen.'
                    },
                    {
                        iconName: 'heart',
                        title: 'Gästezahl',
                        description: 'Planen Sie mit 10-15% mehr Gästen als ursprünglich gedacht - oft kommen mehr als erwartet.'
                    },
                    {
                        iconName: 'sparkles',
                        title: 'Kontaktdaten',
                        description: 'Erstellen Sie eine separate E-Mail für Hochzeitsangelegenheiten, um organisiert zu bleiben.'
                    }
                ];
            case 2:
                return [
                    {
                        iconName: 'sparkles',
                        title: 'Budget-Realismus',
                        description: 'Rechnen Sie mit 10-20% Puffer für unvorhergesehene Ausgaben ein.'
                    },
                    {
                        iconName: 'castle',
                        title: 'Location-Timing',
                        description: 'Beliebte Locations sind oft 12-18 Monate im Voraus ausgebucht.'
                    },
                    {
                        iconName: 'heart',
                        title: 'Venue-Kosten',
                        description: 'Fragen Sie nach versteckten Kosten wie Reinigung, Sicherheit oder Stornierungsgebühren.'
                    }
                ];
            case 3:
                return [
                    {
                        iconName: 'sparkles',
                        title: 'Stil-Konsistenz',
                        description: 'Wählen Sie einen Hauptstil und halten Sie sich daran - das spart Geld und wirkt harmonischer.'
                    },
                    {
                        iconName: 'flower',
                        title: 'Farbharmonie',
                        description: 'Beschränken Sie sich auf 2-3 Hauptfarben für ein elegantes und stimmiges Gesamtbild.'
                    },
                    {
                        iconName: 'calendar',
                        title: 'Saisonale Vorteile',
                        description: 'Off-Season Hochzeiten (Nov-März) können bis zu 30% günstiger sein.'
                    }
                ];
            case 4:
                return [
                    {
                        iconName: 'heart',
                        title: 'Prioritäten setzen',
                        description: 'Konzentrieren Sie sich auf 3-4 wichtigste Elemente und sparen bei weniger wichtigen.'
                    },
                    {
                        iconName: 'sparkles',
                        title: 'Must-Have Liste',
                        description: 'Erstellen Sie eine klare Liste der absoluten Must-Haves vs. Nice-to-Haves.'
                    },
                    {
                        iconName: 'gift',
                        title: 'Kreative Alternativen',
                        description: 'Denken Sie außerhalb der Box - DIY-Elemente können persönlicher und günstiger sein.'
                    }
                ];
            default:
                return [];
        }
    }
};
export default WeddingBudgetForm;
