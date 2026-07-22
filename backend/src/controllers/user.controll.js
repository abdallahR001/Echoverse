import { getUserByEmail, createUser } from "../repositories/user.repository.js";
import bcrypt from "bcrypt"
import { signInSchema, signUpSchema } from "../validations/user.validation.js";
import { generateAccessToken } from "../config/jwt.js";
export const signUp = async (req,res,next) =>
{
    try {

        const result = signUpSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.issues
            });
        }
        const {name,email,password} = result.data

        const existingUser = await getUserByEmail(email)

        if(existingUser)
        {
            return res.status(409).json({
                message: "User already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser({name,email,password:hashedPassword})

        const accessToken = generateAccessToken(user);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 5 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
                message: "Account created successfully."
            });

    } catch (error) {
        next(error)
    }
}

export const signIn = async (req, res, next) => {
    try {

        const result = signInSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.flatten().fieldErrors
            });
        }

        const { email, password } = result.data;

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const accessToken = generateAccessToken(user);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 5 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Logged in successfully."
        });

    } catch (error) {
        next(error);
    }
};