import { Request, Response } from 'express';
import { User } from '../models/User';

export class UserController {
  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();
      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des utilisateurs'
      });
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
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
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération de l\'utilisateur'
      });
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Erreur lors de la création de l\'utilisateur'
      });
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
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
      res.status(400).json({
        success: false,
        error: 'Erreur lors de la mise à jour de l\'utilisateur'
      });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
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
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la suppression de l\'utilisateur'
      });
    }
  }
}
