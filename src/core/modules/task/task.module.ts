import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { taskProviders } from './task.providers';


@Module({
    // imports: [SequelizeModule.forFeature([Task])], // Mengimpor model Task ke modul
    controllers: [TaskController],
    providers: [TaskService, ...taskProviders],
})
export class TaskModule {}


// import { SequelizeModule } from '@nestjs/sequelize';
// import { Task } from './task.entity';

// imports: [SequelizeModule.forFeature([Task])], // Mengimpor model Task ke modul

