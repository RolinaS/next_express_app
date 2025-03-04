import { Request, Response } from 'express';
import { User } from '../models/User';

export class UserController {
  public getAllUsers = async (req: Request, res: Response) => {
    try {
      console.log('📝 GET /api/users - Récupération de tous les utilisateurs');
      const users = await User.findAll();
      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error('❌ Erreur GET /api/users:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des utilisateurs'
      });
    }
  }

  public getUserById = async (req: Request, res: Response) => {
    try {
      console.log(`📝 GET /api/users/${req.params.id} - Récupération d'un utilisateur`);
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error(`❌ Erreur GET /api/users/${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération de l\'utilisateur'
      });
    }
  }

  public createUser = async (req: Request, res: Response) => {
    try {
      console.log('📝 POST /api/users - Création d\'un utilisateur:', req.body);
      const user = await User.create(req.body);
      res.status(201).json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('❌ Erreur POST /api/users:', error);
      res.status(400).json({
        success: false,
        error: 'Erreur lors de la création de l\'utilisateur'
      });
    }
  }

  public updateUser = async (req: Request, res: Response) => {
    try {
      console.log(`📝 PUT /api/users/${req.params.id} - Mise à jour d'un utilisateur:`, req.body);
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }
      await user.update(req.body);
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error(`❌ Erreur PUT /api/users/${req.params.id}:`, error);
      res.status(400).json({
        success: false,
        error: 'Erreur lors de la mise à jour de l\'utilisateur'
      });
    }
  }

  public deleteUser = async (req: Request, res: Response) => {
    try {
      console.log(`📝 DELETE /api/users/${req.params.id} - Suppression d'un utilisateur`);
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }
      await user.destroy();
      res.status(200).json({
        success: true,
        message: 'Utilisateur supprimé avec succès'
      });
    } catch (error) {
      console.error(`❌ Erreur DELETE /api/users/${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la suppression de l\'utilisateur'
      });
    }
  }
}
