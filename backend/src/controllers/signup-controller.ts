import { Request, Response, NextFunction } from "express";
import { User } from '../entity/User';
import bcrypt from "bcrypt";

const signup = async (req: Request, res: Response, next: NextFunction) => {
    const saltRound = 10;

    const {
        email,
        username,
        nickname,
        password,
        code
    } = req.body;

    const userCheck = await User.find({email: email}); // 중복된 이메일이 있는지 확인

    // 중복된 이메일 없는 경우
    if(userCheck.length === 0) {

        const user = new User();

        // 입력받은 비밀번호 암호화
        const salt = await bcrypt.genSalt(saltRound);
        const hashedPW = await bcrypt.hash(password, salt);

        user.email = email;
        user.nickname = nickname;
        user.username =username;
        user.code = code;
        user.password = hashedPW;

        await user.save()
        .then((user) => {
            res.status(201).json({
                message: "회원가입이 완료되었습니다.",
                userInfo: user
            });
        })
        .catch((err) => {
            res.send(err);
        });
    }
    else { // 중복된 이메일이 존재하는 경우
        res.status(400).json({
            message: "이미 존재하는 이메일 입니다.",
        })
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const saltRound = 10;
};

export default signup;