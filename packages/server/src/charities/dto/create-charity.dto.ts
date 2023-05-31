import { Charity } from "@prisma/client";

export type CreateCharityDto = Omit<Charity, "id">;
