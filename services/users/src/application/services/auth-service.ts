import bcrypt  from 'bcryptjs';
import { userRepository } from '../../data-access/repositories/user-repository';
import { BadRequestError, UserCreatedEvent } from '@tuanha888.fadebook/common';
import { LoginDto, SignupDto, UserLoginResponseDto } from '../dtos/dtos';
import { map_UserSignUpDto_To_User, map_User_To_UserLoginResponse, } from '../mapper/mapper';
import { TokenAttrs, generateAccessToken, generateRefreshToken, validateToken } from '../token-handler';
import { UserCreatedProducer } from '../events/user-created-producer';
import { rabbitClient } from '../../rabbit-client';


export const login = async (loginDto: LoginDto) : Promise<UserLoginResponseDto> => {
    const {email, password} = loginDto;
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new BadRequestError("Email or password is invalid");
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) throw new BadRequestError("Email or password is invalid");
    const returnUser = map_User_To_UserLoginResponse(user);
    return returnUser;

}
export const signup = async (signupDto: SignupDto) : Promise<UserLoginResponseDto> => {
    const {email} = signupDto;
    const user = await userRepository.getUserByEmail(email);
    if (user) throw new BadRequestError("Email has already existed");
    const newUser = map_UserSignUpDto_To_User(signupDto);
    const userEntity = await userRepository.add(newUser);
    const returnUser = map_User_To_UserLoginResponse(userEntity);
    const userCreatedData = returnUser as UserCreatedEvent['data'];
    new UserCreatedProducer(rabbitClient.connection).publish(userCreatedData);
    return returnUser;
}
export const refreshToken = (token: any) => {
    const payload = validateToken(token);
    const accessToken = generateAccessToken(payload as TokenAttrs);
    const refreshToken = generateRefreshToken(payload as TokenAttrs);
    return {
        accessToken,
        refreshToken,
    }
} 