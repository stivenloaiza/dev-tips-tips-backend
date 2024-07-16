import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserTip } from './schema/user-tip.schema';
import { User } from './schema/user.schema';
import { Tip } from './schema/tip.schema';

@Injectable()
export class TipGuard implements CanActivate {
  constructor(
    @InjectModel('UserTip') private readonly userTipModel: Model<UserTip>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Tip') private readonly tipModel: Model<Tip>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId, tipId } = request.body;

    const userTip = await this.userTipModel.findOne({
      user: userId,
      tip: tipId,
    });

    if (userTip) {
      throw new ConflictException('El tip ya ha sido enviado a este usuario.');
    }

    const user = await this.userModel.findById(userId);
    const tip = await this.tipModel.findById(tipId);

    if (!user || !tip) {
      throw new ConflictException('Usuario o Tip no encontrado.');
    }

    const newUserTip = new this.userTipModel({
      user: user._id,
      tip: tip._id,
      sentAt: new Date(),
    });

    await newUserTip.save();

    return true;
  }
}
