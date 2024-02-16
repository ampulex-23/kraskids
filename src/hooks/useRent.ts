'use client'

import { useState } from "react"
import { API_URL } from "./config"
import { Rent } from "@/types"
import Rents from './rents.json';

export default function useRents() {
  const [rents, setRents] = useState<Rent[] | null>(null)
  const fetchRents = async () => {
    try {
      setRents(Rents.data.map((o: any) => ({ ...o.attributes })))
      const response = await fetch(`${API_URL}/rents.jspn`)
      const data = await response.json()
      const rents  = data.data.map((o: any) => ({ ...o.attributes }))
      setRents(rents)
    } catch (error) {
      console.error(error)
    }
  }
  !rents && fetchRents()
  return rents
}