import { Request, Response } from 'express';
import { Model, Document, Types } from 'mongoose';

export class Controller<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const newEntity = new this.model(req.body);
      const savedEntity = await newEntity.save();
      res.status(201).json(savedEntity);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const entities = await this.model.find();
      res.json(entities);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const entity = await this.model.findById(req.params.id);
      if (!entity) {
        res.status(404).json({ message: 'Nem található' });
        return;
      }
      res.json(entity);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

 update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedEntity = await this.model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedEntity) {
      res.status(404).json({ message: 'Nem található' });
      return;
    }

    res.json(updatedEntity);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedEntity = await this.model.findByIdAndDelete(req.params.id);
      if (!deletedEntity) {
        res.status(404).json({ message: 'Nem található' });
        return;
      }
      res.status(200).json({ message: 'Törölve' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
}