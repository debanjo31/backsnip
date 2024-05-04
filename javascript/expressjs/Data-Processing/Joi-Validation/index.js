const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());

// Define a Joi schema for input validation
const signupValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().trim().lowercase().required(),
  age: Joi.number().integer().min(18).max(100).required(),
  password: Joi.string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?;.^&#])[A-Za-z\d@$!%.*?;^&#]{8,30}$/
    )
    .message(
      "Password must contain at least one uppercase letter, one lowercase letter, one of these symbols (@$.!%*?;^&#) , one digit, and be between 8 and 30 characters in length."
    )
    .required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  images: Joi.array().items(Joi.string()),
});

const loginValidation = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?;.^&#])[A-Za-z\d@$!%.*?;^&#]{8,30}$/
    )
    .message(
      "Password must contain at least one uppercase letter, one lowercase letter, one of these symbols (@$.!%*?;^&#) , one digit, and be between 8 and 30 characters in length."
    )
    .required(),
});

// JOI options for custom error messages
const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

// Define a route that handles POST requests
app.post("/signup", async (req, res) => {
  try {
    // Validate the request body against the schema
    const validate = signupValidation.validate(req.body, options);
    if (validate.error) {
      const message = validate.error.details
        .map((detail) => detail.message)
        .join(",");
      return res.status(400).json({
        status: "fail",
        message,
      });
    }

    // Process the validated user input
    // ...

    // Return a success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    // Validate the request body against the schema
    const validate = loginValidation.validate(req.body, options);
    if (validate.error) {
      const message = validate.error.details
        .map((detail) => detail.message)
        .join(",");
      return res.status(400).json({
        status: "fail",
        message,
      });
    }

    // Process the validated user input
    // ...

    // Return a success response
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
