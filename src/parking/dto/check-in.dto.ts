import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CheckInParkingDto {
  @IsString()
  @IsNotEmpty({ message: 'Check-in Field missing' })
  public checkIn;

  @IsString()
  @IsNotEmpty({ message: 'Check-out Field missing' })
  public checkOut;

  @IsObject()
  public vehicle: { id: string };

  @IsObject()
  public company: { id: string };
}
