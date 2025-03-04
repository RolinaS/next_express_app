import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(num)
}

export const calculateTotalNutriments = (aliments: { poids: number, aliment: { glucide: number, proteine: number, lipide: number, kcal: number } }[]) => {
  return aliments.reduce((acc, { poids, aliment }) => {
    const ratio = poids / 100
    return {
      glucides: acc.glucides + (aliment.glucide * ratio),
      proteines: acc.proteines + (aliment.proteine * ratio),
      lipides: acc.lipides + (aliment.lipide * ratio),
      calories: acc.calories + (aliment.kcal * ratio)
    }
  }, { glucides: 0, proteines: 0, lipides: 0, calories: 0 })
}
