import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCharityDto } from "./dto/create-charity.dto";
import { UpdateCharityDto } from "./dto/update-charity.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CharitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCharityDto: CreateCharityDto) {
    return "This action adds a new charity";
  }

  async findAll() {
    const charities = await this.prisma.charity.findMany();

    if (!charities || charities.length === 0) {
      throw new NotFoundException({
        status: 404,
        message: "No charities found",
      });
    }

    return charities;
  }

  async findOne(id: number) {
    const charity = this.prisma.charity.findUnique({
      where: { id: id },
    });

    if (!charity) {
      throw new NotFoundException({
        status: 404,
        message: "Charity not found",
      });
    }

    return charity;
  }

  async update(id: number, updateCharityDto: UpdateCharityDto) {
    return `This action updates a #${id} charity`;
  }

  async remove(id: number) {
    return await this.prisma.charity.delete({
      where: { id: id },
    });
  }
}
