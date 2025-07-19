# Wilma Mk2 - API Specifications

## API Overview
Base URL: `https://api.wilma-mk2.com`  
Authentication: Bearer Token (Supabase JWT)  
Content-Type: `application/json`  
Version: `v1`

---

## Authentication

### Headers
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
X-API-Version: v1
```

### Error Responses
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token",
    "timestamp": "2025-06-19T10:30:00Z"
  }
}
```

---

## 1. Budget Calculator API

### POST /api/v1/budget/calculate
Calculate personalized wedding budget with AI recommendations.

#### Request Body
```json
{
  "guestCount": 120,
  "location": "Seattle, WA",
  "weddingDate": "2025-09-15",
  "style": "rustic",
  "budgetRange": 35000,
  "priorities": ["photography", "venue", "catering"],
  "preferences": {
    "outdoor": true,
    "alcohol": true,
    "liveMusic": true
  }
}
```

#### Response 200 OK
```json
{
  "success": true,
  "data": {
    "totalBudget": 35000,
    "breakdown": {
      "venue": 12000,
      "catering": 10800,
      "photography": 3500,
      "videography": 2000,
      "flowers": 2500,
      "music": 1500,
      "attire": 1200,
      "other": 1500
    },
    "aiRecommendations": [
      {
        "category": "venue",
        "suggestion": "Consider booking 12-18 months ahead for outdoor venues in Seattle",
        "potentialSavings": 2000,
        "priority": "high"
      },
      {
        "category": "catering",
        "suggestion": "Buffet style can save 20-30% compared to plated dinner",
        "potentialSavings": 2400,
        "priority": "medium"
      }
    ],
    "regionalFactors": {
      "location": "Seattle, WA",
      "seasonalMultiplier": 1.15,
      "competitionLevel": "medium",
      "averageVenueCost": 11500
    },
    "confidenceScore": 0.87,
    "calculationId": "calc_xyz123"
  }
}
```

#### Error Responses
```json
// 400 Bad Request
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Guest count must be between 1 and 1000",
    "field": "guestCount"
  }
}

// 429 Too Many Requests
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many calculations. Please try again in 60 seconds",
    "retryAfter": 60
  }
}
```

### POST /api/v1/budget/save
Save budget calculation to user's wedding profile.

#### Request Body
```json
{
  "calculationId": "calc_xyz123",
  "weddingId": "wedding_abc456",
  "customAdjustments": {
    "venue": 10000,
    "catering": 12000
  }
}
```

#### Response 201 Created
```json
{
  "success": true,
  "data": {
    "budgetId": "budget_def789",
    "weddingId": "wedding_abc456",
    "savedAt": "2025-06-19T10:30:00Z"
  }
}
```

### GET /api/v1/budget/export/{calculationId}
Export budget calculation as PDF.

#### Query Parameters
- `format`: pdf | csv | json
- `email`: optional email to send results

#### Response 200 OK (PDF)
```http
Content-Type: application/pdf
Content-Disposition: attachment; filename="wedding-budget-plan.pdf"
```

---

## 2. Timeline Generator API

### POST /api/v1/timeline/generate
Generate AI-powered wedding planning timeline.

#### Request Body
```json
{
  "weddingDate": "2025-09-15",
  "engagementDate": "2024-12-01",
  "complexity": "medium",
  "guestCount": 120,
  "venue": "outdoor",
  "style": "rustic",
  "budget": 35000,
  "priorities": ["venue", "photography", "catering"],
  "preferences": {
    "diyElements": true,
    "destinationWedding": false,
    "religiousCeremony": false
  }
}
```

#### Response 200 OK
```json
{
  "success": true,
  "data": {
    "timelineId": "timeline_xyz123",
    "milestones": [
      {
        "id": "milestone_001",
        "phase": "early_planning",
        "timeframe": "12 months before",
        "tasks": [
          {
            "id": "task_001",
            "name": "Set wedding budget",
            "description": "Determine total budget and allocation",
            "category": "budget",
            "priority": "critical",
            "estimatedDuration": 2,
            "dependencies": [],
            "dueDate": "2024-09-15",
            "completed": false
          },
          {
            "id": "task_002",
            "name": "Book venue",
            "description": "Research and book ceremony and reception venues",
            "category": "venue",
            "priority": "critical",
            "estimatedDuration": 8,
            "dependencies": ["task_001"],
            "dueDate": "2024-10-15",
            "completed": false
          }
        ]
      }
    ],
    "criticalPath": ["task_001", "task_002", "task_015", "task_023"],
    "seasonalFactors": {
      "peakSeason": true,
      "weatherConsiderations": ["rain_backup", "heating"],
      "vendorAvailability": "limited"
    },
    "aiRecommendations": [
      {
        "type": "timing",
        "message": "Book venue by October 2024 for best selection",
        "urgency": "high"
      },
      {
        "type": "stress_management",
        "message": "Schedule 2-week planning breaks every 3 months",
        "urgency": "medium"
      }
    ],
    "confidenceScore": 0.92
  }
}
```

