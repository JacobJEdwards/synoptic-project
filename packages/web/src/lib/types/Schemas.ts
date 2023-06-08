// Purpose: Contains the schemas for the database tables hosted on the server.

const Role = {
    ADMIN: "ADMIN",
    USER: "USER",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export type Recipe = {
    id?: number;
    title: string;
    description?: string;
    ingredients: string[];
    origin: string;
    steps: string;
    vegan: boolean;
    vegetarian: boolean;
    halal: boolean;
    kosher: boolean;
    tags: string[];
    userId?: number;
    User?: User;
    comments?: Comment[];
    createdAt?: Date;
    updatedAt?: Date;
};

export type User = {
    id: number;
    username: string;
    email: string;
    name: string;
    password?: string;
    role: Role;
    recipes?: Recipe[];
    comments?: Comment[];
};

export type Comment = {
    id: number;
    userId?: number;
    user?: User;
    username: string;
    recipeId: number;
    recipe: Recipe;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type Charity = {
    id: number;
    name: string;
    description?: string;
    website?: string;
};
