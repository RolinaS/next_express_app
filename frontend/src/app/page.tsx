'use client'

import { useEffect, useState } from 'react'
import { User, Aliment, Recette } from './types'
import { getUsers, getAliments, getRecettes } from './lib/api'
import { Button } from './components/ui/button'
import { formatNumber, calculateTotalNutriments } from './lib/utils'

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [aliments, setAliments] = useState<Aliment[]>([])
  const [recettes, setRecettes] = useState<Recette[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [usersRes, alimentsRes, recettesRes] = await Promise.all([
          getUsers(),
          getAliments(),
          getRecettes()
        ])
        
        setUsers(usersRes.data?.data || [])
        setAliments(alimentsRes.data?.data || [])
        setRecettes(recettesRes.data?.data || [])
      } catch (err) {
        setError('Erreur lors du chargement des données')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500">{error}</div>
    </div>
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Application de Nutrition</h1>
      
      {/* Section Utilisateurs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Utilisateurs ({users.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <div key={user.id} className="p-4 border rounded-lg shadow-sm">
              <h3 className="font-medium">{user.prenom} {user.nom}</h3>
              <p className="text-gray-600">{user.mail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Aliments */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Aliments ({aliments.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-right">Glucides</th>
                <th className="px-4 py-2 text-right">Protéines</th>
                <th className="px-4 py-2 text-right">Lipides</th>
                <th className="px-4 py-2 text-right">Calories</th>
              </tr>
            </thead>
            <tbody>
              {aliments.map(aliment => (
                <tr key={aliment.id} className="border-t">
                  <td className="px-4 py-2">{aliment.nom}</td>
                  <td className="px-4 py-2 text-right">{formatNumber(aliment.glucide)}g</td>
                  <td className="px-4 py-2 text-right">{formatNumber(aliment.proteine)}g</td>
                  <td className="px-4 py-2 text-right">{formatNumber(aliment.lipide)}g</td>
                  <td className="px-4 py-2 text-right">{formatNumber(aliment.kcal)}kcal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section Recettes */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recettes ({recettes.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recettes.map(recette => {
            const user = users.find(u => u.id === recette.user_id)
            const recetteAliments = recette.aliments || []
            const totaux = calculateTotalNutriments(recetteAliments as any)

            return (
              <div key={recette.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">Recette #{recette.id}</h3>
                    <p className="text-sm text-gray-600">par {user?.prenom} {user?.nom}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {recetteAliments.map((ra, index) => {
                    const aliment = aliments.find(a => a.id === ra.aliment_id)
                    return (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{aliment?.nom}</span>
                        <span>{formatNumber(ra.poids)}g</span>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Glucides: {formatNumber(totaux.glucides)}g</div>
                    <div>Protéines: {formatNumber(totaux.proteines)}g</div>
                    <div>Lipides: {formatNumber(totaux.lipides)}g</div>
                    <div>Calories: {formatNumber(totaux.calories)}kcal</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