### PUT /api/v1/timeline/{timelineId}/task/{taskId}
Update timeline task status.

#### Request Body
```json
{
  "completed": true,
  "completedDate": "2025-01-15T14:30:00Z",
  "notes": "Venue booked at Riverside Gardens",
  "actualDuration": 6
}
```

#### Response 200 OK
```json
{
  "success": true,
  "data": {
    "taskId": "task_002",
    "updated": true,
    "completionPercentage": 15.5
  }
}
```

---

## 3. Guest Manager API

### POST /api/v1/guests/import
Import guest list from CSV or contacts.

#### Request Body (multipart/form-data)
```
file: guests.csv
weddingId: wedding_abc456
mapping: {
  "firstName": "First Name",
  "lastName": "Last Name", 
  "email": "Email",
  "phone": "Phone"
}
```

#### Response 200 OK
```json
{
  "success": true,
  "data": {
    "importId": "import_xyz123",
    "processed": 45,
    "imported": 42,
    "errors": [
      {
        "row": 15,
        "error": "Invalid email format",
        "data": "john.smith@invalid"
      }
    ],
    "duplicates": 3
  }
}
```

### GET /api/v1/guests/{weddingId}
Get guest list for wedding.

#### Query Parameters
- `status`: pending | confirmed | declined | all
- `side`: bride | groom | both
- `search`: search term
- `page`: page number (default: 1)
- `limit`: items per page (default: 50)

#### Response 200 OK
```json
{
  "success": true,
  "data": {
    "guests": [
      {
        "id": "guest_001",
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@email.com",
        "phone": "+1-555-0123",
        "rsvpStatus": "confirmed",
        "side": "groom",
        "relationship": "friend",
        "plusOneAllowed": true,
        "plusOneName": "Jane Smith",
        "plusOneRsvp": "confirmed",
        "dietaryRestrictions": ["vegetarian"],
        "tableAssignment": 5,
        "invitationSent": true,
        "createdAt": "2025-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 142,
      "limit": 50
    },
    "summary": {
      "totalGuests": 142,
      "confirmed": 89,
      "pending": 45,
      "declined": 8,
      "plusOnes": 34
    }
  }
}
```

### POST /api/v1/guests/{weddingId}/rsvp
Process RSVP response.

#### Request Body
```json
{
  "guestId": "guest_001",
  "attending": true,
  "plusOneAttending": true,
  "mealChoice": "chicken",
  "plusOneMealChoice": "vegetarian",
  "dietaryNotes": "No shellfish allergies",
  "songRequests": ["Sweet Caroline", "Mr. Brightside"],
  "specialMessage": "So excited to celebrate with you!"
}
```

#### Response 200 OK
```json
{
  "success": true,
  "data": {
    "rsvpId": "rsvp_xyz123",
    "guestId": "guest_001",
    "status": "confirmed",
    "responseDate": "2025-06-19T10:30:00Z"
  }
}
```

### POST /api/v1/guests/{weddingId}/seating-optimization
Generate AI-optimized seating arrangement.

#### Request Body
```json
{
  "tables": [
    {
      "id": "table_001",
      "capacity": 8,
      "shape": "round",
      "location": "front_left"
    }
  ],
  "constraints": {
    "separateExes": true,
    "groupFamilies": true,
    "mixSides": true
  },
  "preferences": {
    "priorityGuests": ["guest_001", "guest_002"],
    "keepTogether": [
      ["guest_003", "guest_004"],
      ["guest_005", "guest_006"]
    ]
  }
}
```

#### Response 200 OK
```json
{
  "success": true,
  "data": {
    "seatingPlan": [
      {
        "tableId": "table_001",
        "guests": [
          {
            "guestId": "guest_001",
            "seatNumber": 1,
            "name": "John Smith"
          }
        ]
      }
    ],
    "optimizationScore": 0.87,
    "suggestions": [
      "Table 3 has good mix of bride and groom sides",
      "Consider moving couple at table 5 for better conversation flow"
    ]
  }
}
```

---

## 4. Venue Analyzer API

### POST /api/v1/venues/analyze
Analyze venue photos with AI computer vision.

