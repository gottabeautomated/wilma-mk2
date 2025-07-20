import { useState, useEffect, useCallback } from 'react';
// Form Steps
export const FORM_STEPS = [
    { id: 1, title: 'Basics', description: 'Grunddaten & Kontakt', icon: '👫' },
    { id: 2, title: 'Details', description: 'Location & Budget', icon: '💰' },
    { id: 3, title: 'Style', description: 'Stil & Vision', icon: '🎨' },
    { id: 4, title: 'Priorities', description: 'Prioritäten & Wünsche', icon: '🎯' }
];
export const useWeddingForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [isCalculating, setIsCalculating] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [stepStartTime, setStepStartTime] = useState(new Date());
    const [analytics, setAnalytics] = useState({});
    // Load saved progress on mount
    useEffect(() => {
        loadProgress();
        trackEvent('form_started', { timestamp: new Date() });
    }, []);
    // Save progress whenever form data changes
    useEffect(() => {
        if (Object.keys(formData).length > 0) {
            saveProgress();
        }
    }, [formData]);
    // Track step completion time
    useEffect(() => {
        setStepStartTime(new Date());
    }, [currentStep]);
    const saveProgress = useCallback(() => {
        try {
            const dataToSave = {
                formData,
                currentStep,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('weddingFormData', JSON.stringify(dataToSave));
        }
        catch (error) {
            console.warn('Failed to save form progress:', error);
        }
    }, [formData, currentStep]);
    const loadProgress = useCallback(() => {
        try {
            const saved = localStorage.getItem('weddingFormData');
            if (saved) {
                const { formData: savedData, currentStep: savedStep } = JSON.parse(saved);
                setFormData(savedData || {});
                setCurrentStep(savedStep || 1);
            }
        }
        catch (error) {
            console.warn('Failed to load form progress:', error);
        }
    }, []);
    const clearProgress = useCallback(() => {
        localStorage.removeItem('weddingFormData');
        setFormData({});
        setCurrentStep(1);
        setValidationErrors({});
        setStartTime(new Date());
    }, []);
    // Analytics tracking
    const trackEvent = useCallback((eventName, data) => {
        setAnalytics(prev => ({
            ...prev,
            [eventName]: data
        }));
        // In real app, send to analytics service
        console.log('Analytics Event:', eventName, data);
    }, []);
    // Update form data for specific step
    const updateStepData = useCallback((step, data) => {
        setFormData(prev => ({
            ...prev,
            [step]: { ...prev[step], ...data }
        }));
        // Clear validation errors for this step
        setValidationErrors(prev => ({
            ...prev,
            [step]: {}
        }));
    }, []);
    // Validate current step
    const validateCurrentStep = useCallback(() => {
        const stepKey = getStepKey(currentStep);
        const stepData = formData[stepKey];
        const errors = {};
        switch (currentStep) {
            case 1: // Basics
                if (!stepData?.partner1Name)
                    errors.partner1Name = 'Partner 1 Name ist erforderlich';
                if (!stepData?.partner2Name)
                    errors.partner2Name = 'Partner 2 Name ist erforderlich';
                if (!stepData?.weddingDate)
                    errors.weddingDate = 'Hochzeitsdatum ist erforderlich';
                if (!stepData?.guestCount || stepData.guestCount < 20)
                    errors.guestCount = 'Mindestens 20 Gäste';
                if (!stepData?.email)
                    errors.email = 'E-Mail ist erforderlich';
                if (stepData?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepData.email)) {
                    errors.email = 'Ungültige E-Mail-Adresse';
                }
                break;
            case 2: // Details
                if (!stepData?.totalBudget || stepData.totalBudget < 5000)
                    errors.totalBudget = 'Mindestbudget: €5.000';
                if (!stepData?.weddingLocation)
                    errors.weddingLocation = 'Location ist erforderlich';
                if (!stepData?.venueType)
                    errors.venueType = 'Venue-Typ ist erforderlich';
                if (!stepData?.budgetFlexibility)
                    errors.budgetFlexibility = 'Budget-Flexibilität ist erforderlich';
                break;
            case 3: // Style
                if (!stepData?.weddingStyle)
                    errors.weddingStyle = 'Hochzeitsstil ist erforderlich';
                if (!stepData?.season)
                    errors.season = 'Jahreszeit ist erforderlich';
                if (!stepData?.timeOfDay)
                    errors.timeOfDay = 'Tageszeit ist erforderlich';
                if (!stepData?.formalityLevel)
                    errors.formalityLevel = 'Formalitätslevel ist erforderlich';
                break;
            case 4: // Priorities
                if (!stepData?.topPriorities)
                    errors.topPriorities = 'Prioritäten sind erforderlich';
                break;
        }
        if (Object.keys(errors).length > 0) {
            setValidationErrors(prev => ({
                ...prev,
                [stepKey]: errors
            }));
            return false;
        }
        return true;
    }, [currentStep, formData]);
    // Scroll to first error field
    const scrollToFirstError = useCallback((stepKey, errors) => {
        const firstErrorField = Object.keys(errors)[0];
        if (!firstErrorField)
            return;
        // Wait for DOM to update with error states
        setTimeout(() => {
            let targetElement = null;
            // Try specific field targeting first
            if (firstErrorField === 'totalBudget') {
                targetElement = document.querySelector('.budget-slider');
            }
            // Try to find error message if no specific field found
            if (!targetElement) {
                targetElement = document.querySelector('.text-red-500');
            }
            // If no error message, try to find the form section
            if (!targetElement) {
                targetElement = document.querySelector('.section-elegant');
            }
            if (targetElement) {
                // Calculate position to center the element in viewport
                const elementRect = targetElement.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const elementTop = elementRect.top + window.pageYOffset;
                const elementHeight = elementRect.height;
                // Center the element vertically in the viewport
                const centerOffset = (viewportHeight - elementHeight) / 2;
                const scrollToPosition = elementTop - centerOffset;
                // Ensure we don't scroll beyond the document boundaries
                const maxScroll = document.documentElement.scrollHeight - viewportHeight;
                const finalScrollPosition = Math.max(0, Math.min(scrollToPosition, maxScroll));
                window.scrollTo({
                    top: finalScrollPosition,
                    behavior: 'smooth'
                });
                // Add visual feedback with a subtle shake animation
                if (targetElement.classList.contains('text-red-500')) {
                    const parentSection = targetElement.closest('.section-elegant');
                    if (parentSection) {
                        parentSection.style.animation = 'gentle-shake 0.5s ease-in-out';
                        setTimeout(() => {
                            if (parentSection)
                                parentSection.style.animation = '';
                        }, 500);
                    }
                }
                else if (targetElement.classList.contains('budget-slider') || targetElement.classList.contains('section-elegant')) {
                    // Shake the section itself for budget slider or section targeting
                    targetElement.style.animation = 'gentle-shake 0.5s ease-in-out';
                    setTimeout(() => {
                        if (targetElement)
                            targetElement.style.animation = '';
                    }, 500);
                }
                // Add a subtle highlight effect to make the field more visible
                targetElement.style.transition = 'all 0.3s ease';
                targetElement.style.transform = 'scale(1.02)';
                targetElement.style.boxShadow = '0 0 0 4px rgba(157, 125, 106, 0.2)';
                // Remove highlight after animation
                setTimeout(() => {
                    if (targetElement) {
                        targetElement.style.transform = '';
                        targetElement.style.boxShadow = '';
                    }
                }, 1500);
            }
        }, 150);
    }, []);
    // Navigate to next step
    const nextStep = useCallback(() => {
        if (validateCurrentStep() && currentStep < FORM_STEPS.length) {
            const timeSpent = new Date().getTime() - stepStartTime.getTime();
            trackEvent('step_completed', {
                step: currentStep,
                time_spent: Math.round(timeSpent / 1000)
            });
            setCurrentStep(prev => prev + 1);
        }
        else {
            // Validation failed - scroll to first error
            const stepKey = getStepKey(currentStep);
            const errors = validationErrors[stepKey] || {};
            if (Object.keys(errors).length > 0) {
                scrollToFirstError(stepKey, errors);
            }
        }
    }, [currentStep, validateCurrentStep, stepStartTime, trackEvent, validationErrors, scrollToFirstError]);
    // Navigate to previous step
    const prevStep = useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    }, [currentStep]);
    // Go to specific step
    const goToStep = useCallback((step) => {
        if (step >= 1 && step <= FORM_STEPS.length) {
            setCurrentStep(step);
        }
    }, []);
    // Calculate completion percentage
    const getCompletionPercentage = useCallback(() => {
        const totalSteps = FORM_STEPS.length;
        const completedSteps = currentStep - 1;
        return Math.round((completedSteps / totalSteps) * 100);
    }, [currentStep]);
    // Check if step is completed
    const isStepCompleted = useCallback((step) => {
        const stepKey = getStepKey(step);
        const stepData = formData[stepKey];
        if (!stepData)
            return false;
        switch (step) {
            case 1:
                return !!(stepData.partner1Name && stepData.partner2Name && stepData.weddingDate && stepData.guestCount && stepData.email);
            case 2:
                return !!(stepData.totalBudget && stepData.weddingLocation && stepData.venueType && stepData.budgetFlexibility);
            case 3:
                return !!(stepData.weddingStyle && stepData.season && stepData.timeOfDay && stepData.formalityLevel);
            case 4:
                return !!(stepData.topPriorities);
            default:
                return false;
        }
    }, [formData]);
    // Calculate lead score
    const calculateLeadScore = useCallback(() => {
        const { basics, details, style, priorities } = formData;
        // Budget Range Score (1-10)
        let budgetRange = 1;
        if (details?.totalBudget) {
            if (details.totalBudget >= 50000)
                budgetRange = 10;
            else if (details.totalBudget >= 30000)
                budgetRange = 8;
            else if (details.totalBudget >= 20000)
                budgetRange = 6;
            else if (details.totalBudget >= 15000)
                budgetRange = 4;
            else if (details.totalBudget >= 10000)
                budgetRange = 2;
        }
        // Timeline Score (1-10) - näher = höher
        let timeline = 1;
        if (basics?.weddingDate) {
            const monthsUntilWedding = Math.round((new Date(basics.weddingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30));
            if (monthsUntilWedding <= 6)
                timeline = 10;
            else if (monthsUntilWedding <= 12)
                timeline = 8;
            else if (monthsUntilWedding <= 18)
                timeline = 6;
            else if (monthsUntilWedding <= 24)
                timeline = 4;
            else
                timeline = 2;
        }
        // Engagement Score (1-10)
        const completedSteps = FORM_STEPS.filter((_, index) => isStepCompleted(index + 1)).length;
        const engagement = Math.round((completedSteps / FORM_STEPS.length) * 10);
        // Data Quality Score (1-10)
        let dataQuality = 0;
        if (basics?.partner1Name)
            dataQuality += 1;
        if (basics?.partner2Name)
            dataQuality += 1;
        if (basics?.email)
            dataQuality += 1;
        if (basics?.phone)
            dataQuality += 1;
        if (details?.weddingLocation)
            dataQuality += 1;
        if (details?.budgetSource?.length)
            dataQuality += 1;
        if (style?.colorScheme?.length)
            dataQuality += 1;
        if (style?.culturalTraditions?.length)
            dataQuality += 1;
        if (priorities?.mustHaves?.length)
            dataQuality += 1;
        if (priorities?.inspirationSources?.length)
            dataQuality += 1;
        const totalScore = Math.round((budgetRange + timeline + engagement + dataQuality) / 4 * 10);
        return {
            budgetRange,
            timeline,
            engagement,
            dataQuality,
            totalScore
        };
    }, [formData, isStepCompleted]);
    // Submit form
    const submitForm = useCallback(async () => {
        if (!validateCurrentStep())
            return false;
        setIsCalculating(true);
        const totalTime = new Date().getTime() - startTime.getTime();
        const leadScore = calculateLeadScore();
        trackEvent('form_completed', { total_time: Math.round(totalTime / 1000) });
        trackEvent('email_submitted', {
            lead_quality: leadScore.totalScore >= 70 ? 'high' : leadScore.totalScore >= 40 ? 'medium' : 'low'
        });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Clear saved progress
            localStorage.removeItem('weddingFormData');
            return true;
        }
        catch (error) {
            console.error('Form submission failed:', error);
            return false;
        }
        finally {
            setIsCalculating(false);
        }
    }, [validateCurrentStep, startTime, calculateLeadScore, trackEvent]);
    return {
        // State
        currentStep,
        formData,
        validationErrors,
        isCalculating,
        analytics,
        // Actions
        updateStepData,
        nextStep,
        prevStep,
        goToStep,
        submitForm,
        clearProgress,
        // Computed
        getCompletionPercentage,
        isStepCompleted,
        calculateLeadScore,
        // Utils
        trackEvent,
        FORM_STEPS
    };
};
// Helper function to get step key
const getStepKey = (step) => {
    switch (step) {
        case 1: return 'basics';
        case 2: return 'details';
        case 3: return 'style';
        case 4: return 'priorities';
        default: return 'basics';
    }
};
