"use server"
import connectDb from "@/db/connectDb"
import User from "@/models/User"
import Payment from "@/models/Payment"
export const takedata=async(e)=>{
  await connectDb();
  let data=await Object.fromEntries(e)
  await User.create({
    username:data.username
  })
}
export const addData=async(e)=>{
  await connectDb()
  let data=await Object.fromEntries(e)
  await Payment.create({
    name:data.name,
    message:data.message,
    amount:data.amount,
    to_user:data.to_user
  })
}
export const fetchPayment = async (username) => {
  await connectDb();
  const payments = await Payment.find({ to_user: username });

  return payments.map(payment => ({
    _id: payment._id.toString(), 
    name: payment.name,
    message: payment.message,
    amount: payment.amount,
    done: payment.done,
  }));
};


