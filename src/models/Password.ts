// Dependencies
import { prop, Typegoose, arrayProp, InstanceType } from '@hasezoey/typegoose'

export class Password extends Typegoose {
  @prop({ required: true, index: true, unique: true })
  email: string
  @arrayProp({ items: String })
  passwords?: string[]
}

// Get Password model
const PasswordModel = new Password().getModelForClass(Password, {
  schemaOptions: { timestamps: true },
})

export async function findPasswords(
  email: string
): Promise<InstanceType<Password>> {
  return PasswordModel.findOne({ email })
}

export async function addPasswords() {
  const p = new PasswordModel({
    email: 'a@a.com',
    passwords: ['123456', 'password', 'noice'],
  })
  await p.save()
}
