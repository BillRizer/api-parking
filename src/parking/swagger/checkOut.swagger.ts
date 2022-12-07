export const ApiResponseSuccessNotes = {
  status: 200,
  schema: {
    example: [
      {
        id: '15790eea-f938-497b-8dfb-49bab5731a55',
        checkIn: '2022-12-07T00:42:08.000Z',
        checkOut: '2022-12-07T00:47:23.000Z',
        createdAt: '2022-12-07T00:42:08.638Z',
        updatedAt: '2022-12-07T00:47:23.000Z',
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
          'Checkout has already been done in Tue Dec 06 2022 21:47:23 GMT-0300 (Brasilia Standard Time), it is not possible to do it again',
      },
    ],
  },
};
