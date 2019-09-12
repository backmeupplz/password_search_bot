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

export async function addPassword(email, password) {
  let pass = await PasswordModel.findOne({ email })
  if (!pass) {
    pass = await new PasswordModel({
      email,
      passwords: [password],
    }).save()
  } else {
    pass.passwords.push(password)
    await pass.save()
  }
}
