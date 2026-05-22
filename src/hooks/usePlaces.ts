'use client'
import { useState, useEffect } from 'react'
import type { Place, Category } from '@/types'
import { fetchPlaces, fetchCategories } from '@/lib/db'
import { PLACES, CATEGORIES } from '@/data'

export function usePlaces(city: string) {
  const [places, setPlaces] = useState<Place[]>(() => PLACES.filter(p => p.city === city))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchPlaces(city).then(rows => {
      if (cancelled) return
      setPlaces(rows.length > 0 ? rows : PLACES.filter(p => p.city === city))
      setLoading(false)
    }).catch(() => {
      if (!cancelled) {
        setPlaces(PLACES.filter(p => p.city === city))
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [city])

  return { places, loading }
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(() => CATEGORIES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchCategories().then(rows => {
      if (cancelled) return
      setCategories(rows.length > 0 ? rows : CATEGORIES)
      setLoading(false)
    }).catch(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  return { categories, loading }
}
