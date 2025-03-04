import { Request, Response } from 'express';
import { Aliment } from '../models/Aliment';

export class AlimentController {
  public async getAllAliments(req: Request, res: Response) {
    try {
      const aliments = await Aliment.findAll();
      res.status(200).json({
        success: true,
        data: aliments
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des aliments'
      });
    }
  }

  public async getAlimentById(req: Request, res: Response) {
    try {
      const aliment = await Aliment.findByPk(req.params.id);
      if (!aliment) {
        return res.status(404).json({
          success: false,
          error: 'Aliment non trouvé'
        });
      }
      res.status(200).json({
        success: true,
        data: aliment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération de l\'aliment'
      });
    }
  }

  public async createAliment(req: Request, res: Response) {
    try {
      const aliment = await Aliment.create(req.body);
      res.status(201).json({
        success: true,
        data: aliment
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Erreur lors de la création de l\'aliment'
      });
    }
  }

  public async updateAliment(req: Request, res: Response) {
    try {
      const aliment = await Aliment.findByPk(req.params.id);
      if (!aliment) {
        return res.status(404).json({
          success: false,
          error: 'Aliment non trouvé'
        });
      }
      await aliment.update(req.body);
      res.status(200).json({
        success: true,
        data: aliment
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Erreur lors de la mise à jour de l\'aliment'
      });
    }
  }

  public async deleteAliment(req: Request, res: Response) {
    try {
      const aliment = await Aliment.findByPk(req.params.id);
      if (!aliment) {
        return res.status(404).json({
          success: false,
          error: 'Aliment non trouvé'
        });
      }
      await aliment.destroy();
      res.status(200).json({
        success: true,
        message: 'Aliment supprimé avec succès'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la suppression de l\'aliment'
      });
    }
  }
}
