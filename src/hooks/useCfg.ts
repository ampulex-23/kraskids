'use client'

import { useState } from 'react';
import { API_URL } from './config';
import Cfg from "./config.json";

export default function useCfg() {
  const [cfg, setCfg] = useState<any | null>(null);
  const fetchCfg = async () => {
    setCfg(Cfg.data)
    try {
      const response = await fetch(`${API_URL}/config.json`);
      const data = await response.json();
      const cfg = { ...data.data };
      setCfg(cfg);
    } catch (error) {
      console.error(error);
    }
  };
  !cfg && fetchCfg();

  return cfg;
}
