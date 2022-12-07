import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CheckOutParkingDto {
  @IsString()
  @IsNotEmpty({ message: 'ParkingId Field missing' })
  public parkingId;

  @IsString()
  @IsNotEmpty({ message: 'Check-out Field missing' })
  public checkOut;
}
