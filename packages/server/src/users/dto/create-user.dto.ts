import type {User} from '@prisma/client'

export type CreateUserDto = Omit<User, 'id' | 'recipes'>
