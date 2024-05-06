# Zod Validation

This project is a simple Express server that uses Zod for input validation. It includes two routes: /signup and /login.

The tsconfig.json file was generated using the `tsc --init` command

## API ENDPOINT

### POST /signup

This endpoint is used to sign up a new user. It expects a JSON body with the following properties:

- name: A string that is required.
- email: A string that must be a valid email. It is trimmed and converted to lowercase. This field is required.
- password: A string that must contain at least one uppercase letter, one lowercase letter, one of these symbols (!@#$%^&*), one digit, and be between 8 and 30 characters in length. This field is required.
- username: A string that must be alphanumeric and between 3 and 30 characters in length. This field is required.
- images: An array of strings.

### POST /login

This endpoint is used to log in a user. It expects a JSON body with the following properties:

- email: A string that must be a valid email. It is trimmed and converted to lowercase. This field is required.
- password: A string that must contain at least one uppercase letter, one lowercase letter, one of these symbols (@$.!%\*?;^&#), one digit, and be between 8 and 30 characters in length. This field is required.