#### Request Body (multipart/form-data)
```
images: [venue1.jpg, venue2.jpg]
preferences: {
  "style": "rustic",
  "guestCount": 120,
  "budget": 35000,
  "requirements": ["wheelchair_accessible", "outdoor_space"]
}
```

#### Response 200 OK
```json
{
  "success": true,
  "data": {
    "analysisId": "analysis_xyz123",
    "results": [
      {
        "imageUrl": "https://storage.wilma.com/venue1.jpg",
        "analysis": {
          "capacityEstimate": {
            "min": 100,
            "max": 150,
            "confidence": 0.85
          },
          "styleClassification": [
            {"style": "rustic", "confidence": 0.92},
            {"style": "outdoor", "confidence": 0.78},
            {"style": "barn", "confidence": 0.65}
          ],
          "features": [
            "exposed_beams",
            "string_lights",
            "outdoor_ceremony_space",
            "bridal_suite",
            "parking_area"
          ],
          "accessibility": {
            "wheelchairAccessible": true,
            "accessibilityScore": 8,
            "notes": "Ramp access available, accessible restrooms"
          },
          "weatherDependency": {
            "type": "mixed",
            "covered": 0.6,
            "backup_plan_needed": true
          },
          "decorationPotential": {
            "score": 9,
            "recommendations": [
              "Natural lighting reduces need for additional lighting",
              "Exposed beams perfect for hanging decor",
              "Outdoor space allows for ceremony arch"
            ]
          }
        },
        "compatibilityScore": 0.89,
        "pros": [
          "Perfect rustic aesthetic match",
          "Adequate capacity for guest count",
          "Beautiful natural lighting",
          "Multiple photo opportunities"
        ],
        "cons": [
          "Weather backup plan needed",
          "May require additional heating in September",
          "Limited vendor access for setup"
        ]
      }
    ],
    "recommendations": {
      "bestMatch": 0,
      "considerations": [
        "Book weather protection tent",
        "Confirm vendor access times",
        "Consider seasonal temperature needs"
      ]
    }
  }
}
```

### GET /api/v1/venues/search
Search venues by criteria.

#### Query Parameters
- `location`: city, state
- `radius`: search radius in miles
- `capacity`: minimum capacity
- `budget`: maximum budget
- `style`: venue style
- `features`: required features (comma-separated)

#### Response 200 OK
```json
{
  "success": true,
  "data": {
    "venues": [
      {
        "id": "venue_001",
        "name": "Riverside Gardens",
        "category": "outdoor",
        "location": {
          "address": "123 River Road, Seattle, WA",
          "coordinates": {
            "lat": 47.6062,
            "lng": -122.3321
          },
          "distance": 5.2
        },
        "capacity": {
          "min": 50,
          "max": 200
        },
        "pricing": {
          "basePrice": 8000,
          "priceRange": "$$",
          "includes": ["tables", "chairs", "basic_lighting"]
        },
        "features": [
          "outdoor_ceremony",
          "covered_reception",
          "bridal_suite",
          "catering_kitchen"
        ],
        "rating": 4.7,
        "reviewCount": 89,
        "availability": [
          "2025-09-13",
          "2025-09-20",
          "2025-09-27"
        ],
        "images": [
          "https://storage.wilma.com/venue_001_1.jpg"
        ]
      }
    ],
    "total": 15,
    "filters": {
      "applied": {
        "location": "Seattle, WA",
        "capacity": 120,
        "budget": 35000
      }
    }
  }
}
```

---

## 5. Stress Planner API

### POST /api/v1/wellness/assessment
Submit stress assessment.

#### Request Body
```json
{
  "weddingId": "wedding_abc456",
  "stressLevel": 7,
  "stressFactors": ["budget", "timeline", "family_pressure"],
  "moodRating": 3,
  "sleepQuality": 2,
  "exerciseFrequency": 1,
  "supportSystemRating": 4,
  "planningEnjoyment": 3,
  "overwhelmFactors": {
    "vendor_decisions": true,
    "guest_list": false,
    "timeline_pressure": true
  },
  "currentCopingStrategies": ["deep_breathing", "talking_to_partner"],
  "notes": "Feeling overwhelmed with vendor selection"
}
```

