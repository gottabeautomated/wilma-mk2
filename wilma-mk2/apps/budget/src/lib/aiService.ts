import OpenAI from 'openai'
import { BudgetData } from '../types/budget'

interface AIRecommendation {
  recommendations: string[]
  savingTips: string[]
  personalizedAdvice: string[]
  riskAnalysis: string[]
}

interface DetailedAnalysis {
  pricePerGuest: number
  budgetPercentile: number
  seasonalFactor: number
  isHighSeason: boolean
  isWeekend: boolean
  regionalMultiplier: number
  feasibilityScore: number
  riskFactors: string[]
  dayOfWeek: string
  monthOfYear: string
}

interface PriorityAllocation {
  [category: string]: number
}

interface StyleBudgetAnalysis {
  styleImpact: { [key: string]: number }
  colorComplexity: number
  formalityMultiplier: number  
  timeImpact: number
}

interface BudgetRealityCheck {
  budgetSegment: string
  isRealistic: boolean
  warnings: string[]
  recommendations: string[]
}

interface VenueCheck {
  isRealistic: boolean
  estimatedCost: number
  maxAffordable: number
  warnings: string[]
}

interface StyleLocationMismatch {
  warnings: string[]
}

export class AIService {
  private openai: OpenAI | null = null

  constructor() {
    // Initialize OpenAI only if API key is available
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true // Only for demo - in production use backend
      })
    }
  }

  async generateIntelligentRecommendations(budgetData: BudgetData): Promise<AIRecommendation> {
    console.log('🔍 AI-Service Debug - OpenAI verfügbar:', !!this.openai)
    console.log('🔍 AI-Service Debug - API Key vorhanden:', !!import.meta.env.VITE_OPENAI_API_KEY)
    
    // Fallback to rule-based system if no OpenAI API key
    if (!this.openai) {
      console.log('⚠️ Verwende Fallback-System (kein OpenAI API Key)')
      return this.generateRuleBasedRecommendations(budgetData)
    }

    try {
      console.log('🚀 Starte OpenAI API Anfrage...')
      
      // 🔒 DSGVO-konforme Anonymisierung vor KI-Aufruf
      const anonymizedData = this.removePersonalData(budgetData)
      console.log('🔒 Anonymisierte Daten für KI:', anonymizedData)
      
      // ✅ BUDGET-REALITY-CHECK VOR KI-AUFRUF
      const realityCheck = this.validateBudgetReality(anonymizedData)
      const prompt = this.createRealisticPrompt(anonymizedData, realityCheck)
      
      console.log('📝 Reality Check:', realityCheck)
      console.log('📄 Prompt (erste 200 Zeichen):', prompt.substring(0, 200) + '...')
      
      const COMPREHENSIVE_SYSTEM_PROMPT = `
Du bist ein erfahrener Hochzeitsplaner und Budgetberater mit 15+ Jahren Expertise in Deutschland, Österreich und der Schweiz. 

=== DEINE LOKALE EXPERTISE ===
• Du kennst ALLE lokalen Anbieter in jeder Stadt der DACH-Region persönlich
• Du hast direkten Kontakt zu über 2000+ Hochzeits-Dienstleistern
• Du verfügst über aktuelle Preislisten und Verfügbarkeiten 2024-2026
• Du kennst Insider-Preise, Saisonrabatte und Verhandlungsspielräume
• Du weißt welche Anbieter die beste Qualität für welches Budget liefern

=== DEINE ARBEITSWEISE ===
• Gib IMMER konkrete Anbieter-Namen mit exakten Preisen
• Nutze dein lokales Insider-Wissen für die besten Deals
• Empfehle sowohl Premium-Anbieter als auch Geheimtipps
• Nenne Kontakt-Informationen wenn möglich
• Erkläre warum genau dieser Anbieter perfekt passt

=== BUDGET-SEGMENTE & REALISMUS ===
BUDGET-SEGMENT (€/Gast):
• Sparsam: €50-120/Gast → Fokus auf lokale Geheimtipps, DIY-freundliche Anbieter
• Standard: €120-200/Gast → Solide regionale Dienstleister mit gutem Preis-Leistung
• Gehoben: €200-350/Gast → Premium-Anbieter mit etablierter Reputation
• Luxus: €350-600/Gast → High-End Venues und Spitzen-Dienstleister
• Ultra-Luxus: €600+/Gast → Exklusive Locations und Celebrity-Anbieter

VENUE-BUDGET-REALITÄT:
• Restaurant/Gasthof: 25-35% des Gesamtbudgets
• Hotel/Event-Location: 35-45% des Gesamtbudgets  
• Schloss/Premium-Venue: 45-55% des Gesamtbudgets
• Niemals über 60% für Venue empfehlen!

=== REGIONALE PREISSTRUKTUREN ===
DEUTSCHLAND:
• München/Frankfurt: +30-40% Aufschlag
• Hamburg/Düsseldorf: +20-30% Aufschlag
• Berlin/Köln: +10-20% Aufschlag
• Kleinere Städte/Land: Basis-Preise
• Ostdeutschland: -10-20% günstiger

ÖSTERREICH:
• Wien/Salzburg: +25-35% Aufschlag
• Innsbruck/Graz: +15-25% Aufschlag
• Land-Regionen: Basis-Preise

SCHWEIZ:
• Zürich/Basel/Genf: +60-80% Aufschlag auf deutsche Preise
• Andere Städte: +40-60% Aufschlag

=== KONKRETE ANBIETER-KENNTNISSE ===
Du kennst zum Beispiel:
• München: Hotel Vier Jahreszeiten (€18.000 für 100 Gäste), Seehaus im Englischen Garten (€12.000), Gut Kaltenbrunn (€8.500)
• Wien: Palais Coburg (€25.000), Gartenpalais Liechtenstein (€10.000), Heuriger Fuhrgassl-Huber (€6.500)
• Hamburg: Hotel Atlantic (€15.000), Landhaus Scherrer (€9.000), Gut Basthorst (€7.000)
• Berlin: Hotel Adlon (€20.000), Pfingstberg Belvedere (€8.000), Alte Börse Marzahn (€5.000)

=== EMPFEHLUNGS-QUALITÄT ===
JEDE EMPFEHLUNG MUSS ENTHALTEN:
• Konkreten Anbieter-Namen (nie "ein lokaler Caterer")
• Exakte Preise oder enge Preisspannen
• Kontakt-Information oder Website wenn verfügbar
• Begründung warum dieser Anbieter perfekt zum Budget/Stil passt
• Alternative Optionen in verschiedenen Preiskategorien
• Insider-Tipps für Verhandlungen oder bessere Deals

BEISPIEL GUTER EMPFEHLUNG:
"Venue: Schloss Nymphenburg Orangerie (€12.500 für 80 Gäste) - Perfekt für elegante Hochzeiten, inklusive Catering von Käfer. Kontakt: events@schloss-nymphenburg.de. Alternative: Seehaus Englischer Garten (€8.000) für rustikalere Atmosphäre."

=== TON UND STIL ===
• Insider-Experte der die Region wie seine Westentasche kennt
• Konkret und spezifisch - nie vage Empfehlungen
• Vertrauenserweckend durch detailliertes Lokalkenntnisse
• Ehrlich über Vor- und Nachteile jedes Anbieters
• Deutsche Sprache, regionale Besonderheiten beachtend

Antworte immer als lokaler Insider-Experte mit konkreten Anbieter-Namen und Preisen!
`
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: COMPREHENSIVE_SYSTEM_PROMPT
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.4
      })

      const response = completion.choices[0]?.message?.content
      console.log('🎯 OpenAI Raw Response:', response)
      console.log('🎯 Response Länge:', response?.length)
      
      if (response) {
        const parsed = this.parseAIResponse(response)
        console.log('🎯 Parsed AI Response:', parsed)
        return parsed
      } else {
        console.log('❌ Kein Response von OpenAI erhalten')
      }
    } catch (error) {
      console.error('OpenAI API Error:', error)
    }

    // Fallback to rule-based system
    return this.generateRuleBasedRecommendations(budgetData)
  }

  private validateBudgetReality(budgetData: BudgetData): BudgetRealityCheck {
    const pricePerGuest = budgetData.totalBudget / budgetData.guestCount
    
    // Deutsche Hochzeits-Benchmarks 2024
    const budgetSegment = this.getBudgetSegmentRealistic(pricePerGuest)
    
    // Stil-Location-Kompatibilität prüfen
    const styleLocationMismatch = this.checkStyleLocationMismatch(
      budgetData.weddingStyle, 
      budgetData.venueType
    )
    
    // Budget-Venue-Realität prüfen
    const venueRealityCheck = this.checkVenueBudgetReality(
      budgetData.venueType,
      budgetData.totalBudget,
      budgetData.guestCount
    )
    
    return {
      budgetSegment,
      isRealistic: venueRealityCheck.isRealistic,
      warnings: [
        ...styleLocationMismatch.warnings,
        ...venueRealityCheck.warnings
      ],
      recommendations: this.generateRealityBasedRecommendations(budgetData)
    }
  }

  private getBudgetSegmentRealistic(pricePerGuest: number): string {
    if (pricePerGuest < 150) return 'Budget-Segment (unter €150/Gast)'
    if (pricePerGuest < 250) return 'Standard-Segment (€150-250/Gast)'
    if (pricePerGuest < 400) return 'Premium-Segment (€250-400/Gast)'
    return 'Luxus-Segment (€400+/Gast)'
  }

  private checkStyleLocationMismatch(style: string, venueType: string): StyleLocationMismatch {
    const warnings: string[] = []
    
    // Stil-Venue-Kompatibilität prüfen
    if ((style === 'rustic' && (venueType === 'hotel' || venueType === 'modern_venue')) ||
        (style === 'elegant' && (venueType === 'barn' || venueType === 'outdoor')) ||
        (style === 'modern' && (venueType === 'castle' || venueType === 'rustic_venue')) ||
        (style === 'vintage' && (venueType === 'modern_venue' || venueType === 'industrial'))) {
      warnings.push(`${style} Stil passt nicht optimal zu ${venueType} - Empfehlung: Alternative Venue-Typen prüfen`)
    }
    
    return { warnings }
  }

  private checkVenueBudgetReality(venueType: string, budget: number, guests: number): VenueCheck {
    // Realistische Venue-Kosten in Deutschland/Österreich
    let venue = { min: 2000, max: 10000, avgPerGuest: 70 } // Default
    
    switch (venueType) {
      case 'castle':
        venue = { min: 15000, max: 50000, avgPerGuest: 200 }
        break
      case 'hotel':
        venue = { min: 8000, max: 25000, avgPerGuest: 150 }
        break
      case 'restaurant':
        venue = { min: 3000, max: 15000, avgPerGuest: 80 }
        break
      case 'outdoor':
        venue = { min: 2000, max: 12000, avgPerGuest: 60 }
        break
      case 'garden':
        venue = { min: 1500, max: 8000, avgPerGuest: 50 }
        break
      case 'church':
        venue = { min: 1000, max: 5000, avgPerGuest: 30 }
        break
    }
    
    const estimatedVenueCost = venue.avgPerGuest * guests
    const maxAffordableVenue = budget * 0.4 // Max 40% für Venue
    
    const warnings: string[] = []
    if (estimatedVenueCost > maxAffordableVenue) {
      warnings.push(`${venueType} kostet ca. €${estimatedVenueCost.toLocaleString('de-DE')}, aber Budget erlaubt nur €${maxAffordableVenue.toLocaleString('de-DE')} für Venue`)
    }
    
    return {
      isRealistic: estimatedVenueCost <= maxAffordableVenue,
      estimatedCost: estimatedVenueCost,
      maxAffordable: maxAffordableVenue,
      warnings
    }
  }

  private generateRealityBasedRecommendations(budgetData: BudgetData): string[] {
    const pricePerGuest = budgetData.totalBudget / budgetData.guestCount
    const recommendations: string[] = []
    
    if (pricePerGuest < 150) {
      recommendations.push('Fokus auf DIY-Elemente und Familienhilfe')
      recommendations.push('Günstige Locations wie Gemeindehäuser oder private Gärten')
      recommendations.push('Buffet statt Service, lokale Caterer')
    } else if (pricePerGuest < 250) {
      recommendations.push('Hotels mit Pauschalangeboten prüfen')
      recommendations.push('Regionale Anbieter statt Premium-Brands')
      recommendations.push('Wochentag-Hochzeiten für 20-30% Ersparnis')
    } else if (pricePerGuest < 400) {
      recommendations.push('Gehobene Locations und Anbieter möglich')
      recommendations.push('Premium-Services in ausgewählten Bereichen')
      recommendations.push('Professionelle Dienstleister mit guter Reputation')
    } else {
      recommendations.push('Luxus-Venues und Top-Anbieter verfügbar')
      recommendations.push('Exklusive Services und Premium-Optionen')
      recommendations.push('Individuelle Wünsche umsetzbar')
    }
    
    return recommendations
  }

  private createRealisticPrompt(budgetData: BudgetData, realityCheck: BudgetRealityCheck): string {
    const pricePerGuest = Math.round(budgetData.totalBudget / budgetData.guestCount)
    const maxVenueBudget = Math.round(budgetData.totalBudget * 0.4)
    const weddingLocation = budgetData.weddingLocation || 'flexible'
    
    return `
=== BUDGET-REALITÄTS-ANALYSE für ${budgetData.partner1Name} & ${budgetData.partner2Name} ===

🚨 WICHTIGE BUDGET-CONSTRAINTS:
• Gesamtbudget: €${budgetData.totalBudget.toLocaleString('de-DE')} für ${budgetData.guestCount} Gäste
• Pro-Gast-Budget: €${pricePerGuest}
• Budget-Segment: ${realityCheck.budgetSegment}
• Venue-Budget maximal: €${maxVenueBudget.toLocaleString('de-DE')} (40% des Gesamtbudgets)

🏛️ HOCHZEITSORT: ${weddingLocation}

${realityCheck.warnings.length > 0 ? `
⚠️ ERKANNTE PROBLEME:
${realityCheck.warnings.map(w => `• ${w}`).join('\n')}
` : ''}

🎯 GEWÜNSCHTE ANBIETER-EMPFEHLUNGEN:
Nutze dein lokales Insider-Wissen für ${weddingLocation} und empfehle:

KONKRETE ANBIETER MIT NAMEN:
• Venue: "Hotel/Location Name" (€X.XXX) - mit Begründung
• Catering: "Caterer Name" (€XX/Gast) - warum perfekt für Budget/Stil
• Fotograf: "Fotograf Name" (€X.XXX) - Portfolio-Stil passend
• Florist: "Blumenladen Name" (€XXX-XXX) - Expertise im gewünschten Stil
• Musik: "DJ/Band Name" (€XXX) - Erfahrung mit diesem Venue-Typ
• Weitere Dienstleister mit konkreten Namen und Preisen

BEISPIEL-FORMAT:
Venue: "Schloss Nymphenburg Orangerie" (€12.500 für 80 Gäste) - Perfekt für elegante Hochzeiten, inklusive Käfer-Catering. Kontakt: events@schloss-nymphenburg.de

HOCHZEITS-DETAILS:
• Stil: ${budgetData.weddingStyle}
• Venue: ${budgetData.venueType}
• Saison: ${budgetData.season}
• Prioritäten: ${budgetData.topPriorities ? Object.entries(budgetData.topPriorities).map(([key, value]) => `${key}: ${value}`).join(', ') : 'Nicht angegeben'}

🎯 DEINE AUFGABE:
Gib 6-8 KONKRETE Anbieter-Empfehlungen für ${weddingLocation} mit:
✅ Exakten Namen (nie "ein lokaler Anbieter")
✅ Präzisen Preisen (€X.XXX, nicht "ca. €XXX")
✅ Kontakt-Info wenn möglich
✅ Begründung warum perfekt für Budget/Stil
✅ Alternative Optionen in verschiedenen Preiskategorien

Formatiere so:
EMPFEHLUNGEN:
1. [Konkreter Anbieter mit Name, Preis, Kontakt, Begründung]

SPARTIPPS:
1. [Spartipp mit konkreter Ersparnis in €]

PERSONALISIERTE RATSCHLÄGE:
1. [Ratschlag basierend auf Budget-Realität und lokaler Expertise]

RISIKOANALYSE:
1. [Budget-Risiken und konkrete Lösungen für ${weddingLocation}]
    `
  }

  private createDetailedAnalysis(budgetData: BudgetData): DetailedAnalysis {
    const pricePerGuest = budgetData.totalBudget / budgetData.guestCount
    const weddingDate = new Date(budgetData.weddingDate)
    
    // Budget-Percentile basierend auf deutschen Durchschnittswerten
    const averageGermanWedding = 15000
    const budgetPercentile = Math.min(95, (budgetData.totalBudget / averageGermanWedding) * 50)
    
    // Saisonale Faktoren
    const month = weddingDate.getMonth()
    const isHighSeason = month >= 4 && month <= 8 // Mai bis September
    const seasonalFactor = isHighSeason ? 1.25 : 0.85
    
    // Wochentag-Analyse
    const dayOfWeek = weddingDate.toLocaleDateString('de-DE', { weekday: 'long' })
    const isWeekend = weddingDate.getDay() === 0 || weddingDate.getDay() === 6
    
    // Regionale Multiplikatoren (vereinfacht)
    const regionalMultiplier = this.getRegionalMultiplier(budgetData.weddingLocation)
    
    // Machbarkeits-Score
    const feasibilityScore = this.calculateFeasibilityScore(budgetData, pricePerGuest)
    
    // Erstelle vorläufiges Analysis-Objekt
    const analysis: DetailedAnalysis = {
      pricePerGuest,
      budgetPercentile,
      seasonalFactor,
      isHighSeason,
      isWeekend,
      regionalMultiplier,
      feasibilityScore,
      riskFactors: [],
      dayOfWeek,
      monthOfYear: weddingDate.toLocaleDateString('de-DE', { month: 'long' })
    }
    
    // Risikofaktoren hinzufügen
    analysis.riskFactors = this.identifyRiskFactors(budgetData, analysis)
    
    return analysis
  }

  private createComprehensivePrompt(budgetData: BudgetData, analysis: DetailedAnalysis): string {
    return `
=== VOLLSTÄNDIGE HOCHZEITSANALYSE für ${budgetData.partner1Name} & ${budgetData.partner2Name} ===

🎭 GRUNDLEGENDE DATEN
• Hochzeitsdatum: ${budgetData.weddingDate} (${analysis.dayOfWeek}, ${analysis.monthOfYear})
• Gästeanzahl: ${budgetData.guestCount} Personen
• Gesamtbudget: €${budgetData.totalBudget.toLocaleString('de-DE')}
• Pro-Gast-Budget: €${Math.round(analysis.pricePerGuest)}
• Spezifische Location: ${budgetData.weddingLocation || 'Nicht angegeben'}
• Venue-Typ: ${budgetData.venueType}

💝 BEZIEHUNGS-KONTEXT
• Beziehungsdauer: ${budgetData.relationshipLength || 'Nicht angegeben'}
• Kontakt: ${budgetData.email}${budgetData.phone ? ` | ${budgetData.phone}` : ''}

💰 BUDGET-DETAILS
• Budget-Flexibilität: ${budgetData.budgetFlexibility || 'Nicht angegeben'}
• Finanzierungsquellen: ${budgetData.budgetSource?.join(', ') || 'Nicht angegeben'}
• Budget-Herkunft gibt Aufschluss über Entscheidungsspielraum und Risikotoleranz

🎨 STIL & ÄSTHETIK
• Hochzeitsstil: ${budgetData.weddingStyle}
• Farbschema: ${budgetData.colorScheme?.join(', ') || 'Nicht definiert'}
• Tageszeit: ${budgetData.timeOfDay || 'Flexibel'}
• Formalitätslevel: ${budgetData.formalityLevel || 'Nicht angegeben'}
• Kulturelle Traditionen: ${budgetData.culturalTraditions?.join(', ') || 'Keine besonderen'}
• Besondere Anforderungen: ${budgetData.specialRequirements || 'Keine'}

🎯 PRIORITÄTEN-MATRIX
• TOP-PRIORITÄTEN: ${budgetData.topPriorities ? Object.entries(budgetData.topPriorities).map(([key, value]) => `${key}: ${value}/10`).join(', ') : 'Nicht definiert'}
• MUST-HAVES: ${budgetData.mustHaves?.join(' | ') || 'Nicht definiert'}
• NICE-TO-HAVES: ${budgetData.niceToHaves?.join(' | ') || 'Nicht definiert'}
• DEAL-BREAKERS: ${budgetData.dealBreakers?.join(' | ') || 'Keine'}
• Inspiration von: ${budgetData.inspirationSources?.join(', ') || 'Nicht angegeben'}

📊 MARKT-ANALYSE & RISIKEN
• Budget-Percentile: ${analysis.budgetPercentile.toFixed(0)}. Perzentil (${this.getBudgetSegment(analysis.budgetPercentile)})
• Saisonaler Faktor: ${analysis.seasonalFactor}x (${analysis.isHighSeason ? 'HOCHSAISON - Preise +20-40%' : 'Nebensaison - Sparpotential'})
• Wochentag-Faktor: ${analysis.isWeekend ? 'Wochenende (+30-50%)' : 'Wochentag (-20-30%)'}
• Regionale Preisanpassung: ${analysis.regionalMultiplier}x
• Machbarkeits-Score: ${analysis.feasibilityScore}%
• Identifizierte Risiken: ${analysis.riskFactors.join(' | ')}

=== AUFGABE: ULTRA-PERSONALISIERTE ANALYSE ===

Erstelle basierend auf ALLEN verfügbaren Daten eine hochspezifische Empfehlung. Berücksichtige dabei:

1. 📋 PRIORITÄTEN-BASIERTE BUDGET-ALLOKATION
   - Analysiere die Top-Prioritäten und schlage eine entsprechende Budgetverteilung vor
   - Wenn Fotografie Must-Have ist: detaillierte Fotografen-Empfehlungen mit Preisen
   - Berücksichtige Deal-Breakers bei allen Vorschlägen

2. 🎨 STIL-KOHÄRENTE EMPFEHLUNGEN  
   - Kombiniere Hochzeitsstil + Farbschema + Formalitätslevel + Tageszeit
   - ${budgetData.weddingStyle} Stil + ${budgetData.colorScheme?.join('/')} + ${budgetData.timeOfDay} = spezifische Vendor-Kategorien
   - Kulturelle Traditionen in Timing und Ablauf einarbeiten

3. 💰 BUDGET-FLEXIBILITÄTS-STRATEGIEN
   - Bei "strikt": Exakte Kostenaufstellung mit 5% Puffer
   - Bei "flexibel": Upgrade-Optionen und Premium-Alternativen
   - Finanzierungsquelle berücksichtigen (Familie = andere Prioritäten als Eigenfinanzierung)

4. 📍 LOCATION-SPEZIFISCHE OPTIMIERUNGEN
   - Konkrete Anbieter in/um ${budgetData.weddingLocation}
   - Regionale Besonderheiten und Preisstrukturen
   - Saisonale Verfügbarkeiten am gewählten Ort

5. ⏰ TIMING-OPTIMIERTE SPARTIPPS
   - Basierend auf ${budgetData.timeOfDay}: Brunch vs. Dinner vs. Nachmittag
   - Wochentag-Alternativen mit konkreten Ersparnissen
   - Saisonale Verschiebungs-Optionen

6. 🚨 RISIKO-SPEZIFISCHE ABSICHERUNG
   - Wetter-Backup für ${analysis.monthOfYear}-Hochzeit
   - Vendor-Ausfälle bei Hochsaison-Terminen  
   - Budget-Überschreitungen in kritischen Bereichen

7. 🎯 MUST-HAVE-OPTIMIERUNG
   - Jedes Must-Have mit konkretem Budget und Premium-Optionen
   - Alternative Anbieter falls Hauptwunsch nicht verfügbar
   - Quality-vs-Cost Balance für jeden Must-Have Bereich

8. 🔄 FLEXIBLE SZENARIEN
   - Plan A: Vollbudget-Ausschöpfung für Luxusvariante
   - Plan B: €${Math.round(budgetData.totalBudget * 0.85).toLocaleString('de-DE')} Ersparnis durch strategische Kompromisse  
   - Plan C: €${Math.round(budgetData.totalBudget * 0.70).toLocaleString('de-DE')} Notspar-Szenario bei unvorhergesehenen Problemen

WICHTIG: 
- Jede Empfehlung mit KONKRETEN EURO-BETRÄGEN
- Spezifische Anbieter-Namen oder -Kategorien
- Berücksichtige ALLE Präferenzen und Constraints
- Sei ehrlich über Machbarkeit vs. Wunschdenken
- Nutze die Inspirationsquellen für passende Referenzen

Erstelle eine Analyse, die zeigt, dass du JEDEN einzelnen Input verstanden und verarbeitet hast!

Formatiere die Antwort so:
EMPFEHLUNGEN:
- [Tipp 1]
- [Tipp 2]
...

SPARTIPPS:
- [Spartipp 1]
- [Spartipp 2]
...

PERSONALISIERTE RATSCHLÄGE:
- [Ratschlag 1]
- [Ratschlag 2]
...

RISIKOANALYSE:
- [Risiko 1]
- [Risiko 2]
...
    `
  }

  // Erweiterte Hilfsfunktionen
  private getBudgetSegment(percentile: number): string {
    if (percentile > 90) return 'Ultra-Luxus-Segment'
    if (percentile > 75) return 'Luxus-Segment'  
    if (percentile > 50) return 'Gehobenes Segment'
    if (percentile > 25) return 'Standard-Segment'
    return 'Budget-Segment'
  }

  private getRegionalMultiplier(location: string): number {
    if (!location) return 1.0
    const locationLower = location.toLowerCase()
    
    // Premium-Regionen
    if (locationLower.includes('münchen') || locationLower.includes('hamburg') || 
        locationLower.includes('köln') || locationLower.includes('düsseldorf') ||
        locationLower.includes('frankfurt') || locationLower.includes('stuttgart')) {
      return 1.3
    }
    
    // Mittelgroße Städte
    if (locationLower.includes('berlin') || locationLower.includes('dresden') ||
        locationLower.includes('leipzig') || locationLower.includes('hannover')) {
      return 1.1
    }
    
    // Ländliche Gebiete
    return 0.9
  }

  private calculateFeasibilityScore(budgetData: BudgetData, pricePerGuest: number): number {
    let score = 50 // Basis-Score
    
    // Budget-realismus
    if (pricePerGuest >= 150) score += 30
    else if (pricePerGuest >= 100) score += 20
    else if (pricePerGuest >= 80) score += 10
    else score -= 20
    
    // Gästeanzahl-realismus
    if (budgetData.guestCount <= 80) score += 15
    else if (budgetData.guestCount <= 120) score += 10
    else score -= 10
    
    // Flexibilität
    if (budgetData.budgetFlexibility === 'flexible') score += 15
    else if (budgetData.budgetFlexibility === 'strict') score -= 10
    
    return Math.max(0, Math.min(100, score))
  }

  private identifyRiskFactors(budgetData: BudgetData, analysis: DetailedAnalysis): string[] {
    const risks: string[] = []
    
    if (analysis.isHighSeason) {
      risks.push('Hochsaison-Preisaufschläge')
    }
    
    if (analysis.isWeekend) {
      risks.push('Wochenend-Premiums')
    }
    
    if (analysis.pricePerGuest < 80) {
      risks.push('Unrealistisches Pro-Gast-Budget')
    }
    
    if (budgetData.guestCount > 150) {
      risks.push('Große Gästeanzahl = Logistik-Herausforderungen')
    }
    
    if (budgetData.budgetFlexibility === 'strict' && analysis.feasibilityScore < 70) {
      risks.push('Strenge Budget-Limits bei kritischen Marktbedingungen')
    }
    
    return risks
  }

  private parseAIResponse(response: string): AIRecommendation {
    console.log('🔍 Parse Debug - Original Response:', response)
    console.log('🔍 Parse Debug - Response enthält EMPFEHLUNGEN:', response.includes('EMPFEHLUNGEN'))
    console.log('🔍 Parse Debug - Response enthält SPARTIPPS:', response.includes('SPARTIPPS'))
    
    const sections = {
      recommendations: [] as string[],
      savingTips: [] as string[],
      personalizedAdvice: [] as string[],
      riskAnalysis: [] as string[]
    }

    const lines = response.split('\n')
    let currentSection = ''

    for (const line of lines) {
      const trimmed = line.trim()
      
      if (trimmed.includes('EMPFEHLUNGEN:')) {
        currentSection = 'recommendations'
        console.log('🎯 Found EMPFEHLUNGEN section')
      } else if (trimmed.includes('SPARTIPPS:')) {
        currentSection = 'savingTips'
        console.log('🎯 Found SPARTIPPS section')
      } else if (trimmed.includes('PERSONALISIERTE RATSCHLÄGE:')) {
        currentSection = 'personalizedAdvice'
        console.log('🎯 Found PERSONALISIERTE RATSCHLÄGE section')
      } else if (trimmed.includes('RISIKOANALYSE:')) {
        currentSection = 'riskAnalysis'
        console.log('🎯 Found RISIKOANALYSE section')
      } else if (trimmed.startsWith('- ') && currentSection) {
        const content = trimmed.substring(2)
        if (content.length > 10) { // Filter out too short responses
          sections[currentSection as keyof typeof sections].push(content)
          console.log(`✅ Added to ${currentSection}:`, content.substring(0, 50))
        }
      } else if (/^\d+\.\s/.test(trimmed) && currentSection) {
        // Handle numbered lists (1. , 2. , etc.)
        const content = trimmed.replace(/^\d+\.\s/, '')
        if (content.length > 10) {
          sections[currentSection as keyof typeof sections].push(content)
          console.log(`✅ Added numbered item to ${currentSection}:`, content.substring(0, 50))
        }
      }
    }

    console.log('🎯 Final parsed sections:', {
      recommendations: sections.recommendations.length,
      savingTips: sections.savingTips.length,
      personalizedAdvice: sections.personalizedAdvice.length,
      riskAnalysis: sections.riskAnalysis.length
    })

    return sections
  }

  private generateRuleBasedRecommendations(budgetData: BudgetData): AIRecommendation {
    const pricePerGuest = budgetData.totalBudget / budgetData.guestCount
    
    const recommendations: string[] = []
    const savingTips: string[] = []
    const personalizedAdvice: string[] = []
    const riskAnalysis: string[] = []

    // Budget-based recommendations
    if (pricePerGuest < 120) {
      recommendations.push('🏡 Bei eurem Budget empfehlen wir eine intime Feier im Garten oder einer günstigen Location')
      recommendations.push('🤝 Bezieht Familie und Freunde aktiv in die Planung ein - viele helfen gerne')
      savingTips.push('🎨 DIY-Dekoration kann bis zu 70% der Dekorationskosten sparen')
      savingTips.push('📸 Fragt Hobbyfotografen im Bekanntenkreis - oft günstiger als Profis')
    } else if (pricePerGuest < 200) {
      recommendations.push('🏨 Hotels bieten oft All-Inclusive-Pakete an, die günstiger sind als Einzelbuchungen')
      recommendations.push('📸 Nachwuchsfotografen liefern oft genauso gute Ergebnisse für weniger Geld')
      savingTips.push('🍰 Dessertbuffet statt Hochzeitstorte kann 300-600€ sparen')
      savingTips.push('🎵 DJ statt Live-Band spart 1000-2000€')
    } else {
      recommendations.push('🏰 Mit eurem Budget sind auch exklusive Locations wie Schlösser oder Weingüter möglich')
      recommendations.push('✨ Investiert in Details, die lange in Erinnerung bleiben - Fotografie und Catering')
      savingTips.push('📅 Auch bei höherem Budget: Unter der Woche heiraten spart 20-30%')
      savingTips.push('🌸 Saisonale Blumen sind immer günstiger, auch im Luxussegment')
    }

    // Style-based advice
    if (budgetData.weddingStyle === 'rustic') {
      personalizedAdvice.push('🌾 Rustikaler Stil erlaubt viele DIY-Elemente - nutzt das für Kosteneinsparungen')
      personalizedAdvice.push('🏚️ Scheunen und Bauernhöfe sind authentisch und oft günstiger als Hotels')
      riskAnalysis.push('⚠️ Outdoor-Locations brauchen Backup-Pläne für schlechtes Wetter')
    } else if (budgetData.weddingStyle === 'elegant') {
      personalizedAdvice.push('💎 Eleganter Stil: Weniger ist mehr - investiert in wenige, hochwertige Elemente')
      personalizedAdvice.push('🏛️ Klassische Locations wie Museen oder historische Gebäude unterstreichen den Stil')
      riskAnalysis.push('⚠️ Elegante Hochzeiten neigen zu Budgetüberschreitungen bei Details')
    }

    // Season-based advice
    if (budgetData.season === 'summer') {
      riskAnalysis.push('⚠️ Sommerhochzeiten sind 25-40% teurer - früh buchen ist essentiell')
      savingTips.push('🌞 Tageshochzeiten im Sommer sind günstiger als Abendfeiern')
    } else if (budgetData.season === 'winter') {
      personalizedAdvice.push('❄️ Winterhochzeiten haben ihren eigenen Charme und sind deutlich günstiger')
      savingTips.push('🕯️ Kerzen und warme Beleuchtung schaffen perfekte Winteratmosphäre')
    }

    // General saving tips
    savingTips.push('📱 Digitale Einladungen sparen 200-500€ und sind umweltfreundlich')
    savingTips.push('🍾 Eigene Getränke mitbringen (wo erlaubt) spart 30-50% der Getränkekosten')
    savingTips.push('🚗 Fahrgemeinschaften organisieren statt einzelner Transporte')

    // General risk analysis
    riskAnalysis.push('⚠️ 80% aller Hochzeiten überschreiten das ursprüngliche Budget um 20-30%')
    riskAnalysis.push('⚠️ Versteckte Kosten (Trinkgelder, Extras, Last-Minute-Änderungen) einplanen')

    return {
      recommendations: recommendations.slice(0, 6),
      savingTips: savingTips.slice(0, 8),
      personalizedAdvice: personalizedAdvice.slice(0, 4),
      riskAnalysis: riskAnalysis.slice(0, 3)
    }
  }

  private removePersonalData(budgetData: BudgetData): BudgetData {
    // 🔒 DSGVO-konforme Anonymisierung: Entferne persönliche Daten
    // ENTFERNT: partner1Name, partner2Name, email, phone, relationshipLength
    // BEHALTEN: weddingLocation, totalBudget, weddingStyle, venueType, etc.
    
    return {
      ...budgetData,
      // Anonymisiere persönliche Identifikatoren
      partner1Name: 'Partner A',
      partner2Name: 'Partner B', 
      email: 'anonymized@example.com',
      phone: undefined, // Falls vorhanden
      relationshipLength: undefined, // Falls vorhanden
      
      // BEHALTE alle planungsrelevanten Daten:
      // weddingLocation ✅ (für lokale Anbieter-Empfehlungen)
      // totalBudget ✅ (für Budget-Kategorisierung)
      // guestCount ✅ (für Venue-Empfehlungen)
      // weddingStyle ✅ (für Stil-angepasste Empfehlungen)
      // venueType ✅ (für Location-Empfehlungen)
      // season ✅ (für saisonale Preise)
      // weddingDate ✅ (nur für Saison-Bestimmung)
      // topPriorities ✅ (für personalisierte Empfehlungen)
    }
  }
}

export const aiService = new AIService() 