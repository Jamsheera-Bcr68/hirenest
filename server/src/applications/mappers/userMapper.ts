import { User } from "../../domain/entities/User";
import { userDto } from "../Dtos/userDto";

export class UserMapper {
  static toDto(user: User) {
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      imageUrl: user.imageUrl,
      isblocked: user.isBlocked,
    };
  }
}
