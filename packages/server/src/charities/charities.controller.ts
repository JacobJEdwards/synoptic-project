import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CharitiesService } from './charities.service';
import { CreateCharityDto } from './dto/create-charity.dto';
import { UpdateCharityDto } from './dto/update-charity.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('charities')
@ApiTags('charities')
export class CharitiesController {
  constructor(private readonly charitiesService: CharitiesService) {}

  @Post()
  create(@Body() createCharityDto: CreateCharityDto) {
    return this.charitiesService.create(createCharityDto);
  }

  @Get()
  findAll() {
    return this.charitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.charitiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCharityDto: UpdateCharityDto) {
    return this.charitiesService.update(id, updateCharityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.charitiesService.remove(id);
  }
}
