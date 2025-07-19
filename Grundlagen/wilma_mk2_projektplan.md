# Wilma Mk2 - Projektplan & Roadmap

## 📋 **Projekt-Übersicht**

**Projektziel:** Launch einer AI-powered Wedding Planning Plattform als Micro-Apps Ökosystem  
**Projektdauer:** 6 Monate (Januar - Juni 2025)  
**Budget-Rahmen:** €50.000 - €75.000  
**Team-Größe:** 3-4 Entwickler + 1 Designer + 1 Product Owner

---

## 🎯 **MVP Definition & Scope**

### **MVP Scope (Phase 1-2: Monate 1-3)**
- ✅ **Landing Page** (wilma.com) - Marketing & Tool-Übersicht
- ✅ **Budget Calculator** (budget.wilma.com) - Vollständig funktional mit AI
- ✅ **Timeline Generator** (timeline.wilma.com) - AI-basierte Timeline-Erstellung
- ✅ **Shared Infrastructure** - UI Library, API Client, Supabase Setup
- ✅ **Email Capture & Basic Analytics**
- ✅ **Mobile-optimierte PWAs**

### **Full Feature Scope (Phase 3-4: Monate 4-6)**
- ✅ **Guest Manager** (guests.wilma.com) - RSVP & Seating Management
- ✅ **Venue Analyzer** (venue.wilma.com) - AI Photo Analysis
- ✅ **Stress Planner** (wellness.wilma.com) - Wellness Tracking
- ✅ **User Authentication & Accounts**
- ✅ **Cross-Tool Integration & Unified Dashboard**
- ✅ **Advanced AI Features & Personalization**

---

## 📅 **Detaillierte Projektphasen**

## **PHASE 1: Foundation & Core Infrastructure** 
*Wochen 1-4 (Januar 2025)*

### **Woche 1-2: Setup & Architecture**
| Task | Verantwortlich | Aufwand | Status | Dependencies |
|------|----------------|---------|---------|--------------|
| Workspace Setup (Turborepo) | Tech Lead | 1d | 🔄 | - |
| Shared UI Library (@wilma/ui) | Frontend Dev | 3d | 🔄 | Workspace |
| API Client (@wilma/api-client) | Full-Stack Dev | 2d | 🔄 | Workspace |
| Supabase Setup & Schema | Backend Dev | 2d | 🔄 | - |
| Design System & Components | Designer | 4d | 🔄 | Brand Guidelines |
| Git Workflow & CI/CD | DevOps | 2d | 🔄 | Workspace |

### **Woche 3-4: Landing Page & Basic Tools**
| Task | Verantwortlich | Aufwand | Status | Dependencies |
|------|----------------|---------|---------|--------------|
| Landing Page (wilma.com) | Frontend Dev | 4d | ⏳ | UI Library |
| Navigation & Layout Components | Frontend Dev | 2d | ⏳ | Design System |
| Email Capture System | Full-Stack Dev | 2d | ⏳ | Supabase |
| Analytics Setup (PostHog) | Tech Lead | 1d | ⏳ | - |
| Basic Error Handling | Full-Stack Dev | 1d | ⏳ | - |

**🎯 Milestone 1:** Landing Page live, Infrastructure funktional, Team kann parallel entwickeln

---

## **PHASE 2: Budget Calculator & Timeline Generator**
*Wochen 5-12 (Februar - März 2025)*

### **Woche 5-8: Budget Calculator (budget.wilma.com)**
| Task | Verantwortlich | Aufwand | Status | Dependencies |
|------|----------------|---------|---------|--------------|
| Budget Form Components | Frontend Dev | 3d | ⏳ | UI Library |
| Regional Pricing API | Backend Dev | 2d | ⏳ | Supabase |
| AI Budget Calculation Logic | AI Dev | 4d | ⏳ | OpenAI Setup |
| Results Visualization (Charts) | Frontend Dev | 3d | ⏳ | Recharts |
| PDF Export Functionality | Full-Stack Dev | 2d | ⏳ | jsPDF |
| Email Capture Integration | Frontend Dev | 1d | ⏳ | API Client |
| Mobile Optimization | Frontend Dev | 2d | ⏳ | Responsive Design |
| Testing & Bug Fixes | QA | 3d | ⏳ | Complete Feature |

