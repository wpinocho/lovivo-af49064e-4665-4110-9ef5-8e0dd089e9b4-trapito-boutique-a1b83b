/**
 * EDITABLE UI COMPONENT - OrderTrackUI
 * TIPO B - El agente de IA puede editar libremente este componente
 *
 * Modos:
 *   - token prop presente → llama order-track con { token } al montar
 *   - sin token → muestra formulario de lookup por order_number + email
 */

import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { callEdge } from '@/lib/edge'
import { STORE_ID } from '@/lib/config'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  Check,
  Package,
  Truck,
  ExternalLink,
  Copy,
  Search,
  RotateCcw,
  CalendarDays,
  ChevronDown,
  AlertTriangle,
  MapPin,
  ArrowLeft,
} from 'lucide-react'
import { toast } from 'sonner'

// ─── Types ────────────────────────────────────────────────────────────────────

interface StepData {
  key?: string
  label?: string
  completed_at?: string | null
  date?: string | null
}

interface TrackEvent {
  occurred_at: string
  status_detail: string
  location?: string
}

interface TrackData {
  steps?: StepData[]
  current_step?: number | string
  cancelled?: boolean
  carrier?: string
  tracking_number?: string
  tracking_url?: string
  estimated_delivery_at?: string | null
  events?: TrackEvent[]
  display_mode?: 'detailed' | 'masked'
  order_number?: string
}

type UIMode = 'loading' | 'lookup' | 'tracking' | 'error-404' | 'error-generic'

// ─── Constants ────────────────────────────────────────────────────────────────

