import { supabase } from './supabase';
import { aiService } from './aiService';
import { LoggingService } from './logging';
// Security helper to get current authenticated user
const getCurrentUserId = async () => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            LoggingService.logError(error, { context: 'getCurrentUserId' });
            return null;
        }
        return user?.id || null;
    }
    catch (error) {
        LoggingService.logError(error, { context: 'getCurrentUserId' });
        return null;
    }
};
class BudgetService {
    constructor() {
        this.basePercentages = {
            venue: 40,
            catering: 25,
            photography: 10,
            flowers: 8,
            music: 5,
            dress: 4,
            rings: 3,
            decoration: 3,
            other: 2
        };
        this.styleMultipliers = {
            elegant: { venue: 1.2, dress: 1.3, flowers: 1.1, photography: 1.1 },
            rustic: { venue: 0.8, decoration: 1.4, flowers: 1.2, catering: 0.9 },
            modern: { venue: 1.1, photography: 1.2, music: 1.1, decoration: 0.8 },
            vintage: { dress: 1.2, decoration: 1.3, flowers: 1.1, photography: 1.1 },
            boho: { flowers: 1.4, decoration: 1.2, dress: 0.9, venue: 0.9 }
        };
        this.locationMultipliers = {
            hotel: 1.2,
            castle: 1.8,
            garden: 0.9,
            vineyard: 1.1,
            church: 0.8,
            beach: 1.3,
            restaurant: 1.0,
            barn: 0.7
        };
        this.seasonMultipliers = {
            spring: 0.95,
            summer: 1.25,
            autumn: 1.0,
            winter: 0.8
        };
    }
    async calculateBudget(budgetData) {
        const startTime = performance.now();
        const userId = await getCurrentUserId();
        try {
            // 📊 Log budget calculation start
            LoggingService.logBudgetCalculation(budgetData, userId ?? undefined);
            const categories = this.calculateBudgetBreakdown(budgetData);
            const pricePerGuest = budgetData.totalBudget / budgetData.guestCount;
            const budgetEfficiency = this.calculateBudgetEfficiency(budgetData);
            // 🤖 KI-Anfrage hier!
            console.log('🤖 Starte KI-Analyse für Budget...');
            const aiRecommendations = await aiService.generateIntelligentRecommendations(budgetData);
            console.log('✅ KI-Analyse abgeschlossen:', aiRecommendations);
            // Speichere die Berechnung in Supabase
            await this.saveBudgetCalculation(budgetData, categories, aiRecommendations);
            // ⚡ Log performance
            const duration = performance.now() - startTime;
            LoggingService.logPerformance('budget-calculation', duration, {
                userId: userId ?? undefined,
                guestCount: budgetData.guestCount,
                totalBudget: budgetData.totalBudget
            });
            return {
                categories,
                recommendations: aiRecommendations.recommendations,
                savingTips: aiRecommendations.savingTips,
                personalizedAdvice: aiRecommendations.personalizedAdvice,
                riskAnalysis: aiRecommendations.riskAnalysis,
                totalBudget: budgetData.totalBudget,
                pricePerGuest,
                budgetEfficiency
            };
        }
        catch (error) {
            LoggingService.logError(error, {
                context: 'calculateBudget',
                userId: userId ?? undefined,
                budgetData
            });
            throw error;
        }
    }
    calculateBudgetBreakdown(budgetData) {
        const styleMultiplier = this.styleMultipliers[budgetData.weddingStyle] || {};
        const locationMultiplier = this.locationMultipliers[budgetData.venueType] || 1;
        const seasonMultiplier = this.seasonMultipliers[budgetData.season] || 1;
        const categoryInfo = {
            venue: { name: 'Location & Räume', icon: '🏛️', description: 'Miete, Service, Ausstattung' },
            catering: { name: 'Catering & Getränke', icon: '🍽️', description: 'Essen, Getränke, Service' },
            photography: { name: 'Fotografie & Video', icon: '📸', description: 'Hochzeitsfotograf, Videograf' },
            flowers: { name: 'Blumen & Floristik', icon: '💐', description: 'Brautstrauß, Dekoration' },
            music: { name: 'Musik & Entertainment', icon: '🎵', description: 'DJ, Band, Technik' },
            dress: { name: 'Kleidung & Beauty', icon: '👗', description: 'Brautkleid, Anzug, Styling' },
            rings: { name: 'Ringe & Schmuck', icon: '💍', description: 'Eheringe, Accessoires' },
            decoration: { name: 'Dekoration', icon: '🎀', description: 'Tischdeko, Ambiente' },
            other: { name: 'Sonstiges', icon: '📋', description: 'Einladungen, Transport, etc.' }
        };
        return Object.entries(this.basePercentages).map(([key, percentage]) => {
            const adjustedPercentage = percentage *
                (styleMultiplier[key] || 1) *
                locationMultiplier *
                seasonMultiplier;
            const amount = Math.round((budgetData.totalBudget * adjustedPercentage) / 100);
            return {
                id: key,
                name: categoryInfo[key].name,
                icon: categoryInfo[key].icon,
                description: categoryInfo[key].description,
                percentage: Math.round(adjustedPercentage),
                amount: amount
            };
        }).sort((a, b) => b.amount - a.amount);
    }
    generateRecommendations(budgetData) {
        const recommendations = [];
        const pricePerGuest = budgetData.totalBudget / budgetData.guestCount;
        if (pricePerGuest < 120) {
            recommendations.push('💡 Bei eurem Budget empfehlen wir eine intime Feier mit DIY-Elementen');
            recommendations.push('🏡 Feiert im eigenen Garten oder mietet eine günstige Gemeindehalle');
        }
        else if (pricePerGuest < 200) {
            recommendations.push('🏨 Hotels bieten oft All-Inclusive-Pakete an');
            recommendations.push('📸 Nachwuchsfotografen liefern oft genauso gute Ergebnisse');
        }
        else {
            recommendations.push('🏰 Mit eurem Budget sind auch exklusive Locations möglich');
            recommendations.push('✨ Investiert in Details, die lange in Erinnerung bleiben');
        }
        if (budgetData.season === 'summer') {
            recommendations.push('☀️ Sommer ist Hochsaison - bucht mindestens 12 Monate im Voraus');
        }
        else if (budgetData.season === 'winter') {
            recommendations.push('❄️ Winterhochzeiten sind 20-30% günstiger');
        }
        if (budgetData.weddingStyle === 'rustic') {
            recommendations.push('🌾 DIY-Elemente passen perfekt zum rustikalen Stil');
        }
        else if (budgetData.weddingStyle === 'elegant') {
            recommendations.push('💎 Investiert in wenige, aber hochwertige Elemente');
        }
        return recommendations.slice(0, 6);
    }
    generateSavingTips(budgetData) {
        return [
            '📅 Heiratet unter der Woche (bis zu 30% Ersparnis)',
            '🍰 Dessertbuffet statt Hochzeitstorte (200-500€ Ersparnis)',
            '💐 Saisonale Blumen sind bis zu 50% günstiger',
            '📱 Digitale Einladungen sparen 150-400€',
            '🎵 Playlist statt DJ spart 800-1500€',
            '🎀 DIY-Dekoration spart 50-70% der Kosten',
            '🍾 Eigene Getränke mitbringen (wo erlaubt)',
            '📸 Freunde als Zweitfotografen einsetzen'
        ];
    }
    calculateBudgetEfficiency(budgetData) {
        const pricePerGuest = budgetData.totalBudget / budgetData.guestCount;
        if (pricePerGuest < 120)
            return 'high';
        if (pricePerGuest < 250)
            return 'medium';
        return 'low';
    }
    async saveBudgetCalculation(budgetData, categories, aiRecommendations) {
        try {
            // 🔒 Security: Get authenticated user ID
            const userId = await getCurrentUserId();
            if (!userId) {
                throw new Error('User not authenticated - cannot save budget');
            }
            console.log('💾 Speichere Budget in Supabase...', {
                user_id: userId,
                email: budgetData.email,
                partner1_name: budgetData.partner1Name,
                partner2_name: budgetData.partner2Name,
                total_budget: budgetData.totalBudget
            });
            const pricePerGuest = budgetData.totalBudget / budgetData.guestCount;
            const budgetEfficiency = this.calculateBudgetEfficiency(budgetData);
            const { data, error } = await supabase
                .from('budget_calculations')
                .insert({
                // 🔒 KRITISCH: user_id für RLS Security
                user_id: userId,
                // Vollständige Eingabedaten für input_data
                input_data: {
                    email: budgetData.email,
                    partner1Name: budgetData.partner1Name,
                    partner2Name: budgetData.partner2Name,
                    weddingDate: budgetData.weddingDate,
                    guestCount: budgetData.guestCount,
                    totalBudget: budgetData.totalBudget,
                    weddingStyle: budgetData.weddingStyle,
                    venueType: budgetData.venueType,
                    season: budgetData.season,
                    priorities: budgetData.topPriorities || []
                },
                // Berechnete Kategorien für category_breakdown
                category_breakdown: categories,
                // KI-Empfehlungen für ai_recommendations
                ai_recommendations: aiRecommendations ? {
                    recommendations: aiRecommendations.recommendations || [],
                    savingTips: aiRecommendations.savingTips || [],
                    personalizedAdvice: aiRecommendations.personalizedAdvice || [],
                    riskAnalysis: aiRecommendations.riskAnalysis || [],
                    pricePerGuest: Math.round(pricePerGuest),
                    budgetEfficiency: budgetEfficiency,
                    calculatedAt: new Date().toISOString()
                } : null,
                // Zusätzliche berechnete Werte
                confidence_score: aiRecommendations ? 0.85 : 0.75,
                // Basis-Informationen für einfache Abfragen (Backward Compatibility)
                total_budget: budgetData.totalBudget,
                email: budgetData.email,
                partner1_name: budgetData.partner1Name,
                partner2_name: budgetData.partner2Name,
                wedding_date: budgetData.weddingDate,
                guest_count: budgetData.guestCount,
                wedding_style: budgetData.weddingStyle,
                venue_type: budgetData.venueType,
                season: budgetData.season
            })
                .select();
            if (error) {
                console.error('❌ Fehler beim Speichern in Supabase:', error);
                throw error;
            }
            else {
                console.log('✅ Budget erfolgreich gespeichert:', data);
                console.log('📊 Gespeicherte Daten enthalten:');
                console.log('   - User ID:', userId);
                console.log('   - Eingabedaten:', Object.keys(data[0]?.input_data || {}));
                console.log('   - Budget-Kategorien:', data[0]?.category_breakdown?.length || 0);
                console.log('   - KI-Empfehlungen:', aiRecommendations ? 'Ja' : 'Nein');
            }
        }
        catch (error) {
            console.error('❌ Unerwarteter Fehler beim Speichern:', error);
            throw error;
        }
    }
    async getUserBudgets() {
        try {
            // 🔒 Security: Get authenticated user ID
            const userId = await getCurrentUserId();
            if (!userId) {
                console.warn('User not authenticated - cannot fetch budgets');
                return [];
            }
            // RLS automatically filters by user_id, but we can be explicit
            const { data, error } = await supabase
                .from('budget_calculations')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });
            if (error) {
                console.error('Error fetching user budgets:', error);
                return [];
            }
            console.log(`✅ Fetched ${data?.length || 0} budgets for user ${userId}`);
            return data || [];
        }
        catch (error) {
            console.error('Error fetching from Supabase:', error);
            return [];
        }
    }
    async linkBudgetsToUser(email, userId) {
        try {
            // Alle Budget-Berechnungen dieser E-Mail mit der user_id verknüpfen
            const { error } = await supabase
                .from('budget_calculations')
                .update({ user_id: userId })
                .eq('email', email)
                .is('user_id', null); // Nur unverknüpfte Budgets
            if (error) {
                console.error('Error linking budgets to user:', error);
            }
            else {
                console.log(`✅ Budgets erfolgreich mit User ${userId} verknüpft`);
            }
        }
        catch (error) {
            console.error('Error linking to Supabase:', error);
        }
    }
    async sendResultsEmail(budgetData, calculation) {
        try {
            // Simuliere E-Mail-Versendung
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Log E-Mail in email_logs Tabelle
            await supabase
                .from('email_logs')
                .insert({
                email: budgetData.email,
                subject: `Dein Hochzeitsbudget: ${budgetData.partner1Name} & ${budgetData.partner2Name}`,
                content: `Budget-Details für ${budgetData.guestCount} Gäste mit €${budgetData.totalBudget.toLocaleString()}`,
                status: 'sent'
            });
            return {
                success: true,
                message: 'E-Mail erfolgreich versendet!'
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Fehler beim E-Mail-Versand'
            };
        }
    }
    generatePDFContent(budgetData, calculation) {
        return `
HOCHZEITSBUDGET-PLANUNG
${budgetData.partner1Name} & ${budgetData.partner2Name}

Grunddaten:
• Hochzeitsdatum: ${budgetData.weddingDate}
• Gästeanzahl: ${budgetData.guestCount} Personen
• Gesamtbudget: €${budgetData.totalBudget.toLocaleString()}
• Pro Gast: €${Math.round(calculation.pricePerGuest)}

Budget-Aufteilung:
${calculation.categories.map(cat => `${cat.name}: €${cat.amount.toLocaleString()} (${cat.percentage}%)`).join('\n')}

Empfehlungen:
${calculation.recommendations.map(rec => `• ${rec}`).join('\n')}

Spartipps:
${calculation.savingTips.map(tip => `• ${tip}`).join('\n')}

Erstellt mit: Wilma Hochzeitsbudget-Planer
    `;
    }
}
export const budgetService = new BudgetService();
export default budgetService;
