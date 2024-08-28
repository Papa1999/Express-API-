import { Router } from "express";
import users from "../utils/users.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { validationSchemas } from "../utils/validationSchema.mjs";
import { findById } from "../utils/middlewares.mjs";
const router = Router();

/* 
                HTTP Methods 
                                            */

// GET METHOD



router.get(
  "/api/users",
  checkSchema(validationSchemas),
  (request, response) => {
    const results = validationResult(request);
    if (results.isEmpty()) {
      const { filter, value } = matchedData(request);
      if (filter && value) {
        return response
          .status(200)
          .send(users.filter((user) => user[filter].includes(value)));
      }
    } else {
      return response.status(200).send(users);
    }
  }
);

router.get("/api/users/:id", findById, (request, response) => {
  const { user } = request;
  return response.status(200).send(user);
});

// POST METHOD
router.post("/api/users", (request, response) => {
  const { body } = request;
  const newUser = {
    id: users[users.length - 1].id + 1,
    ...body,
  };
  users.push(newUser);
  response.status(201).send(newUser);
});

// DELETE METHOD
router.delete("/api/users/:id", findById, (request, response) => {
  const { user } = request;
  users.splice(users.indexOf(user), 1);
  return response.sendStatus(200);
});

// PUT AND PATCH
// Put for taking new objet and delete other properties when they are not defined
router.put("/api/users/:id", findById, (request, response) => {
  const { body, user } = request;
  const {
    params: { id },
  } = request;
  const parseId = parseInt(id);
  users[users.indexOf(user)] = { id: parseId, ...body };
  return response.sendStatus(200);
});

// Patch often used to just overide some properties coming from the body
router.patch("/api/users/:id", findById, (request, response) => {
  const { body, user } = request;
  users[users.indexOf(user)] = { ...users[users.indexOf(user)], ...body };
  return response.sendStatus(200);
});

export default router;
