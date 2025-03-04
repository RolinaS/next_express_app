import { Request, Response } from 'express';
import { SuccessResponse } from '../types';

export class UserController {
  public async getAllUsers(req: Request, res: Response) {
    try {
      // Simulation de récupération des utilisateurs
      const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
      ];

      const response: SuccessResponse<any[]> = {
        data: users,
        message: 'Utilisateurs récupérés avec succès',
        status: 200
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: 'Erreur lors de la récupération des utilisateurs',
        status: 500
      });
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // Simulation de récupération d'un utilisateur
      const user = {
        id: parseInt(id),
        name: 'John Doe',
        email: 'john@example.com'
      };

      const response: SuccessResponse<any> = {
        data: user,
        message: 'Utilisateur récupéré avec succès',
        status: 200
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: 'Erreur lors de la récupération de l\'utilisateur',
        status: 500
      });
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      // Simulation de création d'utilisateur
      const newUser = {
        id: Math.floor(Math.random() * 1000),
        ...userData
      };

      const response: SuccessResponse<any> = {
        data: newUser,
        message: 'Utilisateur créé avec succès',
        status: 201
      };

      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        message: 'Erreur lors de la création de l\'utilisateur',
        status: 500
      });
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userData = req.body;
      // Simulation de mise à jour d'utilisateur
      const updatedUser = {
        id: parseInt(id),
        ...userData
      };

      const response: SuccessResponse<any> = {
        data: updatedUser,
        message: 'Utilisateur mis à jour avec succès',
        status: 200
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: 'Erreur lors de la mise à jour de l\'utilisateur',
        status: 500
      });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // Simulation de suppression d'utilisateur

      const response: SuccessResponse<null> = {
        data: null,
        message: 'Utilisateur supprimé avec succès',
        status: 200
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: 'Erreur lors de la suppression de l\'utilisateur',
        status: 500
      });
    }
  }
}
