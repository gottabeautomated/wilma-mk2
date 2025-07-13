import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Papa from 'papaparse'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Progress,
  Badge,
  Alert,
  AlertDescription,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui'
import {
  Upload,
  Download,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Users,
  FileSpreadsheet,
  RefreshCw,
  AlertCircle,
  Trash2,
  FileCheck,
} from 'lucide-react'
import { Guest } from '../types/guest'
import { validateGuestData, generateCSVTemplate } from '../utils/csvHelpers'

interface CSVImportModalProps {
  isOpen: boolean
  onClose: () => void
  onImport: (guests: Guest[]) => void
  existingGuests: Guest[]
}

interface ImportRow {
  index: number
  data: any
  guest?: Guest
  errors: string[]
  warnings: string[]
  status: 'valid' | 'warning' | 'error' | 'duplicate'
}

interface ImportStats {
  total: number
  valid: number
  warnings: number
  errors: number
  duplicates: number
}

const SAMPLE_DATA = [
  {
    firstName: 'Anna',
    lastName: 'Müller',
    email: 'anna.mueller@email.com',
    phone: '+43 123 456789',
    address: 'Musterstraße 1, 1010 Wien',
    relationship: 'Beste Freundin',
    side: 'bride',
    rsvpStatus: 'pending',
    plusOneAllowed: 'true',
    plusOneName: '',
    dietaryRestrictions: 'Vegetarisch',
    specialRequirements: '',
    notes: 'Kommt mit dem Auto'
  },
  {
    firstName: 'Max',
    lastName: 'Schmidt',
    email: 'max.schmidt@email.com',
    phone: '+43 987 654321',
    address: 'Beispielgasse 5, 8010 Graz',
    relationship: 'Cousin',
    side: 'groom',
    rsvpStatus: 'confirmed',
    plusOneAllowed: 'false',
    plusOneName: '',
    dietaryRestrictions: '',
    specialRequirements: 'Rollstuhlzugang',
    notes: ''
  }
]

