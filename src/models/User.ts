// Dependencies
import { prop, Typegoose } from '@hasezoey/typegoose'

export class User extends Typegoose {
  @prop({ required: true, index: true, unique: true })
  id: number
  @prop()
  language?: string

  @prop()
  email?: string
  @prop()
  numbers?: string

  @prop({ required: true, default: 0 })
  failedAttempts: number
  @prop({ required: true, default: false })
  banned: boolean
}

// Get User model
const UserModel = new User().getModelForClass(User, {
  schemaOptions: { timestamps: true },
})

// Get or create user
export async function findUser(id: number) {
  let user = await UserModel.findOne({ id })
  if (!user) {
    try {
      user = await new UserModel({ id }).save()
    } catch (err) {
      user = await UserModel.findOne({ id })
    }
  }
  return user
}
