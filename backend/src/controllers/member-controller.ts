import { Request, Response } from 'express';
import { Controller } from './base-controller';
import { IMember, MemberModel } from '../entity/Member';
import { ItemModel } from '../entity/Item';
import mongoose from 'mongoose';

export class MemberController extends Controller<IMember> {
  constructor() {
    super(MemberModel);
  }

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const member = await MemberModel.findById(req.params.id);
      if (!member) {
        res.status(404).json({ message: 'Nem található' });
        return;
      }

      member.deleted = true;
      await member.save();

      res.status(200).json({ message: 'Törölve' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const members = await MemberModel.find({ deleted: false }).populate('items');
      res.json(members);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const member = await MemberModel.findById(req.params.id).populate('items');
      if (!member) {
        res.status(404).json({ message: 'Nem található' });
        return;
      }
      res.json(member);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedData = req.body;
      const existingMember = await MemberModel.findById(updatedData._id).populate('items');

      if (!existingMember) {
        res.status(404).json({ message: 'Nem található' });
        return;
      }

      // Items újrahasználása: minden eddigit megtartunk, ha nem törölték
      const updatedItemIds = updatedData.items?.map((item: any) => new mongoose.Types.ObjectId(item._id)) || [];

      for (const item of existingMember.items) {
        if (!updatedItemIds.includes(item._id)) {
          updatedItemIds.push(item._id); // régi itemeket is hozzáadjuk, ha még nem szerepel
        }
      }

      // Mezők frissítése
      existingMember.name = updatedData.name;
      existingMember.phone = updatedData.phone;
      existingMember.pid = updatedData.pid;
      existingMember.address = updatedData.address;
      existingMember.items = updatedItemIds;

      await existingMember.save();

      const populated = await MemberModel.findById(existingMember._id).populate('items');
      res.json(populated);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
}