export function CSVImportModal({ isOpen, onClose, onImport, existingGuests }: CSVImportModalProps) {
  const [importData, setImportData] = useState<ImportRow[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState<'upload' | 'preview' | 'complete'>('upload')
  const [fileName, setFileName] = useState<string>('')
  const [stats, setStats] = useState<ImportStats>({
    total: 0, valid: 0, warnings: 0, errors: 0, duplicates: 0
  })

  const downloadTemplate = useCallback(() => {
    const template = generateCSVTemplate(SAMPLE_DATA)
    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'Wilma_Gaesteliste_Vorlage.csv'
    link.click()
  }, [])

  const checkForDuplicates = useCallback((guest: Guest): boolean => {
    return existingGuests.some(existing => 
      existing.email && guest.email && existing.email.toLowerCase() === guest.email.toLowerCase() ||
      (existing.firstName.toLowerCase() === guest.firstName.toLowerCase() && 
       existing.lastName?.toLowerCase() === guest.lastName?.toLowerCase())
    )
  }, [existingGuests])

  const processCSV = useCallback((file: File) => {
    setIsProcessing(true)
    setFileName(file.name)
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      complete: (results) => {
        const rows: ImportRow[] = results.data.map((row: any, index: number) => {
          const validation = validateGuestData(row)
          let status: ImportRow['status'] = 'valid'
          
          if (validation.errors.length > 0) {
            status = 'error'
          } else if (validation.warnings.length > 0) {
            status = 'warning'
          } else if (validation.guest && checkForDuplicates(validation.guest)) {
            status = 'duplicate'
          }

          return {
            index: index + 1,
            data: row,
            guest: validation.guest,
            errors: validation.errors,
            warnings: validation.warnings,
            status
          }
        })

        const newStats: ImportStats = {
          total: rows.length,
          valid: rows.filter(r => r.status === 'valid').length,
          warnings: rows.filter(r => r.status === 'warning').length,
          errors: rows.filter(r => r.status === 'error').length,
          duplicates: rows.filter(r => r.status === 'duplicate').length,
        }

        setImportData(rows)
        setStats(newStats)
        setCurrentStep('preview')
        setIsProcessing(false)
      },
      error: (error) => {
        console.error('CSV parsing error:', error)
        setIsProcessing(false)
      }
    })
  }, [checkForDuplicates])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        processCSV(acceptedFiles[0])
      }
    },
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls', '.xlsx']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const handleImport = useCallback(() => {
    const validGuests = importData
      .filter(row => row.guest && (row.status === 'valid' || row.status === 'warning'))
      .map(row => row.guest!)
    
    onImport(validGuests)
    setCurrentStep('complete')
  }, [importData, onImport])

  const handleClose = useCallback(() => {
    setImportData([])
    setCurrentStep('upload')
    setFileName('')
    setStats({ total: 0, valid: 0, warnings: 0, errors: 0, duplicates: 0 })
    onClose()
  }, [onClose])

  const removeRow = useCallback((index: number) => {
    const newData = importData.filter(row => row.index !== index)
    setImportData(newData)
    
    const newStats: ImportStats = {
      total: newData.length,
      valid: newData.filter(r => r.status === 'valid').length,
      warnings: newData.filter(r => r.status === 'warning').length,
      errors: newData.filter(r => r.status === 'error').length,
      duplicates: newData.filter(r => r.status === 'duplicate').length,
    }
    setStats(newStats)
  }, [importData])

  const getStatusIcon = (status: ImportRow['status']) => {
    switch (status) {
      case 'valid': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />
      case 'duplicate': return <AlertCircle className="h-4 w-4 text-blue-600" />
    }
  }

  const getStatusBadge = (status: ImportRow['status']) => {
    const configs = {
      valid: { label: 'Gültig', variant: 'default' as const },
      warning: { label: 'Warnung', variant: 'secondary' as const },
      error: { label: 'Fehler', variant: 'destructive' as const },
      duplicate: { label: 'Duplikat', variant: 'outline' as const },
    }
    
    const config = configs[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            CSV Gäste-Import
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Upload Step */}
          {currentStep === 'upload' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Alert>
                <Download className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>
                    Laden Sie zuerst unsere CSV-Vorlage herunter, um sicherzustellen, 
                    dass Ihre Daten korrekt formatiert sind.
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadTemplate}
                    className="ml-4"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Vorlage herunterladen
                  </Button>
                </AlertDescription>
              </Alert>

              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                  ${isDragActive 
                    ? 'border-royal bg-royal/5' 
                    : 'border-gray-300 hover:border-royal/50'
                  }
                `}
              >
                <input {...getInputProps()} />
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 bg-royal/10 rounded-full flex items-center justify-center">
                    <Upload className="h-6 w-6 text-royal" />
                  </div>
                  {isDragActive ? (
                    <p className="text-lg font-medium text-royal">
                      CSV-Datei hier ablegen...
                    </p>
                  ) : (
                    <>
                      <p className="text-lg font-medium">
                        CSV-Datei hierher ziehen oder klicken zum Auswählen
                      </p>
                      <p className="text-sm text-gray-600">
                        Unterstützte Formate: .csv, .xls, .xlsx (max. 10MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              {isProcessing && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Verarbeite CSV-Datei...</span>
                  </div>
                  <Progress value={undefined} className="w-full" />
                </div>
              )}
            </motion.div>
          )}

          {/* Preview Step */}
          {currentStep === 'preview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Gesamt</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Gültig</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{stats.valid}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">Warnungen</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">{stats.warnings}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium">Fehler</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{stats.errors}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Duplikate</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{stats.duplicates}</p>
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">Alle ({stats.total})</TabsTrigger>
                  <TabsTrigger value="valid">Gültig ({stats.valid})</TabsTrigger>
                  <TabsTrigger value="warnings">Warnungen ({stats.warnings})</TabsTrigger>
                  <TabsTrigger value="errors">Fehler ({stats.errors})</TabsTrigger>
                  <TabsTrigger value="duplicates">Duplikate ({stats.duplicates})</TabsTrigger>
                </TabsList>

                {(['all', 'valid', 'warnings', 'errors', 'duplicates'] as const).map(tab => (
                  <TabsContent key={tab} value={tab} className="mt-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="max-h-96 overflow-y-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-16">Status</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>E-Mail</TableHead>
                              <TableHead>Seite</TableHead>
                              <TableHead>RSVP</TableHead>
                              <TableHead>Probleme</TableHead>
                              <TableHead className="w-16">Aktion</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {importData
                              .filter(row => tab === 'all' || row.status === (tab === 'warnings' ? 'warning' : tab))
                              .map((row) => (
                                <TableRow key={row.index}>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      {getStatusIcon(row.status)}
                                      {getStatusBadge(row.status)}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">
                                        {row.data.firstName} {row.data.lastName}
                                      </p>
                                      {row.data.relationship && (
                                        <p className="text-sm text-gray-600">
                                          {row.data.relationship}
                                        </p>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell>{row.data.email}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline">
                                      {row.data.side === 'bride' ? 'Braut' : 
                                       row.data.side === 'groom' ? 'Bräutigam' : 'Beide'}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">
                                      {row.data.rsvpStatus || 'pending'}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="space-y-1">
                                      {row.errors.map((error, i) => (
                                        <p key={i} className="text-sm text-red-600">• {error}</p>
                                      ))}
                                      {row.warnings.map((warning, i) => (
                                        <p key={i} className="text-sm text-yellow-600">• {warning}</p>
                                      ))}
                                      {row.status === 'duplicate' && (
                                        <p className="text-sm text-blue-600">• Gast bereits vorhanden</p>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeRow(row.index)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>
          )}

          {/* Complete Step */}
          {currentStep === 'complete' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6 py-8"
            >
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Import erfolgreich!</h3>
                <p className="text-gray-600">
                  {stats.valid + stats.warnings} Gäste wurden erfolgreich importiert.
                </p>
              </div>
              <Button onClick={handleClose}>
                Zur Gäste-Liste
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter>
          {currentStep === 'upload' && (
            <Button variant="outline" onClick={handleClose}>
              Abbrechen
            </Button>
          )}
          
          {currentStep === 'preview' && (
            <>
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('upload')}
              >
                Zurück
              </Button>
              <Button 
                onClick={handleImport}
                disabled={stats.valid + stats.warnings === 0}
                className="gap-2"
              >
                <FileCheck className="h-4 w-4" />
                {stats.valid + stats.warnings} Gäste importieren
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 