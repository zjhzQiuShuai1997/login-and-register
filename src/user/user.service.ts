import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import { RegisterDto } from './dto/register.dot';
import { LoginDto } from './dto/login.dto';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {

  private logger = new Logger();

  async login(user: LoginDto) {
      const foundUser = await this.userRepository.findOneBy({
        username: user.username,
      });
      console.log('foundUser', );
      
      if(!foundUser) {
        throw new HttpException('用户名不存在', 200);
      }
      if(foundUser.password !== md5(user.password)) {
        throw new HttpException('密码错误', 200);
      }
      return foundUser;
  }


  
  @InjectRepository(User)
  private userRepository: Repository<User>;


  async register(user: RegisterDto) {
    // 通过用户名查找用户
    const foundUser = await this.userRepository.findOneBy({
      username: user.username
    });
    console.log('foundUser', foundUser);
    
    if(foundUser) {
      throw new HttpException('用户已存在', 200);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch(e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }
}
