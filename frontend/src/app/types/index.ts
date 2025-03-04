export interface User {
  id: number;
  nom: string;
  prenom: string;
  mail: string;
}

export interface Aliment {
  id: number;
  nom: string;
  glucide: number;
  proteine: number;
  lipide: number;
  kcal: number;
}

export interface RecetteAliment {
  aliment_id: number;
  poids: number;
  aliment?: Aliment;
}

export interface Recette {
  id: number;
  user_id: number;
  user?: User;
  aliments?: RecetteAliment[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
