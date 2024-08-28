import users from "./users.mjs";
/*  
                Middlewares 
                                            */

export const findById = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const parseId = parseInt(id);
  if (isNaN(id)) return response.sendStatus(400);
  const user = users.find((user) => user.id === parseId);
  if (!user) return response.sendStatus(400);
  request.user = user;
  next();
};
