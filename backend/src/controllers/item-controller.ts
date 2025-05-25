import { Request, Response } from 'express';
import { Controller } from './base-controller';
import { IItem, ItemModel } from '../entity/Item';

export class ItemController extends Controller<IItem> {
  constructor() {
    super(ItemModel);
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const products = await ItemModel.find().populate('member');
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  getFree = async (_req: Request, res: Response): Promise<void> => {
    try {
      const freeItems = await ItemModel.find({ status: 'Szabad' }).populate('member');
      res.json(freeItems);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const entity = await ItemModel.findById(req.params.id).populate('member');
      if (!entity) {
        res.status(404).json({ message: 'Nem található' });
        return;
      }
      res.json(entity);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
}