### **Woche 9-12: Timeline Generator (timeline.wilma.com)**
| Task | Verantwortlich | Aufwand | Status | Dependencies |
|------|----------------|---------|---------|--------------|
| Timeline Form & Input Validation | Frontend Dev | 2d | ⏳ | UI Library |
| AI Timeline Generation Logic | AI Dev | 5d | ⏳ | OpenAI + Wedding Data |
| Interactive Timeline Display | Frontend Dev | 4d | ⏳ | Drag & Drop Library |
| Task Management Features | Frontend Dev | 3d | ⏳ | Timeline Display |
| Progress Tracking | Frontend Dev | 2d | ⏳ | State Management |
| Calendar Export (ICS) | Backend Dev | 2d | ⏳ | Calendar Libraries |
| Mobile Timeline View | Frontend Dev | 3d | ⏳ | Touch Interactions |
| Integration Testing | QA | 2d | ⏳ | Complete Feature |

**🎯 Milestone 2:** Beide Kern-Tools live und vollständig funktional, erste User können Tools nutzen

---

## **PHASE 3: Guest Manager & User Accounts**
*Wochen 13-20 (April - Mai 2025)*

### **Woche 13-16: Guest Manager (guests.wilma.com)**
| Task | Verantwortlich | Aufwand | Status | Dependencies |
|------|----------------|---------|---------|--------------|
| CSV Import/Export System | Full-Stack Dev | 3d | ⏳ | Papa Parse |
| Guest Table & Filtering | Frontend Dev | 3d | ⏳ | React Table |
| RSVP Dashboard & Stats | Frontend Dev | 2d | ⏳ | Charts |
| Seating Chart Visualization | Frontend Dev | 4d | ⏳ | D3.js/Canvas |
| AI Seating Optimization | AI Dev | 3d | ⏳ | Algorithm Design |
| Email Communication System | Backend Dev | 3d | ⏳ | Email Templates |
| Mobile Guest Management | Frontend Dev | 2d | ⏳ | Touch UI |

### **Woche 17-20: User Authentication & Accounts**
| Task | Verantwortlich | Aufwand | Status | Dependencies |
|------|----------------|---------|---------|--------------|
| Supabase Auth Integration | Backend Dev | 2d | ⏳ | Supabase Auth |
| Login/Signup Components | Frontend Dev | 3d | ⏳ | Auth Flow |
| Protected Routes & Guards | Frontend Dev | 2d | ⏳ | React Router |
| User Dashboard Design | Designer | 2d | ⏳ | User Research |
| User Dashboard Development | Frontend Dev | 4d | ⏳ | Dashboard Design |
| Data Migration (Session → Account) | Backend Dev | 3d | ⏳ | Database Schema |
| Account Settings & Profile | Frontend Dev | 2d | ⏳ | User Management |

**🎯 Milestone 3:** Guest Manager live, User Accounts funktional, Cross-Tool Integration möglich

---

## **PHASE 4: Venue Analyzer & Stress Planner**
*Wochen 21-24 (Juni 2025)*

### **Woche 21-22: Venue Analyzer (venue.wilma.com)**
| Task | Verantwortlich | Aufwand | Status | Dependencies |
|------|----------------|---------|---------|--------------|
| Image Upload & Processing | Full-Stack Dev | 2d | ⏳ | File Handling |
| OpenAI Vision API Integration | AI Dev | 3d | ⏳ | GPT-4 Vision |
| Venue Analysis Results UI | Frontend Dev | 3d | ⏳ | Image Gallery |
| Compatibility Scoring Algorithm | AI Dev | 2d | ⏳ | Matching Logic |
| Venue Comparison Features | Frontend Dev | 2d | ⏳ | Comparison UI |

### **Woche 23-24: Stress Planner (wellness.wilma.com)**
| Task | Verantwortlich | Aufwand | Status | Dependencies |
|------|----------------|---------|---------|--------------|
| Stress Assessment Form | Frontend Dev | 2d | ⏳ | Form Validation |
| Wellness Recommendation Engine | AI Dev | 3d | ⏳ | Wellness Logic |
| Progress Tracking Dashboard | Frontend Dev | 2d | ⏳ | Charts & Metrics |
| Notification System | Backend Dev | 2d | ⏳ | Push Notifications |
| Integration with Timeline | Full-Stack Dev | 2d | ⏳ | Cross-Tool Data |

**🎯 Milestone 4:** Alle 5 Tools live, vollständige Platform Beta-bereit

---

## **PHASE 5: Integration & Launch Preparation**
*Wochen 25-26 (Ende Juni 2025)*

