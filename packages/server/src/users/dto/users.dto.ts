import {createZodDto} from "@anatine/zod-nestjs";
import {extendApi} from "@anatine/zod-openapi";
import {z} from "zod";

export const UserZ = extendApi(
    z.object({
        id: z.number().optional(),
        name: z.string(),
        username: z.string(),
        email: z.string().email(),
        password: z.string().optional(),
    }),
    {
        title: "User",
        description: "User",
    }
);

export class UserDto extends createZodDto(UserZ) {
}

export class UpdateUserDto extends createZodDto(
    UserZ.omit({id: true}).partial()
) {
}

export const GetUsersZ = extendApi(z.array(UserZ), {
    title: "GetUsers",
    description: "GetUsers",
});

export class GetUsersDto extends createZodDto(GetUsersZ) {
}

export const GetUserZ = extendApi(UserZ, {
    title: "GetUser",
    description: "GetUser",
});

export class GetUserDto extends createZodDto(GetUserZ) {
}

export const CreateUserZ = extendApi(UserZ.omit({id: true}), {
    title: "CreateUser",
    description: "CreateUser",
});

export class CreateUserDto extends createZodDto(CreateUserZ) {
}
