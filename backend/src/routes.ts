import express from 'express';
import { ItemController } from './controllers/item-controller';
import { MemberController } from './controllers/member-controller';

export function getRouter(){
    const router = express.Router();

    const itemController = new ItemController();
    const memberController = new MemberController();

    router.get('/items', itemController.getAll);
    router.get('/items/free', itemController.getFree);
    router.get('/items/:id', itemController.getOne);
    router.post('/items', itemController.create);
    router.put('/items/:id', itemController.update)
    router.delete('/items/:id', itemController.delete)

    router.get('/members', memberController.getAll);
    router.get('/members/:id', memberController.getOne);
    router.post('/members', memberController.create);
    router.put('/members/:id', memberController.update)
    router.delete('/members/:id', memberController.delete)

    return router;
}