#### Response 200 OK
```json
{
  "success": true,
  "data": {
    "assessmentId": "assessment_xyz123",
    "overallScore": 6.2,
    "riskLevel": "moderate",
    "recommendations": [
      {
        "category": "immediate",
        "type": "breathing_exercise",
        "title": "5-Minute Stress Relief",
        "description": "Try the 4-7-8 breathing technique",
        "estimatedTime": 5,
        "frequency": "as_needed"
      },
      {
        "category": "planning",
        "type": "timeline_adjustment",
        "title": "Spread Out Vendor Meetings",
        "description": "Schedule vendor meetings across 3 weeks instead of 1",
        "estimatedTime": 0,
        "frequency": "ongoing"
      }
    ],
    "timelineAdjustments": [
      {
        "taskId": "task_015",
        "originalDue": "2025-02-01",
        "suggestedDue": "2025-02-15",
        "reason": "Reduce timeline pressure"
      }
    ],
    "resources": [
      {
        "type": "article",
        "title": "Managing Wedding Planning Stress",
        "url": "https://blog.wilma.com/stress-management"
      },
      {
        "type": "app",
        "title": "Headspace - Meditation",
        "description": "5-minute daily meditation"
      }
    ]
  }
}
```

### GET /api/v1/wellness/progress/{weddingId}
Get wellness tracking progress.

#### Response 200 OK
```json
{
  "success": true,
  "data": {
    "currentStressLevel": 5,
    "trend": "improving",
    "assessmentHistory": [
      {
        "date": "2025-06-01",
        "stressLevel": 8,
        "moodRating": 2
      },
      {
        "date": "2025-06-15",
        "stressLevel": 5,
        "moodRating": 4
      }
    ],
    "recommendations": {
      "active": 3,
      "completed": 7,
      "effectiveness": 0.78
    },
    "milestones": [
      {
        "type": "stress_reduction",
        "achievement": "Reduced stress from 8 to 5",
        "date": "2025-06-15",
        "celebrated": true
      }
    ]
  }
}
```

---

## Common API Patterns

### Error Handling
All endpoints follow consistent error response format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error context",
    "timestamp": "2025-06-19T10:30:00Z",
    "requestId": "req_xyz123"
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` (400): Invalid input data
- `UNAUTHORIZED` (401): Missing or invalid authentication
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `RATE_LIMIT_EXCEEDED` (429): Too many requests
- `INTERNAL_ERROR` (500): Server error
- `SERVICE_UNAVAILABLE` (503): Temporary service issue

### Rate Limiting
- **Public endpoints**: 100 requests per hour per IP
- **Authenticated endpoints**: 1000 requests per hour per user
- **AI-powered endpoints**: 50 requests per hour per user
- **File upload endpoints**: 10 requests per hour per user

Rate limit headers:
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1624564800
```

### Pagination
List endpoints support cursor-based pagination:

```json
{
  "data": [...],
  "pagination": {
    "hasMore": true,
    "nextCursor": "cursor_xyz123",
    "previousCursor": "cursor_abc456",
    "total": 150
  }
}
```

### Webhooks
Subscribe to real-time events:

```json
{
  "event": "guest.rsvp_updated",
  "data": {
    "guestId": "guest_001",
    "weddingId": "wedding_abc456",
    "rsvpStatus": "confirmed"
  },
  "timestamp": "2025-06-19T10:30:00Z",
  "signature": "sha256=..."
}
```

Available events:
- `guest.rsvp_updated`
- `timeline.task_completed`
- `budget.item_updated`
- `venue.analysis_completed`
- `assessment.submitted`

---

## SDK Examples

### JavaScript/TypeScript SDK
```typescript
import { WilmaAPI } from '@wilma/sdk'

const wilma = new WilmaAPI({
  apiKey: 'your-api-key',
  baseURL: 'https://api.wilma-mk2.com'
})

// Calculate budget
const budget = await wilma.budget.calculate({
  guestCount: 120,
  location: 'Seattle, WA',
  style: 'rustic',
  budgetRange: 35000
})

// Generate timeline
const timeline = await wilma.timeline.generate({
  weddingDate: '2025-09-15',
  complexity: 'medium',
  guestCount: 120
})

// Analyze venue
const analysis = await wilma.venues.analyze({
  images: [imageFile],
  preferences: {
    style: 'rustic',
    guestCount: 120
  }
})
```

### React Hooks
```typescript
import { useBudgetCalculation, useTimelineGeneration } from '@wilma/react'

function BudgetCalculator() {
  const { calculate, data, loading, error } = useBudgetCalculation()
  
  const handleSubmit = async (formData) => {
    await calculate(formData)
  }
  
  return (
    <div>
      {loading && <Spinner />}
      {error && <ErrorMessage error={error} />}
      {data && <BudgetResults budget={data} />}
    </div>
  )
}
```

Diese API-Spezifikationen bilden die Grundlage für die Frontend-Integration und ermöglichen es dir, sofort mit der Implementierung der Tools zu beginnen. Alle Endpoints sind für Skalierbarkeit, Sicherheit und optimale Developer Experience designed.