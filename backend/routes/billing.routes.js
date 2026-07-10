// import express from "express"
// import isAuth from "../middlewares/isAuth.js"
// import { billing } from "../controllers/billing.controller.js"


// const billingRouter = express.Router()

// billingRouter.post("/",isAuth,billing)


// export default billingRouter



import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { billing } from "../controllers/billing.controller.js"

const billingRouter = express.Router()

// Only handles the initial session generation step now
billingRouter.post("/", isAuth, billing)

export default billingRouter