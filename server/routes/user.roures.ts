import { Request, Response, Router } from "express";
import User from "../models/User";

const userRouter = Router();

// get UserData

userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const userData = await User.findOne({ _id: req.params.id }, { password: 0 });
    res.status(200).json(userData);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
})

//Change user data

userRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { email, name, phone, surname } = req.body;
    const userData = await User.updateOne({ _id: id }, { $set: { email: email, name: name, surname: surname, phone: phone } });
    if (!userData) {

      res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(userData);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// delete user 

userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await User.deleteOne({ _id: id });

    res.status(200).json({ message: "user deleted" });

  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
})

// add book hotels

userRouter.post("/:id/bookHotels", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { image, name, dateArrival, dateDeparture, days, sum, city, address, adult, child } = req.body;

    const bookHotel = await User.updateOne({ _id: id }, { $push: { bookHotels: {image, name, dateArrival, dateDeparture, days, sum, city, address, adult, child } } })
    res.status(200).json({bookHotel});
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
})

// add/remove favorite hotels

userRouter.patch("/:id/favorite", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const userExist = await User.findOne({ _id: id });

    if (!userExist) {
      res.status(404).json({ message: "user is not found" });
    }

    const { hotelId, image } = req.body;
    const favoriteHotelData = await User.find({ _id: id, "favoriteHotels.hotelId": hotelId});

    let favoriteHotel: any;

    if (favoriteHotelData.length) {
      favoriteHotel = await User.updateOne({ _id: id }, { $pull: { favoriteHotels:{hotelId, image }} })
    } else {
      favoriteHotel = await User.updateOne({ _id: id }, { $push: { favoriteHotels: {hotelId, image}} })
    }

    res.status(200).json(favoriteHotelData);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
})

export default userRouter;