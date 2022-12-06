import { Parking } from '../../parking/entities/parking.entity';
import { mockVehicle } from './vehicle';

export const mockCheckIn: Parking = {
  id: '7078b9db-e561-486f-9400-8ab09b2971cf',
  checkIn: new Date('2022-12-06T20:50:19.000Z'),
  checkOut: null,
  vehicle: {
    ...mockVehicle,
  },
  createdAt: '',
  updatedAt: '',
  deletedAt: '',
};
