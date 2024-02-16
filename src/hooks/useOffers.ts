'use client'

import { useState } from "react"
import { API_URL } from "./config"
import { Offer } from "@/types"
import Offers from "./offers.json";

export default function useOffers() {
  const [offers, setOffers] = useState<Offer[] | null>(null)
  const fetchOffers = async () => {
    setOffers(Offers.data.map((o: any) => ({ ...o.attributes })))
    try {
      const response = await fetch(`${API_URL}/offers.json`)
      const data = await response.json()
      const offers  = data.data.map((o: any) => ({ ...o.attributes }))
      setOffers(offers)
    } catch (error) {
      
    }
  }
  !offers && fetchOffers()
  
  return offers
}