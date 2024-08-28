import { Router } from "express";
const router = Router();

router.get("/api/products", (request, response) => {
  request.sessionStore.get(request.sessionID, (error, sessionData) => {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log(sessionData);
  });
  if (
    request.signedCookies.hello &&
    request.signedCookies.hello === "myfirstcookie"
  ) {
    return response.status(200).send([
      { id: 100, name: "chickenitos", price: 3.5 },
      { id: 101, name: "chessy-crunch", price: 3.5 },
      { id: 102, name: "potatoes", price: 3.5 },
      { id: 103, name: "fries", price: 3.5 },
    ]);
  } else {
    return response.status(400).send({ msg: "You need the correct cookie" });
  }
});

export default router;
