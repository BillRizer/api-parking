export const ApiResponseSuccessNotes = {
  status: 200,
  schema: {
    example: [
      {
        id: '15790eea-f938-497b-8dfb-49bab5731a55',
        checkIn: '2022-12-07T00:42:08.000Z',
        checkOut: null,
        vehicle: {
          id: '3126d8d8-53b5-49e8-a433-ccd3a0d8d302',
        },
        createdAt: '2022-12-07T00:42:08.638Z',
        updatedAt: '2022-12-07T00:42:08.638Z',
        deletedAt: null,
      },
    ],
  },
};
export const ApiResponseBadRequestNotes = {
  status: 400,
  schema: {
    example: [
      {
        statusCode: 400,
        message:
          'There is already a check-in open for this vehicle id:15790eea-f938-497b-8dfb-49bab5731a55',
      },
    ],
  },
};
