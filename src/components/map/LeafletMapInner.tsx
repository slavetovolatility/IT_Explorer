'use client'
import { useEffect, useRef } from 'react'
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps'
import type { Place } from '@/types'
import { CATEGORIES } from '@/data'

const CITY_VIEW: Record<string, { lat: number; lng: number; zoom: number }> = {
  bangkok: { lat: 13.7563, lng: 100.5018, zoom: 13 },
  phuket:  { lat: 7.8804,  lng: 98.3523,  zoom: 11 },
}

// Google provides DEMO_MAP_ID for development — override via NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? 'DEMO_MAP_ID'

function PinMarker({ accent, selected }: { accent: string; selected: boolean }) {
  const s = selected ? 40 : 32
  return (
    <div style={{
      width: s, height: s,
      borderRadius: '50% 50% 50% 0',
      transform: 'rotate(-45deg)',
      background: accent,
      border: '2.5px solid #fff',
      boxShadow: selected
        ? '0 4px 12px rgba(0,0,0,.42)'
        : '0 2px 6px rgba(0,0,0,.28)',
      transition: 'all .15s',
    }} />
  )
}

function CityFollower({ city }: { city: string }) {
  const map = useMap()
  const prev = useRef(city)
  useEffect(() => {
    if (!map || prev.current === city) return
    prev.current = city
    const v = CITY_VIEW[city] ?? CITY_VIEW.bangkok
    map.panTo({ lat: v.lat, lng: v.lng })
    map.setZoom(v.zoom)
  }, [city, map])
  return null
}

interface Props {
  pins?: Place[]
  selectedId?: string | null
  onSelect?: (place: Place) => void
  city?: string
}

export default function GoogleMapInner({ pins = [], selectedId, onSelect, city = 'bangkok' }: Props) {
  const v = CITY_VIEW[city] ?? CITY_VIEW.bangkok
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={{ lat: v.lat, lng: v.lng }}
        defaultZoom={v.zoom}
        mapId={MAP_ID}
        gestureHandling="greedy"
        disableDefaultUI
        style={{ width: '100%', height: '100%' }}
      >
        <CityFollower city={city} />
        {pins.map(p => {
          const cat = CATEGORIES.find(c => c.id === p.category)
          const accent = cat?.accent ?? '#C13D2F'
          const sel = selectedId === p.id
          return (
            <AdvancedMarker
              key={p.id}
              position={{ lat: p.coords[0], lng: p.coords[1] }}
              zIndex={sel ? 100 : undefined}
              onClick={() => onSelect?.(p)}
            >
              <PinMarker accent={accent} selected={sel} />
            </AdvancedMarker>
          )
        })}
      </Map>
    </APIProvider>
  )
}