const STEP_DEFS = [
  { key: 'confirmed', label: 'Confirmado' },
  { key: 'preparing', label: 'Preparando' },
  { key: 'shipped', label: 'Enviado' },
  { key: 'delivered', label: 'Entregado' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCurrentStepIndex(trackData: TrackData): number {
  const cs = trackData.current_step
  if (typeof cs === 'number') return Math.max(0, Math.min(cs, 3))
  if (typeof cs === 'string') {
    const idx = STEP_DEFS.findIndex((s) => s.key === cs)
    return idx >= 0 ? idx : 0
  }
  return 0
}

function getStepDate(steps: StepData[] | undefined, index: number): string | null {
  const step = steps?.[index]
  if (!step) return null
  const raw = step.completed_at || step.date
  if (!raw) return null
  try {
    return format(new Date(raw), "d MMM", { locale: es })
  } catch {
    return null
  }
}

function formatDelivery(date: string | null | undefined): string | null {
  if (!date) return null
  try {
    return format(new Date(date), "d 'de' MMMM yyyy", { locale: es })
  } catch {
    return null
  }
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

function Timeline({ trackData }: { trackData: TrackData }) {
  const currentIdx = getCurrentStepIndex(trackData)

  return (
    <div className="w-full py-2">
      {/* Nodes + connectors */}
      <div className="grid grid-cols-4">
        {STEP_DEFS.map((step, i) => {
          const isComplete = i < currentIdx
          const isActive = i === currentIdx
          const isPending = i > currentIdx
          const stepDate = getStepDate(trackData.steps, i)

          return (
            <div key={step.key} className="flex flex-col items-center relative">
              {/* Left connector */}
              {i > 0 && (
                <div
                  className={cn(
                    'absolute top-[18px] right-1/2 left-0 h-0.5',
                    i <= currentIdx ? 'bg-oliva' : 'bg-lino'
                  )}
                />
              )}
              {/* Right connector */}
              {i < STEP_DEFS.length - 1 && (
                <div
                  className={cn(
                    'absolute top-[18px] left-1/2 right-0 h-0.5',
                    i < currentIdx ? 'bg-oliva' : 'bg-lino'
                  )}
                />
              )}

              {/* Circle */}
              <div
                className={cn(
                  'relative z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all',
                  isComplete && 'bg-oliva border-oliva',
                  isActive && 'bg-oliva border-oliva ring-4 ring-oliva/20',
                  isPending && 'bg-crema border-lino'
                )}
              >
                {isComplete && <Check className="w-4 h-4 text-crema" />}
                {isActive && <div className="w-2 h-2 rounded-full bg-crema" />}
              </div>

              {/* Label + date */}
              <div className="mt-2.5 text-center px-0.5 space-y-0.5">
                <p
                  className={cn(
                    'text-[11px] font-inter font-medium leading-tight',
                    !isPending ? 'text-tinta' : 'text-tinta-suave/40'
                  )}
                >
                  {step.label}
                </p>
                {stepDate && (
                  <p className="text-[10px] text-tinta-suave/50">{stepDate}</p>
                )}
                {isActive && !stepDate && (
                  <p className="text-[10px] text-oliva font-medium">En curso</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function TrackingSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-5 w-1/3 bg-lino" />
      <div className="bg-crudo rounded-2xl p-5">
        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="w-9 h-9 rounded-full bg-lino" />
              <Skeleton className="h-2.5 w-14 bg-lino" />
            </div>
          ))}
        </div>
      </div>
      <Skeleton className="h-14 w-full rounded-xl bg-lino" />
      <Skeleton className="h-12 w-full rounded-xl bg-lino" />
    </div>
  )
}

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast.success('Número copiado')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('No se pudo copiar')
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs text-oliva hover:text-oliva-oscuro transition-colors"
    >
      <Copy className="w-3 h-3" />
      {copied ? 'Copiado' : 'Copiar'}
    </button>
  )
}

// ─── Lookup form ──────────────────────────────────────────────────────────────

interface LookupFormProps {
  onFound: (data: TrackData) => void
}

function LookupForm({ onFound }: LookupFormProps) {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim() || !email.trim()) return
    setLoading(true)
    setError(null)

    try {
      const res = await callEdge('order-track', {
        store_id: STORE_ID,
        order_number: orderNumber.trim().replace(/^#/, ''),
        email: email.trim().toLowerCase(),
      })

      if (!res || res.error || (!res.steps && res.current_step === undefined)) {
        setError('No encontramos un pedido con esos datos. Verifica el número y el correo.')
        return
      }

      onFound(res)
    } catch {
      setError('Ocurrió un error. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-crudo mb-1">
          <Package className="w-7 h-7 text-oliva" />
        </div>
        <p className="font-inter text-sm text-tinta-suave">
          Ingresa los datos de tu pedido para ver su estado.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="eyebrow mb-1.5 block">Número de pedido</label>
          <Input
            placeholder="#1234"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="bg-crudo border-lino font-inter text-sm rounded-sm focus-visible:ring-oliva"
            required
          />
        </div>
        <div>
          <label className="eyebrow mb-1.5 block">Correo electrónico</label>
          <Input
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-crudo border-lino font-inter text-sm rounded-sm focus-visible:ring-oliva"
            required
          />
        </div>

        {error && (
          <div className="flex items-start gap-2 text-sm text-vino bg-vino/10 border border-vino/20 rounded-sm px-3 py-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-oliva hover:bg-oliva-oscuro text-crema rounded-sm font-inter text-sm"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-crema/30 border-t-crema animate-spin" />
              Buscando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Buscar mi pedido
            </span>
          )}
        </Button>
      </form>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface OrderTrackUIProps {
  token?: string
}

export default function OrderTrackUI({ token }: OrderTrackUIProps) {
  const navigate = useNavigate()
  const [mode, setMode] = useState<UIMode>(token ? 'loading' : 'lookup')
  const [trackData, setTrackData] = useState<TrackData | null>(null)
  const [eventsOpen, setEventsOpen] = useState(false)

  const fetchByToken = useCallback(async (t: string) => {
    setMode('loading')
    try {
      const res = await callEdge('order-track', { token: t })

      if (!res || res.error || (!res.steps && res.current_step === undefined)) {
        const is404 =
          res?.status === 404 ||
          res?.code === 404 ||
          res?.error?.includes?.('not found') ||
          res?.error?.includes?.('404')
        setMode(is404 ? 'error-404' : 'error-generic')
        return
      }

      setTrackData(res)
      setMode('tracking')
    } catch {
      setMode('error-generic')
    }
  }, [])

  useEffect(() => {
    if (token) fetchByToken(token)
  }, [token, fetchByToken])

  const handleLookupFound = (data: TrackData) => {
    setTrackData(data)
    setMode('tracking')
  }

  const isDetailed = trackData?.display_mode !== 'masked'
  const delivery = formatDelivery(trackData?.estimated_delivery_at)

  return (
    <EcommerceTemplate layout="centered">
      <div className="py-10 px-4 max-w-xl mx-auto min-h-[60vh]">
        {/* Page header */}
        <div className="mb-8">
          <p className="eyebrow text-oliva mb-2">Estado del pedido</p>
          <h1 className="font-fraunces text-3xl text-tinta tracking-tight">
            Rastrea tu pedido
          </h1>
        </div>

        {/* ── LOADING ── */}
        {mode === 'loading' && <TrackingSkeleton />}

        {/* ── ERROR 404 ── */}
        {mode === 'error-404' && (
          <div className="text-center space-y-6 py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-crudo">
              <Package className="w-8 h-8 text-tinta-suave" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-fraunces text-xl text-tinta">No encontramos tu pedido</h2>
              <p className="font-inter text-sm text-tinta-suave">
                El link puede haber expirado o ser incorrecto. Intenta con tu número de pedido y correo.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => setMode('lookup')}
                className="bg-oliva hover:bg-oliva-oscuro text-crema rounded-sm font-inter text-sm"
              >
                <Search className="w-4 h-4 mr-2" />
                Buscar por número
              </Button>
              <Button
                variant="outline"
                asChild
                className="rounded-sm border-lino font-inter text-sm"
              >
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Ir a la tienda
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* ── ERROR GENERIC ── */}
        {mode === 'error-generic' && (
          <div className="text-center space-y-6 py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-crudo">
              <AlertTriangle className="w-8 h-8 text-mostaza" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-fraunces text-xl text-tinta">Algo salió mal</h2>
              <p className="font-inter text-sm text-tinta-suave">
                No pudimos obtener el estado de tu pedido. Por favor intenta de nuevo.
              </p>
            </div>
            <Button
              onClick={() => (token ? fetchByToken(token) : setMode('lookup'))}
              className="bg-oliva hover:bg-oliva-oscuro text-crema rounded-sm font-inter text-sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reintentar
            </Button>
          </div>
        )}

        {/* ── LOOKUP FORM ── */}
        {mode === 'lookup' && <LookupForm onFound={handleLookupFound} />}

        {/* ── TRACKING ── */}
        {mode === 'tracking' && trackData && (
          <div className="space-y-5">
            {/* Order number */}
            {trackData.order_number && (
              <p className="font-inter text-sm text-tinta-suave">
                Pedido{' '}
                <span className="font-semibold text-tinta">#{trackData.order_number}</span>
              </p>
            )}

            {/* Cancelled banner */}
            {trackData.cancelled && (
              <div className="flex items-center gap-3 bg-vino/10 border border-vino/20 text-vino rounded-sm px-4 py-3">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p className="font-inter text-sm font-medium">Este pedido fue cancelado.</p>
              </div>
            )}

            {/* Timeline */}
            {!trackData.cancelled && (
              <div className="bg-crudo rounded-2xl px-5 pt-5 pb-6">
                <Timeline trackData={trackData} />
              </div>
            )}

            {/* Estimated delivery */}
            {delivery && (
              <div className="flex items-center gap-3 bg-crudo rounded-xl px-4 py-3.5">
                <CalendarDays className="w-5 h-5 text-oliva shrink-0" />
                <div>
                  <p className="eyebrow text-oliva">Entrega estimada</p>
                  <p className="font-fraunces text-lg text-tinta mt-0.5">{delivery}</p>
                </div>
              </div>
            )}

            {/* Carrier & tracking (detailed mode only) */}
            {isDetailed && (trackData.carrier || trackData.tracking_number) && (
              <div className="bg-crudo rounded-xl px-4 py-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-oliva" />
                  <p className="font-inter text-sm font-medium text-tinta">
                    {trackData.carrier || 'Paquetería'}
                  </p>
                </div>
                {trackData.tracking_number && (
                  <div className="flex items-center justify-between gap-3 bg-lino/30 rounded-sm px-3 py-2">
                    <code className="font-mono text-sm text-tinta">
                      {trackData.tracking_number}
                    </code>
                    <CopyButton value={trackData.tracking_number} />
                  </div>
                )}
                {trackData.tracking_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full rounded-sm border-lino font-inter text-sm"
                  >
                    <a
                      href={trackData.tracking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-2" />
                      Rastrear con la paquetería
                    </a>
                  </Button>
                )}
              </div>
            )}

            {/* Events (detailed mode, collapsible) */}
            {isDetailed && trackData.events && trackData.events.length > 0 && (
              <Collapsible open={eventsOpen} onOpenChange={setEventsOpen}>
                <CollapsibleTrigger asChild>
                  <button className="w-full flex items-center justify-between text-left px-4 py-3 bg-crudo rounded-xl hover:bg-lino/40 transition-colors">
                    <span className="font-inter text-sm font-medium text-tinta">
                      Historial de eventos
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-tinta-suave transition-transform',
                        eventsOpen && 'rotate-180'
                      )}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-1.5 divide-y divide-lino bg-crudo rounded-xl overflow-hidden">
                    {trackData.events.map((event, i) => {
                      let dateStr = ''
                      try {
                        dateStr = format(new Date(event.occurred_at), "d MMM yyyy, HH:mm", {
                          locale: es,
                        })
                      } catch {}
                      return (
                        <div key={i} className="px-4 py-3 space-y-0.5">
                          <p className="font-inter text-xs font-medium text-tinta">
                            {event.status_detail}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-tinta-suave/60">
                            <span>{dateStr}</span>
                            {event.location && (
                              <span className="flex items-center gap-0.5">
                                <MapPin className="w-2.5 h-2.5" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Footer action */}
            <div className="pt-3">
              <button
                onClick={() => navigate('/')}
                className="font-inter text-sm text-tinta-suave hover:text-tinta transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </EcommerceTemplate>
  )
}