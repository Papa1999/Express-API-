import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/api/auth",
  passport.authenticate("local"),
  (request, response) => {
    return response.status(200).send(request.user);
  }
);

router.get("/api/auth/status", (request, response) => {
  console.log(request.session);
  console.log(request.user);
  return request.user ? response.send(request.user) : response.sendStatus(401);
});

router.post("/api/auth/logout", (request, response) => {
  if (!request.user) return response.sendStatus(400);
  request.logout((error) => console.log(error));
  return response.sendStatus(200);
});

export default router;