### **Cross-Tool Integration & Polish**
| Task | Verantwortlich | Aufwand | Status | Dependencies |
|------|----------------|---------|---------|--------------|
| Unified Dashboard Development | Frontend Dev | 3d | ⏳ | All Tools |
| Cross-Tool Data Synchronization | Backend Dev | 2d | ⏳ | API Integration |
| Advanced Analytics Implementation | Full-Stack Dev | 2d | ⏳ | Tracking Events |
| Performance Optimization | Tech Lead | 2d | ⏳ | Load Testing |
| Security Audit & Hardening | Security Expert | 2d | ⏳ | Penetration Testing |
| Final User Testing & Bug Fixes | QA + Team | 3d | ⏳ | Complete Platform |

**🎯 Final Milestone:** Production-ready Platform, Launch-bereit

---

## ⚠️ **Kritischer Pfad & Dependencies**

### **Blocking Dependencies:**
1. **Shared UI Library** → Alle Frontend-Entwicklung
2. **Supabase Schema** → Alle Backend-Integration  
3. **Design System** → Konsistente UI/UX
4. **OpenAI Integration** → AI-Features aller Tools
5. **User Authentication** → Account-basierte Features

### **Parallelisierbare Arbeit:**
- Nach Woche 4: Alle Tools können parallel entwickelt werden
- Frontend/Backend können meist parallel arbeiten
- Design und Development können mit iterativem Feedback laufen

---

## 📊 **Ressourcen-Planung**

### **Team-Allocation (Person-Wochen):**
| Rolle | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 | Gesamt |
|-------|---------|---------|---------|---------|---------|---------|
| Tech Lead | 4 | 2 | 2 | 1 | 2 | **11 PW** |
| Frontend Dev | 3 | 8 | 6 | 4 | 2 | **23 PW** |
| Full-Stack Dev | 3 | 5 | 6 | 3 | 3 | **20 PW** |
| AI Dev | 1 | 4 | 2 | 3 | 1 | **11 PW** |
| Designer | 2 | 1 | 1 | 0 | 0 | **4 PW** |
| QA | 1 | 2 | 2 | 1 | 2 | **8 PW** |

**Gesamt: 77 Person-Wochen**

---

## 🎯 **Success Metrics & KPIs**

### **Technical KPIs:**
- ✅ All 5 micro-apps deployed and functional
- ✅ <2s page load times on all tools
- ✅ 99.9% uptime
- ✅ Mobile-first responsive design
- ✅ 90%+ Lighthouse scores

### **Business KPIs (Post-Launch):**
- 🎯 **Tool Completion Rate:** >70% (Industry: 45-60%)
- 🎯 **Email Capture Rate:** >35% (Target: 25-40%)
- 🎯 **Email-to-Signup:** >20% (Industry: 15-20%)
- 🎯 **Cross-Tool Usage:** >30% (Users using 2+ tools)
- 🎯 **Monthly Active Users:** 1,000+ by Q3 2025

---

## ⚠️ **Risk Management**

### **High-Risk Items:**
| Risk | Wahrscheinlichkeit | Impact | Mitigation |
|------|-------------------|---------|------------|
| OpenAI API Limits/Costs | Medium | High | Implement rate limiting, budget monitoring |
| Team Ressourcen-Engpass | Medium | High | Buffer-Zeit eingeplant, Freelancer als Backup |
| AI Quality nicht ausreichend | Low | High | Extensive Testing, Fallback-Algorithmen |
| Performance Issues | Medium | Medium | Load Testing, CDN, Caching-Strategien |
| Competitor Launch | Low | Medium | MVP-first Approach, schneller Time-to-Market |

### **Contingency Plans:**
- **+2 Wochen Buffer** für unvorhergesehene Probleme
- **Reduced Scope Option:** Stress Planner als Post-Launch Feature
- **Fallback AI:** Statische Algorithmen falls OpenAI Issues

---

## 📋 **Nächste Schritte (Week 1 Action Items)**

### **Sofort zu erledigen:**
1. **Team Assembly** - Rollen final zuweisen und Verfügbarkeiten klären
2. **Development Environment** - Turborepo Workspace aufsetzen
3. **Supabase Project** - Erstellen und Basic Schema deployen
4. **Design Kickoff** - Brand Guidelines finalisieren, ersten Components designen
5. **Domain Setup** - wilma.com + Subdomains registrieren/konfigurieren

### **Diese Woche abschließen:**
- [ ] Git Repository Structure definiert
- [ ] Shared UI Library Grundgerüst
- [ ] Supabase Projekt mit Auth konfiguriert
- [ ] Erste Landing Page Components
- [ ] Team-Kommunikation etabliert (Slack, Weekly Meetings)

**Status-Reviews:** Jeden Freitag, Milestone-Reviews nach jeder Phase

---

*Letzte Aktualisierung: Januar 2025*