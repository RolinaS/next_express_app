import { Request, Response } from 'express';
import { Recette } from '../models/Recette';
import { RecetteAliment } from '../models/RecetteAliment';
import { Aliment } from '../models/Aliment';
import { User } from '../models/User';

export class RecetteController {
  public async getAllRecettes(req: Request, res: Response) {
    try {
      const recettes = await Recette.findAll({
        include: [
          { model: User, attributes: ['id', 'nom', 'prenom'] },
          { 
            model: Aliment,
            through: { 
              attributes: ['poids']
            }
          }
        ]
      });
      res.status(200).json({
        success: true,
        data: recettes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des recettes'
      });
    }
  }

  public async getRecetteById(req: Request, res: Response) {
    try {
      const recette = await Recette.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ['id', 'nom', 'prenom'] },
          { 
            model: Aliment,
            through: { 
              attributes: ['poids']
            }
          }
        ]
      });
      if (!recette) {
        return res.status(404).json({
          success: false,
          error: 'Recette non trouvée'
        });
      }
      res.status(200).json({
        success: true,
        data: recette
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération de la recette'
      });
    }
  }

  public async createRecette(req: Request, res: Response) {
    try {
      const { user_id, aliments } = req.body;
      
      // Créer la recette
      const recette = await Recette.create({ user_id });

      // Ajouter les aliments à la recette
      if (aliments && aliments.length > 0) {
        const recetteAliments = aliments.map((item: { aliment_id: number; poids: number }) => ({
          recette_id: recette.id,
          aliment_id: item.aliment_id,
          poids: item.poids
        }));
        await RecetteAliment.bulkCreate(recetteAliments);
      }

      // Récupérer la recette complète avec ses relations
      const recetteComplete = await Recette.findByPk(recette.id, {
        include: [
          { model: User, attributes: ['id', 'nom', 'prenom'] },
          { 
            model: Aliment,
            through: { 
              attributes: ['poids']
            }
          }
        ]
      });

      res.status(201).json({
        success: true,
        data: recetteComplete
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Erreur lors de la création de la recette'
      });
    }
  }

  public async updateRecette(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { aliments } = req.body;

      const recette = await Recette.findByPk(id);
      if (!recette) {
        return res.status(404).json({
          success: false,
          error: 'Recette non trouvée'
        });
      }

      // Mettre à jour les aliments
      if (aliments && aliments.length > 0) {
        // Supprimer les anciennes relations
        await RecetteAliment.destroy({ where: { recette_id: id } });

        // Créer les nouvelles relations
        const recetteAliments = aliments.map((item: { aliment_id: number; poids: number }) => ({
          recette_id: id,
          aliment_id: item.aliment_id,
          poids: item.poids
        }));
        await RecetteAliment.bulkCreate(recetteAliments);
      }

      // Récupérer la recette mise à jour
      const recetteUpdated = await Recette.findByPk(id, {
        include: [
          { model: User, attributes: ['id', 'nom', 'prenom'] },
          { 
            model: Aliment,
            through: { 
              attributes: ['poids']
            }
          }
        ]
      });

      res.status(200).json({
        success: true,
        data: recetteUpdated
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Erreur lors de la mise à jour de la recette'
      });
    }
  }

  public async deleteRecette(req: Request, res: Response) {
    try {
      const recette = await Recette.findByPk(req.params.id);
      if (!recette) {
        return res.status(404).json({
          success: false,
          error: 'Recette non trouvée'
        });
      }
      await recette.destroy();
      res.status(200).json({
        success: true,
        message: 'Recette supprimée avec succès'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la suppression de la recette'
      });
    }
  }

  public async getRecettesByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const recettes = await Recette.findAll({
        where: { user_id: userId },
        include: [
          { model: User, attributes: ['id', 'nom', 'prenom'] },
          { 
            model: Aliment,
            through: { 
              attributes: ['poids']
            }
          }
        ]
      });
      res.status(200).json({
        success: true,
        data: recettes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des recettes de l\'utilisateur'
      });
    }
  }
}
